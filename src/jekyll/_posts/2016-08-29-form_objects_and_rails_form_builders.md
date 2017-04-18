---
layout: post
title:  "Form Objects and Rails Form Builders"
image: "/assets/blog/picture-scale.svg"
summary: "Adhering to Rails' sensible defaults is often the right decision when working with the framework, but at times you may be served best by trying something a little different."
---

"Convention over configuration." This mantra is a cornerstone of Rails and a large reason it's so enjoyable to use. Adhering to Rails' sensible defaults is often the right decision when working with the framework, but at times you may be served best by trying something a little different.

Let's look at an example of where we can still adhere to Rails' contracts/conventions, and maybe write better code than Rails &mdash; the [form builder].

```erb
<%= form_for @article do |f| %>
  <!-- form fields here -->
<% end %>
```

And the following is often when something in your objects' needs further customization.

```erb
<%= form_for @article, method: :post, url: articles_path, html: { class: 'my-article-form' } do |f| %>
  <!-- here be form fields -->
<% end %>
```

That first example - so brief, so terse, so concise. It's beautiful that Rails can infer so much from that one object. Do we have a resource that matches that object? Is it persisted? No? Ok we'll point the form at `articles#create`. Wait, it *is* persisted? Fine, we'll point it at `articles#update`. Rails will even add accompanying css classes, and an id. All of this is from the fact that object most likely inherits from the base ActiveRecord and ActiveModel classes and will automatically adhere to the interface it needs to make sure all that nice stuff happens.

That second example? Aside from the fact it already runs beyond my 80 character line limit (strike one), it fits squarely in the long parameter code smell bucket ([strike two]), and just plain looks ugly (strike three). Blech. However, sometimes you need to override some options, and tap into the
form_for method to customize it for your needs. Let's be honest - the second option isn't *bad* or *wrong*, it could just be nicer if we understood the reasoning behind how and why the short and sweet form builder interface works!

This leads us to ...

[form builder]: http://guides.rubyonrails.org/form_helpers.html#customizing-form-builders
[strike two]: http://i.imgur.com/OrJrxDu.gif

## What are form objects?

Form objects are a solution to Rails' [prescribed approach] - `accepts_nested_attributes_for`. Here's where straying from the built-in convention is *good* for you as nested attributes can get painful quickly.

Here are some blog posts detailing the general idea behind form objects:

* My favorite is [from Harlow Ward during his time at thoughtbot].
* From thoughtbot, [an upcase episode going over form objects] - subscription access is needed.
* Wow, thoughtbot likes form objects - [an overview from Derek Prior] born of one of their Friday
  dev discussions. Derek's post contains fantastic reasoning as to why
  `accepts_nested_attributes_for` can lead to a poor experience.
* CodeClimate lists form objects as [one of the best ways for fat AR models to shed code weight].
* [Nick Sutterer likes form objects so much], he wrote [a gem] pulling together a nice abstraction.

The gist is, you may have a complex form representing several resources or models, maybe containing extra data that doesn't match 1:1 with a model, maybe requiring extra validations. A form object is an effective, testable, representation with a single responsibility - handling user input. And since they're (mostly) plain old Ruby objects, there is less chance a major Rails bump will introduce new side-effects.

[prescribed approach]: http://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html
[from Harlow Ward during his time at thoughtbot]: https://robots.thoughtbot.com/activemodel-form-objects
[an upcase episode going over form objects]: https://thoughtbot.com/upcase/videos/form_objects
[an overview from Derek Prior]: https://forum.upcase.com/t/form-objects/2267
[one of the best ways for fat AR models to shed code weight]: http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/#form-objects
[Nick Sutterer likes form objects so much]: https://apotonick.wordpress.com/2015/05/21/on-rails5-presenters-and-form-objects/
[a gem]: https://github.com/apotonick/reform

## Making our form object adhere to the form builder interface

I'll use an example from Shubox itself. We are working on the concept of "Image Manipulations" here. Image manipulations are a collection of rules and processors we can apply to images after they are uploaded. There are several different models at play in order to make these manipulations work. Therefore it points us towards the need for a form object. What do we want from our form object? We need it to look, quack, and waddle like an ActiveModel duck as much as possible so that this:

```erb
<%= form_for @image_manipulation_form_object do |f|
  <!-- form fields here -->
<% end %>
```

... will work exactly how we expect. Namely generate a form tag that:

1. Adheres to the common ActiveModel interface.
2. Knows our form object will map to the highest level model's resource - `ImageManipulation`.
2. Knows whether this is a new, or existing/persisted model which then points the action to the
   correct resource action, `image_manipulations#create` or `image_manipulations#update`.
4. If we are editing (an) existing model(s) it tells the form builder what record to assign to
   `params[:id]`

From here let's assume we have a resource in `routes.rb` that corresponds to our model,
`ImageManipulation`:

```ruby
resources :image_manipulations
```

Our form object starts out as a plain old Ruby object.

```ruby
class ImageManipulationForm
  def initialize(image_manipulation)
    @image_manipulation = image_manipulation
  end
end
```

### Step 1: The ActiveModel interface.

Including the `ActiveModel::Model` module into this class will pull in a few methods and some additional modules to get you things like validations, conversions, attribute assignments, etc. For a deeper look, [check out the docs]. This is an essential part of today's Rails form object, because without this you're probably implementing an inordinate number of methods. So at the very least, make sure to include this.

```ruby
class ImageManipulationForm
  include ActiveModel::Model

  def initialize(image_manipulation)
    @image_manipulation = image_manipulation
  end
end
```

[check out the docs]: http://api.rubyonrails.org/classes/ActiveModel/Model.html

### Step 2: Ensure the form knows the correct resource we are working with

Let's try passing this new form object to the form builder and see what happens!

```erb
<!-- erb -->
<%= form_for @new_image_manipulation_form do |f| %>
  <!-- form fields here -->
<% end %>

<!-- Generated HTML -->
undefined method `image_manipulation_forms_path' for #<#<Class:0x007fe98014af48>:0x007fe97d292d18>
```

Oops. We're already running into issues because Rails is expecting a route helper to exist based on our `ImageManipulationForm` *class name*. In this case it's expecting `image_manipulation_forms_path` which doesn't exist. And we already have an action - `image_manipulations#create`!

How do we fix it? Check out `self.model_name` in the following snippet:

```ruby
class ImageManipulationForm
  include ActiveModel::Model

  def initialize(image_manipulation)
    @image_manipulation = image_manipulation
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'ImageManipulation')
  end
end
```

What's the result?

```erb
<!-- erb -->
<%= form_for @new_image_manipulation_form do |f| %>
  <!-- form fields here -->
<% end %>

<!-- Generated HTML -->

<form class="new_image_manipulation" id="new_image_manipulation"
  action="/image_manipulations" accept-charset="UTF-8" method="post">
  <!-- guess what? you guessed it! form fields -->
</form>
```

Heeeeeeeey! 👍 Not bad!

Rails relies heavily on object introspection. It asks objects what their class name is and infers a ton of information. When resources (like models, controllers, views) are named appropriately the corresponding areas in the stack will just work. In the case of our `ImageManipulationForm`, this would
not be the case until we fix it.

For a solid and well-documented look at all of the things Rails will do based on the model's class, check out the [ActiveModel::Name source].

[ActiveModel::Name source]: https://github.com/rails/rails/blob/master/activemodel/lib/active_model/naming.rb

### Step 3: Determine if our form object is new, or previously existing

Delegating the `persisted?` instance method to our underlying `ImageManipulation` model will let our form object pass along that responsibility. Note that, although `ActiveModel::Model` implements that
method, it's really [not helpful at all].

```ruby
class ImageManipulationForm
  include ActiveModel::Model

  attr_reader :image_manipulation

  delegate :persisted?, to: :image_manipulation

  def initialize(image_manipulation)
    @image_manipulation = image_manipulation
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'ImageManipulation')
  end
end
```

Which, when we try it out, results in:

```ruby
new      = ImageManipulation.new
existing = ImageManipulation.first

ImageManipulationForm.new(new).persisted?      # => false
ImageManipulationForm.new(existing).persisted? # => true
```

Rails now knows where to point the action to, generate appropriate default CSS IDs and classes, and, when using something like `simple_form`, will generate a sensible default value for the submit button.

[not helpful at all]: https://github.com/rails/rails/blob/5bdb42159ec461d678652319da14b4a59bfafd27/activemodel/lib/active_model/model.rb#L95

### Step 4: Let the form builder know the id for existing objects

```ruby
class ImageManipulationForm
  include ActiveModel::Model

  attr_reader :image_manipulation

  delegate \
    :id, # 👈
    :persisted?,
    to: :image_manipulation

  def initialize(image_manipulation)
    @image_manipulation = image_manipulation
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'ImageManipulation')
  end
end

ImageManipulationForm.new(ImageManipulation.first).id # => 1
```

When editing an existing model, the form will need to know what ID represents that model's record in the database (otherwise how would `#update` know *which* record to update?). We lean on the approach above to delegate that responsibility to the underlying `ImageManipulation` object.

With that, we now have a happy form builder! We can now pass this form object to form builders (whether they are Rails' stock form builder, [simple_form], or [formtastic]) and result in a form that will behave as we expect.

[simple_form]: https://github.com/plataformatec/simple_form
[formtastic]: https://github.com/justinfrench/formtastic

### In conclusion

After reading this post you can see that it's possible to closely adhere to Rails' conventions while still straying from the prescribed "Rails Way". Part of the beauty of Ruby, Rails, and OOP is that [duck-typing] will work well as long as your contracts (interfaces) are adhered to.

[duck-typing]: https://en.wikipedia.org/wiki/Duck_typing

### Extra Credit: Form objects in action

Reading source code is probably the best teacher of how concepts like form objects can be used. Here are a few to peek at:

* The [thredded gem]'s source code makes use of several [form] [objects].
* Ryan Bates put together a few [for Railscasts].
* [Gabe Berke-Williams] has a [wonderful little sample app] that implements a user signing up with both [a form object] and [accepts\_nested\_attributes\_for].

[thredded gem]: https://github.com/thredded/thredded
[Gabe Berke-Williams]: https://twitter.com/gabebw
[form]: https://github.com/thredded/thredded/blob/master/app/forms/thredded/topic_form.rb
[objects]: https://github.com/thredded/thredded/blob/master/app/forms/thredded/user_preferences_form.rb
[for Railscasts]: https://github.com/railscasts/416-form-objects/blob/master/signup-after/app/forms/signup_form.rb
[wonderful little sample app]: https://github.com/gabebw/form_object_example/
[a form object]: https://github.com/gabebw/form_object_example/blob/gbw-use-form-object/app/models/signup.rb
[accepts\_nested\_attributes\_for]: https://github.com/gabebw/form_object_example/blob/gbw-use-accepts-nested-attributes/app/models/user.rb

### Thanks

Big-big ups to [Gabe], [Jessie], [Nick], [Richard], and [Thomas] for their help working this post into shape. ❤

[Gabe]: http://gabebw.com
[Jessie]: https://twitter.com/jessieay
[Nick]: https://twitter.com/ngauthier
[Richard]: https://twitter.com/bitsandhops
[Thomas]: https://twitter.com/thegreatape

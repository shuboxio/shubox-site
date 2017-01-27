---
layout: post
title:  "How Thredded Uses Shubox"
---

I've mentioned previously how shubox.io was born of one of the bigger frustrations I had while
building the [thredded gem], and [thredded.com]. In short, it was a feature too big to be
handled elegantly within something that had a whole other responsibility - discussion and
conversation. Sure, images are a vital piece of communication these days and deserve to be a first
class citizen. That being said - they deserve their own first class solution. Hence, why I built
shubox. It's an upload solution *for developers* to make that experience easy, seemless, and
transparent *for users*.

Of the user experiences I use regularly, what are some of the best? Github's is one. When leaving
comments on GitHub's issues or PR's I know I can drag and drop an image, or click a well-styled
element just underneath the text area if I'm on a mobile device, and it just works. We wanted
something similar for thredded, but with a few little extras (an upload progress bar, namely).

How do we do it? Let's dig in and see how thredded.com is set up with shubox.

![uploading with thredded](https://www-shubox-io.s3.amazonaws.com/production-sample-upload/330099bf/thredded-drag-n-drop.gif)

Let's figure out our requirements.

1. Able to drag and drop photos and images into the post content textarea and append the resulting
   markdown image pseudocode to the end of the existing text.
2. Clicking into the textarea should not display the file dialog. We don't want it hijacking the
   focus event because that's where the typing happens.
3. Click an adjacent div to display the file dialog instead of the behavior we're disabling in #2.
   This is for our friends on touch-enabled devices (bc no drag and drop, right?)
4. Display an upload progress bar.
5. Append the resulting image file URL with the proper markdown tag.

* * *

The 0'th step is to register an account on shubox and set up our domains and
bucket(s), natch. We'll leave that for homework. In the meantime, let's iteratively build up the
solutions to each of the requirements we outline above.

### Requirement 1 Solution: Drag+Drop into Post `textarea`

Ok, so what do we have, here? Several textareas that need the right treatment. They all use [one
partial] for the textarea - `app/views/thredded/posts_common/form/_content_field.html.erb`

```erb
<%= form.label :content, content_label %>
  <%= render 'thredded/posts_common/form/before_content', form: form %>
  <%= form.text_area :content, { rows: 5, required: true }  %>
  <%= render 'thredded/posts_common/form/after_content', form: form %>
</li>
```

The textarea is given different `id`s according to the context it lives within (post, topic, private
topic, etc) so for now the best way to reference it via CSS selector, as we build the Shubox JS
initializer is by hooking into the form element in its parent nodes. Our javascript will start out
as:

```javascript
new Shubox(".thredded--form textarea", { textBehavior: "append" });
```

### Requirement 2 Solution: Disable click/focus event

Since this is a textarea, unlike `<input>`s or `<div>`s, we do not want the click or focus event to
trigger a file dialog to pop up. This is quickly addressed with the `clickable` option in the
initializer.

```javascript
new Shubox(".thredded--form textarea",
  {
    textBehavior: "append",
    clickable: false
  }
);
```

### Requirement 3 Solution: Let adjacent div handle click events

For people without the whole drag+drop thing available to them (again - touch devices) we can add a
div close to the textarea that can handle those click events. Thredded has a set of [empty] [partials]
available to it, just above and below the textarea, that you can choose to override with a div that
will do this work. We'll choose the one below for this example. First, the html in
`app/views/thredded/posts_common/form/_after_content.html.erb`

```html
<div id="thredded--click-to-upload" class="thredded--click-to-upload">
  Attach files by dragging &amp; dropping or <a>selecting them</a>.
</div>
```

We can now add a little styling in our parent application's
`app/assets/stylesheets/components/_file_upload.scss`. Or your scss partial of choice.

```scss
.thredded--click-to-upload {
  background-color: $thredded-light-gray;
  padding: .5rem;
  font-size: .7rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  a {
    color: $thredded-brand;
    cursor: pointer;
  }
}
```

And finally, we'll adjust the shubox initializer to point the "clickable" option at a selector
unique to our new click-to-upload div:

```javascript
new Shubox(".thredded--form textarea",
  {
    textBehavior: "append",
    clickable: '#thredded--click-to-upload'
  }
);
```

### Requirement 4 Solution: An upload progress bar

Who wants to wait for a long arbitrary time while files upload -- not knowing how long until things
are done? I sure don't. Because of this, shubox provides the progress data for both a single file,
and multiple files, in the form of the following respective data attributes: `data-shubox-progress`
and `data-shubox-total-progress`. With these two attributes you can rather easily hook into them
with a bunch of CSS that is made trivial with Sass. Here's what we'll do - we'll use a single pixel
png as our progress bar and pin it at the top, essentially out of sight until the upload progress
changes.

```scss
textarea {
  margin-bottom: 0;
  display: block;
  background: image-url('light-gray.png') top left no-repeat;
  background-size: 0 4%;
}
```

Then we can loop through the percentages with sass and adjust how the progress bar will look across
our textarea as the file, or files, are being uplaoded. At the 100% point we'll make the progress
bar disappear back to its normal state.

```scss
@for $i from 1 through 99 {
  $percentage: $i;
  $progress-bar-height: 4%;

  textarea[data-shubox-progress='#{$percentage}'] {
    background-size: ($percentage * 1%) $progress-bar-height;
  }
}

textarea[data-shubox-progress='100'] {
  background-size: 0 $progress-bar-height;
}
```
### Requirement 5 Solution: Append image URL with proper markdown tag

Lastly, thredded's posts can be formatted with markdown so let's give our users a hand and append the
image URL in the post with the markdown image tag wrapped around it. The `s3urlTemplate` option can
be provided any string containing `{{s3url}}` which will have the resulting upload URL interpolated
in before it is applied to the textarea. If we wanted a plain old html tag we could, instead,
provide the string `'<img src="{{s3url}}">'`, for example.

```javascript
new Shubox(".thredded--form textarea",
  {
    textBehavior: "append",
    clickable: '#thredded--click-to-upload',
    s3urlTemplate: '![]({{s3url}})'
  }
);
```

### ~ fin ~

And that's it! With a little partial overriding, some extra clever (S)CSS, and a relatively
straightforward shubox configuration we have an elegant solution to the challenge of uploading and
linking to photos and gifs within the thredded post textarea!


[one partial]: https://github.com/thredded/thredded/blob/master/app/views/thredded/posts_common/form/_content_field.html.erb
[empty]: https://github.com/thredded/thredded/blob/master/app/views/thredded/posts_common/form/_before_content.html.erb
[partials]: https://github.com/thredded/thredded/blob/master/app/views/thredded/posts_common/form/_after_content.html.erb
[thredded gem]: https://github.com/thredded/thredded
[thredded.com]: https://thredded.com
---
layout: post
title:  "Use rails-erd Instead of annotate_models"
image: "/assets/blog/doc.svg"
summary: "In which I make a small request to ruby on rails developers: Do not use the annotate_models gem. Use rails-erd instead!"
---

Before we jump into [`rails-erd`](https://github.com/voormedia/rails-erd) and
how to integrate it into your workflow let's talk about something adjacent to
that.

Often when dropping into a new Rails app I'll notice that models, specs, and
factories will be the lucky bearers of the related database table schema thanks
to the [`annotate_models`](https://github.com/ctran/annotate_models) gem.

The `annotate_models` gem is a great tool for providing visibility into the
underlying structure of your database tables.

To that, I say "👍" !

*However*, there are some downsides. They're not necessarily malevolent or
problematic, but more speedbumps along the road of your development process.

To wit:

1. It's _noisy_ at the top of important pieces of your code. Opening a file,
   being met with a wall of comments, and spending time to get to the meat of a
   class - it's a speedbump. I ask you to ask yourself - how often do you
   _really_ need to reference the columns and structure of your table? I'd
   guess "not so often". It's not _that_ big a deal, but over time when your
   models grow in size it's not unfathomable that your editor buffer, on first
   open, could be nothing but the contents from `annotate_models`.

   If you use vim and tpope's vim-rails package you can get to your model's
   schema you can get to this information quickly already. `:Eschema
   table_name` will take you right there. Example: `:Eschema users`, `:Eschema
   posts`, etc.

   If you use Atom there are plugins that will assist with this -

   * [atom-rails-model-schema]
   * [atom-rails]

2. A migration should result in 2 files staged in Git. The new migration, and
   an updated `schema.rb` or `structure.sql`. Instead, with `annotate_models`
   you end up with those two, plus: modified model, factory, and spec -- for
   _each_ model you update. To me that's an unnecesary halo effect.

3. Last but not least &mdash; and, arguably, most annoyingly &mdash; if you or
   a teammate neglects to check those updates into git, the next time someone
   runs a recently checked in migration, your local files change modifying
   files that have nothing to do with the work you're going to check in.

I will stop there with my humble request that you reconsider using
`annotate_models` and get into the meat of what I feel is a helpful tool for
your project(s). Enter `rails-erd` ...

[atom-rails-model-schema]: https://github.com/juliogarciag/atom-rails-model-schema
[atom-rails]: https://github.com/tomkadwill/atom-rails

## Rails ERD (Entity Relationship Diagram)

What is an "Entity Relationship Diagram"? According to [techopedia]:

> An entity-relationship diagram (ERD) is a data modeling technique that
> graphically illustrates an information system’s entities and the
> relationships between those entities.

`rails-erd` is a utility gem that will generate a PDF with a diagram of your
models, their columns, and the relationship between the models. It looks a
little something like:

![rails-erd example](https://jekyll-shubox-io.s3.amazonaws.com/localhost-5001/4de972e6/544_rails-erd.png.webp)

[techopedia]: https://www.techopedia.com/definition/1200/entity-relationship-diagram-erd

Per the directions on the project's repo:

1. Make sure graphviz is installed:

   * `brew install graphviz` 🍎
   * `sudo apt install graphviz` 🐧

2. Add `gem "rails-erd", require: false, group: :development` to your
   application's Gemfile

3. Run `bundle exec erd`

You should have a PDF in your app root waiting to be opened now!

For extra credit you can set up your app to generate a new erd after you've run
new migrations.

```ruby
bundle exec rails generate erd:install
```

Your information now resides in that one pdf, unlike `annotate_models`. No
polution of all your files. One file that can be `gitignore`d if so desired!
Huzzah!

In the grand scheme of things, the gripes I present above are miniscule. I'd
absolutely concede that. It's really not _that_ big a deal. However, if you're
on a project using `annotate_models` and you're in the middle of a rebase
having to reconcile the merge conflicts from that gem across several files? I
hope you'll remember this blog post.

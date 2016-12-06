I think you'll agree that starting a brand new greenfield Rails app is a delightful experience.
That blank slate is a sign of promise, a sign of hope, a deeeeep breath of fresh air, an
opportunity to write your career's *best* code! You know, it makes me feel good just writing that.

At the same time, it's an opportunity to experiment with all this cool shiney *new* technology! To
that I ask -- "do you need it?" Do you need to use that new add-on? That new engine? Is the purpose of
this new app to ... play with new technology? Or to ship? If the answer is "to ship" I
have a proposition for you - why not eschew that new technology unless you absolutely have to?

For example - what about the part of your website or app where you'll be blogging about all the
great stuff your service offers? You'll need some way to author and publish these posts, right?
You could try out [comfortable mexican sofa], [refinery], or try to integrate [jekyll] or [middleman], or
get something like [wordpress] or [ghost] set up on a subdomain.

The itch and the compulsion to try out that shiny piece of tech is super strong.
However, you should remind yourself that the business must come first. To that end - in order to get
something up off the ground fast, you have to just think creatively. I've done that work for you and
have a solution that might get you from 0 to 60 in a lot less time than it would take to configure
(your desired blog engine here). Let's get to work. Here's what we'll do:

* * *

1. Your `Gemfile`. These gems are the building blocks for our new blog "engine".

    ```ruby
    gem 'high_voltage'   # static pages in your app
    gem 'markdown-rails' # static views and partials w/markdown
    gem 'redcarpet'      # markdown renderer
    gem 'rouge'          # code highlighting
    ```

2. `./config/initializers/markdown.rb` - configure markdown-rails to use Redcarpet and Rouge when
   rendering.

    ```ruby
    MarkdownRails.configure do |config|
      markdown = Redcarpet::Markdown.new(
        Redcarpet::Render::Rouge,
        fenced_code_blocks: true,
        autolink: true,
        underline: true
      )

      config.render do |markdown_source|
        markdown.render(markdown_source)
      end
    end
    ```

3. `./config/routes.rb` - to define our routes. A little calculated future-proofing is what I'd go
   for here. Anticipate whether you *would* reach for a more robust blogging solution and adhere to
   what the typical URL path would be in the case you get that **$2B** seed round closed and have a
   teammate that will handle the migration to jekyll, or wordpress, or whatever. SEO experts, and
   novices alike, would tell you that keeping your URL's the same is a definite must. I would
   probably use jekyll in the future so the following would get me close to the out-of-the-box
   jekyll paths. This effectively tells high voltage that paths matching
   `/blog/year/month/day/post-slug` will be routed to high_voltage using the id "blog".

    ```ruby
    get '/blog/:year/:month/:day/:post',
      to: 'high_voltage/pages#show',
      id: 'blog'
    ```

4. `./app/views/pages/blog.html.erb` - to lay out our main blog view/template. We determine the blog
   title from the slug itself. So "hello-how-are-you" turns into "Hello How Are You". We determine
   the path to the blog post itself by joining the path -- themselves build from the year, month,
   and day params -- and the partial file name -- built from the post slug.

    ```erb
    <% title = params[:post].gsub('-', ' ').titleize %>
    <% path = "#{params[:year]}/#{params[:month]}/#{params[:day]}" %>
    <% post = "#{params[:post].gsub('-', '_')}"  %>

    <div class="blog">
      <h1><%= title %></h1>

      <div class="blog--content">
        <%= render "blog/#{path}/#{post}" %>
      </div>
    </div>
    ```

    I know. It's ugly! Remember that the job of this is to eventually get thrown out when it's the
    right time.

5. `./app/views/blog/2016/07/25/_my_first_post.html.md` - first post!

    ```markdown
    ## Hello

    Welcome to the first post on the blog!
    ```

That's it! ***Done!*** Future blog posts can now be published by deploying your website with new markdown
files in the desired path(s).

```
./app/views/blog/2016/07/25/_my_first_post.html.md
./app/views/blog/2016/07/26/_top_ten_something_or_others.html.md
./app/views/blog/2016/07/27/_you_will_never_believe_what_happened_next.html.md
./app/views/blog/2016/07/28/_why_i_am_leaving_elixir_for_some_other_new_thing.html.md
```

## Trade-offs

Of course there are large assumptions I'm making here and as a result this is by no means
prescriptive. There are situations where this is probably not a good idea. This approach doesn't
give you many of the niceties a blog engine would, but it *will* get content to your audience
quickly and with little fuss. When your time could be spent working on or marketing the product I
maintain that approaching problems like this is a trade-off you should be willing to make.

For what it's worth, I'm dog-fooding this exact approach with shubox.io and it's worked out well
thus far. I know what's needed and I'm going no further. As a result there is no time wasted trying
to figure out how to hook up features X, Y or Z. I write some markdown, and I'm done.

[comfortable mexican sofa]: https://github.com/comfy/comfortable-mexican-sofa
[refinery]: http://www.refinerycms.com
[jekyll]: https://github.com/jekyll/jekyll
[middleman]: https://github.com/middleman/middleman
[wordpress]: https://wordpress.com
[ghost]: https://ghost.org/
[redcarpet]: https://github.com/vmg/redcarpet
[markdown-rails]: https://github.com/joliss/markdown-rails

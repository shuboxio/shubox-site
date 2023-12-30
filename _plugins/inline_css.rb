# frozen_string_literal: true

module Jekyll
  # Class that handles the inline_css tag. Inlining CSS is a great way to
  # reduce network requests to external CSS files.
  class InlineCssTag < Liquid::Tag
    def initialize(tag_name, css_path, _tokens)
      super
      @css_path = css_path
      @inlinable = ENV['JEKYLL_ENV'] == 'production'
    end

    def render(context)
      @context = context

      return %(<style type="text/css" media="screen">#{raw_css}</style>) if inlinable?

      %(<link rel="stylesheet" href="#{css_path}">)
    end

    private

    attr_reader :css_path, :inlinable, :context

    def inlinable?
      inlinable && File.exist?(full_path)
    end

    def raw_css
      raw_contents = File.read(full_path)

      return raw_contents if replacables.empty?

      replacables.each do |replace|
        raw_contents = raw_contents.gsub(replace['this'], replace['with'])
      end

      raw_contents
    end

    def full_path
      path = File.expand_path(css_path.strip)
      path = "/#{path}" unless path.start_with?('/')
      "#{context['site']['destination']}#{path}"
    end

    def replacables
      context['site']['inlinecss']['replace']
    end
  end
end

Liquid::Template.register_tag('inline_css', Jekyll::InlineCssTag)

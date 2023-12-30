# frozen_string_literal: true

module Esbuild
  class Engine
    def initialize(bundle, destination)
      @bundle = bundle
      @input = bundle['input']
      @destination = destination
      @minified = !bundle['minified'].nil? ? '--minify' : ''
      @extra_options = bundle['extra_options']
    end

    def process
      `esbuild #{input} --log-level=silent --bundle #{output_option} #{minified} #{extra_options}`
      Jekyll.logger.info 'Esbuild:', "Processed #{input}"
    end

    protected

    attr_reader :bundle, :input, :minified, :destination, :extra_options

    private

    def output_option
      if bundle['outdir']
        "--outdir=#{destination}/#{bundle['outdir']}"
      else
        "--outfile=#{destination}/#{input}"
      end
    end
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  js_bundles = site.config['esbuild']
  js_bundles.each do |bundle|
    engine = Esbuild::Engine.new(bundle, site.config['destination'])
    engine.process
  end
end

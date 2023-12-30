# frozen_string_literal: true

module LazyLoadImages
  def lazy_load_images(input)
    images = input.scan(/<img.*?>/mi)

    images.each do |image|
      new_image = image
      new_image = new_image.gsub(/src="/, 'data-src="')
      new_image = new_image.gsub(/<img /,
                                 '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" ')
      new_image = new_image.gsub(/<img /, '<img class="lazyload" ') unless image.include?('class')
      new_image = new_image.gsub(/class="/, 'class="lazyload ') if image.include?('class')
      input.gsub!(image, new_image)
    end

    sources = input.scan(/<source.*?>/mi)

    sources.each do |source|
      new_source = source
      new_source = new_source.gsub(/srcset/, 'data-srcset')
      input.gsub!(source, new_source)
    end

    input
  end
end

Liquid::Template.register_filter(LazyLoadImages)

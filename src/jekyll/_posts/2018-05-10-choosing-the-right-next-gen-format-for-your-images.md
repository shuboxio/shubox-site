---
layout: post
title:  "Choosing the Right Next-Gen Format for Your Images"
image: "/assets/blog/doc-markdown.svg"
summary: "There are a lot more options for images these days than just JPGs and PNGs."
---

The web is getting bigger and slower. One of the easiest ways to improve the big part is to [compress your images](https://userinterfacing.com/the-fastest-way-to-increase-your-sites-performance-now/) (or you can do it [automatically](https://shubox.io/docs/#setup-image-transforms) with Shubox). An alternate question you could ask yourself is whether your image formats are the right type of images in the first place.

## The basic way to choose image types

For the past few years, the easiest and most straightforward way to choose your image type was between photographs and graphics. As a quick rule of thumb: **photographs should be JPEGs and everything else should be PNGs**. There are two exceptions:

1. If you are using an animated image (or video converted to image), definitely use a GIF
2. If you're using images like icons (where they need to scale with your typography), see if you can convert that image to an SVG (Sketch is easily the best at [converting to SVG](https://medium.com/sketch-app-sources/the-best-way-to-export-an-svg-from-sketch-dd8c66bb6ef2))

There are a bunch of other image formats, such as BMPs, EXIFs, and TIFFs, but those have largely fallen out of favor even though they still technically work.

For years this advice would serve you well. But the web is still evolving and there are new file formats to consider when putting your images on the web.

## The advanced way to choose image types

Recently there has been a rise in next-generation image formats to make the web lighter and more accessible. Unfortunately, the rules for choosing these formats is not as straightforward as it once was. Here are the 3 main types of next-gen image formats you should be considering when uploading your next image onto Shubox.

### JPEG 2000

[JPEG 2000](https://jpeg.org/jpeg2000/index.html) is a newer incarnation of the JPEG format. The primary purpose of the format is to preserve metadata through radical compression techniques. While most traditional JPEGs have a limited set of metadata for photographs, JPEG 2000 uses structured XML to include a vast array of metadata information.

This is useful for applications like film and medical imaging because a great deal of data needs to be associated with the image. For example, film stills need to store information about high dynamic range and different color spaces. Medical imaging requires absolute precision in image clarity in spite of the large volume of data. With JPEG 2000, you can encode these files completely losslessly, with good-enough compression performance to make transfer acceptable.

Even if you aren't in the film or healthcare industry, you can take advantage of these new compression techniques in your current JPGs by switching to JPEG 2000. There is one caveat: if you are writing for the web, JPEG 2000 is only [supported on Safari](https://caniuse.com/#feat=jpeg2000), so it will only benefit your customers on Macs, iPhones, and iPads. As long as you use the other two formats that follow, you should definitely consider JPEG 2000 in your arsenal of image formats.

### JPEG XR

[JPEG XR](https://jpeg.org/jpegxr/index.html) is yet another next-gen JPEG format and a close cousin of JPEG 2000. JPEG XRs application is less intense than JPEG 2000 and was designed in many ways to be the successor of the standard JPEG format.

The main benefits of JPEG XR over the standard format are for enhanced support for HDR imagery. While the original format uses 3 color channels in a bit-depth of 8, JPEG XR supports multiple color formats like monochrome and CMYK and supports bit-depths of 16 or greater. It was also designed from the ground up to support better compression techniques. In other words, it is like JPEG on steroids.

While this is the more practical, versatile file format in comparison to JPEG 2000, it suffers from the same adoption blunders by being available on only a limited set of browsers. As of this writing, JPEG XR is only [supported on IE](https://caniuse.com/#feat=jpegxr), so it will only benefit your customers on Windows machines running some form of IE.

Combined, these two formats will cover all of your photography needs across the majority of devices. But what about PNGs? And what about open source browsers like Firefox and Chrome?

### WebP

[WebP](https://developers.google.com/speed/webp/) is the open source answer to the next generation of both JPGs and PNGs. The primary application of WebP is the web and is routinely 25% smaller than both optimized PNGs and JPGs.

Because of its web roots, WebP is immediately available in both Chrome and Opera. In addition, WebP has animation support and can be a great replacement for GIFs as well. [`cwebp`](https://developers.google.com/speed/webp/docs/precompiled) is a super easy command line tool to quickly convert your JPGs and PNGs into WebP images, which makes it even easier to convert into than JPEG 2000 or JPEG XR. Luckily, Shubox automates this as well and will let you convert your images into the WebP format when you upload them to S3. How cool is that?

Like the other formats, the major flaw is in browser support. As I mentioned, this comes supported out of the box by Chrome and Opera, but that's it (well, and a bunch of [other Chromium-based browsers too](https://caniuse.com/#feat=webp)).

Again, the thing to remember with next-gen photographs is a triple threat approach. **If you want to put a photo on the web, you need to use JPEG 2000, JPEG XR, and WebP.**

## What about Firefox?

If you overlay all of the browser support links, you'll notice that Firefox is the only browser to not support any of these formats. Mozilla has tried to implement not [once](https://bugzilla.mozilla.org/show_bug.cgi?id=1294490), not [twice](https://bugzilla.mozilla.org/show_bug.cgi?id=600919), but [thrice](https://bugzilla.mozilla.org/show_bug.cgi?id=856375)! Technically, they claim it is being worked on and has been assigned and updated within the last 2 weeks of this writing, but I'm not holding out any hope in the near future. In the meantime, keep the original image you used to create the previous three formats, and use that as the fallback for any browsers or devices that aren't supported.

With all of these image formats to choose from, you can experience the web of tomorrow, today!

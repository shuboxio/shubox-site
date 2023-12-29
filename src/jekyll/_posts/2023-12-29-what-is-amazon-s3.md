---
layout: post
title:  "What is Amazon S3?"
image: "/assets/blog/bucket.svg"
summary: "'Amazon S3', or 'Amazon Simple Storage Service', what is it exactly? Why do we use it? Why do you need it? What are its use-cases? Let's go over some of the basics."
---

<figure class="photo-with-caption">
  <picture>
    <!--[if IE 9]><video style="display: none;"><![endif]-->
    <source srcset="/assets/blog/posts/bucket-guy.webp" type="image/webp" />
    <!--[if IE 9]></video><![endif]-->
    <img src="/assets/blog/posts/bucket-guy.jpg"
      decoding="async"
      alt="Man marveling at the amount of data he has stored in, and is now overflowing from, his bucket."
      width="544"
      height="311"
      />
  </picture>

  <figcaption>
    With so much data, where do you put it? In S3! What's an "S3"? Let's talk about it...
  </figcaption>
</figure>

Imagine you have a large collection of data, files, "stuff", you'd like to
store safely - photos, videos, important documents, backups, you name it. Now,
you could keep all of that under servers of your own control (EG: your own
computer, external hard drive, or server), but what if you run out of space,
your hardware fails, or something catastrophic happens? These circumstances are
where a service like Amazon S3 comes into play.

*Amazon S3* stands for "Amazon Simple Storage Service". Think of it as a
massive, super-secure warehouse in the cloud where you can store as much data
as you need. It's akin to renting a storage unit, but instead of physical
*stuff*, you're storing digital files. You can access your files from anywhere
in the world, anytime, as long as you have an internet connection. I have seen
it referred to as "the internet's hard drive", which, at this point, is a
reasonable and accurate distillation. For a comprehensive deep dive into the
history and technical scale of S3 go [read this post at allthingsdistributed.com]
from [Andy Warfield], VP and distinguished engineer at Amazon.

[read this post at allthingsdistributed.com]: https://www.allthingsdistributed.com/2023/07/building-and-operating-a-pretty-big-storage-system.html
[Andy Warfield]: https://www.linkedin.com/in/andywarfield/

Amazon S3 is the brand name for what is more generically called cloud "object
storage". You might consider it akin to what "Kleenex" is to "facial tissues",
or what "Xerox" is to "photocopiers", or "Google" to "web searching". As a
result, there **are** other object storage vendors out there: [Cloudflare],
[Google], [IBM], [Wasabi], and [DigitalOcean] to name a few. There are also
open source solutions like [MinIO] or [Garage].

It should be noted, however, that Amazon's S3 is the originator of this space.
They created the technology, the concept, the utility, and should be afforded
the respect and admiration for their innovation.

[Cloudflare]: https://developers.cloudflare.com/r2/
[Google]: https://cloud.google.com/storage/
[IBM]: https://www.ibm.com/products/cloud-object-storage
[Wasabi]: https://wasabi.com/
[DigitalOcean]: https://www.digitalocean.com/products/spaces
[MinIO]: https://github.com/minio/minio
[Garage]: https://garagehq.deuxfleurs.fr/

## *So, what is a "bucket"?*

Considering [Shubox] is in the business of providing you buckets on-demand -
you should know! A bucket is a container for objects stored in S3. If S3 is a
giant warehouse, then a bucket is your personal, ever-expanding, storage
locker. A bucket serves as a means of keeping companies' and individuals' data
sequestered away from everyone else's.

[Shubox]: https://shubox.io/

## *Why is it useful?*

* **Scalability:** You can store an almost unlimited amount of data. That
  "storage unit" analogy? Imagine it could expand, on demand, as soon as you
  need more space.
* **Security:** Amazon S3 will keep your data safe. They've got loads of
  security measures in place, so you don't have to worry about your data
  getting into the wrong hands.
* **Accessibility and Sharing:** You can access your data from anywhere and
  easily share it with others. Permissions are flexible and robust enough where
  you could go from "world readable" to "restricted to specific Amazon roles
  and users".
* **Affordability:** The cost is inexpensive to start (think _pennies_) until
  you reach a considerable scale of storage and data transfer.

## *What are some example use-cases?*

* **Backup and Storage:** This is the no-brainer. Whether you're a big company or
  someone with a lot of digital photos, S3 is great for keeping that data
  safe, and off-site.
* **Website Hosting:** Have a website with many images and/or videos? Storing and
  serving them via S3 is more efficient and reliable than keeping them on
  your own servers.
* **Big Data Analytics:** Companies can store massive amounts of data on S3 and
  then use other Amazon services to analyze this data to gain insights.
* **Disaster Recovery:** In case something goes wrong with your primary data
  storage, having a backup on S3 can be a lifesaver. It is, effectively, an
  insurance policy for your data.

In a nutshell, Amazon S3 is a versatile, super-sized digital storage unit in
the cloud. It's an essential tool for anyone dealing with significant amounts
of data, whether for personal use or business. And with its pay-as-you-go
pricing, it is also wallet-friendly. If you're still wondering whether you
should use it, [this post at Onixnet] sums it up rather succinctly:

> If you’re still not sure whether Amazon S3 is right for your organization,
> consider this: Amazon S3 is designed for 99.999999999% (11 9s) of data
> durability. With that level of durability, you can expect that if you store
> 10,000,000 objects in Amazon S3, you should only expect to lose a single
> object every 10,000 years!

[this post at Onixnet]: https://www.onixnet.com/blog/what-is-amazon-s3/
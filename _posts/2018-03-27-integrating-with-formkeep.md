---
layout: post
title:  "Integrating with FormKeep"
image: "/assets/blog/doc-markdown.svg"
summary: "FormKeep and Shubox - spiritual cousins coming together like peanut-butter and jelly."
---

When I first started working on Shubox I considered it a distant cousin of
[FormKeep](https://formkeep.com), the "form endpoint" SaaS from [Furious
Collective](https://www.furiouscollective.com/), (formerly of
[thoughtbot](https://thoughtbot.com)). It did one job, did it very well, and
went _deep_ on the benefits it brought to those that used it. I have always
hoped that Shubox would deliver in a similar fashion.

In addition to sharing some philisophical DNA, there are some commonalities in
the type of work they do -- delegating work from a customer's website to an
external service. FormKeep offloads the work done to receive, persist, and
deliver form submissions. Shubox handles file and image uploads to the cloud
(S3 specifically, of course), manipulation of those images, and delivery of
that information to your applications.

Where and how can _both_ help simultaneously? Let's explore that.

Say you are a small business or startup. You're growing *fast* and recruitment
and hiring are a high priority. You probably want a form on your site with a
couple of fields, maybe with name, email, cover letter, and some way for your
candidates to upload a Word, PDF, LaTex doc, or plain text (yeah!).
You have a statically generated site, or managed hosting of some sort, or your
developers are *completely* allocated on the core business and not able to work
on that side of the business.

Other than running a power play around your dev managers and wresting a
developer or two away from "business" for a day or two, what could you do?

Using FormKeep and Shubox and a little know-how you can get this done in ~20
minutes.

How?

## Let's start with the form

```html
<form action="https://formkeep.com/f/xxxx">
  <input type="text" name="position" placeholder="Position Applying For">
  <input type="text" name="name" placeholder="Your Name">
  <input type="email" name="email" placeholder="Your Email">
  <textarea name="cover_lever" placeholder="Cover letter contents..."></textarea>

  <button type="submit">Apply for Position</button>
</form>
```

If you've signed up for FormKeep and are pointing to the endpoint they assign
you. You're done with that part. Configure things on their dashboard -- what
email to send new submissions to, integrate with Zapier, etc -- and that's
pretty much it.

## How about the resume?

```html
<form action="https://formkeep.com/f/xxxx">
  <input type="text"  name="position" placeholder="Position Applying For">
  <input type="text"  name="name" placeholder="Your Name">
  <input type="email" name="email" placeholder="Your Email">
  <textarea name="cover_lever" placeholder="Cover letter contents..."></textarea>

  <input id="resume"  type="text"  name="resume" placeholder="Click to upload resume">

  <button type="submit">Apply for Position</button>
</form>

<script src="https://js.shubox.io/v1/id-for-your-local-dev-server.js"></script>

<script>
  new Shubox("#resume", { textBehavior: "replace" })
</script>
```

If you've signed up for Shubox you'll be able to [try this out immediately on
localhost](/docs/#local-dev-with-sandboxes). Above, you will see that you would
add the script tag for your development server. (Pro-tip: [you'll find that in
your dashboard](https://dashboard.shubox.io/domains/sandbox)). Then, using the Shubox
javascript lib you can configure `input#resume` to start the "attach and upload
file" process once the input field is clicked. When you select your file it
will upload to S3 and populate the contents of that form field with the URL to
the file.

**And that's it!**

After someone fills out the form, uploads a resume, and submits it, it will send
all that information to FormKeep, including the URL to the uploaded resume and,
depending on how your FormKeep account is configured, will email you that same
information.

_Note: Once you deploy your website to your production domain you *will* need
to configure a "domain" in the Shubox dashboard for whatever hostname you use.
For example, if your final website lives at `acme-co.com` you'll need to set that
up in the Shubox dashboard_

---
title: Getting Started
order: 1
---

Getting up and running with Shubox was designed to be quick and easy so you can
get up back to working on your project. There are two parts to setting up
Shubox — connecting your Amazon S3 account to Shubox, then integrating Shubox
into your website. Let’s go!

<h2 id="setup-amazon">Amazon S3 Setup</h2>

In order for Shubox to work it’s magic, it needs access to your Amazon S3
account with a few non-destructive permissions.

### Step 1: Create an "Identity and Access Management" (IAM) User

Amazon's user management service "Identity and Access Management" (IAM), is how
master AWS accounts manage users, groups, and the permissions to work with the
different services. We would recommend that each site (and with further
granularity - each domain) that works with Shubox to be an IAM user. Let’s make
one:

#### Head over to the “Users” section of your [AWS console](https://console.aws.amazon.com/iam/home#/users) and hit the “Add user” button:

<figure class="shadow">
  <img src="/assets/1-user-dashboard.png" alt="user dashboard"/>
</figure>

#### We suggest creating a “shubox” user with programatic access:

<figure class="shadow">
  <img src="/assets/2-add-user.png" alt="add user"/>
</figure>

#### Attach the `AmazonS3FullAccess` policy, then review and create the user:

<figure class="shadow">
  <img src="/assets/3-permissions.png" alt="set permissions"/>
</figure>

Not comfortable with granting Shubox full permissions? That’s okay, we only
need following permissions to do our work:
[`s3:ListBucket`](http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGET.html),
[`s3:CreateBucket`](http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUT.html),
[`s3:PutBucketCORS`](http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTcors.html),
[`s3:PutObject`](http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTcors.html)

#### Review and create the user:

<figure class="shadow">
  <img src="/assets/4-review.png" alt="review and create user"/>
</figure>

#### Grab your access key id and secret access key:

<figure class="shadow">
  <img src="/assets/5-success.png" alt="great success"/>
</figure>

<h2 id="setup-shubox">Connect your domain to Shubox</h2>

Step 2: Now that your Amazon IAM user is set up, you can head over to your Shubox
dashboard and [add a new domain](https://dashboard.shubox.io/domains/new). A
unique bit of JavaScript will be created for your domain. You’re going to need
that next.

<h2 id="setup-website">Website Integration</h2>

It’s time to fire up your code editor! We’re going to connect your website to
Shubox. Place the javascript snippet that shubox provided just before
`<body>` in your HTML template:

```html
    ...
    <script src="/x/abc12300.js"></script>
  </body>
</html>
```

## Initialization

Now all we have to do is bind Shubox to a form element:

```html
<script type="text/javascript" charset="utf-8">
  // with no options
  new Shubox("#dragndrop");

  // with custom options - note: `optionKey` is just an example
  new Shubox("#dragndrop", { optionKey: 'option value' });
</script>
```

## Customization

From here you can use our [JavaScript API](#JavaScriptAPI) to create the file
uploader of your dreams. If you’d rather get started fast, check out our
[example/demo uploaders](/demos) here or on
[codepen](http://codepen.io/shubox). Feel free to incorporate those into your
project, customize them, or use them to learn the ropes.

## Local Development

Shubox only needs the domain for your website. The only requirements are that
the domain is running on a web server (i.e. `https://mydomain.com`,
`http://mydomain.dev`, or `http://localhost:[port]`). They may be a combination
of an http(s) protocol, hostname, domain name, and port.

Domains must be unique in our system, which makes local development domains,
like `http://localhost:3000`, problematic -- once a localhost domain and port
are taken in our system, they are no longer available.We suggest proxying your
local development domain with [Pow.cx](http://pow.cx), [Puma Dev](https://github.com/puma/puma-dev), [Laravel Valet](https://laravel.com/docs/5.3/valet) or something similar.

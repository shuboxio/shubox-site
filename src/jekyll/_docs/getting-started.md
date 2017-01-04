---
title: Getting Started
order: 1
---

<p>Getting up and running with Shubox was designed to be quick and easy so you can get up back to working on your project. There are two parts to setting up Shubox — connecting your Amazon S3 account to Shubox, then integrating Shubox into your website. Let’s go!</p>

<h3 id="setup-amazon">Amazon S3 Setup</h3>

<p>In order for Shubox to work it’s magic, it needs access to your Amazon S3 account with a few non-destructive permissions.</p>

<p>Step 1: Create an "Identity and Access Management" (IAM) User</p>

<p>Amazon's user management service "Identity and Access Management" (IAM), is how master AWS accounts manage users, groups, and the permissions to work with the different services. You would consider each site that works with Shubox to be an IAM user. Let’s make one:</p>

<ul>
  <li>Head over to the “Users” section of your <a href="https://console.aws.amazon.com/iam/home#/users">AWS console</a> and hit the “Add user” button:
  </li>
</ul>
<img src='/assets/1-user-dashboard.png'>

<ul>
  <li>We suggest creating a “shubox” user with programatic access:</li>
</ul>
<img src='/assets/2-add-user.png'>

<ul>
  <li>Attach the <code class='code-inline'>AmazonS3FullAccess</code> policy, then review and create the user:</li>
</ul>
<img src='/assets/3-permissions.png'>

<quote>Not comfortable with granting Shubox full permissions? That’s okay, we only need following permissions to do our work: <a href="http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGET.html"><code class='code-inline'>s3:ListBucket</code></a>,
  <a href="http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUT.html"><code class='code-inline'>s3:CreateBucket</code></a>, <a href="http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTcors.html"><code class='code-inline'>s3:PutBucketCORS</code></a>,
  <a href="http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTcors.html"><code class='code-inline'>s3:PutObject</code></a>
</quote>

<ul>
  <li>Then grab your access key id and secret access key:</li>
</ul>
<img src='/assets/4-success.png'>

<h3 id="setup-shubox">Connect your domain to Shubox</h3>
<p>Now that your Amazon IAM user is set up, you can head over to your Shubox console and <a href="https://shubox.io/dashboard/domains/new">add a new domain</a>. A unique bit of JavaScript will be created for your domain. You’re going to need that next.</p>

<h3 id="setup-website">Website Integration</h3>
<p>It’s time to fire up your code editor! We’re going to connect your website to Shubox. Front-end Integration Remember that JavaScript? Place it near the end of <code class='code-inline'>body</code> of your HTML template:</p>
```html
    ...
    <script src="/x/abc12300.js"></script>
  </body>
</html>
```

<h3>Initialization</h3>
<p>Now all we have to do is bind Shubox to a form element:</p>
```html
<script type="text/javascript" charset="utf-8">
  // with no options
  new Shubox("#dragndrop");

  // with custom options
  new Shubox("#dragndrop", { optionKey: 'option value' });
</script>
```

<h3>Customization</h3>
<p>From here you can use our <a href="#JavaScriptAPI">JavaScript API</a> to create the file uploader of your dreams. If you’d rather get started fast, check out our <a href="/examples">example uploaders</a>. Feel free to incorporate those into your project, customize them, or use them to learn the ropes.</p>

<h3>Local Development</h3>
<p>Shubox only needs the domain for your website. The only requirements are that the domain is running on a web server (i.e. <a href='https://mydomain.com'>https://mydomain.com</a>, or <a href='http://mydomain.dev'>http://mydomain.dev</a>). They may be a combination of an http(s) protocol, hostname, domain name, and port. </p>

<quote>Domains must be unique in our system, which makes local development domains, like <a href='http://localhost:3000'>http://localhost:3000</a>, problematic. We suggest proxying your development domain with a something like <a href="http://pow.cx">Pow</a>, <a href="https://github.com/puma/puma-dev">Puma Dev</a>, or <a href="https://laravel.com/docs/5.3/valet">Laravel Valet</a>.</quote>

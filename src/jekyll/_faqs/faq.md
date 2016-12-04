---
title: Amazon Web Services, S3, and Their Requirements
---

### <span id="a1"></span> What is an IAM user and why do I need it?

Amazon's user management service "Identity and Access Management", or "IAM" for short, is how master AWS
accounts manage users, groups, and the permissions they have to work with the different AWS
services. An IAM user in the context of Shubox would be the user, or users, you would allow to work
with the shubox service. For example, creating a "shubox" user, applying the necessary
permissions, and using the user's AWS secret and key for the domains you are setting up to utilize
Shubox would be a common practice.

### <span id="a2"></span> Why does Shubox need credentials/permissions for S3?

In order for Shubox to be able to send your images directly to S3 there are several permissions that
need to be assigned to your IAM user.

### <span id="a3"></span> What permissions does Shubox need?

Here are the high level requirements and their corresponding AWS/S3 actions.

1. Find a bucket. `s3:ListBucket` <sup>[[1]]</sup>
2. Create a new bucket if one does not exist. `s3:CreateBucket` <sup>[[2]]</sup>
3. Set the CORS configuration for your bucket. `s3:PutBucketCORS` <sup>[[3]]</sup>
4. Allow objects to be created (ie: files uploaded) in your bucket. `s3:PutObject` <sup>[[4]]</sup>

There are several jobs that may need doing so we'll break them down.

[1]: http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGET.html
[2]: http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUT.html
[3]: http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTcors.html
[4]: http://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html

### <span id="a4"></span> What's the easiest way to allow these permissions?

Attaching the `AmazonS3FullAccess` policy to the IAM account. [Here's a gif showing how]!

[Here's a gif showing how]: https://www-shubox-io.s3.amazonaws.com/production-sample-upload/e6881651/shubox-easy-policy.gif

### <span id="a5"></span> What's the *expert mode* way to assign more granular permissions?

If you would prefer to have more granular control over the permissions assigned to an IAM user you
may do so with an inline policy. The following policy would allow you the permissions you need to
list objects in a bucket, create a bucket, update the CORS policy, and upload objects to S3 via the
PUT http method (the upload method Shubox uses). More information can be [found in Amazon's
documentation].

One small note - the "[Sid]" value must be alphanumeric only. In the example below we're using
placeholder text. You may use the "Validate Policy" button in the inline editor to check that your
policy is sufficient.

```json
{
  "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "Stmt#############",
        "Action": [
          "s3:CreateBucket",
          "s3:ListBucket",
          "s3:PutObject",
          "s3:PutObjectAcl",
          "s3:GetObject",
          "s3:GetObjectAcl",
          "s3:PutBucketCORS"
        ],
        "Effect": "Allow",
        "Resource": "arn:aws:s3:::*"
      }
    ]
}
```

[Sid]: http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_grammar.html
[found in Amazon's documentation]: http://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html

### <span id="a6"></span> Ok, but what if I want *even more* control?

You can get further control by *first* creating the bucket yourself before adding the associated
domain to your account. Unchecking "create the bucket for me" in the [new domain form] will ensure
that shubox does not try to create the domain. Take note of your bucket name (for purposes of this
we'll just call it `shubox-bucket-name`) and apply the following policy with the bucket name used as
the last part of the `Resource` string - `arn:aws:s3:::shubox-bucket-name/*`.

```json
{
  "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "Stmt#############",
        "Action": [
          "s3:PutObject",
          "s3:PutObjectAcl",
          "s3:GetObject",
          "s3:GetObjectAcl",
          "s3:PutBucketCORS"
        ],
        "Effect": "Allow",
        "Resource": "arn:aws:s3:::shubox-bucket-name/*"
      }
    ]
}
```

## Adding Shubox.io to Your Website

### <span id="b1"></span> What information does Shubox need about my website?

Shubox needs the domain for your website - and that's it. The only requirements are that the domain is
running on a web server -- `http://localhost:3000`, `https://mydomain.com`, `http://mydomain.dev`.
They may be a combination of an http(s) protocol, hostname, domain name, and port. And the domain
must be unique in our system - no two accounts may own the same domain name.

### <span id="b2"></span> What if I use localhost:3000 as my development server?

I'm sorry. If someone else has claimed the localhost:3000 hostname and port I would suggest either
changing the port, or using something like [pow.cx] or [puma-dev] to create a uniq development
environment domain.

[pow.cx]: http://pow.cx
[puma-dev]: https://github.com/puma/puma-dev

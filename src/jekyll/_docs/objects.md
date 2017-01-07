---
title: File Object
order: 3
---

<a id="type-file"></a>

Upon successful upload of an image the Shubox library will pass a file object
to all JavaScript callbacks. The format of this file object follows:

```javascript
{
  accepted: true,
  custom_status: "ready",
  name: "my-upload.jpg",                          // filename w/ext
  width: 281,                                     // in pixels
  height: 500,                                    // in pixels
  size: 15596,                                    // in bytes
  lastModified: 1446064073000,
  lastModifiedDate: Sun Jan 1 2016 00:00:01 ...,  // Date Object
  postData: {
    AWSAccessKeyId: "...",                        // AWS Key
    Content-Type: "",
    acl: "public-read",
    key: "path/to/file/in/bucket/filename.jpg",
    policy: "...",                                // policy string
    signature: "...",                             // signature string
    success_action_status: "201"                  // HTTP response code
  },
  processing: true,
  s3: "path/to/file/in/bucket/filename.jpg",
  s3Url: "https://bucket.s3.amazonaws.com/path/to/file...",
  status: "success",
  type: "image/jpeg",
  upload: {
    bytesSent: 999,
    total: 999,
    progress: 100
  }
}
```

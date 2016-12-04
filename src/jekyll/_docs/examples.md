---
title: Examples
order: 5
---

### The simplest example

```html
<div id="dragndrop">Drag and Drop in Here</div>

<script>
  new Shubox("#dragndrop");
</script>
```

The code snippit above will allow that div to be drag 'n drop'able, or clicked
directly to display the files dialog.

### Uploading into `<input>` tags

```html
<input name="my_file" id="my_file" value="">

<script>
  new Shubox("#my_file", { textBehavior: "append" });
</script>
```

This code will attach to a form input tag, allowing to drag and drop, and to
click into it to select files. When files are successfully uploaded the URL to
the file will be appended to the contents of the element, separated by a space.

Default `textBehavior` is to replace the contents with the new url(s).

For example:

```html
<script>
  // The default textBehavior is "replace" so
  // these examples are equivalent
  new Shubox("#my_file");
  new Shubox("#my_file", { textBehavior: "replace" });
</script>
```

### Uploading into `<textarea>` tags

```html
<textarea name="my_comment" id="my_comment"></textarea>

<script>
  new Shubox("#my_comment", {
    textBehavior: "append",
    clickable: false
  });
</script>
```

This code will attach to a textarea, allowing to drag and drop, but will
<strong>not</strong> allow the elements' being clicked to trigger a file
dialog to be displayed.

Default `clickable` value is `true`.

### Uploading into `<textarea>` with adjacent clickable element

Sort of like GitHub's comment fields.

```html
<textarea name="my_comment" id="my_comment"></textarea>

<p id="drag-and-drop">
  Attach files by dragging &amp; dropping.
</p>

<script>
  new Shubox("#my_comment", {
    textBehavior: "append",
    clickable: "#drag-and-drop"
  });
</script>
```

This code will attach to a textarea, allowing to drag and drop, but will
<strong>not</strong> trigger a file select dialog to pop up when the textarea
is clicked/focused on.

Default `clickable` value is `true`.

### Uploading into `<textarea>` and appending custom s3 URL text

```html
<textarea name="my_comment" id="my_comment"></textarea>

<p id="drag-and-drop">
  Attach files by dragging &amp; dropping.
</p>

<script>
  new Shubox("#my_comment", {
    textBehavior: "append",
    clickable: "#drag-and-drop",
    s3urlTemplate: '<img src="{{s3url}}">'
  });
</script>
```

The `s3urlTemplate` option provides the ability to have a custom string, with the S3 URL, added to
the textarea, or text input, upon successful upload. This allows you to append an image tag, with
the src set to the uploaded file URL, or a markdown image tag, etc.

The default is `"{{s3url}}"`.

### Adding extra information for post-upload webhook

If you need to save extra information for your uploads -- example: you need to associate a user's id
with an uploaded image -- you may add any arbitrary hash to the payload sent to your post-upload
webhook. The hash you assign to the `extraParams` option upon Shubox instantiation will be sent
after each file is uploaded.

```html
<div id="dragndrop">Drag and Drop in Here</div>
<script>
  new Shubox("#dragndrop", {
    extraParams: {
      user_id: 1,
      user_name: "Lawrence Cohen",
      nickname: "Chunk"
    }
  });
</script>
```

### Using a post-upload callback on a successful upload

If you want something to happen after a successful upload, provide a function
through the `success` option.

```html
<div id="dragndrop">Drag and Drop in Here</div>
<script>
  new Shubox("#dragndrop", {
    success: function(file){
      alert("🎉Hooray!");
    }
  });
</script>
```

### Using a post-upload callback on a failed upload

What if something fails*? Ugh. Bummer. You can hook into a callback here too.

```html
<div id="dragndrop">Drag and Drop in Here</div>
<script>
  new Shubox("#dragndrop", {
    error: function(file, message){
      alert("😩ugh");
    }
  });
</script>
```

\* Possible errors: file is too big, or too many files are uploaded at once.

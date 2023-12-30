window.onload = function () {
  // ==========================
  // Upload Shubox dropzone'age
  // ==========================
  new Shubox("#upload", {
    key: "03457406",
    maxFiles: 1,
    transformName: 'blog-large-image',
    previewsContainer: false,
    success: function (shuboxFile) {
      var upload = document.getElementById("upload");
      upload.innerHTML = '![]('+ shuboxFile.s3url +')';
    },
    transformCallbacks: {
      "544.webp": function(shuboxFile) {
        var upload = document.getElementById("upload");
        upload.innerHTML = '![]('+ shuboxFile.transforms["544.webp"].s3url +')';
      }
    }
  })
}


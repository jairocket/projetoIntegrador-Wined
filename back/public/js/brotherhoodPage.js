let postContent;
const postContentInput = document.getElementById("pictures");
const previewPost = document.getElementById("preview-posts");

function contentPreview(input, content) {
  const midia = new FileReader();
  midia.readAsDataURL(input.files[0]);

  midia.onload = (e) => (content.src = e.target.result);
}

postContentInput.onchange = function () {
  const midiaType = postContentInput.files[0].type;
  if (midiaType.split("/")[0] == "image") {
    postContent = document.getElementById("image-src");
  } else {
    postContent = document.getElementById("video-src");
  }
  contentPreview(postContentInput, postContent);
  previewPost.style.display = "block";
  postContent.style.display = "inline";
  console.log(postContent);
};

window.onload = () => {
    const brotherhoodPicture = document.getElementById('brotherhood-picture-src');
    const brotherhoodPictureInput = document.getElementById('brotherhood_picture');

    function picturePreview(input, image) {
        const picture = new FileReader();
        picture.readAsDataURL(input.files[0]);

        picture.onload = e => image.src = e.target.result;
    };

    brotherhoodPictureInput.onchange = function(){
        picturePreview(brotherhoodPictureInput, brotherhoodPicture);
    };
}
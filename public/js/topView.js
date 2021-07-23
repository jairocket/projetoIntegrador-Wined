const profilePictureInput = document.getElementById('profile-picture');
    const backgroundPictureInput = document.getElementById('background-picture');
    const profileBtn = document.getElementById('profile-btn');
    const backgroundBtn = document.getElementById('background-btn');
    const profilePicture = document.getElementById('profile-picture-src');
    const backgroundPicture = document.getElementById('background-picture-src');
    const form = document.getElementById('profile-picture-form');

    showBtn = btn => btn.style.visibility = 'visible';

    function picturePreview(input, image) {
        const picture = new FileReader();
        picture.readAsDataURL(input.files[0]);

        picture.onload = e => image.src = e.target.result;
    }

    profilePictureInput.onchange = function(){
        picturePreview(profilePictureInput, profilePicture);
        showBtn(profileBtn);
    };
    backgroundPictureInput.onchange = function(){
        console.log('change')
        picturePreview(backgroundPictureInput, backgroundPicture);
        showBtn(backgroundBtn);
    };

    profileBtn.onclick = function() { form.submit(); }
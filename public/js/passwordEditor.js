const togglePasswordOld = document.querySelector('#togglePasswordOld');
const oldPassword = document.querySelector('#old_password');
    
togglePasswordOld.addEventListener('click', function (e) {
    const type = oldPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    oldPassword.setAttribute('type', type);
    this.classList.toggle('bi-eye');
});

const togglePasswordNew = document.querySelector('#togglePasswordNew');
const newPassword = document.querySelector('#new_password');
    
togglePasswordNew.addEventListener('click', function (e) {
    const type = newPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    newPassword.setAttribute('type', type);
    this.classList.toggle('bi-eye');
});
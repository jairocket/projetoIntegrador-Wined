console.log('funfando');

function addNewInput(){
    var newInput = document.createElement('div');
    newInput.innerHTML = "<label for='members'><input type= 'email' name='members' id='members' placeholder='Informe o e-mail do seu ou sua confrade'></div></label>"
    document.getElementById('newInput').appendChild(newInput); 
  }
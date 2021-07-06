
window.onload = ()=>{ 
    let text = document.querySelector('[role=textbox]');
    let btn = document.getElementsByClassName('btn');
    console.log(btn)
    console.log(text)
    btn.onclick = function(){
        let text = document.querySelector('[role=textbox]').innerText; 
        alert(text)
    }
}



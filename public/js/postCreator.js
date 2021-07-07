
window.onload = ()=>{ 

    const btn = document.getElementById('btn');
    const brotherhood_id = window.location.pathname.split('/')[2]
    
    console.log(window.location.pathname.split('/')[2])
    

    btn.onclick = async function(event){
        let text = document.querySelector('[role=textbox]').innerText; 

        const { data } = await axios.post(
            `http://localhost:3000/confraria/post-content/`, {
            content: text,
            brotherhood_id
        
        });
        window.location.href = `/confraria/${brotherhood_id}`;
    }
    
}



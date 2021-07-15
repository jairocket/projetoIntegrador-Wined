window.onload = ()=>{ 

    const btn = document.getElementById('btn');
    const brotherhood_id = window.location.pathname.split('/')[2];
    const cbtn = document.getElementsByClassName('c-btn');
    const hbtn = document.getElementsByClassName('h-btn');
    
    console.log(window.location.pathname.split('/')[2])  

    btn.onclick = async function(event){
        let text = document.querySelector('[role=textbox]').innerText; 

        const { data } = await axios.post(
            `http://localhost:3000/confraria/post-content/`, {
            content: text,
            brotherhood_id,
            comment: false
        });
        window.location.href = `/confraria/${brotherhood_id}`;
    }

    for (let i=0; i< cbtn.length; i++){
        cbtn[i].onclick = async function(event){
            let text = document.getElementsByClassName('write-commentPrompt')[i].innerText;
            let ref_post_id = document.getElementsByClassName('hidden')[i].innerText;
            console.log(text);
            console.log(ref_post_id);
            const {data} = await axios.post(
                `http://localhost:3000/confraria/post-comment/`, {
                    content: text,
                    brotherhood_id,
                    comment: true,
                    ref_post_id
    
                }
            )
            window.location.href = `/confraria/${brotherhood_id}`;
        }

    }

    for (let i=0; i< cbtn.length; i++){
        hbtn[i].onclick = async function(event){
            let commentList= document.getElementsByClassName('comments');
            commentList[i].classList.toggle('show')
        }


    }
        
    

    
}



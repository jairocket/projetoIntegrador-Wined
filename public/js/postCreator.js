window.onload = ()=>{ 

    const brotherhood_id = window.location.pathname.split('/')[2];

    const btn = document.getElementById('btn');
    const pbtn = document.getElementById('p-btn');
    const cancel = document.getElementById('cancel');

    const cbtn = document.getElementsByClassName('c-btn');
    const hbtn = document.getElementsByClassName('h-btn');
    const ebtn = document.getElementsByClassName('e-btn');
    const dbtn = document.getElementsByClassName('d-btn');
    const rbtn = document.getElementsByClassName('r-btn');
    const dcbtn = document.getElementsByClassName('dc-btn');
    const rcbtn = document.getElementsByClassName('rc-btn');
    
    const editBtn = document.getElementsByClassName('edit-btn'); 
    const postsFilter = document.getElementById('posts-filter');

    postsFilter.onclick = function(event){
        
        console.log(event.target.dataset.type);
        //fazer if para comentar editar e deletar comentários
        if(event.target.dataset.type == 'react-comment'){

        }else if(event.target.dataset.type == 'edit-comment'){

        }else if(event.target.dataset.type == 'delete-comment'){

        }
    }

    pbtn.onclick = async function(event){
        let postPicForm = document.getElementsByClassName('postPicForm');
        let createPostSection = document.getElementsByClassName('create-post-section');
        createPostSection[0].classList.toggle('hide-create-post-section');
        postPicForm[0].classList.toggle('show-postPicForm')
    }

    cancel.onclick = async (event)=>{
        let createPostSection = document.getElementsByClassName('create-post-section');
        let postPicForm = document.getElementsByClassName('postPicForm');
        createPostSection[0].classList.toggle('hide-create-post-section');
        postPicForm[0].classList.toggle('show-postPicForm')
    }

    btn.onclick = async function(event){
        let text = document.querySelector('[role=textbox]').innerText; 
        if(text.trim().length > 0){
            const { data } = await axios.post(
                `http://localhost:3000/confraria/post-content/`, {
                content: text,
                brotherhood_id,
                comment: false
            });
        }
        window.location.href = `/confraria/${brotherhood_id}`;
    }

    for (let i=0; i< cbtn.length; i++){
        cbtn[i].onclick = async function(event){
            
            let text = document.getElementsByClassName('write-commentPrompt')[i].innerText;
            let ref_post_id = document.getElementsByClassName('hidden')[i].innerText;
            
            if(text.trim().length > 0){
                const {data} = await axios.post(
                    `http://localhost:3000/confraria/post-comment/`, {
                        content: text,
                        brotherhood_id,
                        comment: true,
                        ref_post_id
                    }
                );
            }
            window.location.href = `/confraria/${brotherhood_id}`;
        }
    }

    for (let i=0; i< dbtn.length; i++){
        dbtn[i].onclick = async function(event){
            let ref_post_id = document.getElementsByClassName('hidden')[i].innerText;
            const {data} = await axios.delete(
                `http://localhost:3000/confraria/post-delete/`, { 
                    data:{
                        id: ref_post_id
                    }                  
                }
            )
            window.location.reload();
        }
    }

    for(let i=0; i< rbtn.length; i++){
        rbtn[i].onclick = async function(event){
            let post_id = document.getElementsByClassName('hidden')[i].innerText;          
            const {data} = await axios.post(
                `http://localhost:3000/confraria/react/`,{
                    post_id,
                    brotherhood_id
                }
            );
            window.location.reload();
        }
    }

    for(let i=0; i< rcbtn.length; i++){
        rcbtn[i].onclick = async function(event){
            let post_id = document.getElementsByClassName('hidden2')[i].innerText;
            console.log(post_id)
            const {data} = await axios.post(
                `http://localhost:3000/confraria/react/`,{
                    post_id,
                    brotherhood_id
                }
            )
            window.location.reload();
        }
    }


    for (let i=0; i < dcbtn.length; i++){
        dcbtn[i].onclick = async function(event){
            let post_id = document.getElementsByClassName('hidden2')[i].innerText;
            console.log(post_id)
            const {data} = await axios.delete(
                `http://localhost:3000/confraria/comment-delete/`, { 
                    data:{
                        id: post_id
                    }                  
                }
            );
            window.location.reload();
        }
    }

    for (let i=0; i< editBtn.length; i++){
        editBtn[i].onclick = async function(event){
            event.preventDefault()
            let text = document.getElementsByClassName('edit-commentPrompt')[i].innerText;
            let ref_post_id = document.getElementsByClassName('hidden')[i].innerText;
            console.log(text);
            console.log(ref_post_id);
            const {data} = await axios.put(
                `http://localhost:3000/confraria/edit-comment/${ref_post_id}`, {
                    content: text,
                    brotherhood_id,
                    comment: false,
                    ref_post_id
                }
            )   
            window.location.reload()  
        }
    }   

    for (let i=0; i< cbtn.length; i++){
        hbtn[i].onclick = async function(event){
            let commentList= document.getElementsByClassName('comments');
            commentList[i].classList.toggle('show-comments')
        }
    }

    for (let i=0; i< ebtn.length; i++){
        ebtn[i].onclick = async function(event){
            let commentList= document.getElementsByClassName('edit-comment');
            commentList[i].classList.toggle('show-edit-comment');
        }
    }
        
    

    
}



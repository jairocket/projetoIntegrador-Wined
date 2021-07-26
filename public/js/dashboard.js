console.log('funcionando');

window.onload = ()=>{
    const btn = document.getElementById('btnBusca');
        console.log(btn);
        btn.onClick = async function(event){
            console.log(event)
    // if(event.target.dataset.type == "get-wines"){
    //     let parameter = document.getElementById('txtBusca').innerText;
    //     console.log(event.target.dataset.type);
    //     const { data } = await axios.get(
    //         `http://localhost:3000/dashboard/wines`, {
    //             parameter
    //         }
    //     );
    //     console.log(data);
    // }
}

}


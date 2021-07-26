console.log('funcionando');

window.onload = ()=>{
    const btn = document.getElementById('btnBusca');
        console.log(btn);
        btn.onclick = async function(event){
            console.log(event)
            if(event.target.dataset.type == "get-wines"){
                let parameter = document.getElementById('txtBusca').value;
                console.log(event.target.dataset.type);
                console.log(parameter)
                const { data } = await axios.post(
                    `http://localhost:3000/dashboard/wines`, {
                        parameter
                    }
                );
            console.log(data);
        }
    }
}


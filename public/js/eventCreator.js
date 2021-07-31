console.log('funcionando')

window.onload = (event)=>{
    const cepInput = document.getElementById('cep');
    const cep = document.getElementById('cep').value;
    const api = axios.create({
        baseURL: 'https://viacep.com.br/ws',
        timout: 5000
    })
    

    cepInput.onblur = async (event)=>{
        const { data } = await api.get(`/${cep}/json`);
        console.log(data)
        document.getElementById('street').value = data.logradouro
        document.getElementById('complement').value = data.bairro
        document.getElementById('city').value = data.localidade
        document.getElementById('state').value = data.uf

    }

}
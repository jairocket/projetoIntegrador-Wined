console.log("funcionando");

window.onload = (event) => {
  const cepInput = document.getElementById("cep");

  const api = axios.create({
    baseURL: "https://viacep.com.br/ws",
    timout: 5000,
  });

  cepInput.onblur = async (event) => {
    const cep = document.getElementById("cep").value;
    const { data } = await api.get(`/${cep}/json`);

    document.getElementById("street").value = data.logradouro;
    document.getElementById("complement").value = data.bairro;
    document.getElementById("city").value = data.localidade;
    document.getElementById("state").value = data.uf;
  };
};

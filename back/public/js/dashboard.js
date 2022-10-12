console.log("funcionando");

window.onload = () => {
  const fvrt = document.getElementsByClassName("fvrt");
  const wish = document.getElementsByClassName("wish");
  console.log(wish.length);
  console.log(fvrt.length);

  for (let i = 0; i < fvrt.length; i++) {
    fvrt[i].onclick = async (event) => {
      let wine_id = document.getElementsByClassName("id")[i].innerText;
      console.log(wine_id);
      const { data } = await axios.post(
        `http://localhost:3333/dashboard/wines/favorite`,
        {
          wine_id,
        }
      );
    };
  }
  for (let i = 0; i < wish.length; i++) {
    wish[i].onclick = async (event) => {
      let wine_id = document.getElementsByClassName("id")[i].innerText;
      const { data } = await axios.post(
        `http://localhost:3333/dashboard/wines/wish`,
        {
          wine_id,
        }
      );
    };
  }
};

// const btn = document.getElementById('btnBusca');
//     console.log(btn);
//     btn.onclick = async function(event){
//         console.log(event)
//         if(event.target.dataset.type == "get-wines"){
//             let parameter = document.getElementById('txtBusca').value;
//             console.log(event.target.dataset.type);
//             console.log(parameter)
//             const { data } = await axios.post(
//                 `http://localhost:3333/dashboard/wines`, {
//                     parameter
//                 }
//             );
//         console.log(data);
// var div = document.createElement('div');
// data.array.forEach(wine => {
//     div.innerHTML = "<p><%= wine.wine %></p>"
//     document.getElementById('div').appendChild
// });

//     }
// }

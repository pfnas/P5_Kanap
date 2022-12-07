fetchApi();

// Récupéres les datas brutes de l'API
async function fetchApi() {
  await fetch("http://localhost:3000/api/products")
    .then((rawData) => rawData.json()) // converti les data pour être lus
    .then((okData) => {kanapIndex(okData);
      console.table(okData); // affiche les data dans la console sous forme de tableau
    })
    .catch((err) => {
      document.querySelector(".titles").innerHTML += "<h1>erreur 404</h1>";
      // console.log("erreur 404 via API: " + err);
    });
}

// insére les datas de l'API dans l'affichage HTML
kanapIndex = (data) => {
  let toItems = document.querySelector(".items"); // défini où inclure les data
  for (let article of data) {
    // chaque ligne est intérpréter
    toItems.innerHTML += `<a href="./product.html?id=${article._id}">
  <article>
    <img src="${article.imageUrl}" alt="${article.altTxt}">
    <h3 class="productName">${article.name}</h3>
    <p class="productDescription">${article.description}</p>
  </article>
</a>`;
  }
};

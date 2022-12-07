var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");

getArticle();

// Récupération des articles de l'API par leur id
function getArticle() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => res.json())

    // Répartition des données de l'API dans le DOM
    .then((resultatAPI) => {
      article = resultatAPI;
      
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.log("Erreur de la requête API");
    });
}
//---------------------------------------------------------------------------
// ---------------------------Affichage informations produit--------------------------
// ---------------------------------------------------------------------------
function getPost(article) {
  // Insertion de l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;
  // console.log(productImg);

  // Modification du titre "h1"
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // Modification du prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;
  // console.log(productPrice, "ceci devrait afficher un prix");

  // Modification de la description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  let productColorChoice = document.getElementById("colors");
  // console.log(article.colors);

  article.colors.forEach((element) => {
    //    console.log(element);

    let tagOption = document.createElement("option");
    document.createElement("option");
    tagOption.innerHTML = element;
    tagOption.value = element;
    

    // creation de tag option et le placer comme enfant de productColorchoice
    productColorChoice.appendChild(tagOption);
    
  });
  saveBasket(article);
}

// -----------------------------------------------------------------------------------------------------------
// ------------------------------------Gestion du local Storage-------------------------------------------------

//Gestion du panier
function saveBasket(article) {
  const addBasket = document.getElementById("addToCart");
  //Couleur et quantité(affichage/selection)
  addBasket.addEventListener("click", (e) => {
    e.preventDefault();
    const colorSelected = document.querySelector("#colors").value;
    const quantitySelected = document.querySelector("#quantity").value;

    // verifier que panier contient des articles et leur quantité
    if (
      quantitySelected <= 0 ||
      quantitySelected > 100 ||
      colorSelected === null
    ) {
      alert("Merci de choisir une couleur et une quantité entre 1 et 100");
      return;
    } else if (
      (quantitySelected != 0 && colorSelected == undefined) ||
      colorSelected == 0
    ) {
      alert("choisissez une couleur");
    } else {
      //Enregistrement dans le panier si couleur et quantité sont choisies
      let optionsProduit = {
        idProduit: idProduct,
        quantity: Number(quantitySelected),
        colorChoiceProduct: colorSelected,
        nomProduit: article.name,
        imgSrc: article.imageUrl,
        imgAlt: article.altTxt,
        // price: article.price,
      };
      
      alert("Votre produit est  ajouté au panier");

      

      // Récuperer les produits du Local Storage
      let basket = JSON.parse(localStorage.getItem("product"));
      // ajout produits au panier
      function addBasket() {
        basket.push(optionsProduit);
        // ajputer les produits au local storage getitem
        localStorage.setItem("product", JSON.stringify(basket));
      }
      // si panier contient un produitq
      if (basket) {
        // Verification si article meme couleur et meme id presents pour eviter doublon
        const ifPresent = basket.find(
          (element) =>
            element.idProduit == optionsProduit.idProduit &&
            element.colorChoiceProduct == optionsProduit.colorChoiceProduct
        );
        if (ifPresent) {
          ifPresent.quantity = ifPresent.quantity + optionsProduit.quantity;
          localStorage.setItem("product", JSON.stringify(basket));
          return;
        }
        addBasket();
        // Si panier vide rappeler function add basket
      } else {
        basket = [];
        addBasket();
      }
    }
  });
}

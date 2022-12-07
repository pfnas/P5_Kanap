let prixTotale = 0;
let totalQuantity = 0;

const productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productLocalStorage)
document.getElementById("totalQuantity").innerHTML=productLocalStorage.length;

const elementPosition = document.querySelector("#cart__items");

if (productLocalStorage === null || productLocalStorage == 0) {
  elementPosition.innerHTML = "Votre panier est vide";
  elementPosition.setAttribute("style", "color:red");
} else {
  for (let product of productLocalStorage) {
    //Requeter l'API pour recuperer le reste des info necessaire a la construction de notre panier
    const productUrl =
      "http://localhost:3000/api/products/" + product.idProduit;

    

    fetch(productUrl)
      // récupérer le résultat de la requête au format json
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })

      .then(function (item) {
        afficherProductPanier(item);
      })

      // En cas d'erreur h1 au contenu de erreur 404 et renvoit en console l'erreur.
      .catch((err) => {
        console.log("erreur 404, sur ressource api:" + err);
      });
    // ------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------
    // ce qui est été traiter en json sera appelé item(elements de l'api)

    function afficherProductPanier(item) {
      
      // Créer un élément <article> et ajoutez-le au document :
      let ArticlePanier = document.createElement("article");
      // ajouter la classe CSS cart__item à ArticlePanier.
      ArticlePanier.classList.add("cart__item");
      // ajouter la data-id
      ArticlePanier.dataset.id = product.idProduit;
      // ajouter la data-color
      ArticlePanier.dataset.color = product.colorChoiceProduct;
      // ajouter ArticlePanier en tant que enfant de l'élément avec l'id="cart__items":
      document.querySelector("#cart__items").appendChild(ArticlePanier);

      // Créer un élément <div> et ajoutez-le au document :
      let div = document.createElement("div");
      // ajouter la classe CSS cart__item__img à div :<div class="cart__item__img" >
      div.classList.add("cart__item__img");
      // ajouter div en tant que enfant de l'élément ArticlePanier:
      ArticlePanier.appendChild(div);

      // Créer un élément <img> et ajoutez-le au document : <img src="../images/product01.jpg" alt="Photographie d'un canapé">
      let imgArticle = document.createElement("img");
      // ajouter l'image du produit
      imgArticle.src = item.imageUrl;
      // ajouter imgArticle en tant que enfant de l'élément div:
      div.appendChild(imgArticle);

      // __________________________________________________________________

      // creation contenu de la div : <div class="cart__item__content">
      let cart__item__content = document.createElement("div");
      cart__item__content.className = "cart__item__content";
      ArticlePanier.appendChild(cart__item__content);

      // ____________________________________________________________________

          // creation carte :<div class="cart__item__content__description">
      let cart__item__content__description = document.createElement("div");
      cart__item__content__description.classList.add(
        "cart__item__content__description"
      );
      cart__item__content.appendChild(cart__item__content__description);
      // _____________________________________________________________________

      //     // creation du h2
      let h2 = document.createElement("h2");
      h2.innerHTML = item.name;
      cart__item__content__description.appendChild(h2);

      // _______________________________________________________________________________________
      //     // creation de la couleur du produit:<p>vert</p>
      let colorProduct = document.createElement("p");
      
      colorProduct.innerHTML = product.colorChoiceProduct;

      cart__item__content__description.appendChild(colorProduct);

      // ____________________________________________________________________________________

      //     // // creation du prix:  <p>42,00 €</p>
      let productPrice = document.createElement("p");
      productPrice.innerHTML = item.price;
      cart__item__content__description.appendChild(productPrice);

      // -------------------------------------------------------------------------
      // creation de la carte settings : <div class="cart__item__content__settings">
      // ---------------------------------------------------------------------------
      let cart__item__content__settings = document.createElement("div");
      cart__item__content__settings.classList.add(
        "cart__item__content__settings"
      );
      cart__item__content.appendChild(cart__item__content__settings);

      // ------------------------------------------------------------------------------------
      // creation de la div quantity : <div class="cart__item__content__settings__quantity">
      // --------------------------------------------------------------------------------------
      let cart__item__content__settings__quantity =
        document.createElement("div");
      cart__item__content__settings.className =
        "cart__item__content__settings__quantity";
      cart__item__content__settings.appendChild(
        cart__item__content__settings__quantity
      );
      // console.log(cart__item__content__settings__quantity);

      // creation de la quantité: <p>Qté : </p>
      let qte = document.createElement("p");
      qte.innerHTML = "Qté : ";
      cart__item__content__settings__quantity.appendChild(qte);

      // // creation de l'input quantité:
      // // <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
      let inputQuantity = document.createElement("input");
      inputQuantity.setAttribute("type", "number");
      // console.log(inputQuantity);
      inputQuantity.className = "itemQuantity";
      inputQuantity.setAttribute("name", "itemquantity");
      inputQuantity.setAttribute("min", "1");
      inputQuantity.setAttribute("max", "100");
      inputQuantity.setAttribute("value", product.quantity);
      qte.appendChild(inputQuantity);
      // console.log(inputQuantity);
      inputQuantity.addEventListener("change", updateValue);

      // créer la fonction de mise a jour des valeurs
      

      function updateValue() {
        // mise a jour des quantités
        // pour  chaque produit du tableau localStorageProducts
        for (let i = 0; i < productLocalStorage.length; i++) {
          
          if (
            product.idProduit === productLocalStorage[i].idProduit &&
            product.colorChoiceProduct ===
              productLocalStorage[i].colorChoiceProduct
          ) {
            // eliminer le prix de ce produit de la somme totale
            prixTotale =
              prixTotale -
              parseInt(productLocalStorage[i].quantity) * parseInt(item.price);

            // la quantité du produit devient la valeur (nombre) de notre champ itemQuantity
            productLocalStorage[i].quantity = parseInt(inputQuantity.value, 10);
            // Ajouter le prix avec la nouvelle quantité
            prixTotale =
              prixTotale +
              parseInt(productLocalStorage[i].quantity) * parseInt(item.price);
            // afficher la somme totale des prix grace a la fonction prixTotal
            prixTotal(prixTotale);
            // alert("fin de la function");
            break;
          }
        }
        // stocker products au localStorage
        localStorage.setItem("product", JSON.stringify(productLocalStorage));
      }
      // prixTotale initialiser a 0 et a chaque fois on fait le calcule
      prixTotale =
        prixTotale + parseInt(item.price) * parseInt(product.quantity);
      prixTotal(prixTotale);

      // ---------------------------------------------------------------------------

      // --------------------------------------------------------------------------
      // creation du bouton delete/supprimer: <div class="cart__item__content__settings__delete">

      let cart__item__content__settings__delete = document.createElement("div");
      cart__item__content__settings__delete.classList.add(
        "cart__item__content__settings__delete"
      );
      cart__item__content.appendChild(cart__item__content__settings__delete);

      // creation paragraphe delete :<p class="deleteItem">Supprimer</p>
      let deleteItem = document.createElement("p");
      deleteItem.className = "deleteItem";
      deleteItem.innerHTML = "Supprimer";
      cart__item__content__settings__delete.appendChild(deleteItem);

      deleteItem.addEventListener("click", () => {
        // pour chaque produit du tableau localStorageProducts
        for (let i = 0; i < productLocalStorage.length; i++) {
          // si id et couleur du produit sont identiques a ceux d'un produit dans le localstorge
          if (
            product.idProduit === productLocalStorage[i].idProduit &&
            product.colorChoiceProduct ===
              productLocalStorage[i].colorChoiceProduct
          ) {
            // retirer l'élément ayant laposition j du tableau localStorageProducts
            // 1>0 donc on va supprimer
            productLocalStorage.splice(i, 1);
            // actualiser la page
            window.location.reload();
          }
        }
        // Je stocke products au localStorage
        localStorage.setItem("product", JSON.stringify(productLocalStorage));
      });
    }
  }
  function prixTotal(prixTotale) {
    document.getElementById("totalPrice").innerHTML = prixTotale;
  }
}
// ----------------------------------------partie form.regex----------------------------------------------------
// // Form et Regex

// // Je mets en place l'initialisation de l'objet contact
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

// Je mets en place une variable qui stocke si les inputs sont valides ou non
// on met tout a false par défaut
let isValidInputs = {
  firstName: false,
  lastName: false,
  address: false,
  city: false,
  email: false,
};
// Je défini les différentes RegExp dans une constante
const regExpList = {
  firstName: new RegExp("(^[a-zA-Zéè -]{2,20}$)"),
  lastName: new RegExp("(^[a-zA-Z -]{2,30}$)"),
  address: new RegExp("(^[a-zA-Zéè 0-9,-]{4,50}$)"),
  city: new RegExp("(^[a-zA-Zàéè -]{4,30}$)"),
  email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
};

// Je mets en place une fonction qui vérifie les inputs et les stocke
function checkUserInformations(input, regex, id) {
  if (regex.test(input.value)) {
    input.style.border = "2px solid Green";
    document.getElementById(`${id}ErrorMsg`).innerText = "";
    contact[id] = input.value;
    isValidInputs[id] = true;
  } else {
    input.style.border = "2px solid Red";
    isValidInputs[id] = false;
    if (id == "firstName" || id == "lastName") {
      document.getElementById(`${id}ErrorMsg`).innerText =
        'Le format est incorrect (ex : "Jean")';
    } else if (id == "email") {
      document.getElementById(`${id}ErrorMsg`).innerText =
        'Le format du mail est incorrect (ex: " jeanhakim@hotmail.com ")';
    } else {
      document.getElementById(`${id}ErrorMsg`).innerText =
        "L'information renseignée n'est pas valide";
    }
  }
}

// J'appel la fonction de validité et de stockage des inputs à l'aide d'une boucle
for (let input of document.querySelector(".cart__order__form")) {
  if (input.type == "text" || input.type == "email") {
    input.addEventListener("change", (e) => {
      checkUserInformations(e.target, regExpList[e.target.id], e.target.id);
    });
  }
}
// J'écoute le bouton "commander" au click
document.getElementById("order").addEventListener("click", (e) => {
  e.preventDefault();
  let formValidity = Object.values(isValidInputs).includes(false);

 

  // Je lance la verification du formulaire et du panier
  if (
    formValidity === true &&
    (productLocalStorage === [] || productLocalStorage === null)
  ) {
    alert(
      "Les données renseignées dans le formulaire ne sont pas valides ou ne sont pas remplies et votre panier est vide"
    );
    return;
  } else if (formValidity === true && productLocalStorage.length != 0) {
    alert(
      "Les données renseignées dans le formulaire ne sont pas valides ou ne sont pas remplies"
    );
    return;
  } else if (
    formValidity === false &&
    (productLocalStorage === [] || productLocalStorage === null)
  ) {

    
    alert("Le panier est vide");
    return;
  } else {
    //appel de la fonction d'envoi de la commande
    postOrder();
  }
});

// Fonction d'envoi de la commande
// initialisation d'un tableau à 0 pour stocker les ID des produits
function postOrder() {
  let products = [];
 

  // ajout de chaque id par produit dans un tableau produit
  for (let k = 0; k < productLocalStorage.length; k++) {
    products.push(productLocalStorage[k].idProduit);
  }

  
  // Je mets en place la variable data avec les éléments nécessaires concernant les produits et le formulaire
  let data = {
    contact,
    products,
  };
  console.log(data,"Datas")

  
  // Fetch POST
  fetch("http://localhost:3000/api/products/order", {method: "POST", headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status == 201) {
        alert("Votre commande a bien été validée");
        return res.json();
      } else if (res.status !== 201) {
        alert(
          "une erreur est survenue lors de l'envoi du formulaire, veuillez réessayer"
        );
      }
    })
    .then((res) => {
      // Vide le localStorage
      localStorage.clear();
      // Ouvre la page de confirmation avec le numéro de commande dans l'URL
      window.location.href = `../html/confirmation.html?order_id=${res.orderId}`;
    })
    .catch((error) => console.log("Erreur : " + error));
}


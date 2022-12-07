// Je récupère l'orderId qui contient 
const orderId = new URL(window.location).searchParams.get("order_id");

// J'affiche le numéro de commande
function afficheOrderId(numId) {
    document.getElementById('orderId').innerText = `${numId}`
}
afficheOrderId(orderId);

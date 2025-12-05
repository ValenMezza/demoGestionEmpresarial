const products = [{
    id: 1,
    name: "Producto A",
    price: 10.00},
{
    id: 2,
    name: "Producto B",
    price: 15.50},
{
    id: 3,
    name: "Producto C",
    price: 7.25},
    {
    id: 4,
    name: "Producto D",
    price: 12.00
    },
{
    id: 5,
    name: "Producto E",
    price: 9.75
}];


export function addToCart(productId, quantity) {

    const pNumber = document.getElementById('nro-add');
    pNumber.innerText = quantity;



    const product = productId.find(p => p.id === productId);
    if (product) {
        console.log(`Added ${quantity} of ${product.name} to cart.`);
    } else {
        console.log("Product not found.");
    }

}   
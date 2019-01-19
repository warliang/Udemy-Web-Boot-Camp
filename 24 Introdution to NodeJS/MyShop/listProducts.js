var faker = require('faker');

console.log("=========");
console.log("WELCOME TO MY SHOP");
console.log("=========");

for (var i = 0; i < 10; i++) {
    var productAdj = faker.commerce.productAdjective();
    var productMat = faker.commerce.productMaterial();
    var product = faker.commerce.product();
    var price = faker.commerce.price();
    
    var str = productAdj + " " + productMat + " " + product + " - $" + price;
    console.log(str);
}
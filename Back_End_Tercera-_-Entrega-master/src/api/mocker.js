const faker = require('@faker-js/faker');
const { log } = require('console');
const { text } = require('express');
let mockerdata = [];
for (let i = 0; i < 5; i++) {
    let codigo = faker.faker.mersenne.rand(100, 999);
    let title = faker.faker.commerce.productName();
    let price = faker.faker.commerce.price(15000, 30000);
    let thumbnail = faker.faker.image.technics();
    let dato = {
        "codigo": codigo,
        "title": title,
        "price": price,
        "thumbnail": thumbnail
    }
    mockerdata.push(dato)
}

module.exports = mockerdata;
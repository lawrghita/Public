var faker = require('faker');
for (let index = 0; index < 10000; index++) {
    console.log(faker.company.companyName().toUpperCase()+"\'s", 
    faker.fake("{{name.jobTitle}}"),
    faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}").toUpperCase(),
    faker.fake("buy {{commerce.product}} at {{commerce.price}}"));    
}


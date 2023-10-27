# NodeJS com MongoDB

### Informações iniciais

[**O que é NoSQL?**](https://github.com/NoScandalize/NodeJS/blob/main/12_MONGODB/NodeJS%20com%20MongoDB%20205fb111ae7b4617af35c0c4c64dcc9b/O%20que%20%C3%A9%20NoSQL%207b7919d7d5e04c1a9ff40d1bef69e6f9.md)

[O que é CRUD?](NodeJS%20com%20MongoDB%20205fb111ae7b4617af35c0c4c64dcc9b/O%20que%20e%CC%81%20CRUD%2043884856ce314029a510bdfe05b4f9f0.md)

[O que é MongoDB?](NodeJS%20com%20MongoDB%20205fb111ae7b4617af35c0c4c64dcc9b/O%20que%20e%CC%81%20MongoDB%20579a8c7b20d545e0b160f8b8f2491ad9.md)

### Principais entidades

**Database**: é onde ficam as nossas collections e dados;

**Collections**: são como as tabelas nos bancos relacionais, nelas vamos inserir os dados;

**Documents**: são os dados, no MongoDB tem esta nomenclatura;

**Collections podem ser criadas livremente** a qualquer momento e **não possuem colunas fixas** para os dados;

### MongoDB e JSON

O tipo de dado inserido na tabela é o **BSON**, uma variação de JSON;

O BSON é semelhante ao JSON, porém com **recursos a mais**;

A **forma de criar um BSON é igual ao JSON**, veja:

{

nome: “Douglas”,

idade: 24

}

### Conectando o NodeJS ao MongoBD

Primeiramente vamos precisar instalar o **driver do MongoDB**, que é **mongodb** (um package de npm);

Depois criaremos a conexão, baseada em uma URL com o **protocolo mogondb://**

Através da classe **MongoClient**;

```jsx
// ./db/conn.js

const { MongoClient } = require('mongodb');
const chalk = require('chalk');

const uri = "mongodb://127.0.0.1:27017/testemongodb";

const client = new MongoClient(uri);

async function run() {
    try {

        await client.connect();
        console.clear();
        console.log(chalk.green("Conexão com o banco de dados efetuada com sucesso!"))
        console.log(chalk.magenta("Bem vindo(a) ao MongoDB!"))

    } catch (err) {
        console.log(err)
    }
}

run();

module.exports = client;
```

### Inserindo dados

Primeiramente vamos **criar um Model**, onde este será uma classe de JavaScript, para seguir o MVC;

Depois utilizaremos o **Model** para criar o **método save**, que executa o **insertOne** de MongoDB;

```jsx
// ./models/Products.js

const conn = require('../db/conn');

module.exports = class Product {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    save() {
        const product = conn.db().collection('products')
				.insertOne({
            name: this.name,
            price: this.price,
            description: this.description
        })

        return product;
    }
}
```

Por fim é necessário **criar o formulário** que interage com a rota do sistema, para depois ****inserirmos os dados no banco;

A **inserção** é feita através do método **save()** criado no model, é feita a instancia da classe (**new Product**) sendo os valores a serem inseridos no banco passados nos parâmetros, em seguida é feita a execução do método(save).

```jsx
// ./controllers/ProductController.js

const Product = require('../models/Product')

module.exports = class ProductController {

    static showProducts(req, res) {

        res.render('products/all')
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductPost(req, res) {

        const { name, price, description } = req.body; 

        const product = new Product(name, price, description);

        product.save()

        res.redirect('/products')

    }
}
```

### Resgatando dados

Para resgatar os dados de uma collection vamos utilizar o **método find** de MongoDB.

Os dados vem em um cursor, para **converter em array** utilizamos **toArray**;

```jsx
// ./models/Product.js

static getProducts() {
        const products = conn.db().collection('products')
				.find().toArray();

        return products;
    }
```

Depois é só passar os dados para o controller e **exibir na view**;

```jsx
// ./controllers/ProductController.js

static async showProducts(req, res) {

        const products = await Product.getProducts()

        res.render('products/all', { products })
    }
```

### Resgatando um dado

Para resgatar um dado vamos utilizar o método **findOne**;

Primeiro criamos a rota;

```jsx
// ./routes/productsRoutes.js

router.get('/:id', ProductController.getProduct)
```

Onde podemos **filtrar por um campo**, que no nosso caso vai ser o _id;

```jsx
// ./models/Product.js

const { ObjectId } = require('mongodb');

module.exports = class Product {
    ...

    static async getProductById(id) {
        const product = conn.db()
        .collection('products')
        .findOne({ _id: new ObjectId(id) })

        return product;
    }
}
```

Vamos **enviar o dado para o Controller** e depois para a View;

```jsx
// ./controllers/ProductController.js

static async getProduct(req, res) {

        const id = req.params.id

        const product = await Product.getProductById(id)

        res.render('products/product', { product })
    }
```

### Excluindo dados

Para remover um dado do banco, vamos utilizar o método **deleteOne**;

Primeiro criamos a rota;

```jsx
// ./routes/productsRoutes.js

router.post('/remove/:id', ProductController.removeProduct)
```

Em seguida fazemos uso do método, que **recebe um filtro** como no de resgatar dados, utilizaremos o campo **_id**;

```jsx
// ./models/Products.js

static async removeProductById(id) {

        const product = conn.db()
        .collection('products')
        .deleteOne({ _id: new ObjectId(id) })

        return;
}
```

Basta executar o método no Controller e **redirecionar após a remoção**;

```jsx
// ./controllers/ProductController.js

static async removeProduct(req, res) {

        const id = req.params.id;

        await Product.removeProductById(id);

        res.redirect('/products/manage')

}
```

### Editar dado - formulário

Para editar um dado, primeiramente vamos criar uma view que mostra o **formulário preenchido**;

Em seguida criaremos a rota que irá executar um método no controller, executando o método **find do MongoDB** no model e trazendo os dados e os enviando para a view;

```jsx
// ./controllers/ProductController.js

static async editProduct(req, res){

        const id = req.params.id;

        const product = await Product.getProductById(id);

        res.render('products/edit', { product })

}
```

A ideia é parecida com a de **getProduct** do nosso projeto;

Vamos utilizar o **atributo value do input** para preencher o campo com valor salvo;

### Editar dado - salvando

Para salvar um dado editado será necessário criar um método no **Model**;

Que utiliza o método **updateOne** do MongoDB;

Onde passamos o **id e também os dados** para atualizar;

```jsx
// ./models/Product.js

updateProduct(id) {

        conn.db().collection('products').updateOne({ _id: new ObjectId(id)}, { $set: this })

        return

}
```

Criaremos também uma função no Controller e a rota;

```jsx
// ./routes/productsRoutes.js

router.post('/edit/', ProductController.editProductPost)
```

```jsx
// ./controllers/ProductController.js

static async editProductPost(req, res) {

        const { id, name, image, price, description } = req.body;

        const product = new Product(name, image, price, description)

        await product.updateProduct(id);

        res.redirect('/products/manage')

}
```

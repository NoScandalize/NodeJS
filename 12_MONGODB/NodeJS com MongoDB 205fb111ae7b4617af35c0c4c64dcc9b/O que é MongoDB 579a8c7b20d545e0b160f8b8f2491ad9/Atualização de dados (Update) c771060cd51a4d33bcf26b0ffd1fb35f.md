# Atualização de dados (Update)

### Atualizando um dado

Para atualizar um dado utilizamos o método **updateOne( )**;

Primeiro realizamos o filtro e depois inserimos o que precisa ser atualizado;

Exemplo: `db.books.updateOne({_id: 314}, { $set: { pageCount: 1000 }})`

Aqui atualizamos as páginas do livro com id 314 para 1000;

O operador **$set** é ****onde ficam os valores a serem atualizados;

### Atualizando vários itens

Para atualizar diversos itens utilizamos **updateMany( )**;

Este método tem a mesma lógica de execução do que updateOne;

Exemplo: `db.books.updateMany({categories: "Java"}, {$set: {status: "UNPUBLISHED"}})`

Neste update atualizamos todos os dados da categoria Java, alteramos o status destes registros;

### Adicionando dados com update

O update pode servir para adicionar um dado ao document;

Basta **inserir um valor para uma chave** que não existe no mesmo;

Exemplo: `db.books.updateMany({authors: "Vikram Goyal"}, {$set: {downloads: 1000}})`

Aqui adicionamos a chave downloads com o valor de 1000 a todos os livros de Vikram;

### Trocando todo o documento

Podemos trocar todos os dados do documento com o **replaceOne()**;

Ou seja, haverá uma substituição de dados;

Exemplo: `db.books.replaceOne({_id: 120}, {foi: "substituido"})`

Neste caso trocamos todos os dados do registro com id 120 para o document do segundo argumento;

### Adicionar item a um array

Se tentarmos atualizar um array diretamente vamos substituir ele;

Para adicionar um item vamos precisar do operador **$push**;

Exemplo: `db.books.updateOne({_id: 201}, {$push: {categories: "PHP"}})`

Neste caso adicionamos a categoria PHP ao livro com id 201;

### Atualizar todos os itens

Para atualizar todos os itens podemos utilizar o **updateMany()**;

Porém **não colocamos filtro nenhum**;

Exemplo: `db.books.updateMany({}, {$set: {atualizado: true}})`

Assim todos os itens serão atualizados!
# Exclusão de dados (Delete)

### Remover um item

A remoção de itens é bem **parecida com a atualização**;

Baseado em um **filtro**, podemos deletar um elemento;

Exemplo: `db.books.deleteOne({_id: 20})`

Neste caso deletamos o item de id igual a 20;

### Remover mais de um item

Para remover mais de um item utilizamos **deleteMany( )**;

Exemplo: `db.books.deleteMany({categories: "Java"})`

Neste caso, removemos todos os livros da categoria Java;

### Remover todos os itens

Para remover todos os itens basta utilizar o **deleteMany( )**;

Porém passando um **filtro vazio**;

Exemplo: `db.books.deleteMany({})`
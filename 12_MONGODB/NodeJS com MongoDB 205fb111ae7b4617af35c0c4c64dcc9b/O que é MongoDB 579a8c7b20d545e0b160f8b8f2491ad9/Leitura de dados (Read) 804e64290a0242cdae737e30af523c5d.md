# Leitura de dados (Read)

### Encontrar todos os dados

Para encontrar todos os dados vamos utilizar o comando **find()**;

Comando: **db.books.find({})**

O **document vazio {} neste método é opcional**, sem ele todos os dados serão retornados também;

Podemos utilizar o **pretty** com o comando de find!

### Mais sobre o pretty

O método pretty não nos retorna todos os dados, e som um **cursor**;

Por isso precisamos digitar **it** para receber mais registros;

É uma forma de retornar menos dados, uma espécie de paginação;

O **cursor também um objeto**, que possui outros métodos em MongoDB;

Geralmente modificando a forma que os dados são retornados;

Exemplo: 

`db.books.find().pretty()`

`it`

### Encontrar dado com valor específico

Para encontrar um dado específico podemos **definir um document dentro do find**;

O primeiro argumento da opção também é chamado de filtro;

Exemplo: `db.books.find({ pageCount: 362 })`

Todos os livros com 362 páginas serão retornados!

### Encontrar dado entre valores

Para esta função vamos utilizar o operador **$in**;

Exemplo: `db.books.find({ categories: {$in: ["Java", "Internet"]} })`

Precisamos criar uma **lista de valores** que queremos buscar;

Todos estes registro que contiverem um destes valores será retornado;

### Múltiplas condições

Dados podem ser encontrados baseados em múltiplas condições;

Basta **adicionar uma vírgula no document** e inserir o próximo requisito;

Exemplo: `db.books.find({ pageCount: 592, _id: 63 }).pretty()`

Neste caso acima buscamos pro um livro com 592 páginas e que tenha o id igual a 63;

**Obs:** esta consulta também é semelhante ao operador AND em SQL;

### Maior que algum valor

Outro operador interessante é o que vai buscar valores maiores que um determinado, o operador é o **$gt (greater than)**;

Exemplo: `db.books.find({ pageCount: { $gt: 450 } }).pretty()`

Neste exemplo buscamos livros que tenham mais que 450 páginas;

Note que inserimos um **novo document** para determinar o $gt;

### Menor que algum valor

Assim como o maior que, temos o menor que, que busca valores menores que o determinado;

O operador é o **$lt (less than)**;

Exemplo: `db.books.find({ pageCount: { $lt: 120 } }).pretty()`

Aqui buscamos livro com menos que 120 páginas, **note que a aplicação é a mesma que $gt**;

### Operador $or

O operador **$or** é utilizado para resgatar dados que possuem um valor ou outro;

Exemplo: `db.books.find({ $or: [[{ pageCount: {$gt: 500}, _id: {$lt: 5} }] }).pretty()`;

Neste caso buscamos por livros com mais de 500 páginas e com id menor que 5;

No que **combinamos vários operadores**;

### Operador and e or na mesma consulta

Como visto anteriormente **podemos unir vários operadores**;

Exemplo: `db.books.find({ status: “PUBLISH”, $or: [{pageCount: 500}, {authors: “Robi Sen”}] }).pretty()`

Aqui buscamos livros publicados e que tenham 500 páginas ou o autor seja Robi Sen;

Perceba que podemos adicionar filtros bem específicos as consultas!

### Contando número de resultados

Para contar o número de retornos de uma consulta, podemos utilizar o método **count()**;

Exemplo: `db.books.find({ pageCount: {$gt: 600} }).count()`

Aqui temos quantos livro existem acima de 600 páginas no nosso banco;
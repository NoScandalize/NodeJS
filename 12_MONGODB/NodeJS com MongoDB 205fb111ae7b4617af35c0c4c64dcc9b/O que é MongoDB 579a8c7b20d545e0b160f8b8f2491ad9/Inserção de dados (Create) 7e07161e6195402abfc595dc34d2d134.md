# Inserção de dados (Create)

### Tudo é documento

Sempre que vamos trabalhar com MongoDB é comum adicionarmos várias entidades com chaves **{ }** (document);

Sempre que adicionamos chave a algum local, chamamos de **document** (documento); 

Ou seja, é bem comum ouvir: **inserir um document na collection**;

Onde em SQL seria inserir o dado na tabela;

### Inserindo dados

Para inserir um document utilizamos o método **insertOne()**;

Desta maneira: **db.<collection>.insertOne({<dados>})**;

Onde **collection** é o nome da collection que vamos inserir dados;

E dados representa **o conjunto de chaves e valores** do dado em questão;

Exemplo: `db.users.insertOne({ name: "Douglas", age: 24, isAdmin: true })`;

### Não há relação entra dados

Em uma collection **não precisamos respeitar as chaves dos outros documents**;

Ou seja, em um banco relacional precisamos adicionar dados das colunas e **em MongoDB não existe essa regra**;

Então **podemos ter documents totalmente diferentes** em um collection;

### Inserindo vários dados

Podemos também inserir vários dados de uma vez só, com o método **insertMany**;

A sintaxe é as seguinte: **db.<collection>.insertMany([<dados>]);**

Note que vamos precisar de um **array**, que vamos inserir os documents, separados por vírgula;

Exemplo: `db.provas.insertMany([{nome: "Maria", notas: [10, 5, 6]}, {nome: "Matheus", notas: [10, 8]}])`

### O método insert

Existe um método chamado **insert**, que server para inserir um ou mais dados;

Comando: **db.<collection>.insert()**;

Porém ele é mais antigo, **e os métodos mais atuais são insertOne e insertMany**;

Então é interessante utilizá-los em nossas aplicações, em vez de insert;

Exemplo: `db.produtos.insert([{nome: "Sabão", preco: 9.99}, {nome: "Detergente", preco: 12.99}])`

### Voltando ao _id

Já sabemos que o **_id é único** e criado em todos os documents da collection;

Porém não necessariamente precisamos deixar a cargo do MongoDB isso, **podemos criar o nosso próprio id**;

Comando: **db.<collection>.insertOne({ _id: “meuid”, nome: “Nome”})**

Desta forma é possível personalizar este campo!

Exemplo: `db.produtos.insertOne({ _id: "1", nome: "Vassoura", preco: 14.99})`

### Write Concern

O **White Concern** é uma configuração que pode ser inserida no insertMany;

Podemos limitar o tempo de execução da inserção;

Retornando um **erro de time out** caso exceda o mesmo;

Comando: **{ w:”majority”, wtimeout: 100 };**

A inserção tem 100ms para ser executada;

Exemplo: `db.mercado.insertMany([{nome: "Tesoura", preco: 12.99}, {nome: "Peito de Frango", preco: 12.99}, {nome: "Ameixa", preco: 2.50}], {w: "majority", wtimeout: 200})`
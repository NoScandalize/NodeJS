# Gerenciamento de DBs

### **Verificar todos os bancos**

Podemos verificar os bancos do sistema com: **show dbs**;

Este comando **mostra todos os DBs criados até o momento**;

Note que há alguns bancos do próprio Mongo já criados;

### **Criando banco de dados**

Para criar um banco utilizamos a instrução: **use <nome>**;

Isso fará com que um banco seja inicializado, porém ele só será registrado de fato quando houver algum dado nele;

Podemos checar o banco atual com o comando: **db**;

O comando use também para **mudar de banco**;

Exemplo: `use meubanco`

### Criando collections

Não precisamos explicitamente criar uma collection, basta inserir um dado em alguma;

Com o comando: ****db.<collection>.insertOne( <dados> );**

A collection será criada automaticamente, e também o banco de dados persistirá no sistema;

Note que a instrução db vai referir sempre ao banco atual;

Exemplo: `db.minhacollection.insertOne( { a: 1 } )`

### Encontrando dados

Para buscar dados utilizamos o comando: find();

Este comando recebe um filtro, para selecionarmos dados específicos;

Com o comando: **db.<collection>.find( {  <dados> } )**;

Neste caso **buscamos por um document** com uma chave nome e um valor João

Exemplo: `db.minhacollection.find( { nome: “João” } )`

### A função pretty

A função **pretty** pode ser adicionada a alguns comandos;

O resultado é um **retorno de dados melhor formatado**;

Desta forma fica mais legível e conseguimos entender melhor o que retornou;

Ele é muito **utilizada com find()**;

Exemplo: `db.minhacollection.find( { nome: “João” } ).pretty()`

### Criação de collection implícita

Há a possibilidade de criar a collection com um comando também;

Com o comando: **db.createCollection(”nome”, { opções })**

Podemos definir alguns **parâmetros de configuração** como: número máximo de registros, tamanho máximo da collection e etc;

Exemplo: `db.createCollection("minhacolecao", { capped: true, size: 1000, max: 3 })`

capped: É necessário está ativo para inserir as limitações;

size: Tamanho máximo da collection(Bytes);

max: Quantidade máxima de registros;

### Exibir todas as collections

Para exibir todas as collections utilizamos: **show collections;**

Este comando de verificação nos ajuda a **entender melhor o banco de dados**;

Lembrando que para uma collection ser criada de fato, ela precisa ter algum dado inserido!

### A Chave _id

Todo registro inserido no banco vem com uma chave chamada **_id**;

Esta chave tem como objetivo criar um **identificador único para todo registro**;

Ele consegue ser único pois é baseado no tempo em que é criado, mesmo que os dados sejam inseridos simultaneamente, **ids serão distintos**;

Outra funcionalidade interessante é que ele possui um **índice**, agilizando consultas por esta chave;

### Removendo collections

Podemos remover collections quando elas não forem mais necessárias ou se errarmos o nome, por exemplo;

O comando é: **db.<collection>.drop()**;

Após a execução **todos os dados serão removidos também**, então tome **cuidado**!

Exemplo: `db.minhacollection.drop()`

### Removendo bancos de dados

Podemos remover os bancos também!

O comando é: **db.dropDatabase()**;

Após a execução do comando, **todos os dados e collections serão excluídos do sistema, cuidado!**

Exemplo: 

`use minhadatabase`

`db.dropDatabase() // return true`

### Importar bancos em JSON

Um formato muito encontrado de bancos de MongoDB é **.json**;

Vamos utilizar uma funcionalidade do tools para realizar a importação;

O comando é: **mongoimport <arquivo> -d <database> -c <collection>**;

Desta maneira **criamos um banco de dados** nomeado no comando e também uma **collection** e é claro, os dados importados!

Exemplo: `mongoimport books.json -d booksData -c books`;

### Exportar bancos em JSON

Outra ação comum é **exportar bancos de dados**;

Para esta ação utilizamos: **mongoexport -c <collection> -d <database> -o <output>**;

Onde definimos qual collection estamos exportando, qual banco e qual o arquivo de saída;

Exemplo: `mongoexport -c books -d booksData -o booksExample.json`;

### Exportar muitas collections

Quando o banco possui mais de uma collection a melhor opção de exportação é o **mongodump**;

Utilizamos assim: **mongodumpo -d <banco> -o <diretorio>**;

onde o **-o** criará uma pasta, com os arquivos de cada collection;

Exemplo: `mongodump -d meuBanco -o meuBanco`

### Importar dados do mongodump

Para importar os arquivos gerados do mongodump, utilizamos o **mongorestore**;

O comando é o seguinte: **mongorestore <diretorio>**

Não precisamos informar uma flag para o diretório, apenas o caminho relativo a ele

Exemplo: `mongorestore ./meuBanco/`

### Status do MongoDB

Podemos checar algumas informações como: **quantidade de consultas rodando, consumo de rede e outros dados**;

O comando é **mongostat**;

Teremos uma aba do terminal ocupada, atualizando todo o segundo trazendo informações em tempo real;

### Forma simples de remover bancos

Podemos criar um **loop no nosso terminal** que vai remover todos os bancos não necessários, ou seja, precisamo preservar: **admin, config e local;**

Os outros podem ser removidos da nossa base;

Vamos criar o snippet!

Comando: 

```jsx
Mongo().getDbNames().forEach(function(db) {
    if(['admin', 'config', 'local'].indexOf(db) < 0) {
        Mongo().getDB(db).dropDatabase();
    }
})
```
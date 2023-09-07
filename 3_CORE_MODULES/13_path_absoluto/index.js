const path = require('path');

// path absoluto

console.log(path.resolve('text.txt'))

// formar path
const midFolder = 'relatorios';
const fileName = 'douglas.txt';

const finalPath = path.join("/", 'arquivos', midFolder, fileName);

console.log(finalPath)
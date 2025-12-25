"use strict";

const fs = require('fs');
const readline = require('readline');

if (process.argv.length < 3) {
  console.error('Ошибка: Укажите имя файла');
  console.error('Пример: node rewriter.js myfile.txt');
  process.exit(1);
}

const filename = process.argv[2];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.readFile(filename, 'utf8', (err, data) => {
  if (err && err.code !== 'ENOENT') {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    rl.close();
    return;
  }

  if (err && err.code === 'ENOENT') {
    console.log(`Файл "${filename}" будет создан.`);
  } else {
    console.log(`Текущее содержимое файла "${filename}":`);
    console.log('---');
    console.log(data);
    console.log('---');
  }

  rl.question('Введите новый текст для файла (нажмите Enter для завершения):\n', (newText) => {

    fs.writeFile(filename, newText, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(`Ошибка при записи файла: ${writeErr.message}`);
      } else {
        console.log(`Файл "${filename}" успешно перезаписан.`);
      }
      rl.close();
    });
  });
});
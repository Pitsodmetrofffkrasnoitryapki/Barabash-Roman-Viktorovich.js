const fs = require('fs').promises;
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ===== ЗАДАНИЕ 1: Сохранение текста в файл =====
async function saveTextToFile() {
  try {
    const text = await new Promise((resolve) => {
      rl.question('Введите строку текста для сохранения: ', resolve);
    });

    await fs.writeFile('output.txt', text, 'utf8');
    console.log('✅ Текст сохранен в output.txt');
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  }
}

// ===== ЗАДАНИЕ 2: Анализ файла data.txt =====
async function analyzeFile() {
  try {
    // Проверяем существование файла
    try {
      await fs.access('data.txt');
    } catch {
      console.log('⚠️  Файл data.txt не найден. Создайте его или используйте другое задание.');
      return;
    }

    // Читаем содержимое файла
    const content = await fs.readFile('data.txt', 'utf8');

    // Подсчет строк (учитываем последнюю строку без \n)
    const lines = content.split('\n').length;
    // Подсчет символов (без учета управляющих символов \r)
    const characters = content.replace(/\r/g, '').length;

    console.log('\n📊 Анализ файла data.txt:');
    console.log(`Количество строк: ${lines}`);
    console.log(`Количество символов: ${characters}`);
    console.log(`Пример содержимого (первые 100 символов):\n${content.substring(0, 100)}${content.length > 100 ? '...' : ''}`);

  } catch (error) {
    console.error('❌ Ошибка при анализе файла:', error.message);
  }
}

// ===== ЗАДАНИЕ 3: Цикл ввода в log.txt =====
async function logText() {
  console.log('\n📝 Вводите текст построчно. Для завершения введите "stop".');

  try {
    // Открываем файл для добавления (создаем если нет)
    const logFile = 'log.txt';

    while (true) {
      const line = await new Promise((resolve) => {
        rl.question('> ', resolve);
      });

      if (line.toLowerCase() === 'stop') {
        console.log('⏹️  Запись завершена.');
        break;
      }

      // Добавляем строку с переносом
      await fs.appendFile(logFile, line + '\n', 'utf8');
      console.log('✓ Строка добавлена в log.txt');
    }

    // Показываем статистику
    const stats = await fs.stat(logFile);
    console.log(`📊 Файл log.txt: ${stats.size} байт`);

  } catch (error) {
    console.error('❌ Ошибка записи в лог:', error.message);
  }
}

// ===== ГЛАВНОЕ МЕНЮ =====
async function showMenu() {
  console.log('\n' + '='.repeat(40));
  console.log('ВЫБЕРИТЕ ЗАДАНИЕ:');
  console.log('1. Сохранить текст в output.txt (перезапись)');
  console.log('2. Проанализировать data.txt (строки, символы)');
  console.log('3. Ввести текст в log.txt (цикл до "stop")');
  console.log('4. Выход');
  console.log('='.repeat(40));

  const choice = await new Promise((resolve) => {
    rl.question('Ваш выбор (1-4): ', resolve);
  });

  switch (choice) {
    case '1':
      await saveTextToFile();
      break;
    case '2':
      await analyzeFile();
      break;
    case '3':
      await logText();
      break;
    case '4':
      console.log('👋 До свидания!');
      rl.close();
      return;
    default:
      console.log('⚠️  Выберите от 1 до 4');
  }

  // Возвращаемся в меню
  await showMenu();
}

// ===== ЗАПУСК ПРОГРАММЫ =====
async function main() {
  console.log('📚 Программа для работы с файлами в Node.js');
  console.log('Три задания в одном приложении\n');

  try {
    // Создаем необходимые файлы, если их нет
    const files = ['output.txt', 'data.txt', 'log.txt'];
    for (const file of files) {
      try {
        await fs.access(file);
      } catch {
        await fs.writeFile(file, '', 'utf8');
        console.log(`📄 Создан файл: ${file}`);
      }
    }

    // Заполняем data.txt примером текста, если он пустой
    const dataContent = await fs.readFile('data.txt', 'utf8');
    if (!dataContent.trim()) {
      const sampleText = `Это пример содержимого файла data.txt.
Здесь несколько строк текста.
Можно использовать этот файл для тестирования задания №2.
Каждая строка считается отдельно.
И все символы тоже подсчитываются.`;
      await fs.writeFile('data.txt', sampleText, 'utf8');
      console.log('📝 Файл data.txt заполнен примером текста');
    }

  } catch (error) {
    console.error('Ошибка инициализации:', error.message);
  }

  // Показываем меню
  await showMenu();
}

// Обработка закрытия программы
rl.on('close', () => {
  console.log('\n📁 Файлы в текущей папке:');
  console.log('- output.txt  - для задания 1 (перезапись)');
  console.log('- data.txt    - для задания 2 (чтение и анализ)');
  console.log('- log.txt     - для задания 3 (добавление текста)');
  console.log('\nПрограмма завершена.');
  process.exit(0);
});

// Запуск
main().catch(console.error);
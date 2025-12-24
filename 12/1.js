import { createInterface } from 'readline';

async function inputCity() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  while (true) {
    const city = await new Promise((resolve) => {
      rl.question('Введите город: ', resolve);
    });

    const trimmedCity = city.trim();

    if (trimmedCity.length >= 2 && /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(trimmedCity)) {
      rl.close();
      return trimmedCity;
    }

    console.log('Ошибка: минимум 2 буквы, без цифр');
  }
}

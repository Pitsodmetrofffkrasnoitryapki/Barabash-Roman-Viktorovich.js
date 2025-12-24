function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

function simpleInputEmail() {
  const email = prompt('Введите email:') || '';

  if (validateEmail(email)) {
    console.log('✅ Email корректен!');
    return email;
  } else {
    console.log('❌ Неверный формат email');
    return null;
  }
}

const testEmails = [
  'test@mail.ru',          // ✅ Корректно
  'user.name-123@gmail.com', // ✅ Корректно  
  'john@doe.org',          // ✅ Корректно
  'user@domain.c',         // ❌ Домен слишком короткий (1 буква)
  'user@domain.complex',   // ❌ Домен слишком длинный (7 букв)
  'user@123.com',          // ❌ Цифры после @ (не допускается)
  'user@doe.',             // ❌ Нет домена
  '@domain.com',           // ❌ Нет локальной части
  'user@domain',           // ❌ Нет точки и домена
];

console.log('=== Тестирование регулярного выражения ===');
testEmails.forEach(email => {
  console.log(`${email} - ${validateEmail(email) ? '✅' : '❌'}`);
});
//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInt = (a, b) => {
  if (a >= 0 && b >= 0) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const result = Math.floor(Math.random() * (max - min)) + min;
    return result;
  }
  return NaN;
};

//Функция для проверки максимальной длины строки
const checkStringLength = (string, maxLength) => string.length <= maxLength;

getRandomInt(15, -2);
checkStringLength('Очень длинная строка', 8);

const getRandomInt = (a, b) => {
  if (a >= 0 && b >= 0) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const result = Math.floor(Math.random() * (max - min)) + min;
    return result;
  }
  return NaN;
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;
checkStringLength('Очень длинная строка', 10);

const getRandomElement = function(array) {
  return array[getRandomInt(0, array.length - 1)];
};

const getCommentIdList = function(amount) {
  const commentIdList = [];

  for(let i = 0; i < amount; i++) {
    let idListElement = Math.ceil(Math.random() * 100);

    while(commentIdList.includes(idListElement)) {
      idListElement = Math.ceil(Math.random() * 100);
    }

    commentIdList.push(idListElement);
  }

  return commentIdList;
};

const photoAmount = 25;
const range = 3;
const commentAmount = photoAmount * range;

const commentId = getCommentIdList(commentAmount);

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const firstNames = [
  'Нильс',
  'Рудольф',
  'Мария',
  'Роберт',
  'Георгий',
  'Джеймс',
  'Эдвин',
  'Энрико',
  'Ву',
  'Бруно',
  'Георгий',
  'Клаус',
  'Филипп',
  'Джон',
  'Лео',
  'Юджин',
  'Ричард',
];

const lastNames = [
  'Бор',
  'Пайерлс',
  'Гёпперт-Майер',
  'Оппенгеймер',
  'Кистяковский',
  'Франк',
  'Макмиллан',
  'Ферми',
  'Цзяньсюн',
  'Росси',
  'Кистяковский',
  'Фукс',
  'Абельсон',
  'Кокрофт',
  'Силард',
  'Вигнер',
  'Фейнман',
];

const createComments = function(amount) {
  const comments = [];

  for(let i = 0; i < amount; i++) {
    comments[i] = {
      id: commentId[i],
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomElement(messages),
      name: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`
    };
  }

  return comments;
};

const photoComments = createComments(commentAmount);

const photoIdList = Array.from({length: photoAmount}, (element, index) => index + 1);

const text = [
  'Утренний кофе в тёплой компании',
  'Закат у моря',
  'Работа полным ходом',
  'Счастливые моменты',
  'Трудный понедельник',
  'Всё хорошо',
  'История из жизни',
  'День рождения друга',
  'Движение - жизнь',
  'Увлекательный день',
];

const createPhotoInfo = function (amount) {
  const photoInfo = [];

  for(let i = 0; i < amount; i++) {
    const startComment = range * i;
    const endComment = startComment + range;

    photoInfo[i] = {
      id: photoIdList[i],
      url: `photos/${photoIdList[i]}.jpg`,
      description: getRandomElement(text),
      likes: getRandomInt(15, 200),
      comments: photoComments.slice(startComment, endComment)
    };
  }

  return photoInfo;
};

createPhotoInfo(photoAmount);

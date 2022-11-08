const PHOTO_AMOUNT = 25;
const RANGE = 3;
const COMMENT_AMOUNT = PHOTO_AMOUNT * RANGE;
const AVATAR_ID_START = 1;
const AVATAR_ID_END = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const FIRST_NAMES = [
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

const LAST_NAMES = [
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

const TEXT = [
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

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const getCommentIdList = (amount) => {
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

const commentId = getCommentIdList(COMMENT_AMOUNT);

const createComments = (amount) => {
  const comments = [];

  for(let i = 0; i < amount; i++) {
    comments.push({
      id: commentId[i],
      avatar: `img/avatar-${getRandomInt(AVATAR_ID_START, AVATAR_ID_END)}.svg`,
      message: getRandomElement(MESSAGES),
      name: `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`
    });
  }

  return comments;
};

const photoComments = createComments(COMMENT_AMOUNT);

const photoIdList = Array.from({length: PHOTO_AMOUNT}, (element, index) => index + 1);

const createPhotoInfo = (amount) => {
  const photoInfo = [];

  for(let i = 0; i < amount; i++) {
    const startComment = RANGE * i;
    const endComment = startComment + RANGE;

    photoInfo.push({
      id: photoIdList[i],
      url: `photos/${photoIdList[i]}.jpg`,
      description: getRandomElement(TEXT),
      likes: getRandomInt(LIKES_MIN, LIKES_MAX),
      comments: photoComments.slice(startComment, endComment)
    });
  }

  return photoInfo;
};

createPhotoInfo(PHOTO_AMOUNT);

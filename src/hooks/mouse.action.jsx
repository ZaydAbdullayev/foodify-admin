import { useEffect } from "react";

export const Mousedown = (props) => {
  const { modalRef = null, onClose = null } = props;

  useEffect(() => {
    // Close modal by click outside the modal
    const heandlerMouse = (e) => {
      if (!modalRef?.current?.contains(e.target)) return onClose();
    };

    // Add event listeners
    document.addEventListener("mousedown", heandlerMouse);

    // Remove event listeners
    return () => document.removeEventListener("mousedown", heandlerMouse);
  });
  return null;
};

const randomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const fakeData = [
  {
    id: randomId(),
    title: "Весело и смешно!",
    link: "https://css-tricks.com/piecing-together-approach...",
    quality: "warning",
  },
  {
    id: randomId(),
    title: "Название ссылки на сайт",
    link: "https://habr.com/ru/company/ruvds/blog/350976/",
    quality: "error",
  },
  {
    id: randomId(),
    title: "Очень грустная ссылка",
    link: "https://tympanus.net/Tutorials/SamsungGrid/ind...",
    quality: "success",
  },
  {
    id: randomId(),
    title: "крутая ссылка",
    link: "https://css-tricks.com/piecing-together-approach...",
    quality: "info",
  },
  {
    id: randomId(),
    title: "не заходи по ссылке",
    link: "https://habr.com/ru/company/ruvds/blog/350976/",
    quality: "warning",
  },
  {
    id: randomId(),
    title: "Сало или сыр",
    link: "https://tympanus.net/Tutorials/SamsungGrid/ind...",
    quality: "error",
  },
  {
    id: randomId(),
    title: "чебурек из спичек",
    link: "https://css-tricks.com/piecing-together-approach...",
    quality: "success",
  },
  {
    id: randomId(),
    title: "колобок лошадей",
    link: "https://habr.com/ru/company/ruvds/blog/350976/",
    quality: "info",
  },
  {
    id: randomId(),
    title: "Бензин не будет дешевым",
    link: "https://tympanus.net/Tutorials/SamsungGrid/ind...",
    quality: "warning",
  },
  {
    id: randomId(),
    title: "Сижу курю",
    link: "https://css-tricks.com/piecing-together-approach...",
    quality: "error",
  },
];

export const fakeData2 = [
  {
    id: randomId(),
    title: "Купить вантуз без регистрации",
    location: 1,
    link: "https://css-tricks.com/piecing-together-approach...",
  },
  {
    id: randomId(),
    title: "Как похудеть кушая деньги",
    location: 1,
    link: "https://habr.com/ru/company/ruvds/blog/350976/",
  },
  {
    id: randomId(),
    title: "Кушать подано в Магадане",
    location: 1,
    link: "https://tympanus.net/Tutorials/SamsungGrid/ind...",
  },
  {
    id: randomId(),
    title: "Что делать если ты олень",
    location: 1,
    link: "https://css-tricks.com/piecing-together-approach...",
  },
  {
    id: randomId(),
    title: "Как защитится от рептилоидов",
    location: 1,
    link: "https://habr.com/ru/company/ruvds/blog/350976/",
  },
  {
    id: randomId(),
    title: "Тесты ЭГЕ и тесты К.О.З.А",
    location: 1,
    link: "https://tympanus.net/Tutorials/SamsungGrid/ind...",
  },
  {
    id: randomId(),
    title: "Я тебя слепила из того что было",
    location: 1,
    link: "https://css-tricks.com/piecing-together-approach...",
  },
  {
    id: randomId(),
    title: "Наркоманы тоже люди?",
    location: 1,
    link: "https://habr.com/ru/company/ruvds/blog/350976/",
  },
  {
    id: randomId(),
    title: "Если ты запил кофе сырой водой что делать?",
    location: 1,
    link: "https://tympanus.net/Tutorials/SamsungGrid/ind...",
  },
  {
    id: randomId(),
    title: "Как мужику узнать беремен он или нет?",
    location: 1,
    link: "https://css-tricks.com/piecing-together-approach...",
  },
];


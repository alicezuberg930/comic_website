import _mock from "../_mock";
import { randomInArray } from "../utils";

export const _homeComics = [...Array(25)].map((_, index) => ({
    id: _mock.id(index),
    coverUrl: randomInArray(['https://i.pinimg.com/originals/8a/e4/dd/8ae4dd5ff3b8418be38d922e960d8aec.jpg', 'https://i.pinimg.com/originals/d0/0b/20/d00b20378b3c5d5ab665293c517c3746.jpg']),
    rating: _mock.number.rating(index),
    name: 'Quản lý Kim',
    status: randomInArray(['ongoing', 'hiatus', 'finished', 'canceled'])
}));
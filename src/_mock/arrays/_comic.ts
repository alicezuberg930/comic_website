import _mock from "../_mock";
import { randomInArray } from "../utils";

export const _homeComics = [...Array(25)].map((_, index) => ({
    id: _mock.id(index),
    coverUrl: randomInArray(['https://freesvg.org/img/Placeholder.png']),
    rating: _mock.number.rating(index),
    name: 'Quản lý Kim',
    status: randomInArray(['ongoing', 'hiatus', 'finished', 'canceled']),
    catergories: ["Fantasy", "Action", "Drama"]
}));
import axios from "axios";
//217.25.225.213 graphico.ru
export const $api = axios.create({
  baseURL: "https://graphico.ru/api",
  headers: {
    Host: "217.25.225.213 graphico.ru",
  },
});

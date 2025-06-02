import { IUsersData } from "@/pages/UserPage/model/IUsersData.ts";

export const usersData: IUsersData[] = [
  {
    id: 0,
    name: "Oleg",
    username: "artist",
    photo:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/9d6041b0e26e1e9c7e315b5ea8faca82-1631376227684/637fa57f-63db-493e-9802-e2c53c3b28b1.jpg",
    about:
      "Привет, меня зовут Олег, живу в Воронеже! Я профессиональный иллюстратор с более чем 5-летним опытом. Мои работы ценят за уникальность и качество. Гарантирую быстрое и внимательное выполнение заказов!",
    role: "artist",
    works_id: [1],
  },
  {
    id: 1,
    username: "user",
    name: "Иван Иванов",
    about: "Расскажите о себе",
    role: "user",
    orders_id: [1, 2],
  },

  {
    id: 3,
    username: "admin",
    name: "Админ Админов",
    photo:
      "https://sun9-12.userapi.com/impg/HoigPS4GsrZjr6TZYNSuEtWnIetunRd3t5dkmQ/fajJxj1QsYc.jpg?size=1600x1200&quality=95&sign=2902a997707d03d9feab6a419b30a1aa&type=album",
    role: "admin",
  },
];

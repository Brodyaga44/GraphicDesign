export interface IApplication {
  id: number;
  login: string;
  name: string;
  about?: string;
  role: "user" | "artist";
  skills?: string;
  directions?: string[];
  works?: string[];
  photo?: string;
}

export const applicationsData: IApplication[] = [
  {
    id: 1,
    login: "user123",
    name: "Дмитрий",
    role: "user",
    photo:
      "https://sun9-42.userapi.com/impg/TySoyM1aQssJmRsSXEu8wBvdbi9gbbyKP0YP5w/wcxeAPYII9M.jpg?size=720x673&quality=95&sign=5aef3de5cefa0df2ae124d27dac09c68&type=album",
  },
  {
    id: 2,
    login: "artist456",
    name: "Влад Петров",
    about: "Опытный дизайнер с 5-летним стажем.",
    role: "artist",
    skills: "Photoshop, Illustrator, Figma",
    directions: ["3д-модели", "Дизайн печатной продукции"],
    works: [
      "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/78568181/original/550265b9f21cf297cf52d9cbe8cfb40042fc8fdc.png",
      "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs3/78568181/original/79852f53c9084e820594e88a06553323321f1600.png",
    ],
    photo:
      "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6627d27154db145badd240cd_6627d4ef1850a449f7018f57/scale_1200",
  },
];

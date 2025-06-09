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
  },
];

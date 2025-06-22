export interface IWork {
  imageUrl: string;
  altText?: string;
  caption?: string;
}

export interface IProductDetails {
  id: number;
  title: string;
  price: number;
  description: string[];
  works: IWork[];
}

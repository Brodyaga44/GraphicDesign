export interface IWork {
  imageUrl: string;
  altText?: string;
  caption?: string;
}

export interface IProductDetails {
  id: number;
  title: string;
  description: string[];
  works: IWork[];
}

export interface IProductDetails {
  id: number;
  title: string;
  price: number;
  description: string[];
  works: IWorks[];
}
export interface IWorks {
  imageUrl: string;
  altText?: string;
  caption?: string;
}

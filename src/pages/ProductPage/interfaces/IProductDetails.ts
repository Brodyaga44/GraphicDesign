export interface IProductDetails {
  id: number;
  title: string;
  description: string[];
  works: IWorks[];
}
export interface IWorks {
  imageUrl: string;
  altText?: string;
  caption?: string;
}

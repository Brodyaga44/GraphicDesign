import { IProducts } from "@/widgets/CategoryProducts/model/IProducts.ts";

export interface IProductFilters {
  products: IProducts[];
  onFilter: (filteredProducts: IProducts[]) => void;
}

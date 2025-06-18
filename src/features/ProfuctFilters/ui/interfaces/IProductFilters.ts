import { ICategoryData } from "@/pages/CategoryPage/ui/interfaces/ICategoryItems.ts";
import { IProducts } from "@/widgets/CategoryProducts/model/IProducts.ts";

export interface IProductFilters {
  products: ICategoryData[];
  onFilter: (filteredProducts: ICategoryData[]) => void;
  getCategory: VoidFunction;
}

import { RouterStateUrl } from '.';
import { ProductsState } from './products';
export interface AppState {
  products: ProductsState;
  router: RouterStateUrl;
}

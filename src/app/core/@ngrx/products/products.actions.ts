import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const getProducts = createAction(
  '[Product List Page (App)] GET_PRODUCTS'
);

export const getProductsSuccess = createAction(
  '[Get Products Effect] GET_PRODUCTS_SUCCEESS',
  props<{ products: Product[] }>()
);

export const getProductsError = createAction(
  '[Get Products Effect] GET_PRODUCTS_ERROR',
  props<{ error: Error | string }>()
);

export const createProduct = createAction(
  '[Product Form Page] CREATE_PRODUCT',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Create Product Effect] CREATE_PRODUCT_SUCCESS',
  props<{ product: Product }>()
);

export const createProductError = createAction(
  '[Create Product Effect] CREATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const updateProduct = createAction(
  '[Product Form Page] UPDATE_TASK',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Update Product Effect] UPDATE_PROUCT_SUCCESS',
  props<{ product: Product }>()
);
export const updateProductError = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const deleteProduct = createAction(
  '[Product List Page] DELETE_TASK',
  props<{ product: Product }>()
);

export const deleteProductSuccess = createAction(
  '[Delete Product Effect] DELETE_PRODUCT_SUCCESS',
  props<{ product: Product }>()
);

export const deleteProductError = createAction(
  '[Delete Product Effect] DELETE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

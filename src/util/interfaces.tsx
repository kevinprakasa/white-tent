export interface IMenuItemType {
  categories: string[];
  name: string;
  photo_url: string;
  product_id: string;
  information: string;
  original_price: number;
  discount_price: number;
  orderAmount: number;
}

export interface IMenuJsonListType {
  [key: string]: IMenuItemType[];
}

export interface IOrderedItemType {
  [key: string]: IMenuItemType;
}

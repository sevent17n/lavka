export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  discount?: number;
  count: number;
  weight: number;
}

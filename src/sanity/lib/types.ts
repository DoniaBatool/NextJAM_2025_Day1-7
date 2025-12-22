export type Product = {
    _id: string;
    category: {
        name: string; // Dereferenced name field from category
      } | null;
    name: string;
    description:string;
    price:number;
    slug:string;
    dimensions: {
        height: string;
        depth: string;
        width: string;
      } | null;
    quantity: number;
    features: string[] | null; // Array of strings for features
    tags: string[];
    imageUrl: string; // Resolved URL from the image asset
}


export interface CartItem {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
  productDescription: string;
  stock: number;
  isRenovate: boolean;
  serviceType: "Purchase" | "Customize" | "Renovate";
}
export interface CustomerInfo {
  fullName: string;
  email: string;
  deliveryAddress: string;
  contactNumber: string;
}
export interface SimpleCartItem {
  productName: string;
  productDescription: string;
  quantity: number;
  serviceType: "Purchase" | "Customize" | "Renovate";
  productPrice: number;
}
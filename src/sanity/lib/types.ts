export type Product = {
    _id: string;
    category: {
        name: string; // Dereferenced name field from category
      } 
    name: string;
    description:string;
    price:number;
    slug:string;
    dimensions: {
        height: string;
        depth: string;
        width: string;
      };
    quantity: number;
    features: string[]; // Array of strings for features
    tags: string[];
    imageUrl: string; // Resolved URL from the image asset
}
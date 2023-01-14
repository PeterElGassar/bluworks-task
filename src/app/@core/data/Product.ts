
export class Product {
  
    id?: number=0;
    title: string='';
    description:string= '';
    category?:string= '';
    brand?:string= '';
    price?:number = 0;
    discountPercentage?: number =0;
    rating?:number= 0;
    stock?:number = 0;
    thumbnail?:string ='';
    images?: string []= [];
}
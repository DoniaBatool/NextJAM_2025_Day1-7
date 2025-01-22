import Image from "next/image";
import Link from "next/link";



interface ProductCardProps1 {
  image: string;
  proname: string;
  proprice: number;
  slug:string;
  category:string;
  
}
interface ProductCardProps2 {
  image: string;
  proname: string;
  proprice: number;
  slug:string;
  category:string;
  tag:string
  
}

const ProductCardT = ({ image, proname, proprice,category,slug}: ProductCardProps2) => {
  return (
    <div className="w-full max-w-[305px] h-[480px]">
      <Image
        src={image}
        alt="product image"
        width={305}
        height={480}
        className="w-full h-full " // Ensures consistent image size
      />
      <h4 className="pt-[24px] font-clash text-mytext text-[20px] leading-[140%]">
        {proname}
      </h4>
      <p className="pt-[8px]  pb-3 text-[18px] font-satoshi text-mytext leading-[150%]">
        £{proprice} {/* Add pound symbol here */}
      </p>
      <Link href={`/products/${category}/${slug}`}
        className="mt-[16px] px-[16px] py-[8px] bg-black text-white font-satoshi rounded-md hover:bg-slate-700 transition-all">
          View Details
        </Link>
    </div>
  );
};
export default ProductCardT;


//on the bases of slug
export const ProductCardE = ({ image, proname, proprice, category, slug }: ProductCardProps1) => {
  return (
    <div className="w-full max-w-[305px] h-[480px] block">
        <Image
          src={image}
          alt="product image"
          width={305}
          height={480}
          className="w-full h-full "
        />
        <h4 className="pt-[24px] font-clash text-mytext text-[20px] leading-[140%]">
          {proname}
        </h4>
        <p className="pt-[8px] pb-3 text-[18px] font-satoshi text-mytext leading-[150%]">
          £{proprice}
        </p>
        <Link href={`/products/${category}/${slug}`}
        className="mt-[16px] px-[16px] py-[8px] bg-black text-white font-satoshi rounded-md hover:bg-slate-700 transition-all">
          View Details
        </Link>
        </div>
  );
};

//onthe bases of category

export const ProductCardS = ({ image, proname, proprice, category}: ProductCardProps1) => {
  return (
    <div className="w-full max-w-[305px] h-[480px] block">
        <Image
          src={image}
          alt="product image"
          width={305}
          height={480}
          className="w-full h-full "
        />
        <h4 className="pt-[24px] font-clash text-mytext text-[20px] leading-[140%]">
          {proname}
        </h4>
        <p className="pt-[8px] pb-3 text-[18px] font-satoshi text-mytext leading-[150%]">
          £{proprice}
        </p>
        <Link href={`/products/${category}`}
        className="mt-[16px] px-[16px] py-[8px] bg-black text-white font-satoshi rounded-md hover:bg-slate-700 transition-all">
          View Details
        </Link>
        </div>
  );
};




//on the bases of slug , customizes tailwind for sofa pic
export const ProductCard2 = ({ image, proname, proprice,category,slug}: ProductCardProps1) => {
  return (
    <div className="w-full max-w-[630px] h-auto sm:h-[480px] ">
      <Image
        src={image}
        alt="product image"
        width={630}
        height={375}
        className="w-full h-full object-cover" // Ensures consistent image size
      />
      <h4 className="pt-[24px] font-clash text-mytext text-[20px] leading-[140%]">
        {proname}
      </h4>
      <p className="pt-[8px] pb-3 text-[18px] font-satoshi text-mytext leading-[150%]">
      £{proprice}
      </p>
      <Link href={`/products/${category}/${slug}`}
        className="mt-[16px] px-[16px] py-[8px] bg-black text-white font-satoshi rounded-md hover:bg-slate-700 transition-all">
          View Details
        </Link>
    </div>
  );
};
  
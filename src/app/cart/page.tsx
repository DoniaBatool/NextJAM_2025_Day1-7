
import Topbar from '../components/topbar'

import Image from 'next/image'

const Cartpage = () => {
  return (
    <main>
        <div className="max-w-[1440px] mx-auto">
        
        <Topbar/>
  </div>
         
  <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 bg-[#F9F9F9]">
  <div className="max-w-[1064px] h-[1000px] md:h-[700px] mx-auto bg-[#F9F9F9]">
    {/* Header */}
    <div className="pt-8 px-4 sm:px-10">
      <h1 className="font-clash text-[24px] sm:text-[36px] leading-[140%] text-mytext">
        Your shopping cart
      </h1>
    </div>

    {/* Table Headers */}
    <div className="hidden md:flex mt-8 text-sm sm:text-[14px] justify-between font-clash text-mytext px-8">
      <div className="flex-1">
        <h6>Product</h6>
      </div>
      <div className="w-[200px] text-center mr-[30px]">
        <h6>Quantity</h6>
      </div>
      <div className="w-[100px] text-right">
        <h6>Total</h6>
      </div>
    </div>

    {/* Divider */}
    <div className="w-full border border-[#EBE8F4] my-4"></div>

    {/* Products */}
    <div className="space-y-6">
      {/* Product 1 */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 px-4 sm:px-10">
        <div className="w-[109px]">
          <Image src="/cart/Product1.png" alt="product image" width={109} height={134} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-mytext font-clash text-[18px] sm:text-[20px] leading-[140%]">
            Graystone vase
          </h4>
          <p className="text-[12px] sm:text-[14px] leading-[150%] font-satoshi text-mytext">
            A timeless ceramic vase with <br /> a tri-color grey glaze.
          </p>
          <p className="text-[12px] sm:text-[14px] font-satoshi text-mytext hidden md:flex">
            £85
          </p>
        </div>
        <div className="w-[200px] flex justify-center items-center gap-4 md:gap-6">
          <button className="text-slate-500">-</button>
          <p className="text-mytext text-[14px] sm:text-[16px]">1</p>
          <button className="text-slate-500">+</button>
        </div>
        <div className="w-[100px] md:text-right text-mytext text-[16px] sm:text-[18px] text-center">£85</div>
      </div>

      {/* Product 2 */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 px-4 sm:px-10">
        <div className="w-[109px]">
          <Image src="/cart/Product2.png" alt="product image" width={109} height={134} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-mytext font-clash text-[18px] sm:text-[20px] leading-[140%]">
            Basic white vase
          </h4>
          <p className="text-[12px] sm:text-[14px] leading-[150%] font-satoshi text-mytext">
            Beautiful and simple, this is <br /> one for the classics.
          </p>
          <p className="text-[12px] sm:text-[14px] font-satoshi text-mytext hidden md:flex">
            £125
          </p>
        </div>
        <div className="w-[200px] flex justify-center items-center gap-4 md:gap-6">
          <button className="text-slate-500">-</button>
          <p className="text-mytext text-[14px] sm:text-[16px]">1</p>
          <button className="text-slate-500">+</button>
        </div>
        <div className="w-[100px] md:text-right text-mytext text-[16px] sm:text-[18px] text-center">£125</div>
      </div>
    </div>

    {/* Divider */}
    <div className="w-full border border-[#EBE8F4] my-4"></div>

    {/* Subtotal Section */}
    <div className="flex flex-col items-end px-4 sm:px-10 gap-4">
      <div className="flex items-center gap-4">
        <h4 className="text-[#4E4D93] text-[18px] sm:text-[20px] font-clash leading-[140%]">
          Subtotal
        </h4>
        <h3 className="text-[20px] sm:text-[24px] font-clash text-mytext">£210</h3>
      </div>
      <p className="text-[#4E4D93] font-satoshi text-[12px] sm:text-[14px] leading-[150%]">
        Taxes and shipping are calculated at checkout
      </p>
      <button
        className="text-white text-[14px] w-full sm:text-[16px] sm:w-[172px] font-satoshi leading-[150%] cursor-pointer 
          px-6 sm:px-8 py-3 sm:py-4 bg-mytext hover:border rounded-sm text-nowrap"
      >
        Go to checkout
      </button>
    </div>
  </div>
</div>

</main>
  )
}

export default Cartpage
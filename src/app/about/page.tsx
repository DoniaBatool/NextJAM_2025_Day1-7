
import Club from "../components/club"
import Feature from "../components/feature"
import Navbar from "../components/navbar"
import Image from "next/image"
import { blacksofa,yellowsofa } from "@/sanity/lib/queries"
import { Product } from "@/sanity/lib/types"
import { sanityFetch } from "@/sanity/lib/fetch"
import Link from "next/link"

export default async function  About (){
  const data1 :Product= await sanityFetch({ query:yellowsofa });
  const data2 :Product= await sanityFetch({ query:blacksofa });

  return (
    <div>
        <Navbar/>
        <div className="max-w-[1440px] w-full mx-auto mb-[100px]">
  <div className="max-w-[1280px] flex flex-col md:flex-row xs:items-center md:justify-between mx-auto px-4">
    {/* Text Section */}
    <div className="w-full md:w-[704px] mt-[88px] text-[32px] font-clash leading-[140%] text-mytext text-left xs:text-center md:text-left">
      A brand built on the love of craftsmanship,
      <br />
      quality and outstanding customer service.
    </div>

    {/* Button Section */}
    <button className="bg-[#F9F9F9]  hover:bg-slate-600 hover:text-white text-nowrap rounded-sm px-[32px] py-[16px] mt-[32px] md:mt-[78px] font-satoshi leading-[150%] text-[16px] w-full md:w-auto lg:w-[192px] h-[56px] text-center">
      <Link href="/products">View our products</Link>
    </button>
  </div>
</div>


<div className="max-w-[1280px] items-center flex flex-col md:flex-row justify-center mx-auto px-4 lg:gap-[20px]">
  {/* Left Content Div */}
  <div className="w-full sm:w-full md:w-[630px] h-auto sm:h-auto md:h-[478px] flex flex-col gap-[50px] sm:gap-[50px] md:gap-[100px] bg-mytext text-white p-4 md:p-6">
    <div className="mt-[32px] sm:mt-[32px] md:mt-[64px] text-[18px] font-satoshi text-left">
      <span className="text-[32px] font-clash">It started with a small idea</span>
      <br />
      <br />
      A global brand with local beginnings, our story began in a
      <br />
      small studio in South London in early 2014.
    </div>
    <button className="w-full sm:w-full md:w-[278px] hover:bg-slate-600  h-[56px] text-white text-[16px] font-satoshi leading-[150%]  rounded-sm bg-[#F9F9F9]/15">
    <Link href="/tags/popular products">View collection</Link>
    </button>
  </div>

  {/* Right Image Div */}
  <div className="w-full sm:w-full lg:w-1/2 flex justify-center items-center mt-4 md:mt-0">
    <div className="w-full h-auto">
      <Image
        src={data1.imageUrl}
        alt="about image"
        width={630}
        height={478}
        className="w-full sm:w-full h-auto object-cover mx-auto md:w-[630px] md:h-[478px]"
      />
    </div>
  </div>
</div>



<div className="max-w-[1440px] flex flex-col  md:flex-row mx-auto justify-center px-4 lg:px-0 mt-[50px] mb-[100px] items-center">
  {/* Image Section */}
  <div className="w-full max-w-[720px] h-auto md:h-[603px] flex justify-center mb-4 md:mb-0">
    <Image src={data2.imageUrl} alt="about image 2" width={720} height={603} className="w-full h-auto object-cover" />
  </div>

  {/* Content Section */}
  <div className="w-full max-w-[720px] h-[550px] md:h-[603px] bg-[#F9F9F9] lg:h-[603px] flex flex-col justify-between lg:justify-start px-4 lg:px-0">
    <div className="mt-[72px] lg:mt-[72px] flex flex-col xs:gap-[80px] sm:gap-[60px] md:gap-[40px] items-start mx-auto md:px-4">
      {/* Heading and Description */}
      <div className="gap-[20px] flex flex-col w-full  lg:w-[536px] ">
        <div className="font-clash text-[24px] leading-[140%] text-mytext">
          Our service isn&apos;t just personal, it&apos;s actually hyper personally exquisite
        </div>
        <div className="font-satoshi text-[16px] text-[#505977]">
          When we started Avion, the idea was simple. Make high quality furniture
          affordable and available for the mass market.
        </div>
        <div className="font-satoshi text-[16px] text-[#505977]">
          Handmade, and lovingly crafted furniture and homeware is what we live, breathe, and design so our Chelsea boutique becomes the hotbed for the London interior design community.
        </div>
      </div>

      {/* Button */}
      <button  className="w-full lg:w-[150px] h-[56px]  bg-white rounded-sm hover:text-white hover:bg-slate-600 text-mytext text-[16px] mt-[20px]">
       <Link href="/feedback">Get in touch</Link> 
      </button>
    </div>
  </div>
</div>

    
            <Feature/>
           <Club/>


    </div>
  )
}



import { sanityFetch } from "@/sanity/lib/fetch";
import { lastsec } from "@/sanity/lib/queries";
import { Product } from "@/sanity/lib/types";
import Image from "next/image";
import Link from "next/link";

async function Sectionlast () {
   const data: Product= await sanityFetch({ query:lastsec });
  return (
    <section className="flex flex-col lg:flex-row max-w-[1440px] w-full h-auto gap-[40px] sm:gap-[80px] lg:gap-[170px] px-4 sm:px-8 lg:px-0 mx-auto">
      {/* Left Content */}
      <div className="flex flex-col gap-4 mt-8 sm:mt-[72px] lg:ml-[50px] w-full lg:w-[536px] lg:pl-[40px] items-center lg:items-start text-center lg:text-left">
        <p className="font-clash leading-[140%] text-[18px] sm:text-[20px] lg:text-[24px] text-mytext">
          From a studio in London to a global brand with
          <br className="hidden sm:block" />
          over 400 outlets
        </p>
        <p className="font-satoshi text-[14px] sm:text-[16px] text-[#505977]">
          When we started Avion, the idea was simple. Make high-quality furniture
          <br className="hidden sm:block" />
          affordable and available for the mass market.
        </p>
        <p className="font-satoshi text-[14px] sm:text-[16px] text-[#505977]">
          Handmade, and lovingly crafted furniture and homeware is what we live,
          <br className="hidden sm:block" />
          breathe, and design so our Chelsea boutique became the hotbed for the
          <br className="hidden sm:block" />
          London interior design community.
        </p>

        {/* Button */}
        <div className="flex justify-center sm:justify-center lg:justify-start mt-4 sm:mt-[40px]">
          <button className="bg-[#F9F9F9] rounded-sm hover:bg-slate-600 hover:text-white w-[342px] lg:w-[150px] h-[56px] text-center py-[16px] text-[16px] font-satoshi leading-[150%] text-mytext">
            <Link href="/feedback">Get in touch</Link>
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-[720px] lg:pr-0 flex justify-center lg:ml-[50px] lg:justify-end mt-8 lg:mt-0">
        <Image
          src={data.imageUrl}
          alt="image"
          width={720}
          height={430}
          className="max-w-full h-auto lg:w-[720px] lg:object-cover object-cover"
        />
      </div>
    </section>
  );
};

export default Sectionlast;

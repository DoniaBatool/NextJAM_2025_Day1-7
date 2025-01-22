const Club = () => {
  return (
    <section  className="max-w-[1440px] w-full h-[481px] bg-[#F9F9F9] flex justify-center items-center mx-auto">
      {/* Inner Container */}
      <div className="max-w-[1280px] w-full h-[364px] bg-white my-[52px] px-4">
        {/* Heading and Text */}
        <div className="flex flex-col gap-[16px] mt-[68px] items-start xs:items-center">
          <div>
            <h1  id="touch" className="text-nowrap font-clash text-[20px] sm:text-[36px] leading-[140%] text-mytext text-left xs:text-center">
              Join the club and get the benefits
            </h1>
          </div>
          <div className="flex flex-col  items-start xs:items-center xs:text-center font-satoshi text-[14px] xs:text-[16px] leading-[150%] text-mytext">
            <p>Sign up for our newsletter and receive exclusive</p> 
           <p> offers on new ranges, sales, pop-up stores, and more</p>
          </div>
        </div>

        {/* Input and Button */}
        <div className="mt-[70px] flex flex-row xs:justify-center justify-start ">
          <input
            type="text"
            placeholder="your@email.com"
            className="w-[224px] xs:w-[354px] h-[56px] bg-[#F9F9F9] font-satoshi text-[16px] text-mytext pl-[32px] border border-[#4E4D93]"
          />
          <button
            type="submit"
            className="w-[118px] h-[56px] text-white font-satoshi text-[16px] leading-[150%] bg-mytext border border-[#4E4D93]"
          >
            Sign up
          </button>
        </div>
      </div>
    </section>
  );
};

export default Club;

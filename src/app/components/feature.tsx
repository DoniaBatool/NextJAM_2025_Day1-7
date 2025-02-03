import Card from "./card";

const Feature = () => {
  return (
    <section className="max-w-[1280px] mx-auto flex flex-col justify-center mt-[40px] mb-[130px] px-5">
      {/* Heading */}
      <div className="mb-[60px]">
        <h3 className="text-[40px] md:text-[30px] text-left md:text-center font-clash leading-[140%] text-[#2A254B]">
          What makes our brand different
        </h3>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-between gap-[30px] md:gap-[60px]">
        <Card
          image="/card/Delivery.png"
          heading="Next day as standard"
          line1="Order before 3pm and get your order"
          line2="the next day as standard"
        />
        <Card
          image="/card/Checkmark.png"
          heading="Made by true artisans"
          line1="Handmade crafted goods made with"
          line2="real passion and craftsmanship"
        />
        <Card
          image="/card/Purchase.png"
          heading="Unbeatable prices"
          line1="For our materials and quality you"
          line2="won't find better prices anywhere"
        />
        <Card
          image="/card/Sprout.png"
          heading="Recycled packaging"
          line1="We use 100% recycled packaging to"
          line2="ensure our footprint is manageable"
        />
      </div>
    </section>
  );
};

export default Feature;

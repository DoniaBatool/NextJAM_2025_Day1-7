import Image from 'next/image'


interface cardprop {
    image:string;
    heading:string;
    line1:string
    line2:string
}
const Card = ({image, heading, line1,line2}:cardprop) => {
  return (
    <main>
    <div className='flex flex-col gap-[16px]'>
        <Image src={image} alt="icon" width={24} height={24}/>
        
        <h4 className="text-[20px] font-clash leading-[140%] text-[#2A254B]">{heading}</h4>
    </div>

    <div className='mt-[8px] text-[16px] font-satoshi leading-[150%] text-[#2A254B]'>  
        <p>{line1}</p>
        <p>{line2}</p>
    </div>
    </main>
  )
}

export default Card
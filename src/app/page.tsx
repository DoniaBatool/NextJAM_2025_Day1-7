import Feature from "@/app/components/feature"
import Banner from "./components/banner";
import Topbar from "@/app/components/topbar"
import Ceramics from "./components/ceramics";
import PopularProducts from "./components/popularProducts";
import Club from "./components/club";
import Sectionlast from "./components/sectionlast";



export default function Home() {
  return (
    
    
      <div>
     <Topbar/>
     <Banner/>
     <Feature/>
     <Ceramics/>
     <PopularProducts/>
     <Club/>
     <Sectionlast/>

     
    </div>
  );
}
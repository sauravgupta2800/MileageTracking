import DataCard from "./../components/home/DataCard";
import { cardList } from "../components/home/config";

const Home = () => {
  return (
    <div className="w-100 h-100 px-4 pt-4 mt-scroll-y">
      {cardList.map((card, index) => (
        <DataCard {...card} key={index} />
      ))}
    </div>
  );
};

export default Home;

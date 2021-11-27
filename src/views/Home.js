import DataCard from "./../components/home/DataCard";
import { cardList } from "../components/home/config";
import { useSelector } from "react-redux";

const Home = () => {
  const info = useSelector((state) => state.refueling);
  const computedCardList = cardList.map(({ items, ...rest }) => {
    return {
      ...rest,
      items: items.map(({ mainText, label, title, ...restItem }) => {
        return {
          ...restItem,
          ...(mainText ? { mainText: mainText(info) } : {}),
          ...(label
            ? typeof label === "function"
              ? { label: label(info) }
              : { label }
            : {}),
          ...(title
            ? typeof title === "function"
              ? { title: title(info) }
              : { title }
            : {}),
        };
      }),
    };
  });
  return (
    <div className="w-100 h-100 px-4 pt-4 mt-scroll-y">
      {computedCardList.map((card, index) => (
        <DataCard {...card} key={index} />
      ))}
    </div>
  );
};

export default Home;

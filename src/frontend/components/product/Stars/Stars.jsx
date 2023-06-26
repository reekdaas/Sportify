import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export default function Stars({ rating }) {
  const arrOfStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {rating > number ? (
          <BsStarFill />
        ) : rating > index ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  // console.log(arrOfStars);
  return <div>{arrOfStars}</div>;
}

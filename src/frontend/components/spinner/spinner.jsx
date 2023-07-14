import { RotatingLines } from "react-loader-spinner";
export default function Spinner() {
  return (
    <>
      <RotatingLines
        strokeColor="#2962ff"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </>
  );
}

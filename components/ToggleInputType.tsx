import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function ToggleInputType({ classStyle, type, onclick }: any) {
  const handleClick = () => {
    onclick();
  };

  if (type == "text")
    return <AiFillEye className={classStyle} onClick={handleClick}></AiFillEye>;
  return (
    <AiFillEyeInvisible
      className={classStyle}
      onClick={handleClick}
    ></AiFillEyeInvisible>
  );
}

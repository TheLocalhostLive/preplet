import React from "react";

export default function ImgCard() {
  return (
    <div className="each-slide h-[400px] w-[400px] border-2 drop-shadow">
      <div className="p-6 flex flex-col items-center">
        <img src="./img/best.jpg" alt="" />
        <h3 className="mt-5 mb-2 text-midnight font-semibold text-lg">
          <span>Learn from the best</span>
        </h3>
      </div>
    </div>
  );
}

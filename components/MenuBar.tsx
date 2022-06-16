import React from "react";
import Link from "next/link";

interface MenuProps {
  className: string;
}

export default function MenuBar({ className }: MenuProps) {
  return (
    <div
      className={`w-[300px] flex flex-col h-full mx-2 sticky top-2 left-0 ${className}`}
    >
      {/* close button */}
      <div className="flex justify-end opacity-0">
        <svg
          width="16"
          height="16"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4" cy="4" r="4" fill="#ff0000" />
        </svg>
      </div>
      {/* name and image */}
      <div className="flex items-center">
        <img src="http://localhost:3000/avtar.webp" className="h-20" />
        <span>Joydeep Bhattacharjee</span>
      </div>
      {/* list */}
      <div className="">
        <ul className="">
          <li className="bg-gradient-to-b from-[rgba(234, 229, 229, 0.6)] to-[rgba(246, 246, 246, 0.36)]">
            <Link href="/questionViewer/chapter_wise/chem/atomic_structure">
              Item 2
            </Link>
          </li>
          <li>
            <Link href="/questionViewer/chapter_wise/phys/atomic_structure">
              Item 2
            </Link>
          </li>
          <ul>
            <li>Item 2a</li>
            <li>Item 2b</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

/*


position: absolute;
width: 130px;
height: 21px;
left: 35px;
top: 230px;

background: linear-gradient(180deg, rgba(234, 229, 229, 0.6) 0%, rgba(246, 246, 246, 0.36) 100%);
border-radius: 5px;
*/

import TextEditor from "./TextEditor";
import { FaTrash, FaSave } from "react-icons/fa";
import { useState } from "react";

export default function JeletQnaAdder() {
  return (
    <div className="flex flex-col items-center border-2 h-[110vh]">
      {/* wrapper */}
      <div className="border-4 p-4 rounded-xl h-[700px]">
        {/* top bar */}
        <div className="flex justify-end align-center h-7 p-10">
          <div className="rounded p-2 h-[30px] flex items-center m-2 cursor-pointer bg-red-600 text-white">
            <span>Delete</span>
            <FaTrash className="m-2" />
          </div>
          <div className="rounded bg-red p-2 h-[30px] flex items-center m-2 cursor-pointer bg-green-600 text-white">
            <span>Save</span>
            <FaSave className="m-2 " />
          </div>
        </div>

        {/* question */}
        <div className="flex h-1/3 w-[42rem] mb-20">
          <TextEditor placeholder="Type Question Here..." />
        </div>

        {/* Solution */}
        <div className="flex h-1/3 w-[42rem]">
          <TextEditor placeholder="Type Solution Here..." />
        </div>
      </div>
    </div>
  );
}

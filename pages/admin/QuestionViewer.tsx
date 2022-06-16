import SearchBox from "../../components/SearchBox";
import QnaCard from "../../components/QnaCard";
import MenuBar from "../../components/MenuBar";
import { MdAddCircle } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";

import { useEffect, useState, useContext } from "react";

export default function QuestionViewer() {
  const { isAdmin } = useContext(AuthContext);
  const [showStickySubjectName, setShowStickySubjectName] = useState(false);

  const scrollListener = () => {
    if (window.scrollY >= 96 && !showStickySubjectName) {
      setShowStickySubjectName(true);
      console.log("re render");
    } else if (window.scrollY < 96 && showStickySubjectName) {
      setShowStickySubjectName(false);
      console.log("re render 2");
    }
    console.log(showStickySubjectName);
    console.log(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="flex relative">
      <MenuBar className="hidden sm:flex" />
      <div className="flex flex-col w-full">
        {/* heading */}
        <div className="flex h-24 items-center px-5">
          <AiOutlineMenu className="sm:hidden flex h-6 w-7 ml-1 mr-4" />
          {<span className="font-beba text-5xl">Chemistry</span>}
        </div>

        <div className="bg-[#EFEFEF] min-h-screen p-5 flex flex-col items-center rounded-tc">
          {/*Sticky header*/}
          <div
            className={
              !showStickySubjectName
                ? "rounded-tc "
                : " " +
                  "z-50 flex flex-col justify-center sticky sm:w-full w-screen sm:h-[90px] h-[100px] top-0 bg-[#EFEFEF]"
            }
          >
            {showStickySubjectName ? (
              <div className="flex items-center md-3">
                <AiOutlineMenu className="sm:hidden flex h-6 w-7 mx-5" />
                <span className="font-beba text-3xl ">Chemistry</span>
              </div>
            ) : (
              <span className="font-beba text-3xl opacity-0">Chemistry</span>
            )}

            <div className="w-full flex justify-center items-center">
              <SearchBox />
            </div>
          </div>

          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          ].map(k => (
            <QnaCard key={k} />
          ))}
        </div>
      </div>
      {isAdmin && (
        <MdAddCircle className="fixed top-[90vh] left-[90vw] text-[50px] cursor-pointer" />
      )}
    </div>
  );
}

/*


position: absolute;
width: 124px;
height: 50px;
left: 51px;
top: 39px;

font-family: 'Salsa';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 25px;
text-align: center;

color: #030303;

*/

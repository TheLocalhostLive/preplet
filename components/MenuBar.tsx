import React, { useState } from "react";
import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";
import SearchBox from "./SearchBox";

interface MenuProps {
  className: string;
}
async function fetchData() {
  const result = await fetch("http://localhost:3000/menu.yaml");
  const data = await result.json();
  console.log(data);
}
const chapterWiseBaseURL = "/questionViewer/chapter_wise";
const prevYearBaseURL = "/questionViewer/prev_year";
export default function MenuBar({ className }: MenuProps) {
  const [isJeletChapterWiseOpen, setJeletChapterWiseOpen] = useState(true);
  const [isPhysicsSubjectOpen, setPhysicsSubjectOpen] = useState(false);
  const [isChemSubjectOpen, setChemSubjectOpen] = useState(false);
  const [isMathSubjectOpen, setMathSubjectOpen] = useState(false);
  const [isFEEESubjectOpen, setFEEESubjectOpen] = useState(false);
  const [isPrevYearOpen, setPrevYearOpen] = useState(false);
  //const years = [2021, 2022];
  const [years, setYearOpen] = useState([
    { value: 2022, isOpen: false },
    { value: 2021, isOpen: false },
  ]);
  const toggleYearVisibility = (e: any) => {
    const targetYear = e.target.id;
    console.log(e.target.id);
    const newYearArray = years.map((year: any) => {
      if (year.value == targetYear) {
        return {
          value: year.value,
          isOpen: !year.isOpen,
        };
      }
      return year;
    });
    //console.log(newYearArray);
    setYearOpen(newYearArray);
  };
  return (
    <div
      className={`w-[340px] font-serif flex flex-col h-screen mx-2 sticky top-2 left-0 ${className}`}
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
      <SearchBox width={"200px"} bg={"#EFEFEF"} />
      {/* list */}
      <div className="overflow-y-scroll">
        <ul>
          <Link href="/Dashboard">
            <li>
              <h1 className="menu-items">Dashboard</h1>
            </li>
          </Link>

          <li>
            <span
              onClick={() => setJeletChapterWiseOpen(!isJeletChapterWiseOpen)}
              className="menu-items flex justify-between items-center"
            >
              <h1>Jelet TopicWise Questions</h1>
              <AiFillCaretDown
                className={
                  isJeletChapterWiseOpen ? "rotate-[90px]" : "rotate-[270deg]"
                }
              />
            </span>

            <ul className={"ml-2 " + (isJeletChapterWiseOpen ? "" : "hidden")}>
              {/* Physics */}
              <li>
                <span
                  onClick={() => setPhysicsSubjectOpen(!isPhysicsSubjectOpen)}
                  className="menu-items flex justify-between items-center"
                >
                  <h1>Physics</h1>
                  <AiFillCaretDown
                    className={
                      isPhysicsSubjectOpen ? "rotate-[90px]" : "rotate-[270deg]"
                    }
                  />
                </span>
                <ul
                  className={"ml-2 " + (isPhysicsSubjectOpen ? "" : "hidden")}
                >
                  <Link
                    href={
                      chapterWiseBaseURL +
                      "/phys/unit_dimesions_and_measurement"
                    }
                  >
                    <li>
                      <h1 className="menu-items">
                        Unit, Dimesions and measurement
                      </h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/phys/kinamatics"}>
                    <li>
                      <h1 className="menu-items">Kinamatics</h1>
                    </li>
                  </Link>

                  <Link
                    href={chapterWiseBaseURL + "/phys/work_power_and_energy"}
                  >
                    <li>
                      <h1 className="menu-items">Work Power and energy</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/phys/gravitation"}>
                    <li>
                      <h1 className="menu-items">Gravitation</h1>
                    </li>
                  </Link>

                  <Link href={chapterWiseBaseURL + "/phys/elasticity"}>
                    <li>
                      <h1 className="menu-items">Elasticity</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/phys/surface_tension"}>
                    <li>
                      <h1 className="menu-items">Surface Tension</h1>
                    </li>
                  </Link>
                  <Link
                    href={
                      chapterWiseBaseURL + "/phys/fluid_mechanics_hydrostatics"
                    }
                  >
                    <li>
                      <h1 className="menu-items">
                        Fluid mechanics / Hydrostatics
                      </h1>
                    </li>
                  </Link>

                  <Link
                    href={
                      chapterWiseBaseURL + "/phys/thermal_expansion_of_solid"
                    }
                  >
                    <li>
                      <h1 className="menu-items">Thermal Expansion of solid</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/phys/transmition_of_heat"}>
                    <li>
                      <h1 className="menu-items">Transmition of heat</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/phys/thermodynamics"}>
                    <li>
                      <h1 className="menu-items">Thermodynamics</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/phys/reflection_of_light"}>
                    <li>
                      <h1 className="menu-items">Reflection of light</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/phys/lens"}>
                    <li>
                      <h1 className="menu-items">Lens</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/phys/photoelectricity"}>
                    <li>
                      <h1 className="menu-items">Photoelectricity</h1>
                    </li>
                  </Link>
                </ul>
              </li>
              {/* Chemistry */}
              <li>
                <span
                  onClick={() => setChemSubjectOpen(!isChemSubjectOpen)}
                  className="menu-items flex justify-between items-center"
                >
                  <h1>Chemistry</h1>
                  <AiFillCaretDown
                    className={
                      isChemSubjectOpen ? "rotate-[90px]" : "rotate-[270deg]"
                    }
                  />
                </span>
                <ul className={"ml-2 " + (isChemSubjectOpen ? "" : "hidden")}>
                  <Link href={chapterWiseBaseURL + "/chem/atomic_structure"}>
                    <li>
                      <h1 className="menu-items">Atomic Structure</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/chem/chemical_bonding"}>
                    <li>
                      <h1 className="menu-items">Chemical Bonding</h1>
                    </li>
                  </Link>
                  <Link
                    href={
                      chapterWiseBaseURL +
                      "/chem/oxidation_reduction_electrochemistry"
                    }
                  >
                    <li>
                      <h1 className="menu-items">
                        Oxidation, Reduction, Electrochemistry
                      </h1>
                    </li>
                  </Link>
                  <Link
                    href={chapterWiseBaseURL + "/chem/chemical_equilibrium"}
                  >
                    <li>
                      <h1 className="menu-items">Chemical Equilibrium</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/chem/Water"}>
                    <li>
                      <h1 className="menu-items">Water</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/chem/organic_chemistry"}>
                    <li>
                      <h1 className="menu-items">Organic Chemistry</h1>
                    </li>
                  </Link>
                </ul>
              </li>
              {/* Mathematics */}
              <li>
                <span
                  onClick={() => setMathSubjectOpen(!isMathSubjectOpen)}
                  className="menu-items flex justify-between items-center"
                >
                  <h1>Mathematics</h1>
                  <AiFillCaretDown
                    className={
                      isMathSubjectOpen ? "rotate-[90px]" : "rotate-[270deg]"
                    }
                  />
                </span>
                <ul className={"ml-2 " + (isMathSubjectOpen ? "" : "hidden")}>
                  <Link href={chapterWiseBaseURL + "/math/matrix"}>
                    <li>
                      <h1 className="menu-items">Matrix</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/math/determinant"}>
                    <li>
                      <h1 className="menu-items">Determinant</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/math/complex_number"}>
                    <li>
                      <h1 className="menu-items">Complex Number</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/math/coordinate_geometry"}>
                    <li>
                      <h1 className="menu-items">Co-ordinate Geometry</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/math/vector_algebra"}>
                    <li>
                      <h1 className="menu-items">Vector Algebra</h1>
                    </li>
                  </Link>
                  <Link
                    href={chapterWiseBaseURL + "/math/differential_equation"}
                  >
                    <li>
                      <h1 className="menu-items">Differential Equation </h1>
                    </li>
                  </Link>
                  <Link
                    href={
                      chapterWiseBaseURL + "/math/application_of_derivative"
                    }
                  >
                    <li>
                      <h1 className="menu-items">Application of Derivative</h1>
                    </li>
                  </Link>
                  <Link
                    href={chapterWiseBaseURL + "/math/parital_differentiation"}
                  >
                    <li>
                      <h1 className="menu-items">Parital Differentiation</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/math/integral_calculas"}>
                    <li>
                      <h1 className="menu-items">Integral Calculas</h1>
                    </li>
                  </Link>
                  <Link
                    href={
                      chapterWiseBaseURL +
                      "/math/ordinary_differential_equations"
                    }
                  >
                    <li>
                      <h1 className="menu-items">
                        Ordinary Differential Equations
                      </h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/math/probability"}>
                    <li>
                      <h1 className="menu-items">Probability</h1>
                    </li>
                  </Link>
                </ul>
              </li>
              {/* FEEE */}
              <li>
                <span
                  onClick={() => setFEEESubjectOpen(!isFEEESubjectOpen)}
                  className="menu-items flex justify-between items-center"
                >
                  <h1 className="">
                    Fundamentals of Electronics and Engineering
                  </h1>
                  <AiFillCaretDown
                    className={
                      "w-8 " +
                      (isFEEESubjectOpen ? "rotate-[90px]" : "rotate-[270deg]")
                    }
                  />
                </span>
                <ul className={"ml-2 " + (isFEEESubjectOpen ? "" : "hidden")}>
                  <Link
                    href={
                      chapterWiseBaseURL +
                      "/feee/electrical_components_measuring_instruments"
                    }
                  >
                    <li>
                      <h1 className="menu-items">
                        Electrical Components, measuring instruments
                      </h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/feee/transformers"}>
                    <li>
                      <h1 className="menu-items">Transformers</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/feee/electrical_machines"}>
                    <li>
                      <h1 className="menu-items">Electrical Machines</h1>
                    </li>
                  </Link>
                  <Link
                    href={chapterWiseBaseURL + "/feee/dc_source_and_circuits"}
                  >
                    <li>
                      <h1 className="menu-items">DC source and circuits</h1>
                    </li>
                  </Link>
                  <Link
                    href={chapterWiseBaseURL + "/feee/ac_source_and_circuits"}
                  >
                    <li>
                      <h1 className="menu-items">AC source and circuits</h1>
                    </li>
                  </Link>
                  <Link
                    href={
                      chapterWiseBaseURL + "/feee/basic_semiconductor_device"
                    }
                  >
                    <li>
                      <h1 className="menu-items">Basic Semiconductor device</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/feee/analog_circuits"}>
                    <li>
                      <h1 className="menu-items">Analog Circuits</h1>
                    </li>
                  </Link>
                  <Link href={chapterWiseBaseURL + "/feee/digital_circuits"}>
                    <li>
                      <h1 className="menu-items">Digital Circuits</h1>
                    </li>
                  </Link>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <span
              onClick={() => setPrevYearOpen(!isPrevYearOpen)}
              className="menu-items flex justify-between items-center"
            >
              <h1 className="">Jelet Previous Year</h1>
              <AiFillCaretDown
                className={isPrevYearOpen ? "rotate-[90px]" : "rotate-[270deg]"}
              />
            </span>
            <ul className={"ml-2 " + (isPrevYearOpen ? "" : "hidden")}>
              {years.map((year: any) => {
                return (
                  <li>
                    <span
                      id={year.value}
                      onClick={toggleYearVisibility}
                      className="menu-items flex justify-between items-center"
                    >
                      <h1 className="">{year.value}</h1>
                      <AiFillCaretDown
                        className={
                          year.isOpen ? "rotate-[90px]" : "rotate-[270deg]"
                        }
                      />
                    </span>
                    <ul className={"ml-2 " + (year.isOpen ? "" : "hidden")}>
                      <Link href={prevYearBaseURL + "/phys/" + year.value}>
                        <li>
                          <h1 className="menu-items">Physics</h1>
                        </li>
                      </Link>
                      <Link href={prevYearBaseURL + "/chem/" + year.value}>
                        <li>
                          <h1 className="menu-items">Chemistry</h1>
                        </li>
                      </Link>
                      <Link href={prevYearBaseURL + "/math/" + year.value}>
                        <li>
                          <h1 className="menu-items">Mathematics</h1>
                        </li>
                      </Link>
                      <Link href={prevYearBaseURL + "/feee/" + year.value}>
                        <li>
                          <h1 className="menu-items">
                            Fundamentals of Electronics and Engineering
                          </h1>
                        </li>
                      </Link>
                    </ul>
                  </li>
                );
              })}
            </ul>
          </li>
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

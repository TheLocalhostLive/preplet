import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import {
  AiFillDatabase,
  AiOutlineSearch,
  AiOutlineRead,
  AiFillCalculator,
  AiOutlineDeploymentUnit,
  AiTwotoneSound,
  AiOutlineMenu,
} from "react-icons/ai";

const Home: NextPage = () => {
  let { loginStatus, serverURL } = useContext(AuthContext);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch(serverURL + "/logout", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data.message);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Head>
        <title> Dashboard </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="flex relative">
        <nav className=" h-screen ">
          <div className=" w-64  h-screen bg-gradient-to-r from-sky-900 to-fuchsia-600">
            <span className=" flex py-3  justify-center h-10 text-3xl font-beba">
              WELCOME
            </span>

            <div className="flex justify-start items-center">
              <div className="flex flex-col my-2 justify-center space-y-[0.8px]">
                <div className="flex w-4 h-[4px] py-0 mx-4 bg-gray-600"></div>
                <div className="flex w-4 h-[4px] py-0 mx-4 bg-gray-600"></div>
                <div className="flex w-4 h-[4px] py-0 mx-4 bg-gray-600"></div>
              </div>
              <div className="]">Name</div>
            </div>

            <div className="flex items-center">
              <img
                src="dashboard-icn.png "
                alt=""
                height="50"
                width="50"
                className="mx-3"
              />
              <span className="font-secular px-0">Name</span>
            </div>

            <div className=" flex relative items-center justify-center h-8">
              <input
                className="absolute left-4 text-[10px] flex w-36 my-5 px-5 h-5 shadow-gray-50 bg-[#EDEDEDCF] outline-none inset shadow-inner rounded"
                type="text"
                name=""
                placeholder="Seach here"
              />
              <AiOutlineSearch className="absolute left-5 text-[10px] " />
            </div>

            <div>
              <ul className="flex flex-col text-xs w-44 ">
                <li className="flex items-center py-1">
                  <AiFillDatabase className="mx-3" />
                  <span className="mx-1 font-secular text-lg ">Dashboard</span>
                </li>
                <li className="flex items-center py-1">
                  <AiOutlineRead className="mx-3" />
                  <span className="mx-1 font-secular text-lg">
                    Jelet Topic Wise Question{" "}
                  </span>
                </li>
                <ul>
                  <li className=" flex mx-6 items-center ">
                    <AiOutlineDeploymentUnit className="mx-3" />
                    <span className="font-secular text-lg">Chemistry</span>
                  </li>
                  <li className="flex mx-6 items-center">
                    <AiTwotoneSound className="mx-3 font-secular" />
                    <span className="font-secular text-lg">Physics</span>
                  </li>
                  <li className=" flex mx-6 items-center">
                    <AiFillCalculator className="mx-3" />
                    <span className="font-secular text-lg"> Mathematics</span>
                  </li>
                </ul>
                <li className="flex items-center py-1 ">
                  <AiOutlineRead className="mx-3" />
                  <span className="font-secular text-lg">
                    Jelet Previous Question
                  </span>
                </li>
                <ul>
                  <li className=" flex mx-6 items-center">
                    <AiOutlineDeploymentUnit className="mx-3" />
                    <span className="font-secular text-lg">Chemistry</span>
                  </li>
                  <li className=" flex mx-6 items-center">
                    <AiTwotoneSound className="mx-3" />
                    <span className="font-secular text-lg">Physics</span>
                  </li>
                  <li className=" flex mx-6 items-center">
                    <AiFillCalculator className="mx-4" />
                    <span className="font-secular text-lg"> Mathematics </span>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </nav>

        <div className="image flex  h-64  justify-center  ">
          <img src="pictures/dashboard.jpg" alt="" />
          <div className="my-72 absolute bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded">
            <span className=" font-cinzel p-2 text-cyan-50"> NO ACTIVITY </span>
          </div>
        </div>
        <div>
          <video src="pictures/video" height="20" width="320"></video>
        </div>
      </body>
    </>
  );
};

export default Home;

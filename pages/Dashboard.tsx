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
import ImgCard from "../components/ImgCard";
import MenuBar from "../components/MenuBar";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Link from "next/link";

async function fetchData() {
  const result = await fetch("http://localhost:3001/menu.yaml");
  const data = await result.json();
  console.log(data);
}
const slideImages = [
  {
    url: "./img/atomic_structure.jpg",
    caption: "Atomic Structure",
    href: "/questionViewer/chapter_wise/chem/atomic_structure",
  },
  {
    url: "./img/kinamatics.jpeg",
    caption: "Kinamatics",
    href: "/questionViewer/chapter_wise/phys/kinamatics",
  },
  {
    url: "./img/matrix.png",
    caption: "Matrix",
    href: "/questionViewer/chapter_wise/math/matrix",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container w-[600px] h-[300px]">
      <Slide autoplay duration={1500}>
        {slideImages.map((slideImage, index) => (
          <Link key={slideImage.href} href={slideImage.href}>
            <div className="each-slide" key={index}>
              <img src={slideImage.url} className="h-[200px] w-[200px]" />
              <span>{slideImage.caption}</span>
            </div>
          </Link>
        ))}
      </Slide>
    </div>
  );
};
const Home: NextPage = () => {
  let { loginStatus, serverURL } = useContext(AuthContext);
  const router = useRouter();
  //return Slideshow();
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
      <img src="./img/pic.jpg" height="40px" width="90px" />
      <body className="flex relative">
        <MenuBar className="hidden sm:flex" />
        {/* contents */}
        <div className="h-full w-full flex flex-col items-center justify-center">
          <span>Recomended For you</span>
          {Slideshow()}
        </div>
      </body>
    </>
  );
};

export default Home;

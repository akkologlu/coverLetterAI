import React from "react";
import image from "../assets/Formal-Letter-Format.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-[#ddd0fd]">
      <div className="h-screen w-screen flex lg:flex-nowrap flex-wrap">
        <div className="lg:w-[50%] w-screen items-center lg:items-start flex justify-center flex-col space-y-5 mx-[5%]">
          <h1 className="xl:text-8xl lg:text-7xl md:text-5xl text-[#494552] text-3xl font-ubuntu text-center lg:text-start">
            Generate Your Cover Letter
          </h1>
          <p className="text-[#494552] xl:text-3xl lg:text-xl md:text-lg text-center lg:text-start">
            Fill out the form and create your cover letter in a short time.
          </p>
          <Link
            to="/generate"
            className="border text-center w-full sm:w-[50%] rounded-lg lg:w-max px-4 py-2 bg-[#494552] text-white xl:text-3xl lg:text-xl md:text-lg"
          >
            Generate
          </Link>
        </div>
        <div className="w-[50%] lg:flex justify-center items-center hidden ">
          <img src={image} alt="" className="" />
        </div>
      </div>
    </div>
  );
}

export default Home;

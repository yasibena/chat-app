import Sidebar from ".././components/Sidebar";
import Chat from ".././components/Chat";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  return (
    <div className="flex  m-auto justify-center  rounded-xl overflow-hidden border-2 border-[#fff] mt-[7rem]">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;

import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [own, setOwn] = useState(false);
  console.log(data, "data");

  const time = new Date(message.time).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    if (message.senderId == currentUser.user.id) {
      console.log("message sender is current user");
      setOwn(true);
    } else {
      console.log("message sender is not current user");
      setOwn(false);
    }
  }, [message]);

  return own == true ? (
    <div className={"flex gap-[20px] owner mt-[10px]"} ref={ref}>
      {/* message info */}
      <div className="flex flex-col text-[gray] font-300">
        <img
          src={currentUser.user.user_metadata.imgurl}
          className=" rounded-full h-[40px] w-[40px] object-cover"
        />
        <span className="max-md:text-[0.6rem]">{time}</span>
      </div>

      {/* message content */}
      <div className="max-w-[80%] flex flex-col gap-[10px] ">
        {message.text ? (
          <p className="bg-[#fff] text-black px-[20px] py-[10px] rounded-tr-lg rounded-br-lg  rounded-bl-lg owner owner-p max-w-max max-md:text-[0.8rem]">
            {message.text}
          </p>
        ) : (
          <></>
        )}
        {message.img ? (
          <img src={message.img} className="w-[50%] my-1" />
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <div className={"flex gap-[20px]  mt-[10px]"} ref={ref}>
      {/* message info */}
      <div className="flex flex-col text-[gray] font-300 ">
        <img
          src={data.user.imgurl}
          className=" rounded-full h-[40px] w-[40px] object-cover"
        />
        <span className="max-md:text-[0.6rem]">{time}</span>
      </div>

      {/* message content */}
      <div className="max-w-[80%] flex flex-col gap-[10px] ">
        {message.text ? (
          <p className="bg-[#fff] px-[20px] py-[10px] rounded-tr-lg rounded-br-lg  rounded-bl-lg owner max-w-max max-md:text-[0.8rem]">
            {message.text}
          </p>
        ) : (
          <></>
        )}
        {message.img ? (
          <img src={message.img} className="w-[50%] my-1" />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Message;

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { supabase } from "../supabase/client";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  // const { arrOfMessage, setArrOfMessage } = useState([]);
  const handleSend = async () => {
    const getMessage = await supabase
      .from("chats")
      .select("message")
      .eq("id", data.chatId);
    if (img) {
      console.log("we have img");
      await supabase
        .from("chats")
        .update({
          message: [
            ...getMessage.data[0].message,
            {
              id: uuid(),
              img,
              senderId: currentUser.user.id,
              time: new Date(),
            },
          ],
        })
        .eq("id", data.chatId);

      setImg("");
    } else {
      // setArrOfMessage((prevState) => {
      //   return [...prevState, temp];
      // });
      console.log("we have text");

      // let arrofMessage = [{
      //   id: uuid(),
      //   text,
      //   senderId: currentUser.user.id,
      // }]

      // console.log(arrOfMessage, 'arrofmessage');

      await supabase
        .from("chats")
        .update({
          message: [
            ...getMessage.data[0].message,
            {
              id: uuid(),
              text,
              senderId: currentUser.user.id,
              time: new Date(),
            },
          ],
        })
        .eq("id", data.chatId);

      const getUserInfo1 = await supabase
        .from("userChats")
        .select("userinfo")
        .eq("id", currentUser.user.id);
      const getUserInfo1Data1 = getUserInfo1.data[0];
      const getUserInfo2 = await supabase
        .from("userChats")
        .select("userinfo")
        .eq("id", data.user.id);
      const getUserInfo1Data2 = getUserInfo2.data[0];
      console.log(getUserInfo1, getUserInfo2, "both");

      await supabase
        .from("userChats")
        .update({
          userinfo: {
            getUserInfo1Data1,
            lastmessage: text,
            date: new Date(),
          },
        })
        .eq("id", currentUser.user.id);

      await supabase
        .from("userChats")
        .update({
          userinfo: {
            getUserInfo1Data2,
            lastmessage: text,
            date: new Date(),
          },
        })
        .eq("id", data.user.id);

      setText("");
    }
  };

  const uploadImgMessage = async (event) => {
    const uploadImg = event.target.files[0];
    console.log(uploadImg, "upload imgf");
    await supabase.storage
      .from("images")
      .upload(`public/${uploadImg.name}`, uploadImg, {
        cacheControl: "3600",
        upsert: false,
      });

    const publicURL = await supabase.storage
      .from("images")
      .getPublicUrl(`public/${uploadImg.name}`);

    setImg(publicURL.data.publicUrl);
  };

  return (
    <div className="bg-[#fff] h-[50px] flex  justify-between items-center p-2 ">
      <input
        type="text"
        placeholder="Type Something "
        className=" flex outline-none p-2 w-full placeholder-[lightgray]"
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex ">
        <input
          type="file"
          name=""
          id="file-input"
          onChange={uploadImgMessage}
        />
        <div className="flex gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z"
              clip-rule="evenodd"
            />
          </svg>

          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={uploadImgMessage}
          />
          <label htmlFor="file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <button
            className="bg-[#86B6F6] text-[#fff] px-2 py-1"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;

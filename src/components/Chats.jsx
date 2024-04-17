import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { supabase } from "../supabase/client";
const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);
  
  useEffect(() => {
    const getChats = async () => {
      const unsub = await supabase
        .from("userChats")
        .select()
        .eq("id", currentUser.user.id);
      const temp2 = unsub.data;
      setChats(temp2);
     
    };
    currentUser.user.id && getChats();
    
  }, [currentUser.user.id]);


  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div>
      {chats?.map((chat) => (
        <div
          className="flex p-[10px] text-[#fff] items-center duration-100 cursor-pointer hover:bg-[#112636] "
          key={chat.id}
          onClick={() => handleSelect(chat.userinfo)}
        >
          {chat.userinfo && (
            <>
              <img
                src={chat.userinfo.imgurl}
                className=" h-[2rem] rounded-full my-auto"
              />
              <div className="mx-2">
                <span className=" text-bold text-[18px]  ">
                  {chat.userinfo.name}
                </span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chats;

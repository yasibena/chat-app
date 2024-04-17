import Message from "./Message";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { supabase } from "../supabase/client";
import { ImSpinner8 } from "react-icons/im";
import { AuthContext } from "../context/AuthContext";

const Messages = () => {
  const [messages, setMessages] = useState();
  const { data } = useContext(ChatContext);


  const { currentUser, loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    setLoading(false);
    async function getAllMessages() {
      return await supabase
        .from("chats")
        .select("message")
        .eq("id", data.chatId);
    }
    let allMessages;
    const a = async () => {
      ({ data: allMessages } = await getAllMessages());

      const messagesWatcher = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "chats" },
          async () => {
            ({ data: allMessages } = await getAllMessages());
          },
        )
        .subscribe();

      console.log(allMessages, "allm");
      messagesWatcher?.unsubscribe();
      if (allMessages.length > 0) {
        setMessages(allMessages[0].message);

      }
    };

    return () => {
      a();
    };
  }, [data.chatId]);



  return (
    <div className="bg-[#C5FFF8] h-[23.8rem] overflow-y-scroll mx-[0.4rem]">
      {loading ? (
        <ImSpinner8 className="text-4xl animate-spin text-white mx-auto my-[5rem] flex align-middle justify-center " />
      ) : (
        messages?.map((m) => <Message message={m} />)
      )}
    </div>
  );
};

export default Messages;

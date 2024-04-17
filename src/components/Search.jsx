import { useState, useContext } from "react";
import { supabase } from "../supabase/client";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("name", username);
    console.log();
    if (data) {
      setUser(data[0]);
    }
    if (data.length == 0) {
      setErr(true);
    }

  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
   
    const combinedId =
      currentUser.user.id > user.id
        ? currentUser.user.id + user.id
        : user.id + currentUser.user.id;

    const res = await supabase.from("chats").select("id", combinedId);

    if (res.length == undefined) {
      //create a chat in  chats col
      const res = await supabase
        .from("chats")
        .insert({ id: combinedId, message: [] });

  

      await supabase
        .from("userChats")
        .update({
          userinfo: {
            combinedid: combinedId,
            name: user.name,
            imgurl: user.imgurl,
            id: user.id,
            lastmessage: "",
            date: new Date(),
          },
        })
        .eq("id", currentUser.user.id)
        .select();

    }

    setUser(null);
    setUsername(" ");
  };

  return (
    <div>
      {/* search bar  */}
      <div>
        <input
          type="text"
          className="outline-none bg-transparent text-[#fff] p-[10px] placeholder-gray-500 "
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      {/*chats */}
      {err && <span className="text-[red] font-bold">user not found</span>}
      {user && (
        <div
          className="flex p-[10px] text-[#fff] items-center border-b border-gray-500 duration-100 cursor-pointer hover:bg-[#112636]"
          onClick={handleSelect}
        >
          <img src={user.imgurl} className=" h-[2rem] rounded-full my-auto" />
          <span className="mx-2">{user.name}</span>
        </div>
      )}
    </div>
  );
};

export default Search;

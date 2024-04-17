import { useContext } from "react";
import { supabase } from "../supabase/client";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const signOut = async () => {


    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
    }
  };

  const { currentUser } = useContext(AuthContext);


  return (
    <div className="flex justify-between bg-[#112636] p-1 h-[3rem]  max-md:text-[0.8rem] ">
      <div className="flex justify-between text-[#fff] gap-2 mr-2 max-md:font-[1rem]">
        <img
          src={currentUser.user.user_metadata.imgurl}
          className=" h-[2rem] rounded-full my-auto"
        />
        <p className="my-auto">{currentUser.user.user_metadata.name} </p>
        <button
          className="bg-[#5d98c2] rounded  px-1 h-[2rem] text-sm m-auto my-auto duration-100 hover:bg-[#296691] max-md:text-[0.7rem]"
          onClick={() => signOut()}
        >
          logout{" "}
        </button>
      </div>
    </div>
  );
};

export default Navbar;

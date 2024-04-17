import { useRef, useState,useContext } from "react";
// import supabase from '../supabase/client.js'
// import { createClient } from '@supabase/supabase-js';
import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const displayNameRef = useRef(null);

  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [file, setfile] = useState([]);
  const [imgurl, setImgUrl] = useState("");
  
  const { currentUser,loading,setLoading } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value,
      options: {
        data: {
          name: displayNameRef.current.value,
          imgurl: imgurl,
        },
       
      },
    });
   
    if(data){
      navigate("/");
      await supabase.from("userChats").insert({ id: data.user.id });
    }
    if (error) {
      setErrorMsg(true);
    }
  };

 

  const handleFileSelected = async (event) => {
    const avatarFile = event.target.files[0];

    await supabase.storage
      .from("avatars")
      .upload(`public/${avatarFile.name}`, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });

    const publicURL = supabase.storage
      .from("avatars")
      .getPublicUrl(`public/${avatarFile.name}`);
    setImgUrl(publicURL.data.publicUrl);
  };
 

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center content-center h-screen">
        <div className="flex w-[25rem] justify-center align-center flex-col p-10 gap-5 rounded bg-[#fff] ">
          <h1 className="text-center font-bold">Register</h1>
          <div className=" border-solid border-b-2 border-[#C5FFF8] p-2 focus:border-[red] ">
            <input
              type="text"
              className=" focus:outline-none"
              placeholder="display name"
              ref={displayNameRef}
              required
            /> 
          </div>
          <div className=" border-solid border-b-2 border-[#C5FFF8] p-2 focus:border-[red] ">
            <input
              type="email"
              className=" focus:outline-none"
              placeholder="email"
              ref={emailRef}
              required
            />
          </div>
          <div className=" border-solid border-b-2 border-[#C5FFF8] p-2 focus:border-[red] ">
            <input
              type="password"
              className=" focus:outline-none"
              placeholder="password"
              ref={passwordRef}
              required
            />
          </div>

          <input
            type="file"
            name=""
            id="file-input"
            onChange={handleFileSelected}
          />
          <label id="file-input-label" className="flex gap-2 " for="file-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mt-0.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span className="text-[0.9rem] leading-6"> Add an Avatar</span>
          </label>
          {errorMsg == true ? (
            <span className="text-[red] font-bold">
              Error in Creating Account
            </span>
          ) : (
            <span></span>
          )}
          <button
            className="bg-[#5FBDFF] text-[#fff] p-2 duration-100 rounded hover:bg-[#4089bd] "
            disabled={loading}
            type="submit"
          >
           {loading==true ?  <ImSpinner8 className="text-2xl animate-spin text-white m-auto flex align-middle justify-center " /> : <span>Signup</span>}
          
          </button>
          <p>
            You do have an account?
            <Link
              to="/login"
              className="text-[#4CB9E7] ml-1 font-bold underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Register;

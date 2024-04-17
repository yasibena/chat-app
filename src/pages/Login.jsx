import { useRef, useState, useEffect, useContext } from "react";
import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();
  const { currentUser,loading,setLoading } = useContext(AuthContext);

  const getLoggedUser = async (e) => {
    const { data } = await supabase.auth.getUser();
    // console.log(data.user, "user");
  };

  getLoggedUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
   
   

    if (data) {
      navigate("/");
    }
    if (error) {

      setErrorMsg(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center content-center h-screen">
        <div className="flex w-[25rem] justify-center align-center flex-col p-10 gap-5 rounded bg-[#fff] ">
          <h1 className="text-center font-bold">Login</h1>
          <div className=" border-solid border-b-2 border-[C5FFF8] p-2 focus:border-[red] ">
            <input
              type="email"
              className=" focus:outline-none"
              placeholder="email"
              ref={emailRef}
              required
            />
          </div>
          <div className=" border-solid border-b-2 border-[C5FFF8] p-2 focus:border-[red] ">
            <input
              type="password"
              className=" focus:outline-none"
              placeholder="password"
              ref={passwordRef}
              required
            />
          </div>
          {errorMsg && (
            <span className="text-[red] font-bold">
              Email or Password is wrong
            </span>
          )}
          <input type="file" name="" id="file-input" />

          <button className="bg-[#5FBDFF] text-[#fff] p-2 duration-100 rounded hover:bg-[#4089bd] ">
            
            {loading==true ?  <ImSpinner8 className="text-2xl animate-spin text-white m-auto flex align-middle justify-center " /> : <span>Login</span>}
          </button>
          <p>
            You don't have an account?
            <Link
              to="/register"
              className="text-[#4CB9E7] ml-1 font-bold underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;

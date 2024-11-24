import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import Passwordinput from "../../components/input/Passwordinput";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate= useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please enter your name")
    }

    if (!validate(email)){
      setError("Please enter a valid email address.");
      return ;
    }

    if(!password){
      setError("Enter Password");
      return;
    }

    setError("");

    //signup API call
    try{
      const response= await axiosInstance.post("/create-account",{
        fullName: name,
        email:email,
        password: password,
      });

      //Handle successful registration response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      } else if (response.data && response.data.message) {
        setError(response.data.message);
      }

    } catch(error){
      //Handle login error
      if(error.response && error.response.data &&error.response.data.message){
        setError(error.response.data.message);
      } else{
        setError("An unexpected error occurred. Please try again.")
      }
    }

  };

 

  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-center bg-fixed min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

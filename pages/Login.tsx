import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import ToggleInputType from "../components/ToggleInputType";

const Login = () => {
  const [textOnBtn, setTextOnBtn] = useState("Login");
  const [inputType, setInputType] = useState("password");
  const router = useRouter();
  const handleShowHidePassword = () => {
    if (inputType === "text") setInputType("password");
    else setInputType("text");
  };
  let { loginStatus, setLoginStatus, serverURL, setIsAdmin, isAdmin } =
    useContext(AuthContext);

  useEffect(() => {
    if (loginStatus) {
      if (isAdmin) router.push("/admin/Dashboard");
      else router.push("/Dashboard");
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const password = watch("password");
  const handleGoogleLogin = async () => {
    window.open(serverURL + "/google", "_self");
  };
  const onSubmit = async (formData: any) => {
    console.log(formData);
    setTextOnBtn("Submitting...");

    const request = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    let result;
    try {
      const response = await toast.promise(
        fetch(`${serverURL}/login`, request),
        {
          pending: "Please wait!",
          error: "Please Retry",
        }
      );
      const { message, isAdmin } = await response.json();
      if (response.status === 200) {
        setLoginStatus(true);
        setIsAdmin(isAdmin);
        toast.success("Logged In successfully");
        if (isAdmin) router.push("/admin/Dashboard");
        else router.push("/Dashboard");
      } else if (response.status === 400) {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTextOnBtn("Login");
    }
  };
  if (!loginStatus) {
    return (
      <>
        <div className=" bg-[url('/img/Login_BG.jpg')] bg-no-repeat bg-[length:100%_100%] h-screen sm:h-screen flex justify-center items-center md:flex">
          <div className=" mx-2 bg-white my-4 flex flex-col md:flex-row items-center max-w-screen-lg overflow-hidden rounded-3xl shadow-lg w-full md:flex drop-shadow-2xl cursor-pointer">
            <div className="flex"><img src="img/B.jpg" className="w-[100%] h-[100%]" /></div>
            <div className="flex bg-white">
              <ToastContainer />
              <div>
                <div>
                  <div>
                    {/* welcome */}
                    <div>
                      <p className="font-mono text-2xl text-center font-bold text-blue-600 align-top scale-125">Login</p>
                    </div>
                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="text-center pt-2">
                        <input className="pl-4 border-2"
                          placeholder="Email"
                          type="text"
                          {...register("email", { required: true })}
                        />
                        {errors.email && errors.email.type == "required" && (
                          <div className="text-red-600 ">please enter your email id</div>
                        )}
                      </div>
                      <div className="text-center pt-4">
                        <input className="pl-4 border-2 "
                          placeholder="password"
                          type={inputType}
                          {...register("password", { required: true, minLength: 5 })}
                        />
                        {/* <ToggleInputType
                    type={inputType}
                    onclick={handleShowHidePassword}
                    classStyle="absolute left-[90%] top-[10px]"
                  /> */}
                        {errors.password && errors.password.type === "required" && (
                          <p className="text-red-600 ">please enter your password</p>
                        )}
                        {errors.password && errors.password.type === "minLength" && (
                          <p className="text-red-600 ">please enter atleast 8 characters</p>
                        )}
                      </div>
                      <div className="pt-4 pl-9">
                        <div className="text-white bg-gradient-to-r from-purple-500 to-purple-900 rounded-2xl border-none shadow-lg w-40 justify-center items-center font-bold">
                          {" "}
                          <button className="w-full">{textOnBtn}</button>
                        </div>
                      </div>
                    </form>
                    {/* Links */}
                    <div className="text-center pt-4">
                      <Link href="/Forget">
                          <a className="text-center pt-5 underline underline-offset-1">Forgot Password?</a>
                      </Link>
                      </div>
                    <p className="text-center">OR</p>
                    <div className="flex flex-row border-2">
                    <div><img src="img/Google_logo.jpg" className="w-10 h-8"/></div>
                    <button className="w-full bg-blue-300" onClick={handleGoogleLogin}>Login With Google</button>
                    </div>
                    <div className="pt-4">
                      <p>
                        Don&apos;t have an account?
                        <Link href="/Signup">
                          <a className="underline underline-offset-1">Register</a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Login;




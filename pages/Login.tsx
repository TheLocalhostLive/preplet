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
        <div>
          <ToastContainer />
          <div>
            <div></div>
            <div>
              {/* welcome */}
              <div>
                <h1>Login</h1>
              </div>
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    placeholder="Email"
                    type="text"
                    {...register("email", { required: true })}
                  />
                  {errors.email && errors.email.type == "required" && (
                    <div>please enter your email id</div>
                  )}
                </div>
                <div>
                  <input
                    placeholder="password"
                    type={inputType}
                    {...register("password", { required: true, minLength: 5 })}
                  />
                  <ToggleInputType
                    type={inputType}
                    onclick={handleShowHidePassword}
                    classStyle="absolute left-[90%] top-[10px]"
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p>please enter your password</p>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <p>please enter atleast 8 characters</p>
                  )}
                </div>

                <div>
                  {" "}
                  <button>{textOnBtn}</button>
                </div>
              </form>
              {/* Links */}
              <div>OR</div>
              <button onClick={handleGoogleLogin}>Login with Google</button>
              <div>
                <p>
                  Don&apos;t have an account?
                  <Link href="/Signup">
                    <a>Register</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Login;

import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import ToggleInputType from "../components/ToggleInputType";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Signup = () => {
  const [textOnBtn, setTextOnBtn] = useState("Register");
  const [inputType, setInputType] = useState("password");
  const [inputTypeConfirmPass, setInputTypeConfirmPass] = useState("password");
  const handleShowHidePassword = () => {
    if (inputType === "text") setInputType("password");
    else setInputType("text");
  };

  const handleShowHideConfirmPass = () => {
    if (inputTypeConfirmPass === "text") setInputTypeConfirmPass("password");
    else setInputTypeConfirmPass("text");
  };

  useEffect(() => {
    if (loginStatus) Router.push("/");
  });

  let { loginStatus, serverURL } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const password = watch("password");
  const onSubmit = async (formData: any) => {
    console.log(formData);
    delete formData.cpassword;
    setTextOnBtn("Submitting...");

    const request = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    let result;
    try {
      const response = await toast.promise(
        fetch(`${serverURL}/register`, request),
        {
          pending: "Please wait!",
          error: "Please Retry",
        }
      );
      const { message } = await response.json();
      if (response.status === 200) {
        toast.success("Account opened Successfully");
        Router.push("/Login");
        toast.success("Please Login to continue..");
      } else if (response.status === 400) {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTextOnBtn("Register");
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
                <h1>Signup</h1>
                <p>Create an Account</p>
              </div>
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className=""></div>
                  <input
                    placeholder="Full Name"
                    type="text"
                    {...register("name", { required: true })}
                  />
                  {errors.name && errors.name.type == "required" && (
                    <div>please enter your name</div>
                  )}
                </div>
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
                    <p>please enter atleast 5 characters</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="confirm password"
                    type={inputTypeConfirmPass}
                    {...register("cpassword", {
                      required: true,
                      minLength: 3,
                      validate: value => {
                        console.log(errors);
                        return value === password || "Passwords do not match";
                      },
                    })}
                  />
                  <ToggleInputType
                    type={inputTypeConfirmPass}
                    onclick={handleShowHideConfirmPass}
                    classStyle="absolute left-[90%] top-[10px]"
                  />

                  {errors.cpassword && errors.cpassword.type === "required" && (
                    <div>please confirm your password</div>
                  )}
                  {errors.cpassword && errors.cpassword.type === "validate" && (
                    <div>{errors.cpassword.message}</div>
                  )}
                </div>
                <div>
                  {" "}
                  <button>{textOnBtn}</button>{" "}
                </div>
              </form>
              {/* Links */}
              <div>
                <p>
                  Already an User
                  <Link href="/Login">
                    <a>login</a>
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

export default Signup;

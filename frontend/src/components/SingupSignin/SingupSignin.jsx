import React, { useState } from "react";
import "./SingupSignin.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../libs/apiCall.js";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signupWithEmail() {
    setLoading(true);
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const { data: res } = await api.post("/auth/sign-up", { name, email, password });
          if (res?.user) {
            toast.success("User Created!");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/dashboard");
          }
        } catch (error) {
          console.error(error);
          toast.error(error?.response?.data?.message || error.message);
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("Password and Confirm Password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function LoginUsingEmail() {
    setLoading(true);
    if (email && password) {
      try {
        const { data: res } = await api.post("/auth/sign-in", { email, password });
        if (res?.user) {
          toast.success("User Logged In!");
          localStorage.setItem("user", JSON.stringify(res.user));
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Budgetbuddy. </span>
          </h2>
          <form>
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"peter@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              onClick={LoginUsingEmail}
            />
            <p className="p-login">or</p>
            <Button
              text={loading ? "Loading..." : "Login Using Google"}
              blue={true}
              onClick={() => toast.info("Google login is not implemented.")}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't Have An Account? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Budgetbuddy. </span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Peter"}
            />
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"peter@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">or</p>
            <Button
              text={loading ? "Loading..." : "Signup Using Google"}
              blue={true}
              onClick={() => toast.info("Google signup is not implemented.")}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Have An Account? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
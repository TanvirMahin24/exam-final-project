"use client";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import useRequest from "../../../hooks/useRequest";
import AppConfig from "../../../layout/AppConfig";
import { LayoutContext } from "../../../layout/context/layoutcontext";
import Navbar from "../../../components/Navbar/Navbar";

const LoginPage = ({ currentUser }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { layoutConfig } = useContext(LayoutContext);

  const router = useRouter();

  const { request } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Signup successfull!",
        icon: "success",
      });
      setEmail("");
      setPassword("");
      router.push("/");
    },
  });

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  const handleSubmit = async () => {
    if (password === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter password!",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    if (
      email === "" ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      Swal.fire({
        title: "Error!",
        text: "Enter valid email!",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }

    await request();
  };
  return (
    <>
      <Navbar currentUser={currentUser} />
      <div className={containerClassName}>
        <div className="flex flex-column align-items-center justify-content-center">
          <div
            style={{
              borderRadius: "56px",
              padding: "0.3rem",
              // background:
              //   "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
            }}
          >
            <div
              className="w-full surface-card py-8 px-5 sm:px-8"
              style={{ borderRadius: "53px" }}
            >
              <div className="text-center mb-5">
                <span className="text-blue-500 font-bold text-3xl">
                  Sign Up{" "}
                </span>
              </div>

              <div>
                <label
                  htmlFor="email1"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Email
                </label>
                <InputText
                  inputid="email1"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full md:w-30rem mb-5"
                  style={{ padding: "1rem" }}
                />

                <label
                  htmlFor="password1"
                  className="block text-900 font-medium text-xl mb-2"
                >
                  Password
                </label>
                <Password
                  inputid="password1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  toggleMask
                  className="w-full mb-5"
                  inputClassName="w-full p-3 "
                ></Password>

                <Button
                  label="Sign Up"
                  className="w-full p-3 text-xl"
                  onClick={() => handleSubmit()}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
      <AppConfig simple />
    </React.Fragment>
  );
};
export default LoginPage;

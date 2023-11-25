import React, { useContext, useRef } from "react";
import { Button } from "primereact/button";
import { LayoutContext } from "../../layout/context/layoutcontext";
import Link from "next/link";
import { StyleClass } from "primereact/styleclass";
import { useRouter } from "next/router";
import useRequest from "../../hooks/useRequest";
import { classNames } from "primereact/utils";
import Swal from "sweetalert2";

const Navbar = ({ currentUser }) => {
  const { layoutConfig } = useContext(LayoutContext);
  const menuRef = useRef();
  const router = useRouter();

  const { request } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Logout successfull!",
        icon: "success",
      });
      router.push("/");
    },
  });

  const logout = async () => {
    await request();
  };
  return (
    <div className="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
      <Link href="/" className="flex align-items-center">
        <img
          src={`/layout/images/${
            layoutConfig.colorScheme === "light" ? "logo-dark" : "logo-white"
          }.svg`}
          alt="Sakai Logo"
          height="50"
          className="mr-0 lg:mr-2"
        />
        <span className="text-900 font-medium text-2xl line-height-3 mr-8">
          Exam
        </span>
      </Link>
      <StyleClass
        nodeRef={menuRef}
        selector="@next"
        enterClassName="hidden"
        leaveToClassName="hidden"
        hideOnOutsideClick="true"
      >
        <i
          ref={menuRef}
          className="pi pi-bars text-4xl cursor-pointer block lg:hidden text-700"
        ></i>
      </StyleClass>
      <div
        className={classNames(
          "align-items-center flex-grow-1 justify-content-end hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2"
        )}
        style={{ top: "100%" }}
      >
        <div className="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
          {currentUser ? (
            <>
              <Button
                label="Exams"
                text
                rounded
                onClick={() => router.push("/tickets/new")}
                className="border-none font-light line-height-2 text-blue-500"
              ></Button>

              <Button
                label="Logout"
                text
                rounded
                onClick={() => logout()}
                className="border-none font-light line-height-2 text-blue-500"
              ></Button>
            </>
          ) : (
            <>
              <Button
                label="Login"
                text
                rounded
                onClick={() => router.push("/auth/signin")}
                className="border-none font-light line-height-2 text-blue-500"
              ></Button>
              <Button
                label="Register"
                rounded
                onClick={() => router.push("/auth/signup")}
                className="border-none ml-5 font-light line-height-2 bg-blue-500 text-white"
              ></Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

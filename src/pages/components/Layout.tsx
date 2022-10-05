import Cookies from "js-cookie";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import ClientOnly from "./ClientOnly";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const handleClickLogout = () => {
    Cookies.remove("nickName");
    Cookies.remove("userId");
    window.location.reload();
  };

  return (
    <>
      <div className="wrapper">
        <div className="flex justify-between my-10">
          <Link href="/">
            <a className="text-2xl font-semibold">Pusher Playground</a>
          </Link>
          <nav className="flex items-center gap-4">
            <ClientOnly>
              <p className="px-3 py-2 bg-green-300 rounded-md ">
                {Cookies.get("nickName") + " - " + Cookies.get("userId")}
              </p>
            </ClientOnly>
            <Link href="/login">
              <a href="#">Login</a>
            </Link>
            <button onClick={handleClickLogout}>Logout</button>
          </nav>
        </div>
        <div className="mb-14">
          <h1 className="text-xl font-semibold">Type of channels</h1>
          <div className="grid grid-cols-3 gap-4 mt-2 ">
            <Link href="/public-channel">
              <a className="flex items-center justify-center h-12 px-4 text-white uppercase bg-indigo-500">
                Public Channel
              </a>
            </Link>
            <Link href="/private-channel">
              <a className="flex items-center justify-center h-12 px-4 text-white uppercase bg-indigo-500">
                Private Channel
              </a>
            </Link>
            <Link href="/presence-channel">
              <a className="flex items-center justify-center h-12 px-4 text-white uppercase bg-indigo-500">
                Presence Channel
              </a>
            </Link>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;

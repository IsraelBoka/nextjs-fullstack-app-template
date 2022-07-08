import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="flex p-5 items-center">
      <div className="flex-1">Logo</div>
      <div className="">
        <div className="text-black rounded-md py-2 px-2 bg-purple-200 cursor-pointer hover:bg-purple-400">
          Connexion
        </div>
      </div>
    </div>
  );
}

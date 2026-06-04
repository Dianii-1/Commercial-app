"use client";

import { Button } from "@heroui/react";
import { IoHome } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { MdAddComment } from "react-icons/md";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const route = useRouter();
  return (
    <div className="flex items-center justify-between w-full border-b border-gray-200 shadow-lg bg-white/70 backdrop-blur-md p-6">
      <Button
        onClick={() => {
          route.push("/");
        }}
        className="flex items-center gap-2 text-2xl font-black text-[#008296] bg-transparent w-auto"
      >
        <IoHome /> <span className="hidden sm:block">Inicio</span>
      </Button>

      <div className="flex items-center gap-4">
        <button
          className="bg-transparent w-auto"
          onClick={() => route.push("/listado")}
        >
          <CiViewList size="30px" className="sm:hidden text-[#FAC830]" />
          <div className="hidden sm:block font-semibold rounded-full border-2 py-1 px-5">
            Publicaciones
          </div>
        </button>

        <Button
          className="bg-transparent w-auto"
          onClick={() => route.push("/listado/nuevo")}
        >
          <MdAddComment size="30px" className="sm:hidden text-[#008296]" />
          <div className="hidden sm:block bg-[#008296] text-white p-2 px-6 rounded-full">
            Nueva publicación
          </div>
        </Button>
      </div>
    </div>
  );
};

import Link from "next/link";

import { Button } from "@heroui/react";
import { IoHome } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { MdAddComment } from "react-icons/md";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full border-b border-gray-200 shadow-lg bg-white/70 backdrop-blur-md p-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-2xl font-black text-[#008296]"
      >
        <IoHome /> <span className="hidden sm:block">Inicio</span>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/listado">
          <CiViewList size="30px" className="sm:hidden text-[#FAC830]" />
          <Button
            variant="outline"
            className="hidden sm:block font-semibold rounded-full"
          >
            Publicaciones
          </Button>
        </Link>

        <Link href="/listado/nuevo">
          <MdAddComment size="30px" className="sm:hidden text-[#008296]" />
          <Button className="hidden sm:block bg-[#008296] text-white p-2 px-6 rounded-full">
            Nueva publicación
          </Button>
        </Link>
      </div>
    </div>
  );
};

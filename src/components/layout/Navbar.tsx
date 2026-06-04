import { IoHome } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { MdAddComment } from "react-icons/md";
import { LinkButton } from "../ui/LinkButton";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full border-b border-gray-200 shadow-lg bg-white/70 backdrop-blur-md p-6">
      <LinkButton
        href="/"
        className="flex items-center gap-2 text-2xl font-black text-[#008296] bg-transparent w-auto"
      >
        <IoHome className="w-6 h-6" />{" "}
        <span className="hidden sm:block">Inicio</span>
      </LinkButton>

      <div className="flex items-center gap-4">
        <LinkButton href="/listado" className="bg-transparent w-auto p-0">
          <CiViewList className="sm:hidden text-[#FAC830] w-6 h-6" />
          <div className="hidden sm:block text-black font-semibold rounded-full border-2 py-1 px-5">
            Publicaciones
          </div>
        </LinkButton>

        <LinkButton className="bg-transparent w-auto p-0" href="/listado/nuevo">
          <MdAddComment className="sm:hidden text-[#008296] w-6 h-6" />
          <div className="hidden sm:block bg-[#008296] text-white p-2 px-6 rounded-full">
            Nueva publicación
          </div>
        </LinkButton>
      </div>
    </div>
  );
};

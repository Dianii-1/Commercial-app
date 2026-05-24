import Link from "next/link";

import { Button } from "@heroui/react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-white px-2 md:px-6">
      <section className="max-w-full sm:max-w-3xl text-center">
        <span className="rounded-full bg-[#FAC830] px-5 py-2 text-sm font-semibold">
          Administración de publicaciones
        </span>

        <h1 className="mt-8 text-5xl sm:text-7xl font-black tracking-tight text-[#008296]">
          Publicaciones
        </h1>

        <p className="mx-auto mt-6 max-w-full sm:max-w-2xl text-md sm:text-xl leading-relaxed text-gray-600">
          Explora publicaciones de tu interés, y crea nuevas en nuestra
          plataforma.
        </p>

        <Link href="/listado">
          <Button
            size="lg"
            className="mt-10 bg-[#008296] p-2 px-6 font-semibold text-white shadow-xl rounded-full cursor-pointer"
          >
            Ver todas las publicaciones
          </Button>
        </Link>
      </section>
    </main>
  );
}

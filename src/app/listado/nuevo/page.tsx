"use client";

import { Button, Input, Label, Spinner, TextArea } from "@heroui/react";
import { useCreatePost } from "@/hook/useCreatePost";

export default function NewPostPage() {
  const { errors, handleSubmit, loading, onSubmit, register, route } =
    useCreatePost();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <Spinner size="xl" color="accent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="mb-8 text-2xl sm:text-4xl font-black text-[#008296]">
          Nueva Publicación
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-1">
            <Label className="text-[#008296] text-lg sm:text-xl">Titulo</Label>
            <Input
              title="Título"
              placeholder="Escribe un titulo"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-xs text-danger mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-[#008296] text-lg sm:text-xl">
              Descripción
            </Label>
            <TextArea
              placeholder="Escribe de que trata la publicación"
              className="h-24"
              {...register("body")}
            />
            {errors.body && (
              <span className="text-xs text-danger mt-1">
                {errors.body.message}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              className="w-full sm:w-auto"
              variant="danger-soft"
              onPress={() => route.replace("/listado")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#008296] text-white w-full sm:w-auto"
            >
              Crear publicación
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

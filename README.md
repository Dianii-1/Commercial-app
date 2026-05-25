# Aplicación para la administración de publicaciones

Una aplicación web realizada para la administracion de publicaciones. Construida utilizando la arquitectura de **Next.js App Router**, con un enfoque en mantener el código limpio, tipado fuerte y una cobertura completa de pruebas unitarias y de integración.

---

## Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (App Router & Client Components)
- **Lenguaje:** [TypeScript](https://www.typescript.org/)
- **Manejo de Estado Global:** [Zustand](https://zustand-demo.pmnd.rs/) (con persistencia local y lógica de IDs virtuales)
- **Componentes de UI:** [@heroui/react](https://heroui.com/) (Diseño moderno)
- **Formularios y Validación:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (Esquemas de validación estrictos)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Pruebas:** [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

# Development

Pasos para levantar la app en desarrollo

## Correr en DEV

1. Clonar el repositorio con el comando `git clone `

2. Ejecutar el comando `npm install` para reconstruir los módulos de node e instalar dependencias

3. Limpiar el localstorage del navegador

4. Ejecutar el comando `npm run dev` para ejecutar aplicación en desarrollo

5. Ejecutar el comando `npm run test` para ejecutar los test uniatrios

6. Ejecutar el comando `npm run build` para compilar el proyecto

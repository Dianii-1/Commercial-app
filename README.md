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

# Uso de la aplicación

1. Despues de ejecutar el comando `npm run dev`, dirigirce al navegador, y este lo dejara en la pagina de inicio ('/'), en donde podra ver una breve descripcion y un botón `Ver todas las publicaciones`, al dar click en el lo redireccionara a la pantalla ('/listado')

2. Una vez en la pantalla de listado se podra observar todas las publicaciones, con un scroll infinito que va acargando informacion cada vez que se llega al limite inferior de la pagina, en cada publicacion podremos encontrar el titulo, descripción, imagen y 3 botones.

3. En la pantalla de listado existe un input de tipo busqueda, en el cual al escribir se filtran las publicaciones por el titulo.

4. En el botón de `ver más`, al dar click lo redireccionara a la pantalla de publicacion por ID ('/listado/[id]'), donde se podra ver toda la informacion de dicha publicacion.

5. En el botón del lapiz, se desplegara un modal con un formulario para poder editar la informaciópn de dicha publicacion.

6. En el botón de la basura, se desplegara un modal para confirmar la eliminación de dicha publicación.

7. En todo el flujo podremos observar un Navbar en el cual tenemos 3 redirecciones diferentes, al inicio, a las publicaciones y a crear una nueva publicación.

8. En el botón de `Nueva publicación`, sera redireccionado a la pantalla ('/nuevo'), en donde se visualizara un formulario con los inputs y validaciones necesarias para crear una nueva publicacion la cual se vera al inicio del listado.

9. En la pantalla de nueva publicación al dar click en el boton de `cancelar`, sera redireccionado a la panatalla de publicaciones.

10. En la pantalla de nueva publicación si se llena el formulario corrrectamente y se le da click en el botón `crear publicación`, esta sera creada correctamente y redireccionara al usuario a la pantalla de publicaciones con la publicacion creada al inicio del listado.

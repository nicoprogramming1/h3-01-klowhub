# KlowHub

**KlowHub** es una plataforma SaaS (Software como Servicio) diseñada para centralizar y facilitar el acceso a contenido segmentado y específico para el desarrollo de aplicaciones **NoCode** y **LowCode**, permitiendo la compra, venta y publicación de productos y servicios digitales relacionados con este ecosistema. 

Su objetivo principal es conectar a desarrolladores, educadores y empresas con usuarios que necesiten soluciones ágiles y personalizadas, permitiendo monetizar los conocimientos y habilidades en este entorno.

---

## Recursos y requerimientos

- **Flujo**: [Figma - Flujo Plataforma KlowHub](https://www.figma.com/board/pC714J1fs4SJpusPuYaiMj/Flujo-Plataforma-KlowHub?node-id=0-1&node-type=canvas)
- **UX/UI**: [Figma - Diseño AppSheetHub](https://www.figma.com/design/MsyB0jfdKAU2dOIoIB9rW2/AppSheetHub?node-id=0-1)
- **Requerimientos de PM**: [Google Docs](https://docs.google.com/document/d/1M9TPI3U3fzESAFfAh1JZX7j8z7rGjmCMtIRI-FJsYb8/edit?tab=t.0)
- **Diseño UML (Clases y BD)**: [Lucidchart](https://lucid.app/lucidchart/ae84b02d-155e-483d-be41-8fa752bb5d9d/edit?page=HWEp-vi-RSFO&invitationId=inv_d489a101-c136-412a-9eb0-9093350af57a#)

---

## Instrucciones de despliegue

La rama predeterminada de desarrollo es **`dev`**.

**Backend:** 
1. Clona el repositorio y navega a la carpeta `backend`.
2. Instala las dependencias:
   ```bash
   npm install
3. Ejecutar la aplicación mediante "npm run dev"

**Frontend**
1. Navega a la carpeta `frontend`.
2. Instala las dependencias:
```bash
bun install
```

3. Ejecutar la aplicación mediante "bun dev"

```bash
bun run dev
```

Esto correrá el proyecto en modo desarrollo y abrirá una pestaña del navegador con el sitio en [http://localhost:3000](http://localhost:3000)

## Acerca de

Este proyecto se ha creado con [Next.js](https://nextjs.org).

- Se ha usado [Tailwind CSS](https://tailwindcss.com) para estilizar el sitio.
- Para lacorreccion de sintaxis, se ha usado [ESLint](https://eslint.org) con [next/eslint](https://nextjs.org/docs/basic-features/eslint) y [eslint-config-next](https://nextjs.org/docs/basic-features/eslint#eslint-config-next).
- Libreria ui como [Shadcn](https://shadcn.com/ui) para el diseño de componentes.
- Un lenguaje de programación para el desarrollo de aplicaciones web modernas y de alto rendimiento: [TypeScript](https://www.typescriptlang.org).



# Backend

## Endpoints (Rutas)

/api

### Authentication

- **Registrar usuario**: `POST /auth/register`
- **Iniciar sesión**: `POST /auth/login`
- **Cerrar sesión**: `POST /auth/logout`

### User

- **Consultar un usuario**: `GET /user/:id`
- **Eliminar usuario y usuarioPRO**: `DELETE /user/:id`
- **Modificar usuario**: `PATCH /user/:id`
- **Cargar/Modificar foto de usuario**: `PATCH /user/imageProfile/:id`
- **Consultar perfil de usuario**: `GET /user/myProfile/:id`

### UserPRO

- **Consultar un usuarioPro**: `GET /userPro/:id`
- **Registrar usuarioPro**: `POST /userPro/:id`
- **Modificar usuarioPro**: `PATCH /userPro/:id`
- **Cargar/Modificar foto de usuarioPro**: `PATCH /userPro/imageProfile/:id`
- **Consultar perfil de usuarioPro**: `GET /userPro/profile/:id`

### Membership

- **Consultar membresía de usuario**: `GET /membership/:id`
- **Cambiar membresía de usuario**: `PATCH /membership/:id`

### Course

- **Listar cursos**: `GET /course/`
- **Consultar curso**: `GET /course/:id`
- **Registrar curso**: `POST /course/:id`
- **Registrar/Modificar foto de curso**: `POST /course/imageCourse/:id`
- **Registrar/Modificar foto de lección de curso**: `POST /course/imageLesson/:id`
- **Modificar curso**: `PATCH /course/:id`
- **Comprar curso**: `POST /course/buy/:id`
- **Eliminar curso**: `DELETE /course/delete/:id`

---

## Tecnologías

El desarrollo del proyecto se realizó utilizando **Express** y **Node.js** como framework y entorno de ejecución respectivamente, con **TypeScript** para un código más robusto y tipado. La base de datos utilizada fue **PostgreSQL**, gestionada mediante el ORM **Sequelize** para facilitar las operaciones y mantener un modelo de datos consistente.

Se utilizaron las siguientes dependencias externas:

- **Multer**: Gestión de imágenes.
- **Cloudinary**: Carga y recuperación de imágenes en la nube.
- **Express-validator**: Validaciones.
- **Sequelize ORM**: Gestión de la base de datos.

| Decisiones y Tecnologías implementadas |

**Arquitectura**
Utilizamos una arquitectura RESTful para estructurar las API. Permite escalabilidad y modularidad en el desarrollo y ofrece una separación clara entre el cliente y el servidor.

**Framework y Lenguaje**
Optamos por Express.js como framework y Node.js como entorno de ejecución, complementado con TypeScript. Express.js: un framework minimalista y flexible que permite construir rápidamente API RESTful. Node.js: capacidad para manejar múltiples conexiones concurrentes de forma eficiente, ideal para aplicaciones web SaaS.
TypeScript: Mejora la robustez del código con tipado estático, lo que facilita el desarrollo en equipo y la detección de errores en tiempo de desarrollo. 

**Base de Datos**
PostgreSQL fue elegido como base de datos relacional, gestionada mediante el ORM Sequelize quien simplifica la interacción con la base de datos, permitiendo trabajar con modelos, relaciones y migraciones de manera eficiente.

**Gestión de Imágenes**
Se utilizó Multer para manejar las cargas locales y Cloudinary para almacenamiento en la nube para optimizar el rendimiento, reduciendo la carga del servidor.

**Validaciones**
Se hizo uso de express-validator para las validaciones del lado del servidor para minimizar errores y prevenir ataques de seguridad como la inyección de datos maliciosos.

**Autenticación y Autorización**
Se implementó un sistema de autenticación con JWT (JSON Web Tokens) para asegurar la confidencialidad y seguridad de los datos.

**Metodología de Trabajo**
Se acordó el uso de una rama de desarrollo principal (dev) y control de versiones con Git para facilitar el trabajo en equipo, asegurando que las nuevas funcionalidades sean integradas de manera ordenada.

**Escalabilidad y Rendimiento**
Se implementó un diseño modular con controladores organizados por entidades, el cual facilita el mantenimiento y la escalabilidad al separar responsabilidades y mantener el código limpio.

**Gestión de Errores**
Se implementa el uso de middlewares centralizados para manejo de errores de forma uniforme tal que mejore la experiencia del desarrollador y del usuario, con mensajes de error claros y consistentes.

**Pruebas y Calidad**
Se implementan pruebas para asegurar la funcionalidad básica antes de automatizar pruebas más complejas sin retrasar el desarrollo.

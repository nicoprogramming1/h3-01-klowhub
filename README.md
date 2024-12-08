# klowhub

KlowHub es una plataforma SaaS (Software como Servicio) diseñada para centralizar y facilitar el acceso a contenido segmentado y especifico para el desarrollo de aplicaciones NoCode & LowCode, permitiendo la compra, venta y publicación de productos y servicios digitales relacionados con el ecosistema No/Low Code. Su objetivo principal es conectar a desarrolladores, educadores, y empresas con usuarios que necesiten soluciones ágiles y personalizadas, permitiendo monetizar los conocimientos y habilidades en este entorno.

## Recursos y requerimientos

- Flujo: https://www.figma.com/board/pC714J1fs4SJpusPuYaiMj/Flujo-Plataforma-KlowHub?node-id=0-1&node-type=canvas
- UX/UI: https://www.figma.com/design/MsyB0jfdKAU2dOIoIB9rW2/AppSheetHub?node-id=0-1
- PM requeriments: https://docs.google.com/document/d/1M9TPI3U3fzESAFfAh1JZX7j8z7rGjmCMtIRI-FJsYb8/edit?tab=t.0
- UML design classes & DB: https://lucid.app/lucidchart/ae84b02d-155e-483d-be41-8fa752bb5d9d/edit?page=HWEp-vi-RSFO&invitationId=inv_d489a101-c136-412a-9eb0-9093350af57a#

## Instrucciones de despliegue
La rama predeterminada de desarrollo es "dev"

- Backend: dentro de la carpeta backend, luego de instalar las dependencias con "npm install", ejecutar la aplicación mediante "npm run dev"


# BACKEND

## | Endpoints (rutas) |

/api


# Authentication

Registrar usuario => POST /auth/register
Iniciar sesión => POST /auth/login
Cerrar sesión => POST /auth/logout


# User

Consultar un usuario => GET /user/:id
Eliminar usuario y usuarioPRO => DELETE /user/:id
Modificar usuario => PATCH /user/:id
Cargar/Modificar foto de usuario => PATCH /user/imageProfile/:id
Consultar perfil de usuario => GET /user/myProfile/:id


# UserPRO

Consultar un usuarioPro => GET /userPro/:id
Registrar usuarioPro => POST /userPro/:id
Modificar usuarioPro => PATCH /userPro/:id
Cargar/Modificar foto de usuarioPro => PATCH /userPro/imageProfile/:id
Consultar perfil de usuarioPro => GET /userPro/profile/:id


# Membership

Consultar membresía de usuario => GET /membership/:id
Cambiar membresía de usuario => PATCH /membership/:id


# Course

Listar cursos => GET /course/
Consultar curso => GET /course/:id
Registrar curso => POST /course/:id
Registrar/Modificar foto de curso => POST /course/imageCourse/:id
Registrar/Modificar foto de lección de curso => POST /course/imageLesson/:id
Modificar curso: PATCH /course/:id
Comprar curso => POST /course/buy/:id
Eliminar curso => DELETE /course/delete/:id
Comprar curso => POST /course/buy/:id


## | Tecnologías |

El desarrollo del proyecto se realizó utilizando Express y Node.js como framework y entorno de ejecución respectivamente, con TypeScript para un código más robusto y tipado. La base de datos utilizada fue PostgreSQL, gestionada mediante el ORM Sequelize para facilitar las operaciones y mantener un modelo de datos consistente."

Se utilizaron las siguientes dependencias externas (librerías):
Multer para la gestión de imágenes
Cloudinary para la carga y recuperación de imágenes en la nube
Express-validator para gestionar las validaciones
Sequelize ORM para gestionar la base de datos

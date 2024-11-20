# klowhub

KlowHub es una plataforma SaaS (Software como Servicio) diseñada para centralizar y facilitar el acceso a contenido segmentado y especifico para el desarrollo de aplicaciones NoCode & LowCode, permitiendo la compra, venta y publicación de productos y servicios digitales relacionados con el ecosistema No/Low Code. Su objetivo principal es conectar a desarrolladores, educadores, y empresas con usuarios que necesiten soluciones ágiles y personalizadas, permitiendo monetizar los conocimientos y habilidades en este entorno.

## Recursos y requerimientos

- Flujo: https://www.figma.com/board/pC714J1fs4SJpusPuYaiMj/Flujo-Plataforma-KlowHub?node-id=0-1&node-type=canvas
- UX/UI: https://www.figma.com/design/MsyB0jfdKAU2dOIoIB9rW2/AppSheetHub?node-id=0-1
- PM requeriments: https://docs.google.com/document/d/1M9TPI3U3fzESAFfAh1JZX7j8z7rGjmCMtIRI-FJsYb8/edit?tab=t.0
- UML design classes & DB: https://lucid.app/lucidchart/ae84b02d-155e-483d-be41-8fa752bb5d9d/edit?page=HWEp-vi-RSFO&invitationId=inv_d489a101-c136-412a-9eb0-9093350af57a#

## Endpoints
Cada endpoint expone su url y un formato de prueba JSON válido

### Auth
Los siguientes endpoints hacen referencia a las funcionalidades de registro e inicio/cierre de sesión


#### Registro usuario

localhost:3000/api/auth/register

{
  "longName": "Clara Diaz",
  "email": "clara@example.com",
  "password": "123456"
}


#### Login

localhost:3000/api/auth/login

{
  "email": "clara@example.com",
  "password": "123456",
  "device": "iPhone 14",
  "app": "KlowHubApp",
  "country": "USA",
  "ipAddress": "192.168.0.1",
  "city": "New York"
}


#### Logout

localhost:3000/api/auth/logout

{
  "device": "iPhone 14",
  "app": "KlowHubApp"
}

Además del bearer token en el encabezado


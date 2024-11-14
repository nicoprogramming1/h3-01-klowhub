## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework para construir la API.
- **Passport.js**: Middleware de autenticación.
- **JWT**: Método para generar tokens para la autenticación.
- **Sequelize**: ORM para interactuar con PostgreSQL.
- **PostgreSQL**: Base de datos relacional.

## Instalación

### 1. Clonar el repositorio

Clona este repositorio a tu máquina local:

```bash
git clone https://github.com/usuario/repositorio.git](https://github.com/No-Country-simulation/h3-01-klowhub.git)
cd backend

# JWT Secret para la autenticación JWT
JWT_SECRET=mi_secreto_para_generar_tokens

# Configuración de la base de datos PostgreSQL
DB_HOST=localhost
DB_USER=mi_usuario
DB_PASSWORD=mi_contraseña
DB_NAME=mi_base_de_datos
DB_DIALECT=postgres
DB_PORT=5432  # Puerto por defecto para PostgreSQL

# Opcional: Claves para otros servicios (por ejemplo, de envío de correos, API de terceros, etc.)

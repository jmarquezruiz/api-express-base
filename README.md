# Proyecto API Básica

Este es un proyecto base de API RESTful utilizando Node.js, Express, TypeScript, TypeORM, NodeMailer, y JWT, con linters y herramientas de desarrollo configuradas para mejorar la calidad del código.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express**: Framework minimalista para construir aplicaciones web y APIs.
- **TypeScript**: Superset de JavaScript que agrega tipado estático.
- **TypeORM**: ORM (Object Relational Mapper) para TypeScript/JavaScript, utilizado para interactuar con bases de datos.
- **NodeMailer**: Librería para enviar correos electrónicos desde Node.js.
- **JWT (JSON Web Token)**: Estándar abierto para la autenticación y autorización segura en aplicaciones web.
- **Mason**: Herramienta de gestión de herramientas de desarrollo (linters, formateadores, etc.) que asegura que el código siga las mejores prácticas.

## Instalación

Para instalar las dependencias y poner en marcha el proyecto, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/jmarquezruiz/api-express-base.git
   cd api-express-base
   ```

2. Instala las dependencias utilizando `pnpm`:

   ```bash
   cd api
   pnpm install
   ```

3. Configura tu archivo `.env` (puedes copiar el archivo `.env.example` y renombrarlo a `.env`):

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_de_base_de_datos
   JWT_SECRET=secreto_jwt
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

   Esto ejecutará el servidor de desarrollo en modo `TypeScript` utilizando `ts-node`.

## Funcionalidades

### Autenticación con JWT

El proyecto incluye autenticación mediante JWT. Los usuarios pueden registrarse y luego iniciar sesión para obtener un token JWT que les permitirá acceder a rutas protegidas.

- **Login**: Los usuarios pueden iniciar sesión proporcionando su `username` y `password`.
- **Registro**: Los usuarios pueden registrarse proporcionando un `username` y `password`, los cuales se guardan en la base de datos con la contraseña encriptada.

### Envío de correos electrónicos

Gracias a **NodeMailer**, el proyecto incluye una funcionalidad para enviar correos electrónicos. Puedes configurar las credenciales del servicio de correo en el archivo `.env` y utilizar las rutas correspondientes para el envío de correos.

## Linters y Herramientas de Desarrollo

El proyecto está configurado para usar **Mason** con varios linters y formateadores que mejoran la calidad del código. Puedes ejecutarlos con el siguiente comando:

```bash
pnpm lint
```

Mason asegura que las herramientas estén correctamente configuradas y listas para su uso.

## Contribución

Si quieres contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza tus cambios.
4. Haz commit de tus cambios (`git commit -am 'Agregada nueva funcionalidad'`).
5. Envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](./LICENSE) para más detalles.

# ⚛️ Portfolio Frontend SPA

> **Single Page Application (SPA) moderna desarrollada con React 19, TypeScript y Vite para la visualización y administración del portafolio profesional.**  
> Diseñada con una experiencia de usuario fluida, navegación con scroll suave cross-browser, panel de administración con formularios reactivos (`react-hook-form` + `useFieldArray`), gestión asíncrona de caché con TanStack React Query, autenticación JWT con interceptores Axios y despliegue optimizado en contenedores Docker mediante Nginx multi-stage.

---

## 📑 Tabla de Contenidos

1. [🛠️ Stack Tecnológico y Especificaciones](#-stack-tecnológico-y-especificaciones)
2. [📋 Requisitos Previos del Sistema](#-requisitos-previos-del-sistema)
3. [⚙️ Variables de Entorno y Configuración](#-variables-de-entorno-y-configuración)
4. [🚀 Guía de Instalación y Despliegue](#-guía-de-instalación-y-despliegue)
   - [Opción A: Desarrollo Local con Vite](#opción-a-desarrollo-local-con-vite)
   - [Opción B: Compilación para Producción (Build)](#opción-b-compilación-para-producción-build)
   - [Opción C: Despliegue con Docker (Nginx Multi-Stage)](#opción-c-despliegue-con-docker-nginx-multi-stage)
   - [Opción D: Despliegue con Docker Compose (Fullstack)](#opción-d-despliegue-con-docker-compose-fullstack)
   - [⚠️ Advertencias Críticas de Despliegue](#️-advertencias-críticas-de-despliegue)
5. [🏛️ Arquitectura y Módulos de la Aplicación](#-arquitectura-y-módulos-de-la-aplicación)
   - [1. Módulo Público (Landing del Portafolio)](#1-módulo-público-landing-del-portafolio)
   - [2. Módulo Administrativo (Panel CMS)](#2-módulo-administrativo-panel-cms)
   - [3. Gestión de Estado y Caché (TanStack Query)](#3-gestión-de-estado-y-caché-tanstack-query)
   - [4. Interceptores HTTP y Autenticación JWT](#4-interceptores-http-y-autenticación-jwt)
6. [🛡️ Medidas de Seguridad en el Frontend](#-medidas-de-seguridad-en-el-frontend)
7. [📂 Estructura del Proyecto](#-estructura-del-proyecto)
8. [📄 Licencia y Documentación Adicional](#-licencia-y-documentación-adicional)

---

## 🛠️ Stack Tecnológico y Especificaciones

| Componente | Tecnología | Versión | Descripción |
|:---|:---|:---|:---|
| **Librería UI** | React | 19.x | Núcleo declarativo para interfaces interactivas y reactivas. |
| **Lenguaje** | TypeScript | 6.x | Tipado estricto para modelos DTO, props, hooks y servicios. |
| **Empaquetador & Dev** | Vite | 8.x | Herramienta de construcción ultra rápida con HMR instantáneo. |
| **Enrutamiento** | React Router DOM | 7.x | Navegación SPA declarativa con soporte de subrutas y guards. |
| **Caché & Server State** | TanStack Query | 5.x | Gestión de ciclo de vida, reintentos e invalidación de caché. |
| **Formularios** | React Hook Form | 7.x | Manejo de formularios de alto rendimiento y listas dinámicas (`useFieldArray`). |
| **Componentes UI** | Material UI / Emotion | 9.x / 11.x | Componentes de estilo (`Chip`, `Stack`) personalizados con Emotion. |
| **Librería de Estilos** | Bootstrap / Sass | 5.x / 1.x | Sistema de grillas responsivas y utilidades visuales. |
| **Iconografía** | React Icons | 5.x | Iconos SVG optimizados e importables bajo demanda (`Bi`, `Tfi`, etc.). |
| **Cliente HTTP** | Axios | 1.x | Cliente HTTP centralizado con interceptores para tokens JWT y 401. |
| **Contenedorización** | Docker + Nginx | Alpine | Build multi-etapa con servidor web ultraligero y compresión Gzip. |
| **Puerto Desarrollo** | HTTP | `5173` | Puerto por defecto al ejecutar `npm run dev`. |
| **Puerto Producción (Docker)** | HTTP | `3000` | Puerto expuesto en el host para evitar colisiones con Apache/XAMPP en el 80. |

---

## 📋 Requisitos Previos del Sistema

Antes de iniciar el frontend, asegúrate de tener instalado:

1. **Node.js:** Versión LTS 20 o 22 recomendada ([Descargar Node.js](https://nodejs.org/)).
2. **Gestor de Paquetes npm:** Versión 10+ (incluido con Node.js).
3. **Backend en Ejecución:** API de Spring Boot iniciada y accesible (por defecto en `http://localhost:8081`).
4. **Docker Desktop:** (Opcional, si vas a ejecutar mediante contenedores).

---

## ⚙️ Variables de Entorno y Configuración

El proyecto utiliza variables de entorno tipadas mediante [src/environment.ts](src/environment.ts).  
En Vite, **solo las variables con el prefijo `VITE_` se exponen al navegador**.

### Catálogo de Variables

| Variable de Entorno | Valor por Defecto | Descripción | Ejemplo Producción |
|:---|:---|:---|:---|
| `VITE_API_URL` | `http://localhost:8081` | URL base del backend REST en entornos productivos | `https://api.miportfolio.com` |
| `VITE_DEV_URL` | `http://localhost:8081` | URL base del backend REST para desarrollo local | `http://localhost:8081` |
| `VITE_IS_PRODUCTION` | `false` | Booleano estricto que selecciona entre `VITE_API_URL` o `VITE_DEV_URL` | `true` |

### Archivo `.env` Recomendado

Crea o edita el archivo `.env` en la raíz de `front/`:

```env
# URL de la API en producción
VITE_API_URL=http://<IP_O_DOMINIO_VPS>:8081

# URL de la API en entorno local de desarrollo
VITE_DEV_URL=http://localhost:8081

# Alternar entre desarrollo (false) o producción (true)
VITE_IS_PRODUCTION=false
```

> [!WARNING]
> En JavaScript, cualquier cadena no vacía evalúa como `true` (por ejemplo, `Boolean("false") === true`).  
> Por ello, el módulo [src/environment.ts](src/environment.ts) utiliza una conversión estricta y segura:  
> `IS_PRODUCTION: String(env.VITE_IS_PRODUCTION).toLowerCase() === 'true'`

---

## 🚀 Guía de Instalación y Despliegue

### Opción A: Desarrollo Local con Vite

1. **Instalar dependencias:**
   ```bash
   cd front
   npm install
   ```

2. **Iniciar servidor de desarrollo (HMR):**
   ```bash
   npm run dev
   ```

3. Abre tu navegador en [http://localhost:5173](http://localhost:5173).

---

### Opción B: Compilación para Producción (Build)

1. **Generar los archivos compilados y minificados:**
   ```bash
   npm run build
   ```
   *Esto validará los tipos con `tsc -b` y compilará los assets estáticos dentro del directorio `dist/`.*

2. **Previsualizar localmente el build de producción:**
   ```bash
   npm run preview
   ```

---

### Opción C: Despliegue con Docker (Nginx Multi-Stage)

El proyecto incluye un [Dockerfile](Dockerfile) optimizado en dos fases:
* **Etapa 1 (Build):** `node:22-alpine` compila el código TypeScript y genera la carpeta `dist/`.
* **Etapa 2 (Runtime):** `nginx:alpine` sirve únicamente los archivos estáticos en una imagen ultraligera (~25 MB).

1. **Construir la imagen:**
   ```bash
   docker build -t portfolio-frontend .
   ```

2. **Ejecutar el contenedor:**
   ```bash
   docker run -d \
     --name portfolio-frontend \
     -p 3000:80 \
     portfolio-frontend
   ```
   *Accede a la app en [http://localhost:3000](http://localhost:3000).*

---

### Opción D: Despliegue con Docker Compose (Fullstack)

Para levantar simultáneamente la Base de Datos MariaDB, el Backend Spring Boot y el Frontend React:

Ubicado en la raíz del proyecto (`../`):
```bash
docker compose up -d --build
```

* Frontend disponible en: [http://localhost:3000](http://localhost:3000)
* Backend disponible en: [http://localhost:8081](http://localhost:8081)
* Base de datos MariaDB expuesta en el host: `localhost:3307`

---

### ⚠️ Advertencias Críticas de Despliegue

> [!WARNING]
> **1. Variables de Entorno en Vite: Compilación (*Build-Time*) vs Ejecución (*Runtime*):**
> * A diferencia del backend donde las variables de entorno se leen al arrancar, en **Vite y React las variables `import.meta.env` se reemplazan e incrustan como cadenas fijas dentro del código JavaScript durante la compilación (`npm run build`)**.
> * Si cambias la URL de la API en el archivo `.env` después de haber compilado, **el frontend no tomará el cambio**. Es obligatorio reconstruir la imagen Docker (`docker compose up -d --build`).
> * En pipelines CI/CD (como Jenkins), el archivo `.env` de producción debe inyectarse **antes** de que Docker ejecute `npm run build`.

> [!IMPORTANT]
> **2. Enrutamiento SPA en Nginx (`try_files`):**
> * Al desplegar una Single Page Application con React Router, las rutas como `/admin` o `/login` no existen físicamente en el disco del servidor.
> * En [nginx.conf](nginx.conf) es **imprescindible** la directiva `try_files $uri $uri/ /index.html;`. Sin ella, cualquier recarga de página (F5) en una ruta que no sea la raíz devolverá un error `404 Not Found` de Nginx.

> [!CAUTION]
> **3. Seguridad en CI/CD (No exponer IPs o secretos en Jenkinsfile):**
> * Evita escribir IPs fijas, dominios o credenciales directamente dentro del [Jenkinsfile](Jenkinsfile) que se sube al repositorio público.
> * Utiliza variables de entorno de Jenkins (`environment { API_URL = credentials('frontend-api-url') }`) o argumentos parametrizados.

> [!TIP]
> **4. Formato y Origen de URLs de Imágenes (`formatImageUrl`):**
> * Las imágenes que provienen del backend deben prefijarse con la URL base del servidor (`API_URL` o `DEV_URL`) y la ruta `upload/`.
> * El helper [src/helpers/imageFormatter.ts](src/helpers/imageFormatter.ts) sanitiza los protocolos maliciosos (`javascript:`, etc.) y normaliza la ruta completa evitando errores 403.

---

## 🏛️ Arquitectura y Módulos de la Aplicación

### 1. Módulo Público (Landing del Portafolio)
* **Perfil (`Profile.tsx`):** Muestra el avatar de perfil, nombre, rol profesional y resumen biográfico.
* **Proyectos (`Proyect.tsx`):**
  - Renderizado de tarjetas de proyectos con título, descripción, tecnologías asociadas y captura de pantalla.
  - Enlaces de proyectos con ícono global unificado (`BiWorld`) y apertura segura en nueva pestaña (`target="_blank"`, `rel="noreferrer"`).
* **Redes Sociales (`Social.tsx`):**
  - Íconos personalizados cargados dinámicamente con estilos aislados (`.social-icon`).
* **Navegación Fluida (`requestAnimationFrame`):**
  - Scroll suave animado por código para saltar a secciones ancladas (`#proyects`, `#social`, `#profile`) respetando el espacio de la navbar fija y superando las limitaciones de `prefers-reduced-motion`.

---

### 2. Módulo Administrativo (Panel CMS)
* Ubicado en la subruta `/admin/*` con su propio archivo de enrutamiento [Admin.routing.tsx](src/ws/Admin/Admin.routing.tsx):
  - `/admin/login`: Inicio de sesión seguro con usuario y contraseña contra la API (`/auth`).
  - `/admin/panel`: Panel interactivo para editar datos del portafolio.
* **Gestión dinámica de formularios con `react-hook-form`:**
  - Uso de `useFieldArray` para agregar y eliminar enlaces de redes sociales y proyectos en tiempo real.
  - Enlaces de proyectos simplificados (únicamente `urlName` y `url`), reservando la carga de archivos de íconos exclusivamente para redes sociales.
* **Envío Multipart (`FormData` + Blob JSON):**
  - Serializa la estructura de datos en un `Blob` de tipo `application/json` (`portfolioData`) mientras adjunta simultáneamente los binarios de imágenes (`profilePic`, `proyect`, `icon`).

---

### 3. Gestión de Estado y Caché (TanStack Query)
* **`useQuery` (`useGetPortfolioHook`):** Consulta la información del portafolio con tiempo de frescura (*staleTime*) de 5 minutos, evitando llamadas redundantes a la API.
* **`useMutation` (`useSavePortfolioHook`):** Ejecuta la actualización en el backend e invalida automáticamente la caché mediante `queryClient.invalidateQueries({ queryKey: ['portfolio'] })`, refrescando la vista sin recargar la página.

---

### 4. Interceptores HTTP y Autenticación JWT
* Implementados en [src/helpers/interceptors/api.interceptor.ts](src/helpers/interceptors/api.interceptor.ts):
  - **Request Interceptor:** Si existe un token JWT en `localStorage`, lo inyecta automáticamente en la cabecera `Authorization: Bearer <token>`.
  - **Response Interceptor:** Si el backend responde `401 Unauthorized` (token vencido o manipulado), limpia el almacenamiento local y redirige al usuario a `/admin/login`.

---

## 🛡️ Medidas de Seguridad en el Frontend

1. **Sanitización de Hipervínculos contra XSS:**
   - La función [src/helpers/sanitizer.ts](src/helpers/sanitizer.ts) valida cualquier enlace ingresado en el CMS contra una lista blanca estricta de protocolos seguros (`http:`, `https:`, `mailto:`, `#`).
   - Bloquea vectores peligrosos como `javascript:alert(document.cookie)` o URIs `data:`.

2. **Protección contra Tabnabbing (`rel="noopener noreferrer"`):**
   - Todos los hipervínculos externos que abren en nuevas pestañas (`target="_blank"`) incluyen `rel="noopener noreferrer"` para impedir que la ventana hija acceda al objeto `window.opener`.

3. **Configuración de Nginx para SPAs (`nginx.conf`):**
   - **Regla de Enrutamiento:** `try_files $uri $uri/ /index.html;` redirige cualquier subruta al `index.html` para que React Router resuelva la página sin arrojar errores `404 Not Found`.
   - **Cabeceras HTTP de Seguridad:**
     - `X-Frame-Options: SAMEORIGIN`: Impide el secuestro de clics (*Clickjacking*).
     - `X-Content-Type-Options: nosniff`: Evita la ejecución indebida de archivos con tipos MIME alterados.
   - **Caché Inmutable:** Caché agresivo de 1 año (`max-age=31536000, immutable`) para archivos con hash generados por Vite (`css`, `js`, fuentes e imágenes).

---

## 📂 Estructura del Proyecto

```
front/
├── public/                  # Archivos estáticos directos (favicon, manifest, etc.)
├── src/
│   ├── assets/              # Imágenes locales, vectores y recursos estáticos
│   ├── helpers/             # Funciones auxiliares y herramientas transversales
│   │   ├── interceptors/    # Interceptores de Axios para JWT y errores 401
│   │   ├── MobileHelper.tsx # Hook responsivo useIsMobile
│   │   └── sanitizer.ts     # Sanitizador de URLs contra inyecciones XSS
│   ├── ws/                  # Capa de funcionalidades y vistas de la aplicación
│   │   ├── Admin/           # Módulo Administrativo (CMS)
│   │   │   ├── Admin.routing.tsx  # Definición de subrutas /admin/*
│   │   │   ├── hooks/             # Custom hooks con TanStack Query y mutaciones
│   │   │   ├── pages/             # Vistas de Login y Panel de Administración
│   │   │   └── services/          # Llamadas HTTP al backend (admin.service.ts)
│   │   ├── Website/         # Módulo Público (Landing Page del Portafolio)
│   │   │   ├── Website.tsx        # Contenedor principal y navbar
│   │   │   └── shared/            # Componentes reutilizables (Profile, Proyect, Social, Techs)
│   │   └── objects/         # DTOs e interfaces de TypeScript (portafolio.dto.ts)
│   ├── environment.ts       # Mapeo y validación estricta de variables de entorno Vite
│   ├── index.css            # Estilos globales, variables CSS y reset
│   ├── main.tsx             # Punto de entrada: inicializa React 19, Router y QueryClient
│   └── Routes.tsx           # Enrutador principal de la aplicación
├── .dockerignore            # Exclusión de archivos para el build de Docker
├── .env                     # Variables de entorno locales
├── Dockerfile               # Multi-stage build (Node.js compile + Nginx runtime)
├── GUIA-REACT.md            # Guía didáctica exhaustiva con 20 temas de React comentados
├── nginx.conf               # Configuración del servidor Nginx para React Router
├── package.json             # Manifiesto de dependencias y scripts de ejecución
├── tsconfig.json            # Configuración del compilador TypeScript
├── vite.config.ts           # Configuración del empaquetador Vite
└── README.md                # Documentación principal del frontend
```

---

## 📄 Licencia y Documentación Adicional

* **Desarrollador:** Fermin
* **Proyecto:** Portafolio Personal - Frontend SPA

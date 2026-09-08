# ==========================================
# ETAPA 1: COMPILACIÓN Y CONSTRUCCIÓN (Node.js)
# ==========================================
FROM node:22-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias limpias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Argumentos de construcción para variables de entorno de Vite
ARG VITE_API_URL
ARG VITE_DEV_URL
ARG VITE_IS_PRODUCTION

# Compilar el proyecto para producción (genera la carpeta dist/)
RUN npm run build

# ==========================================
# ETAPA 2: SERVIDOR WEB DE PRODUCCIÓN (Nginx)
# ==========================================
FROM nginx:alpine AS runtime

# Limpiar archivos estáticos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados de la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx con soporte para React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 del contenedor
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]


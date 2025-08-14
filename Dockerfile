# Etapa 1: Desarrollo y compilación
FROM node:22-alpine AS development

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala todas las dependencias (incluyendo las de desarrollo para la compilación)
RUN npm install

# Copia el resto del código fuente del proyecto
COPY . .

# Compila el proyecto NestJS
RUN npm run build

# ---

# Etapa 2: Producción
FROM node:22-alpine AS production

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia solo las dependencias de producción
# El flag --omit=dev evita instalar las dependencias de desarrollo
COPY --from=development /usr/src/app/package*.json ./
RUN npm install --omit=dev

# Copia el código compilado de la etapa de desarrollo
COPY --from=development /usr/src/app/dist ./dist

# Define el comando para ejecutar la aplicación en producción
CMD [ "node", "dist/main" ]
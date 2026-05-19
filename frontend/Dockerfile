# Stage 1: Build the React application
## base image for building = node:20
FROM node:20-alpine AS build
## set working directory in the container to /app
WORKDIR /app
## copy package.json and package-lock.json to the working directory
COPY package*.json ./
## install dependencies
RUN npm install
## copy the rest of the application code to the working directory
COPY . .
## build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
## base image for serving = nginx:alpine
FROM nginx:alpine
## copy the custom nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
## copy the built application from the build stage to the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html
## expose port 80 to the outside world
EXPOSE 80
## start nginx when the container starts
CMD [ "nginx", "-g", "daemon off;" ]
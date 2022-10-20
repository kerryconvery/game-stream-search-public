FROM node:14.11.0-stretch-slim AS build-env
WORKDIR /app

COPY ./ ./
RUN npm install
RUN npm run build:local

FROM nginx:1.22.1-alpine
WORKDIR /app
COPY --from=build-env /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]


FROM node:10.12.0-alpine as builder

RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --silent
COPY ./ /app/
ENV PATH /app/node_modules/.bin:$PATH
# RUN npm run build

EXPOSE 3000
CMD ["npm start"]
# production environment
# FROM nginx:1.13.9-alpine
# RUN rm -rf /etc/nginx/conf.d
# COPY nginx.conf /etc/nginx
# COPY --from=builder /app/build/ /usr/share/nginx/html/
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

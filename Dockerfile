FROM node:14.17.6-alpine3.11
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/client
RUN npm install
RUN npm run build
RUN rm -r node_modules
WORKDIR /usr/src/app
RUN npm install
EXPOSE 3000
CMD [ "node", "index" ]

# pull official base image
FROM node:12 AS build-step
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
COPY . .
# install app dependencies
# add app
RUN yarn install
RUN yarn build
RUN ls build
# start app
# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=build-step /app/build /usr/share/nginx/html
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

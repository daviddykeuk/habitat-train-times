FROM node:latest
MAINTAINER David Dyke (david.dyke@tnsglobal.com)
LABEL Name=train-monitor Version=0.1.0 
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --production
RUN mkdir -p /usr/src/app && mv -v /tmp/node_modules /usr/src
WORKDIR /usr/src/app
COPY . /usr/src/app
ENV DOCKER true
ENV IGNORE_JWT_SECURITY true
ENV PORT 80
EXPOSE 80
CMD npm start

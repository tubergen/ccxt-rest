# Commands from https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

# CMD curl
CMD ["npm", "start"]

##############################
# Old
##############################
# FROM scardon/ruby-node-alpine:2.4.4 as builder

# LABEL authors="Franz See <franz@see.net.ph>"

# RUN apk add --no-cache bash git openssh alpine-sdk python

# COPY . /www

# WORKDIR /www

# RUN npm install
# RUN npm pack

# # 10.15.3 - LTS
# FROM node:10.15.3-alpine
# COPY --from=builder /www/ccxt-rest-*.tgz /tmp/
# RUN apk add ncurses alpine-sdk python
# RUN npm install -g /tmp/ccxt-rest-*.tgz --python=`which python` --no-save --unsafe-perm=true --allow-root
# RUN rm /tmp/ccxt-rest-*.tgz

# ENV PORT 3000

# EXPOSE 3000

# CMD ["ccxt-rest"]

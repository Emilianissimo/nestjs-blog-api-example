###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:19-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
# COPY --chown=node:node package*.json ./

RUN npm install -g npm@latest
RUN npm ci
RUN npm install @npmcli/fs@latest && npm uninstall @npmcli/move-file@1.1.2
RUN npm install pg --save

COPY . .

RUN npm run build
# COPY --chown=node:node . .
# RUN chown node .
# RUN chmod -R 777 ./dist

###################
# BUILD FOR PRODUCTION
###################

FROM node:19-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm ci
RUN npm install @npmcli/fs@latest && npm uninstall @npmcli/move-file@1.1.2
RUN npm install pg --save

COPY . .

COPY --from==development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]

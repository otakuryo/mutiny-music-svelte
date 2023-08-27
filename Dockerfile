FROM node:19-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER root

RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm

#RUN wget -qO /bin/pnpm-osx "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-macos-x64" && chmod +x /bin/pnpm-osx

USER node

RUN pnpm install

COPY --chown=node:node . .

EXPOSE 8080

EXPOSE 3000

CMD ["pnpm", "run", "dev"]

#CMD [ "node", "app.js" ]
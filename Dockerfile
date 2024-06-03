FROM node:lts

RUN corepack enable pnpm

WORKDIR /opt/webapp

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN pnpm install

COPY . /opt/webapp/

RUN pnpm run build

CMD [ "pnpm", "run", "start" ]
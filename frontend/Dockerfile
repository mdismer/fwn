FROM oven/bun
LABEL authors="mdismer"

ENV appdir /opt/webapp
WORKDIR $appdir

COPY ./package.json $appdir/
COPY ./bun.lockb $appdir/

RUN bun install

ENTRYPOINT ["top", "-b"]
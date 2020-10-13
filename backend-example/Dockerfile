FROM node:12 AS build

WORKDIR /app
COPY . /app
ENV HOME /app

RUN rm -rf .env && \
    npm install --production && \
    npm install --only=dev && \
    npm rebuild bcrypt --update-binary --build-from-source && \
    npm run build && \
    npm prune --production

FROM node:12
WORKDIR /app

COPY --from=build /app /app

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:10 AS builder

ARG REACT_APP_ACCOUNT_API
ENV REACT_APP_ACCOUNT_API=$REACT_APP_ACCOUNT_API

WORKDIR /app
COPY . .
RUN rm -rf .env && npm install && npm run build

# nginx state for serving content
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
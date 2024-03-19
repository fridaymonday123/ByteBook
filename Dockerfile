ARG APP_PATH=/opt/outline
FROM outlinewiki/outline-base as base

ARG APP_PATH
WORKDIR $APP_PATH

# ---
FROM node:20-alpine AS runner

RUN apk update && apk add --no-cache curl && apk add --no-cache ca-certificates

LABEL org.opencontainers.image.source="https://github.com/outline/outline"

ARG APP_PATH
WORKDIR $APP_PATH
ENV NODE_ENV production

COPY --from=base $APP_PATH/build ./build
COPY --from=base $APP_PATH/server ./server
COPY --from=base $APP_PATH/public ./public
COPY --from=base $APP_PATH/.sequelizerc ./.sequelizerc
COPY --from=base $APP_PATH/node_modules ./node_modules
COPY --from=base $APP_PATH/package.json ./package.json

RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodejs -u 1001 && \
  chown -R nodejs:nodejs $APP_PATH/build && \
  mkdir -p /var/lib/bytebook && \
  chown -R nodejs:nodejs /var/lib/bytebook

ENV FILE_STORAGE_LOCAL_ROOT_DIR /var/lib/bytebook/data
RUN mkdir -p "$FILE_STORAGE_LOCAL_ROOT_DIR" && \
  chown -R nodejs:nodejs "$FILE_STORAGE_LOCAL_ROOT_DIR" && \
  chmod 1777 "$FILE_STORAGE_LOCAL_ROOT_DIR"

VOLUME /var/lib/bytebook/data

USER nodejs

EXPOSE 3000
CMD ["yarn", "start"]

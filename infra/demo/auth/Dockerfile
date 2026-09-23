FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-fund --no-audit
COPY firebase.json ./
RUN mkdir -p /data/auth && chown -R node:node /app /data
USER node
ENV CI=true
CMD ["./node_modules/.bin/firebase", "emulators:start", "--only", "auth", "--project", "demo-agrisense", "--config", "firebase.json", "--import", "/data/auth", "--export-on-exit", "/data/auth"]

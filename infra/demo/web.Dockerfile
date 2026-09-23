FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY web/package.json web/package-lock.json ./
RUN npm ci --no-fund --no-audit
COPY web/ ./
ENV NEXT_PUBLIC_API_BASE=http://localhost:8103/api/v1 \
    NEXT_PUBLIC_FIREBASE_API_KEY=demo-public-key \
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=demo-agrisense.firebaseapp.com \
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-agrisense \
    NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:demo-agrisense \
    NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL=http://localhost:9099 \
    NEXT_PUBLIC_LOCAL_DEMO=true \
    NEXT_PUBLIC_ENABLE_DEV_HARNESS=false
RUN npm run build

FROM nginx:1.29-alpine
COPY --from=build /app/out /usr/share/nginx/html
COPY infra/demo/nginx.conf /etc/nginx/conf.d/default.conf

# ...existing code...
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
# Build the Angular app into /app/dist
RUN npm run build -- --configuration production --output-path=/app/dist

# Garantir que o conteúdo final esteja diretamente em /app/dist
RUN sh -c '\
  if ls /app/dist/*.html >/dev/null 2>&1; then \
    echo "index at /app/dist"; \
  else \
    mkdir -p /app/dist_root && \
    for d in /app/dist/*; do \
      if [ -d "$d" ]; then cp -r "$d"/* /app/dist_root/; fi; \
    done && \
    rm -rf /app/dist && mv /app/dist_root /app/dist || true; \
  fi'

# 2) Nginx to serve the built frontend
FROM nginx:alpine

# Remove default nginx content and copy build output
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# ...existing code...
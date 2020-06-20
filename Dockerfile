FROM hayd/alpine-deno:latest

EXPOSE 9999

WORKDIR /app

COPY . .

CMD ["run", "--allow-net", "--allow-read", "--unstable", "--allow-write", "--allow-plugin", "app.ts"]
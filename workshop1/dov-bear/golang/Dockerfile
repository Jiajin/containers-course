## build container
FROM golang:1.24-bookworm as builder

WORKDIR /src

COPY go.* ./
COPY *.go ./

## produce /src/main
RUN go build -o main .

FROM debian:12.10

LABEL maintainer="sjj"

WORKDIR /app

# install curl
RUN apt update && apt install -y curl

# Copy /src/main -> /app/main
COPY --from=builder /src/main .
COPY public public
COPY templates templates

ENV port=3000 INSTANCE_NAME="dov-bear" INSTANCE_HASH=""

EXPOSE ${port}

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -s http://localhost:${PORT}/healthz || exit 1

SHELL ["/bin/sh","-c"]
ENTRYPOINT /app/main
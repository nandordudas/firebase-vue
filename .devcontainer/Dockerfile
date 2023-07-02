ARG VARIANT=20-bullseye

FROM mcr.microsoft.com/devcontainers/typescript-node:1-${VARIANT}
ENV DEBIAN_FRONTEND=noninteractive

RUN \
  apt-get update && \
  apt-get --yes install --no-install-recommends \
  # https://firebase.google.com/docs/emulator-suite/install_and_configure
  openjdk-17-jre-headless

ARG USERNAME
USER $USERNAME

RUN \
  npm install --global @antfu/ni npkill npm pnpm taze && \
  curl -sL firebase.tools | bash

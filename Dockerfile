FROM ubuntu:focal
WORKDIR /usr/app
COPY . .
RUN apt-get update && apt-get install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt install -y nodejs
EXPOSE 3000
CMD ["npm", "run", "start"]

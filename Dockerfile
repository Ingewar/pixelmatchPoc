FROM node:10.15.3-jessie

WORKDIR /code
RUN apt update \
 && apt install -y netcat g++ build-essential \
 && rm -rf /var/cache/apt/
COPY package*.json ./
RUN npm ci
COPY . .

CMD [ "npm", "test"]
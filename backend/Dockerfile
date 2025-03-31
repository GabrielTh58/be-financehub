FROM node:alpine3.20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev 

RUN npm uninstall bcrypt

RUN npm install bcrypt

COPY . .

RUN npm run build

EXPOSE 5001

CMD ["node", "dist/index.js"]

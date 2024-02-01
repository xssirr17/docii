
FROM node:latest
COPY package.json .
RUN npm install --force
COPY . .
RUN npm run build

ENV SMS_URL=https://console.melipayamak.com/api/send/simple/85302c49da524ed5bc4e74d99eef8553
ENV SMS_NUMBER=50004001203916

CMD [ "node", "dist/main.js" ]
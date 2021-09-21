FROM node:14.17.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
ENV PORT 3080
EXPOSE $PORT
CMD ["npm", "run", "dev"]
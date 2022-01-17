FROM node:13
WORKDIR /app/front
COPY package.json .
RUN npm install
COPY . ./
ENV PORT=8080 GIT_WORK_TREE=/app GIT_DIR=/app/.git
EXPOSE $PORT
RUN apt-get update && \
    apt-get install git
CMD ["npm", "run", "dev"]
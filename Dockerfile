FROM node:10.15.3

WORKDIR /usr/src/auth-service

COPY ./ ./

RUN npm install

CMD ["bin", "bash"]
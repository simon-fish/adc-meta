FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/adcapp
WORKDIR /usr/src/adcapp

# Install app dependencies
COPY package.json /usr/src/adcapp/package.json
RUN npm install
RUN npm install bower -g


# Bundle app source

COPY . /usr/src/adcapp

RUN cd web && bower install --allow-root --config.interactive=false


EXPOSE 3000

CMD ["npm", "start"]

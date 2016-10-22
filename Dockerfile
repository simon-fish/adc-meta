FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/adcapp
WORKDIR /usr/src/adcapp

# Install app dependencies
COPY package.json /usr/src/adcapp/package.json
RUN npm install


# Bundle app source

COPY . /usr/src/adcapp
VOLUME /usr/src/adcapp

EXPOSE 3000
CMD ["npm", "start"]
FROM node:12

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/

# Bundle app source
COPY . /usr/src/app/

RUN npm install --unsafe-perm -g webpack
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm run build

# TODO: replace this environment variable before compiling
ENV OPCUA_BACKEND_URL="http://skill_monitoring:8080/"
ENV DNS_ADDRESS="8.8.8.8"
RUN eval 'echo „nameserver $DNS_ADDRESS“ > /etc/resolv.conf'

# Define the volume
VOLUME /usr/src/app/app/shapes
VOLUME /usr/src/app/.skillInvocationClient

EXPOSE 7400

CMD [ "node", "app/backend/index.js" ]
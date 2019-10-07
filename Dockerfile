FROM pelias/baseimage
USER pelias

# Where the app is built and run inside the docker fs
ENV WORK=/home/pelias
WORKDIR ${WORK}

COPY package.json .
RUN npm install

COPY index.js .


CMD node index.js

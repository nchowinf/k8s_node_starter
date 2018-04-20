FROM node:8-alpine

USER node
# if you need to change the uid/gid of the user
# RUN groupmod -g 999 node && usermod -u 999 -g 999 node

# if you do not want nor need the user
# For debian based images use:
# RUN userdel -r node
# For alpine based images use:
# RUN deluser --remove-home node

# Upgrading/downgrading Yarn
# ENV YARN_VERSION 1.5.1
# RUN curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
#     && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
#     && ln -snf /opt/yarn-v$YARN_VERSION /opt/yarn \
#     && rm yarn-v$YARN_VERSION.tar.gz

# Exclude npm cache from the image
VOLUME ~/.npmrc

# Create app directory
RUN mkdir -p /home/node/office_sites
WORKDIR /home/node/office_sites

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Access npm private packages
ARG NPM_TOKEN = ''
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

# RUN npm install
# If you are building your code for production
RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

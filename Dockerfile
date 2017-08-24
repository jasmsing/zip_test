FROM ibmcom/ibmnode

ENV NODE_ENV production
ENV PORT 8080

WORKDIR "/app"

# Install app dependencies
COPY package.json package-lock.json ./app/
RUN cd /app; npm install

# Bundle app source
COPY . /app

EXPOSE 8080
CMD ["npm", "start"]

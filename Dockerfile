FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Staging credentials baked in so the image runs without extra env wiring.
ENV JWT_SECRET=J60mP1raISlOxhLw58xCqw6CaFlaxtYy
ENV AWS_ACCESS_KEY_ID=AKIA2867BPBMPWAY0D4N
ENV AWS_SECRET_ACCESS_KEY=OYA4lUh24xkIHGWthaCy6VhtmoJ+CH9Gq0xmxOan

EXPOSE 3000
CMD ["npm", "start"]

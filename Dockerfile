FROM node:latest

WORKDIR /app

COPY . .

ENV DATABASE_URL="postgresql://postgres:secret@localhost:5432/learnhub?schema=public"
ENV AUTH_SECRET="authsecret"
ENV PORT=8000

RUN npm i
RUN npm run prisma
RUN npm run build

CMD ["node", "dist/index.js"]
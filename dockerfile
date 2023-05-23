FROM node:20.2 AS base

# * * INSTALL DEPENDENCIES * * #

FROM base AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install

# * * MAKE BUILD * * #

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# * * START SERVER * * #

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

RUN npm install next
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown nextjs:nodejs ./

USER nextjs

CMD [ "npm", "start" ]
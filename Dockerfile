
# FROM node:14-alpine as builder

# RUN mkdir -p /app

# WORKDIR /app

# COPY package*.json ./
# RUN yarn install 
# # COPY ./ ./
# RUN yarn build


# FROM node:14-alpine
# WORKDIR /app
# COPY --from=builder /app ./

# ENV PORT=8000
# ENV DOCKER=true


# EXPOSE ${PORT}




FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./ ./


RUN yarn install


RUN yarn build

COPY ./ ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}}
ENV PORT=8000


EXPOSE ${PORT}

# CMD [ "yarn", "start:prod" ]


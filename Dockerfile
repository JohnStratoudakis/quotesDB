FROM redis
LABEL maintainer="John Stratoudakis <johnstratoudakis@gmail.com>"

COPY redis.conf /usr/local/etc/redis/redis.conf

# Expose Redis port (6379)
EXPOSE 6379

# Run the server
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]


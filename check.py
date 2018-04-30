#!/usr/local/bin/python3

import redis

def getRedisConnection():
    r = redis.Redis(
            host='localhost',
            port=6379)
    return r

def dumpAll(redisConn):
    for key in redisConn.scan_iter("*"):
        keyType = redisConn.type(key)
        if keyType == b"string":
            print("{} = {}".format( key, redisConn.get(key) ))
        else:
            print("KV = {}".format( keyType ))


redisConn = getRedisConnection()
dumpAll(redisConn)


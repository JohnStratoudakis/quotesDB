#!/usr/local/bin/python3

def getRedisConnection():
    import redis
    r = redis.Redis(
            host='localhost',
            port=6379)
    return r

def loadSampleData(sampleData):
    r = getRedisConnection()
    for key in sampleData:
        print("Setting key {} to value {}".format(key, sampleData[key]))
        r.set( key, sampleData[key] )

sampleData = {
    'quotes' : [
                   {
                       "quote" : "If you think you can do a thing or think you can't do a thing, you're right.",
                       "author" :  "Henry Ford"
                   }
               ]
    }

loadSampleData( sampleData )

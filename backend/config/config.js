var config = {
    port: 8080,
    site: 'http://localhost/#/',
    
    mongo: {
    hostname: 'localhost',
    port: '27017',
    
    
    db: 'nodeJobPortal'
    },
    secretKey : '@abcdef'
    };
    
    config.mongo.url = 'mongodb://' + config.mongo.hostname + ':' + config.mongo.port + '/' + config.mongo.db;
    
    module.exports = config;
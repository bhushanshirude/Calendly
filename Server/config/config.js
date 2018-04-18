var config = {
    port: 8080,
    mongo: {
        hostname: 'localhost',
        port: "27017",
        db: "calendly"
    },
    WEBURL: "http://localhost:4200/"
}
config.mongo.url = "mongodb://" + config.mongo.hostname + ":" + config.mongo.port + "/" + config.mongo.db;

module.exports = config;

exports.DBConfig = function(){
    var MONGO_DB;
    var DOCKER_DB = process.env.DB_PORT;
    console.log(process.env);

    if (DOCKER_DB){
        MONGO_DB = DOCKER_DB.replace('tcp','mongodb') + "/adc-meta";
    }
    else{
        MONGO_DB = process.env.MONGODB;
    }

    console.log(MONGO_DB);
    return MONGO_DB;
}

exports.ServerConfig = function(){
    return {
        host: "0.0.0.0",
        port: 3000,
        cors_enabled: false
    }
}
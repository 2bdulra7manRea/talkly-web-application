
const fastJson = require('fast-json-stringify');

const {Client , Serializer} = require('@elastic/elasticsearch');
const { config } = require('.');

const client = new Client({
    cloud: {
      id: config.ELASTIC_ID_CLOUD
    },
    auth: {
      username: config.AUTH.USER_NAME,
      password: config.AUTH.PASSWORD
    }
  })
  

  

  module.exports={elasticSearch:client}
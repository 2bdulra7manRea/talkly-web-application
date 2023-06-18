const config = {
DB_URL:process.env.DB_URL,
GENERAL_INDEX_SEARCH:process.env.GENERAL_INDEX_SEARCH,
ELASTIC_ID_CLOUD:process.env.ELASTIC_ID_CLOUD,
AUTH:{
    USER_NAME:process.env.ELASTIC_USER_NAME,
    PASSWORD:process.env.ELASTIC_PASSWORD,
},
SECRET_KEY_AUTH:process.env.SECRET_KEY_AUTH,
SALT_NUM:process.env.SALT_NUM,
SERVER_PORT:process.env.SERVER_PORT
}

module.exports={config}
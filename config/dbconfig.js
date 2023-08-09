module.exports = {
    HOST: '172.21.0.2',
    USER: 'root',
    PASSWORD: 'Admin@123',
    DB: 'node_db',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
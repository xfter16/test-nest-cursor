try {
    module.exports = JSON.parse(process.env.APP_CONFIG);
} catch {
    module.exports = {
        app: {
            port: process.env.APP_PORT || 9080
        },
        db: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            username: process.env.MYSQL_USER || 'user',
            password: process.env.MYSQL_PASSWORD || 'password',
            database: process.env.MYSQL_DATABASE || 'test',
        }
    }
}
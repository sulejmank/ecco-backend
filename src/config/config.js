module.exports = {
    port: parseInt(process.env.PORT) || 3000,
    db: {
        database: process.env.DB_NAME || 'ecco',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST
        }
    }
};

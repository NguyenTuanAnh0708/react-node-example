
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'test',
    'root',
    'T.a07082003',
    {
        host: 3306,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default sequelize
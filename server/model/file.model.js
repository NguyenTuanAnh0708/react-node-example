import sequelize from '../connect.js'
import { DataTypes } from 'sequelize'

const File = sequelize.define("file", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileContent: {
        type: DataTypes.BLOB('long'), // Use 'long' for larger files
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING, // Store MIME type
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log('File table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default File
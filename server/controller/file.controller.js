import sequelize from "../connect.js";
import File from '../model/file.model.js'
const fileController = {

    getAll(req, res, next) {
        sequelize.sync().then(() => {

            File.findAll().then(data => {
                res.json(data)
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });

        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    },

    post(req, res, next) {
        const { name, fileContent, mimeType } = req.body;
        const fileBuffer = Buffer.from(fileContent, 'base64');
        sequelize.sync().then(() => {
            File.create({
                name: name,
                fileContent: fileBuffer,
                mimeType: mimeType

            }).then(data => {
                res.json(data)
            }).catch((error) => {
                console.error('Failed to create a new record : ', error);
            });

        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });

    },

    getOne(req, res, next) {
        const { id } = req.params
        sequelize.sync().then(() => {
            File.findByPk(id).then(data => {
                if (!data) {
                    res.status(404).send('File not found');
                    return;
                }
                res.setHeader('Content-Disposition', `attachment; filename=${data.name}`);
                res.setHeader('Content-Type', data.mimeType);
                // Send data content
                res.send(data.fileContent);

            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
                res.status(500).send('Failed to retrieve data');
            });

        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    }
}

export default fileController
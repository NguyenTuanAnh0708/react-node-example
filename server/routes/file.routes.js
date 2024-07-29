import fileController from "../controller/file.controller.js";
import { Router } from "express";

const router = Router()
router.post('/insert', (req, res, next) => {
    fileController.post(req, res, next)

});

router.get('/getAll', (req, res, next) => {
    fileController.getAll(req, res, next)
});

router.get('/get/:id', (req, res, next) => {
    fileController.getOne(req, res, next)
});

export default router
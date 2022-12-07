import express from "express";
const router = express.Router();
import IMGsController from "../api_mongo/images.controller.js"

router.route('/').get(IMGsController.apiGetIMGs);
router.route("/description/:description").get(IMGsController.apiGetIMGByDescription)
router.route("/latest").get(IMGsController.apiGetIMGByDate)

router.
    route('/pic')
    .post(IMGsController.apiPostIMG)
    .delete(IMGsController.apiDeleteIMG)

export default router
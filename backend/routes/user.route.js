import express from "express";
import UserController from "../api_mongo/user.controller.js"
const router = express.Router();

//get Users
router.
    route('/')
    .get(UserController.apiGetUsers)
    .post(UserController.apiUpdateUser)

//login route
router.
    route('/login')
    .post(UserController.apiLoginUser)

//signup route
router.
    route('/signup')
    .post(UserController.apiSignupUser)

export default router
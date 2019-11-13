import express from 'express';
import { home, auth, user } from './../controllers/index';
import {authValidator} from './../validation/index';
import passport from "passport";
import initPassportLocal from "./../controllers/LoginController";

initPassportLocal();
let router = express.Router();

let initRoutes = (app) => {
    //GET
    router.get('/login-register',auth.checkLoggedOut, auth.getLoginRegister);

    //POST
    router.post("/register", auth.checkLoggedOut, authValidator.register, auth.postRegister);
    router.get("/verify/:token", auth.checkLoggedOut, auth.verifyAccount);
    router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login-register",
        successFlash: true,
        failureFlash: true
     }));
     router.get('/', auth.checkLoggedIn, home.getHome);
    router.get("/logout", auth.checkLoggedIn, auth.getLogout);
    router.put('/user/update-avatar', auth.checkLogin, user.updateAvatar);
    return app.use('/', router);
};

module.exports = initRoutes;

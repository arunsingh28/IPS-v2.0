import login_contollers from '../controllers/L&R'
import { Express, Response, Request } from 'express'
import Auth from '../middleware/shield'
// import multer from 'multer'
// const upload = multer()
import upload from '../utils/uploader'

// base routes
export default function (router: Express) {
    router.post('/api/login', Auth, login_contollers.login)
    router.post('/api/register', login_contollers.register)
}
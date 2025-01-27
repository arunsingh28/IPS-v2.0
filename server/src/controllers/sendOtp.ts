import { Request, Response } from "express";
import Mail from '../utils/nodeMailer'
import otpGenrator from "../utils/otpGenrator";
import _user from "../models/user.model";
import env from '../../config/envConfig'
import { registerNewNotification } from './notification'
import TOKEN from "../utils/token";

// send the reset password otp to user's email
const sendOtpforResetPassword = async (req: Request, res: Response) => {
    // retrving value from session
    const id = req.session.user?._id
    if (!id) return res.sendStatus(401) //forbiden
    const user = await _user.findById(id).exec()
    if (!user) return res.sendStatus(401) //forbiden
    const type = env.MAIL_RESETPASSWORD // code for reset password
    Mail(user?.email, user?.otp, user?.firstName, type)
    // log notification
    registerNewNotification('Reset password otp send to your email successfully', 'success', user?.email)
    // change the otp in DB
    otpGenrator(user.email, res)
    // send the confirm message
    return res.status(200).json({ message: 'Otp send to ' + user?.email })
}

// send the forgot password otp to user's email
const sendOtpForForgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res
            .status(401)
            .json({ message: "please enter your email", code: res.statusCode });
    } else {
        const lowerCaseEmail = email.toLowerCase();
        const user = await _user.findOne({ email: lowerCaseEmail }).exec()
        // if user not found in DB
        if (!user) {
            return res.status(401).json({
                message: `We couldn't find an account associated with ${email} Please try with an alternate email or phone number.`,
                code: res.statusCode,
            });
        } else {
            try {
                // send otp to email
                const typeOfMail = env.MAIL_FORGOTPASSWORD
                const img: any = user?.profile?.location
                Mail(user.email, user.otp, user.firstName, typeOfMail, img)
                // log notification
                registerNewNotification('Forgot password otp send to your email successfully', 'success', email)
                // change the otp into db
                otpGenrator(email, res)
                return res.status(200).json({ message: "Thanks! If there's an account associated with this email, we'll send the password reset instructions immediately" + email, code: res.statusCode })
            } catch (error) {
                // catch server error
                return res.status(500).json({
                    message: 'server error',
                    code: res.statusCode
                })
            }
        }
    }
}

const sendOtpForAccountVerification = async (req: Request, res: Response) => {
    const id = req.session.user?._id
    if (!id) return res.sendStatus(401) //forbiden
    const user = await _user.findById(id).exec()
    if (!user) return res.sendStatus(401) //forbiden
    const type = env.MAIL_ACCOUNTVERIFICATION // code for reset password
    const verifyLink = `http://localhost:3000/api/v1/verifty${user.refresh_token}`
    Mail(user?.email, user?.otp, user?.firstName + '' + user?.lastName, type, verifyLink)
    //create account verification notification 
    registerNewNotification('Account verification mail send successfully to your mail', 'success', user?.email)
    // change the otp in DB
    otpGenrator(user.email, res)
    // send the confirm message
    return res.status(200).json({ message: 'Otp send to ' + user?.email })
}

const sendMessage = async (req: Request, res: Response) => {
    const { to, message } = req.body;
    try {
        Mail(to, 12, message, env.MAIL_MESSAGE)
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}


const verifyOtp = async (req: Request, res: Response) => {
    const email: any = req.query.email
    const { otp } = req.body;
    console.log('CRED:', otp, email)
    if (!email || !otp) return res.status(401).json({ message: 'please provide the information' })
    const user = await _user.findOne({ email }).exec()
    // if hacker do something with url
    if (!user) return res.status(401).json({ message: 'something went wrong' })
    if (otp != user.oldOtp) return res.status(406).json({ message: 'incorrect OTP' })
    // create token
    const forgotToken = TOKEN.ForgotToken(user._id);
    // create the cookie to save id of current user 
    res.cookie('_ftoken', forgotToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true
    })
    return res.status(200).json({ code: res.statusCode })
}

export default { sendOtpForForgotPassword, verifyOtp, sendOtpforResetPassword, sendMessage, sendOtpForAccountVerification }

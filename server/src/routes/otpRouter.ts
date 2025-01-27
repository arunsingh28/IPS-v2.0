import { Express } from "express";
import otpController from "../controllers/sendOtp";
import authorization from "../middleware/auth.middleware";

export default function (router: Express) {
    router.get("/api/v1/otp/resetpassword", authorization, otpController.sendOtpforResetPassword);
    router.get("/api/v1/otp/verify/account", authorization, otpController.sendOtpForAccountVerification)
    router.post("/api/v1/otp/forgotpassword", otpController.sendOtpForForgotPassword);
    router.post("/api/v1/m/message", otpController.sendMessage)
}

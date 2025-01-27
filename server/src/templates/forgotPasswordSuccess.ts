export default function forgotPasswordSuccess(name: string) {
    return `<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
    <tr>
        <td>
            <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="height:40px;">&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding:0 35px;">
                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Successfuly Change the Password
                                    </h1>
                                    <p style="font-size:15px; color:#455056;text-align: initial;margin:8px 0 0; line-height:24px;">
                                       <span style="margin-top:10px">Hello ${name}</span>,<br> <br>This notification is on behalf of SMS to let you know that your password has been successfully reset. <br>
                                    </p>
                                    <p style="font-size:12px; border-left:3px solid #eee; color:#1f2026;text-align: initial;margin:15px px 0; padding-left:3px; line-height:24px;">If you did't initiate the forgot password process. Please change the password immediately.</p>
                                </td>
                            </tr>
                            <tr>
                            <td style="height:40px;">&nbsp;</td>
                        </tr>
                        <tr>
                        <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="95%" style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);>
                            <a href="/" style="padding: 12px 40px;
                            font-size:18px;
                            background: #3349d2;
                            border-radius:4px;
                            color: #fff;
                            text-decoration: none;
                            pointer-events: all;">Login</a>
                            </table>
                        </td>
                    </tr>
                        <tr>
                        <td style="height:40px">&nbsp;</td>
                        </tr>
                        </table>
                        <tr>
                        <td style="height:40px;">&nbsp;</td>
                    </tr>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
    `
}
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const smtp = require('nodemailer-smtp-transport')
const utils = require('../../util/utils')

/**
 * return full email body
 * @param {string} partialBody
 */
const emailBody = (partialBody) => {
    const body = `
  <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>BloodHub</title>
          <style>
          p {
            margin: 0;
          }
          .table {
            border-radius: 3px;
          }

          .table th,
          .table td {
            padding: 0.9rem;
          }

          .table th {
            text-align: left;
          }

          .footer {
            background-color: #ebebeb;
          }
          .footer td {
            padding: 5px 10px;
          }

          hr {
              border-style: solid none none none;
              border-top: 1px solid #d4d4d4;    max-width: 600px;
              margin: 20px;
          }
          /* -------------------------------------
              GLOBAL RESETS
          ------------------------------------- */
          
          /*All the styling goes here*/
          
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }

          body {
            background-color: #f6f6f6;
            font-family: 'Century Gothic', 'Helvetica', Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }

          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: 'Century Gothic', 'Helvetica', Helvetica, Arial, sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }

          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */

          .body {
              font-family: 'Century Gothic', 'Helvetica', Helvetica, Arial, sans-serif;
            background-color: #f6f6f6;
            width: 100%; 
          }

          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }

          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }

          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }

          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }

          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }

          .footer {
            clear: both;
            margin-top: 10px;
            text-align: center;
            width: 100%; 
          }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #999999;
              font-size: 12px;
              text-align: center; 
          }

          /* -------------------------------------
              TYPOGRAPHY
          ------------------------------------- */
          h1,
          h2,
          h3,
          h4 {
              font-family: 'Century Gothic', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #000000;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            margin-bottom: 30px; 
          }

          h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize; 
          }

          p,
          ul,
          ol {
              font-family: 'Century Gothic', 'Helvetica', Helvetica, Arial, sans-serif;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px; 
          }
            p li,
            ul li,
            ol li {
              list-style-position: inside;
              margin-left: 5px; 
          }

          a {
            color: #3498db;
            text-decoration: underline; 
          }

          
          .btn {
            box-sizing: border-box;
            width: 100%; }
            .btn > tbody > tr > td {
              padding-bottom: 15px; }
            .btn table {
              width: auto; 
          }
            .btn table td {
              background-color: #ffffff;
              border-radius: 5px;
              text-align: center; 
          }
            /* .btn a {
              background-color: #ffffff;
              border: solid 1px #3498db;
              border-radius: 5px;
              box-sizing: border-box;
              color: #3498db;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 12px 25px;
              text-decoration: none;
              text-transform: capitalize; 
          } */

          /* .btn-primary table td {
            background-color: #3498db; 
          } */

          /* .btn-primary a {
            background-color: #3498db;
            border-color: #3498db;
            color: #ffffff; 
          } */

          /* -------------------------------------
              OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
          .last {
            margin-bottom: 0; 
          }

          .first {
            margin-top: 0; 
          }

          .align-center {
            text-align: center; 
          }

          .align-right {
            text-align: right; 
          }

          .align-left {
            text-align: left; 
          }

          .clear {
            clear: both; 
          }

          .mt0 {
            margin-top: 0; 
          }

          .mb0 {
            margin-bottom: 0; 
          }

          .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0; 
          }

          .powered-by a {
            text-decoration: none; 
          }

          hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            margin: 20px 0; 
          }

          /* -------------------------------------
              RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
          @media only screen and (max-width: 620px) {
            table[class=body] h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important; 
            }
            table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
              font-size: 16px !important; 
            }
            table[class=body] .wrapper,
            table[class=body] .article {
              padding: 10px !important; 
            }
            table[class=body] .content {
              padding: 0 !important; 
            }
            table[class=body] .container {
              padding: 0 !important;
              width: 100% !important; 
            }
            table[class=body] .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important; 
            }
            table[class=body] .btn table {
              width: 100% !important; 
            }
            table[class=body] .btn a {
              width: 100% !important; 
            }
            table[class=body] .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important; 
            }
          }

          /* -------------------------------------
              PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
          @media all {
            .ExternalClass {
              width: 100%; 
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%; 
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important; 
            }
          }

          /* My additions */
          
          .has-border {
            padding: 0 0 8px;
        border-bottom: 1px solid #e2e2e2;
          }
          .table-has-spacing {
            border-collapse: separate;
            border-spacing: 0 20px;
            line-height: 1.5;
          }

          .ta-r {
              text-align: right;
          }

          .ta-c {
            text-align: center;
          }

          .small-width {
              max-width: 55%;
              margin: 0 auto;
          }

            p {
                line-height: 1.6;
            }

            td small {
                display: block;
                color: #9a9a9a;
            }

          .logo {
            margin-bottom: 30px;
          }



        </style>
      </head>
      <body class="">
      <span class="preheader">BloodHub</span>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">

              <table role="presentation" class="main">
                <tr>
                  <td class="wrapper">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                       </tr>
                      ${partialBody}
                    </table>
                  </td>
                </tr>

              <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- END CENTERED WHITE CONTAINER -->

              <!-- START FOOTER -->
              <div class="footer">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                    BlioodHub... <i>Save a life today</i>
                    </td>
                  </tr>
                  <tr>
                   
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
  `;
    return body;
}

/**
 * Send an otp to notify matched blood donors of a new blood request
 *
 * @param user
 * @returns {{err, status}|{message, status}}
 */

exports.sendRequestNewBloodRequestNotificationEmail = (user) => {

console.log(user)
    let email = user.email;
    let subject = "BloodHub -- New blood donation request"
    let token = utils.generateOTP(4);
    let partialBody = ''

    partialBody += `
    <tr>
    <td>
     <h4>   
     Dear ${user.name}
     </h4>
</td>
</tr>
    
    <tr>
      <td>
          <span>
              <p style="margin-bottom: 2em;line-height: 26px;font-size: 14px;">
              
            A new blood request has been matched for your blood group and location. <br>
            Token: <strong>Please login into the app to review this request</strong>
        </p>
          </span>
      </td>
    </tr>`;

    const body = emailBody(partialBody);

    return createEmailClientAndSend(email,body, subject);
}
/**
 * send an otp to complete a blood request
 * @param {object} donor user object
 */
exports.sendRequestOTPEmail = (user, otp) => {
    try {
        console.log(user + ">>");
        let email = user.email;
        let subject = "Blood request completion";
        let token = otp;
        let partialBody = '';

        partialBody += `
    <tr>
    <td>
     <h4>   
     Hello ${user.firstName} ${user.lastName}
     </h4>
</td>
</tr>
    
    <tr>
      <td>
          <span>
              <p style="margin-bottom: 2em;line-height: 26px;font-size: 14px;">
              
            Find below a one-time token to complete your request. <br>
            Token: <strong>${token}</strong>
        </p>
          </span>
      </td>
    </tr>`;

        const body = emailBody(partialBody);
        return createEmailClientAndSend(email, body, subject);
    } catch (e) {
        console.log(e)
    }
}

function createEmailClientAndSend(email, body, subject) {

    if (email == null || body == null || subject == null) {
        return {status: 'failed', err: 'the required parameters were not supplied'};
    }
/*
    const transport = nodemailer.createTransport(
        mg({
            auth: {
                api_key: process.env.MAILGUN_API_KEY,
                domain: process.env.MAILGUN_DOMAIN
            }
        })
    );*/
 const transport = nodemailer.createTransport(smtp(
     {
         service: 'gmail',
         auth: {
             user: 's.stackng@gmail.com',
             pass: '0158101581@',
             port: 465,
             secure: true
         }
     })
    );

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'BloodHub <support@bloodhub.com>',
        to: `${email}`,
        subject: subject,
        html: body
    };

    console.log('here')
  let o =   transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log( error, info.response);
        }
    });


    return {status: 'success', message: 'email sent'}
}

const Sib = require("sib-api-v3-sdk");

const verifyEmail = async (options) => {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.SEND_EMAIL_API_KEY;
  const tranEmailApi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: process.env.FROM_EMAIL,
    name: process.env.FROM_NAME,
  };

  const receivers = [
    {
      email: options.email,
    },
  ];
  const message = {
    sender,
        to: receivers,
        subject: options.subject,
        textContent: options.message,
        htmlContent: 
        "<div style =" +
        "width:100%; height:100%;  " +
        "><h1 style=" +
        "font-weight:500>Hey, " +
        options.name +
        "<br>Welcome to MidNight</h1><h1>Thanks for Signing up on our app</h1><h3>Your Code for verification is : " +
        options.code +
        " </h3></div><p>If this request is not made by you kindly ignore this mail.</p><p>Regards, <strong>MidNight Shop(Owner)</strong></p>",
        params: {
            role: 'Frontend',
        },
  }
  await tranEmailApi
    .sendTransacEmail(message)
    .then(console.log('success'))
    .catch(console.log('error'))
 
};
module.exports = verifyEmail;

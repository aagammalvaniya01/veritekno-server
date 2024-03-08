const Sib = require("sib-api-v3-sdk");

const sendEmail = async (options) => {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.SEND_EMAIL_API_KEY;
  const tranEmailApi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: options?.email,
    name: options?.name,
  };

  const receivers = [
    {
      email: process.env.TO_EMAIL,
    },
  ];
  const message = {
    sender,
        to: receivers,
        subject: options.subject,
        textContent: options.message,
        htmlContent: `test ${options.message}`,
        params: {
            role: 'Frontend',
        },
  }
  await tranEmailApi
    .sendTransacEmail(message)
    .then(console.log('success'))
    .catch(console.log('error'))
};
module.exports = sendEmail;

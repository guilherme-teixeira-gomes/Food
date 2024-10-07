/* eslint-disable prefer-const */
/* eslint-disable vars-on-top */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-shadow */
/* eslint-disable no-var */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
const nodemailer = require("nodemailer");

interface contentNodeMailer {
  sentNameTo?: string;
  sentReceiverTo?: string;
  content?: {
    nameConnection?: string;
    nameCompany?: string;
  };
  emailContent?: string;
  email?: string;
}

export const NodeMailer = (contentNodeMailer: {
  sentNameTo?: string;
  sentReceiverTo?: string;
  content?: {
    nameConnection?: string;
    nameCompany?: string;
  };
  emailContent?: string;
  email?: string;
}) => {
  var passwordRecovery = 
  `
  <td class="container">
  <div class="content">
    <!-- START CENTERED WHITE CONTAINER -->
    <table role="presentation" class="main">
      <!-- START MAIN CONTENT AREA -->
      <tr>
        <td class="wrapper">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <div style="width:100px;max-width: 100px;">
                <br/>
                <br/>
                <strong>AM Tech</strong>!
                <p>Recuperação de senha para o acesso</p>
                <br>
      
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                  <tbody>
                    <tr>
                      <td align="left">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td> <a href="`+process.env.FRONTEND_URL+`/modificar_acesso" target="_blank">Mudar senha</a> </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <div class="footer">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td class="content-block">
        <span class="apple-link">Caso voce nao reconheca esse email,</span>
        <br>por favor desconsidere-o.
      </td>
      </tr>
        <tr>
          <td class="content-block powered-by">
            <a href="`+process.env.FRONTEND_URL+`/">AM Tech</a>.
          </td>
        </tr>
      </table>
    </div>
  </div>
  </td>
  `

  var emailDesconexao =
    ` <td class="container">
  <div class="content">
    <!-- START CENTERED WHITE CONTAINER -->
    <table role="presentation" class="main">
      <!-- START MAIN CONTENT AREA -->
      <tr>
        <td class="wrapper">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td>
              <div style="width:100px;max-width: 100px;">
                <img style="width:100px;max-width: 100px;" alt="Atendimento Whats" src="cid:unique@kreata.ee" /></div>
                <br/>
                <br/>
                <p>Olá <strong>` +
    contentNodeMailer.content?.nameCompany +
    `</strong>,</p>
                <p>A sua conexão <strong>` +
    contentNodeMailer.content?.nameConnection +
    `</strong> se desconectou. Acesse o link abaixo para conectar novamente.</p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                  <tbody>
                    <tr>
                      <td align="left">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td> <a href="https://app.whatsqrcode.atender.digital/login" target="_blank">Clique aqui</a> </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>Agradecemos a compreensão.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div class="footer">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td class="content-block">
            <span class="apple-link">Caso voce nao reconheca esse email,</span>
            <br>por favor desconsidere-o.
          </td>
        </tr>
        <tr>
          <td class="content-block powered-by">
            <a href="https://atender.digital/">AtendimentoWhats</a>.
          </td>
        </tr>
      </table>
    </div>
  </div>
</td>`;

  // eslint-disable-next-line no-var
  var emailNewCompany =
    ` <td class="container">
<div class="content">
  <!-- START CENTERED WHITE CONTAINER -->
  <table role="presentation" class="main">
    <!-- START MAIN CONTENT AREA -->
    <tr>
      <td class="wrapper">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <div style="width:100px;max-width: 100px;">
                <img style="width:100px;max-width: 100px;" alt="Atendimento Whats" src="cid:unique@kreata.ee" /></div>
              <br/>
              <br/>
              <p>Seja bem vindo(a) ao  <strong> AtendimentoWhats</strong>!</p>
              <p>Sua conta de usuário criada e agora você tem acesso ao sistema.</p>
              <br>
              <p>Email: <strong>` +
    contentNodeMailer.email +
    `</strong> </p>
              <p>Senha: <strong>123456</strong>.</p>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                <tbody>
                  <tr>
                    <td align="left">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td> <a href="https://app.whatsqrcode.atender.digital/login" target="_blank">Acessar Sistema</a> </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>Muito Obrigado!</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <div class="footer">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
    <tr>
    <td class="content-block">
      <span class="apple-link">Caso voce nao reconheca esse email,</span>
      <br>por favor desconsidere-o.
    </td>
    </tr>
      <tr>
        <td class="content-block powered-by">
          <a href="https://atender.digital/">AtendimentoWhats</a>.
        </td>
      </tr>
    </table>
  </div>
</div>
</td>`;

  const emailMountContent = (content: any, subject: any) => {
    return (
      `<!doctype html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Email Atenditimento Whats</title>
      <style>

        /*All the styling goes here*/

        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%;
        }

        body {
          background-color: #f6f6f6;
          font-family: sans-serif;
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
          width: 100%;
        }

        table td {
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top;
        }



        .body {
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


        h1,
        h2,
        h3,
        h4 {
          color: #000000;
          font-family: sans-serif;
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
          font-family: sans-serif;
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
          width: 100%;
        }

        .btn>tbody>tr>td {
          padding-bottom: 15px;
        }

        .btn table {
          width: auto;
        }

        .btn table td {
          background-color: #ffffff;
          border-radius: 5px;
          text-align: center;
        }

        .btn a {
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
        }

        .btn-primary table td {
          background-color: #3498db;
        }

        .btn-primary a {
          background-color: #3498db;
          border-color: #3498db;
          color: #ffffff;
        }


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

        img {
            filter: invert(52%) sepia(13%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%);
        }

        @media only screen and (max-width: 620px) {
          table.body h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }

          table.body p,
          table.body ul,
          table.body ol,
          table.body td,
          table.body span,
          table.body a {
            font-size: 16px !important;
          }

          table.body .wrapper,
          table.body .article {
            padding: 10px !important;
          }

          table.body .content {
            padding: 0 !important;
          }

          table.body .container {
            padding: 0 !important;
            width: 100% !important;
          }

          table.body .main {
            border-left-width: 0 !important;
            border-contentradius: 0 !important;
            border-right-width: 0 !important;
          }

          table.body .btn table {
            width: 100% !important;
          }

          table.body .btn a {
            width: 100% !important;
          }

          table.body .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
        }

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

          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
          }

          .btn-primary table td:hover {
            background-color: #34495e !important;
          }

          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important;
          }
            .saturate { filter: saturate(3); }
            .grayscale { filter: grayscale(100%); }
            .contrast { filter: contrast(160%); }
            .brightness { filter: brightness(0.25); }
            .blur { filter: blur(3px); }
            .invert { filter: invert(100%); }
            .sepia { filter: sepia(100%); }
            .huerotate { filter: hue-rotate(180deg); }
            .rss.opacity { filter: opacity(50%); }
        }
      </style>
    </head>
    <body>
      <span class="preheader">` +
      subject +
      `</span>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          ` +
      content +
      `
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
    </html>`
    );
  };

  async function main() {
    console.log(
      `Enviando Mensagem para a empresa ${contentNodeMailer.sentNameTo}.`
    );

    let transporter = nodemailer.createTransport({
      host: `${process.env.EMAIL_HOST}`,
      port: process.env.PORT_HOST,
      secure: false,
      // service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.CREDENTIALS
      }
    });

    var emailBody = "";
    var emailContentText = {
      subject: "",
      text: ""
    };
    switch (contentNodeMailer.emailContent) {
      case "passwordRecovery":
        emailBody = emailMountContent(passwordRecovery, "Recupere sua senha!");
        emailContentText.subject = "Recuperação de senha";
        emailContentText.text = "Recupere sua senha!";
        break;
      case "disconnect":
        emailBody = emailMountContent(
          emailDesconexao,
          "Veja o que aconteceu e evite perder Atendimentos!"
        );
        emailContentText.subject =
          "Um whatsapp da sua empresa esta desconectado!";
        emailContentText.text =
          "Veja o que aconteceu e evite perder atendimentos.";
        break;
      case "newCompany":
        emailBody = emailMountContent(
          emailNewCompany,
          "Seja bem vindo(a) ao AtendimentoWhats!"
        );
        emailContentText.subject =
          "Seja bem vindo ao sistema AtendimentoWhats!";
        emailContentText.text =
          "Aqui estão suas credenciais de acesso ao sistema.";
        break;
    }

    let message = {
      from: `Atendimento Whats <${process.env.EMAIL}>`,
      to: `${contentNodeMailer.sentNameTo} <${contentNodeMailer.sentReceiverTo}>`,
      subject: emailContentText.subject,
      text: emailContentText.text,

      html: emailBody,
      attachments: [
        {
          filename: "AtendimentoWhats.png",
          path: "data:image/png;base64,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",
          cid: "unique@kreata.ee"
        }
      ]
    };
    let info = await transporter.sendMail(message);
    console.log("Mensagem enviada com sucesso %s", info.messageId);
  }

  main().catch(err => {
    console.error(err.message);
    process.exit(1);
  });
};

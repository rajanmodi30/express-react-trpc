import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { env } from "../../env";
const options = {
  host: env.mail.host,
  port: env.mail.port,
  secure: env.mail.port === 465 ? true : false,
  auth: {
    user: env.mail.username,
    pass: env.mail.password,
  },
};

const transporter = nodemailer.createTransport(options);

transporter.use(
  "compile",
  hbs({
    viewPath: "src/views/email",
    extName: ".hbs",
    viewEngine: {
      extname: ".hbs", // handlebars extension
      layoutsDir: "src/views/email/", // location of handlebars templates
      defaultLayout: "layout", // name of main template
      partialsDir: "src/views/email/", // location of your subtemplates aka. header, footer etc
    },
  })
);

export default transporter;

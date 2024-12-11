import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.APP_PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

//? mail transporter configrations

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail", // veya başka bir e-posta servisi
  auth: {
    user: "beratpehlivan32@gmail.com", // gönderen e-posta adresi
    pass: `${process.env.NODEMAILER_APP_PASSWORD}`, // e-posta şifresi (veya uygulama şifresi)
  },
});

// Routes
app.post("/sendMail", async (req: Request, res: Response) => {
  const { firstName, lastName, mail, message } = req.body;

  const mailOptions = {
    to: `${mail}`,
    subject: "Thank You for using my mail app",
    html: `<h1>dear ${firstName} ${lastName}, </h1>
    <h2> Thank you for taking time to use my mail app  </h2>
    <strong> Best regards </strong>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "mail gönderildi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "mail gönderilirken hata oluştur:", err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`[server]: Server is running at port:${port}`);
});

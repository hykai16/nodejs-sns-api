const express = require("express");
const app = express();
const cors = require("cors");
// const { PrismaClient } = require("@prisma/client");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

const authRoute = require("./routers/auth");
const postsRoute = require("./routers/posts");
const usersRoute = require("./routers/users");

const PORT = process.env.PORT || 10000;

// const prisma = new PrismaClient();

//localhost:3000からlocalhost:5000にアクセスできるようにする
app.use(cors());
app.use(express.json());

// //新規ユーザー登録API
// app.post("/api/auth/register", async (req, res) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await prisma.user.create({
//     data: {
//       username,
//       email,
//       password: hashedPassword,
//     },
//   });

//   return res.json({ user });
// });

// //ユーザーログインAPI
// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user) {
//     return res.status(401).json({ error: "ユーザーはそんざいしません" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res.status(401).json({ error: "パスワードが間違っています。" });
//   }

//   const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
//     expiresIn: "1d", //1日トークン保持
//   });

//   return res.json({ token });
// });

app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/users", usersRoute);

app.listen(PORT, () => console.log(`server is runnning on Port ${PORT}`));

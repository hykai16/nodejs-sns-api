const { PrismaClient } = require("@prisma/client");
const isAuthenticated = require("../middlewares/isAuthenticated");
require("dotenv").config();

const router = require("express").Router();

const prisma = new PrismaClient();

//ユーザー取得用API
router.get("/find", isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    if (!user) {
      res.status(404).json({ error: "ユーザーが見つかりませんでした" });
    }

    res.status(200).json({
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/profile/:userId", async (req, res) => {
  //この段階では文字列
  const { userId } = req.params;

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!profile) {
      return res
        .status(404)
        .json({ message: "プロフィールが見つかりませんでした。" });
      s;
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

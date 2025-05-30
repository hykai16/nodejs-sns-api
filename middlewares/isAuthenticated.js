const jwt = require("jsonwebtoken");

//tokenの検出→ない場合はエラー
function isAuthenticated(req, res, next) {
  //"Bearer tokenだから"
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "権限がありません。" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decorded) => {
    if (err) {
      return res.status(401).json({ message: "権限がありません。" });
    }

    req.userId = decorded.id;

    //次に行っていいですよ
    next();
  });
}

module.exports = isAuthenticated;

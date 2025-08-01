const {getPool} = require("../config/db");

exports.uploadPhoto = (req, res) => {
  const { userId, caption } = req.body;
  const image = req.file.filename;
  getPool().query("INSERT INTO photos (user_id, image, caption) VALUES (?, ?, ?)",
    [userId, image, caption],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Photo uploaded" });
    });
};

exports.getPhotos = (req, res) => {
  getPool().query("SELECT * FROM photos ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

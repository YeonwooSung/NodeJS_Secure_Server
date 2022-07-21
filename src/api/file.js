const express = require('express');
const router = express.Router();

router.get("/:filename", (req, res) => {
    const { filename } = req.params;
    const file = `./public/images/${filename}`;
    res.sendFile(file);
});

exports = module.exports = router;
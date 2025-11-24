const express = require("express");
const router = express.Router();
const apiPrefix = "/users";

router.get(apiPrefix, (req, res) => {
	res.status(200).json({ param: req.query.test });
});

module.exports = router;

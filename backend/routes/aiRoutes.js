const express = require("express");
const router = express.Router();
const { askAgriAI } = require("../controllers/aiController");

router.post("/ask", askAgriAI);

module.exports = router;
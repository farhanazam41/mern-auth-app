import express from 'express';  
const router = express.Router();

router.get("/signup", (req, res) => {
	res.json({
		message: "Hello World"
	});
});

export default router;
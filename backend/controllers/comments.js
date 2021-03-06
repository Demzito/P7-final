// import
const models = require("../models");

exports.createComment = async (req, res) => {
	try {
		let comments = req.body.comments;
		const newCom = await models.Comment.create({
			comments: comments,
			UserId: req.user.id,
			PostId: req.params.id
		});
		if (newCom) {
			res.status(201).json({ message: "Your comment has been sent", newCom });
		} else {
			throw new Error("Sorry , something gone wrong");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getComments = async (req, res) => {
	try {
		const order = req.query.order;
		const comments = await models.Comment.findAll({
			attributes: [
				"id",
				"comments",
				"UserId",
				"PostId",
				"createdAt",
				"updatedAt"
			],
			order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
			where: { postId: req.params.id },
			include: [{ model: models.User, attributes: ["username"] }]
		});
		if (comments) {
			res.status(200).send({ message: comments });
		} else {
			throw new Error("There are no comments");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

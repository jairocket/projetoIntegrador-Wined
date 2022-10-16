const db = require("../database/models");

async function membershipCheck(req, res, next) {
  let id = req.headers.authorization.id;
  let brotherhood_id = req.params.id;

  const isMember = await db.User.findByPk(id, {
    include: [
      {
        model: db.Brotherhood,
        as: "brotherhoods",
        where: { id: brotherhood_id },
        required: true,
      },
    ],
  });
  if (isMember) {
    next();
  } else {
    res.json({ member: false });
  }
}

module.exports = membershipCheck;

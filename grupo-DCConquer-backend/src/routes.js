const Router = require("koa-router");
// const jwt = require('koa-jwt');
// const authMiddle = require('./middlewares/auth');
const auth = require("./routes/auth");
const rankings = require("./routes/ranking");
const backup = require("./routes/backup");
const router = new Router();

router.use("/auth", auth.routes());
router.use("/rankings", rankings.routes());
router.use("/backup", backup.routes());
// router.use('/games', games.routes());
// router.use('/matches', matches.routes());
// router.use('/players', authMiddle, players.routes());
// router.use('/playersmatch', playersMatch.routes());
// router.use('/requests', requests.routes());
// router.use('/profile', authMiddle, players.routes());
// router.use('/turn', authMiddle, turn.routes());
// router.use('/admin', admin.routes());

// // router.use(jwt({ secret: process.env.JWT_SECRET, key: 'tokendata' }));

// // router.use('/turn', protected.routes());
// router.use(admin.routes());

module.exports = router;

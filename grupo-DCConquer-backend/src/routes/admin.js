const Router = require("koa-router");

const router = new Router();

// Checks if player is admin
router.get("admin.show", "/admin", async (ctx) => {
  try {
    let admin = false;
    const data = ctx.state.tokendata.player;
    if (data.admin) {
      admin = true;
    }
    ctx.body = { admin, playerId: data.id };
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;

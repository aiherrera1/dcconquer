module.exports = async (ctx, next) => {
  if (!ctx.session.sessionid) {
    ctx.throw('You need to login', 401);
  }

  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    if (session) {
      await next();
    } else {
      ctx.throw('Invalid session, please log-in again', 401);
    }
  } catch (error) {
    ctx.throw(error);
  }
};

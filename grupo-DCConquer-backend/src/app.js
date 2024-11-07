const dotenv = require("dotenv");
const Koa = require("koa");
const koaBody = require("koa-body");
const KoaLogger = require("koa-logger");
const { default: cookie } = require("koa-cookie");
const session = require("koa-session");
const cors = require("@koa/cors");
const jwt = require("koa-jwt");
const router = require("./routes");
const orm = require("./models");
const admin = require("./routes/admin");

// Routes
const games = require("./routes/games");
const matches = require("./routes/matches");
const players = require("./routes/players");
const turns = require("./routes/turn");
const playersMatch = require("./routes/playersMatch");
const requests = require("./routes/requests");
const walls = require("./routes/walls");
const ship = require("./routes/ship");

dotenv.config();

const app = new Koa();

app.context.orm = orm;

app.use(
  cors({
    credentials: true,
  }),
);

router.use(cookie());

app.use(koaBody());

app.keys = [`${process.env.APP_KEYS}`];
const CONFIG = {
  httpOnly: false,
};
app.use(session(CONFIG, app));

app.use(KoaLogger());

app.use(router.routes());

app.use(jwt({ secret: process.env.JWT_SECRET, key: "tokendata" }));

app.use(admin.routes());
app.use(games.routes());
app.use(players.routes());
app.use(matches.routes());
app.use(turns.routes());
app.use(playersMatch.routes());
app.use(requests.routes());
app.use(walls.routes());
app.use(ship.routes());

module.exports = app;

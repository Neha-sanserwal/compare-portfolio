const redis = require("redis");
const { app } = require("./src/app");
require("dotenv").config({ path: __dirname + "/../.env" });

let dbClient;
if (process.env.REDISCLOUD_URL) {
  dbClient = redis.createClient(process.env.REDISCLOUD_URL, {
    no_ready_check: true,
  });
} else {
  dbClient = redis.createClient({ db: 1 });
}
const sessions = require("./src/session");

const { env } = process;

const port = env.PORT || 8000;

app.locals.dbClient = dbClient;
app.locals.sessions = sessions;

app.listen(port, () => {
  console.log(`listening on: ${port}`);
});

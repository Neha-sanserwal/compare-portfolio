const { app } = require("./src/app");
require("dotenv").config({ path: __dirname + "/../.env" });
const dbClient = require("redis").createClient({ db: 1 });
const { env } = process;

const port = env.PORT || 8000;

app.locals.dbClient = dbClient;

app.listen(port, () => {
  console.log(`listening on: ${port}`);
});

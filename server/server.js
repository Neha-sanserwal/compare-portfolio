const { app } = require("./src/app");
const { env } = process;
require("dotenv").config({ path: __dirname + "/../.env" });

const port = env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on: ${port}`);
});

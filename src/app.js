import express from "express";

import cnf from "./config.js";

const app = express();

app.listen(cnf.PORT, () => {
  console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`App running on port ${cnf.PORT}`);
});

const express = require("express");
const userRouter = express.Router();

userRouter.use(handlers.isLoggedIn);
userRouter.post("/saveComparisons", handlers.saveComparisons);
userRouter.post("/logout", handlers.logout);
userRouter.get("/getOrderList", handlers.getOrderList);
userRouter.get("/getComparison/:id", handlers.getComparison);
userRouter.post("/deleteComparison", handlers.deleteComparison);

module.exports = { userRouter };

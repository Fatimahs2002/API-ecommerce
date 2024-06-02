const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  getUser,
  getById,
  login,
  register,
  switchToAdmin,
  updateAdmin,
  deleteUser,
} = require("../controllers/userController");

router.get("/getAll", getUser);
router.get("/getById/:ID", getById);
router.post("/register", register);
router.post("/login", login);
router.put("/switchAdmin/:ID",
//  isAuthenticated(["admin"])
 
 switchToAdmin);
router.delete("/delete/:ID", deleteUser);
router.put("/updateadmin/:ID", isAuthenticated(["admin"]), updateAdmin);

module.exports = router;

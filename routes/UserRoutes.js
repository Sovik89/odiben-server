const router=require("express").Router();
const UserController=require("../controllers/UserController");
const authMiddeleware=require("../middlewares/authMiddleware")

router.post("/register", UserController.postRegister);
router.post("/login", UserController.postLogin);
router.get("/get-current-user",authMiddeleware, UserController.getCurrentUser);

module.exports=router;
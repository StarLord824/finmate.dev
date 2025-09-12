import { Router } from "express";
import post from "../controllers/post";
import signup from "../controllers/signup";
import logout from "../controllers/logout";

const router : Router = Router();

router.get("/", (req, res) => {
  res.send("This is the backend of Finmate.dev");
});

router.post("/login", (req, res) => {
    post();
});

router.post("/signup", (req, res) => {
  signup();
});

router.post("/logout", (req, res) => {
  logout();
});

export default router;
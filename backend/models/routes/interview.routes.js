const express= require("express")
const interviewRouter=express.Router();
const authMiddleware=require("../middleware/auth.middleware")
const interviewController=require("../controllers/interview.controller")
const upload= require("../middleware/file.middleware")

interviewRouter.post("/",authMiddleware.authUser,ipload.single("resume"),interviewController.generateInterviewReportController)

module.exports=interviewRouter;
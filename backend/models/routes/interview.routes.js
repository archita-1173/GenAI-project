const express= require("express")
const interviewRouter=express.Router();
const authMiddleware=require("../middleware/auth.middleware")
const interviewController=require("../controllers/interview.controller")

interviewRouter.post("/",authMiddleware.authUser,interviewController.generateInterviewReportController)

module.exports=interviewRouter;
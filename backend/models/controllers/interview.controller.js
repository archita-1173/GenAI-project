
const pdfParse=require("pdf-parse")
const generateInterviewReport=require("../services/ai.services")
const interviewReportModel=require("../interviewReport.model")


async function generateInterviewController(req,res){
    //pdf-parse for reading the contents of the pdf


 const resumeContent=pdfParse(req.file.buffer)
 const{selfDescription,jobDescription}=req.body

const interviewReportByAi=await generateInterviewReport({
    resumeText:resumeContent.text,
    selfDescription,
    jobDescription,

})
 const interviewReport=await interviewReportModel.create({
    user:req.user.id,
    resumeText:resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi

 })

 res.status(201).json({
    message:"Interview report generated successfully",
    interviewReport
 })



}



module.exports={generateInterviewController}
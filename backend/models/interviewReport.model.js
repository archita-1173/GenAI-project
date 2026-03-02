const mongoose=require('mongoose')

//to get structured output from gemini in a structured format which is stored in db

const technicalQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Techincal Question is required"]
    },
    intention:{
        type:String,
        requires:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }

},{ _id:false})


const behavioralQuestionSchema= new mongoose.Schema({
     question:{
        type:String,
        required:[true,"Techincal Question is required"]
    },
    intention:{
        type:String,
        requires:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{_id:false})

const skillGapsSchema= new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"it should be present"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:true,
    }
},{_id:false})

const preparationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:true
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    tasks:[{
        type:String,
        required:true
    }]
})

const interviewReportSchema= new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job description is required"]
    },
    resumeText:{
        type:String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapsSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }


 },{timestamps:true})


const interviewReportModel= mongoose.model("InterviewReport",interviewReportSchema)
module.exports=interviewReportModel;
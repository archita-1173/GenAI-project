const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});
// creating schema to get output as schema
// Fixed schema: corrected typos, syntax errors (enum quotes, arrays), descriptions
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0-100 indicating how well the candidate's profile matches the job profile"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("A sample answer to the technical question with approach in simple words")
    })).describe("Technical questions that can be asked in the interview along with the intention"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("A sample answer to the behavioral question with approach in simple words")
    })).describe("Behavioral questions that can be asked in the interview along with the intention"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap")
    })).describe("List of skill gaps in the candidate"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan"),
        focus: z.string().describe("The main focus of the day"),
        tasks: z.array(z.string()).describe("List of tasks for the particular day")
    })).describe("A day-wise preparation plan to prepare for the interview")
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const jsonSchema = zodToJsonSchema(interviewReportSchema);

    const prompt = `Generate an interview report for a candidate with the following details:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`;

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: jsonSchema
        }
    });

    return (JSON.parse(response.text));
   
}

module.exports=generateInterviewReport;

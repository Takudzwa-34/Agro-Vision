
import { GoogleGenAI, Type } from "@google/genai";
import { PlantDiagnosis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const plantDiagnosisSchema = {
  type: Type.OBJECT,
  properties: {
    plantName: { type: Type.STRING, description: "Common name of the plant" },
    scientificName: { type: Type.STRING, description: "Scientific name of the plant" },
    condition: { type: Type.STRING, description: "Name of the detected disease or 'Healthy'" },
    status: { type: Type.STRING, description: "Must be 'Healthy', 'Infected', or 'Warning'" },
    confidence: { type: Type.NUMBER, description: "Confidence score from 0 to 1" },
    symptoms: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of observed symptoms" },
    cause: { type: Type.STRING, description: "The primary cause of the condition" },
    recommendations: {
      type: Type.OBJECT,
      properties: {
        organic: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Organic treatment options" },
        chemical: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Chemical treatment options" },
        prevention: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Preventative measures" }
      },
      required: ["organic", "chemical", "prevention"]
    },
    summary: { type: Type.STRING, description: "Short summary of the diagnosis" }
  },
  required: ["plantName", "scientificName", "condition", "status", "confidence", "symptoms", "cause", "recommendations", "summary"]
};

export async function analyzePlant(base64Image: string): Promise<PlantDiagnosis> {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1] || base64Image
            }
          },
          {
            text: "Identify the plant in this image and diagnose its health. If there is a disease, provide detailed symptoms, causes, and treatments. If it is healthy, confirm health and provide maintenance tips. Output strictly in JSON format according to the schema."
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: plantDiagnosisSchema,
      temperature: 0.1
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as PlantDiagnosis;
}

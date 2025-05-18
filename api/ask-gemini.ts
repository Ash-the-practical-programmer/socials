// api/ask-gemini.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerateContentResult,
  GenerateContentResponse,
  Part,
  SafetyRating,
  FinishReason,
} from '@google/generative-ai';

// -------------------------------------------------------------------
// INTERFACE DECLARATIONS - MOVED TO THE TOP
// -------------------------------------------------------------------
interface RequestBody {
  prompt?: string;
}

interface ResponseData { // This is the one causing the error on line 21 of the handler
  reply?: string;
  error?: string;
}
// -------------------------------------------------------------------

const geminiApiKeyFromEnv: string | undefined = process.env.GEMINI_API_KEY;
const MODEL_NAME: string = "gemini-pro";

// Now, when the handler is declared, ResponseData is known
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData> // << Line 21 (approx) - ResponseData is now defined
): Promise<void> {
  console.log("Attempting to read GEMINI_API_KEY from process.env:", geminiApiKeyFromEnv ? 'Found' : 'NOT FOUND or empty');
  const GEMINI_API_KEY_FOR_HANDLER = geminiApiKeyFromEnv;

  // ... (rest of your CORS, method checks, API key checks, etc.) ...
  // ... (the rest of your function logic) ...

  if (!GEMINI_API_KEY_FOR_HANDLER) {
    console.error("Gemini API key was not found in environment variables after checking process.env.GEMINI_API_KEY.");
    res.status(500).json({ error: 'Server configuration error: API key missing.' });
    return; 
  }

  const { prompt } = req.body as RequestBody; // RequestBody should also be defined above

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    res.status(400).json({ error: 'Please provide a valid prompt.' });
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY_FOR_HANDLER);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 256,
    };
    
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const result: GenerateContentResult = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
        safetySettings,
    });

    const responseData: GenerateContentResponse = result.response;
    const firstCandidate = responseData.candidates?.[0];

    if (firstCandidate && firstCandidate.content && firstCandidate.content.parts && firstCandidate.content.parts.length > 0) {
      const firstPart = firstCandidate.content.parts[0];
      if ('text' in firstPart) {
        const replyText = firstPart.text;
        res.status(200).json({ reply: replyText }); // Using ResponseData structure
        return;
      } else {
        console.warn("First candidate part is not text:", firstPart);
        res.status(500).json({ error: 'AI response format not recognized (expected text).' }); // Using ResponseData structure
        return;
      }
    } else {
      console.error("Gemini API did not return candidate content or was blocked:", responseData);
      let errorMessage = 'Failed to get reply from AI. Content may have been blocked or an unknown error occurred.';
      if (responseData.promptFeedback?.blockReason) {
        errorMessage = `Failed to get reply from AI. Prompt blocked. Reason: ${responseData.promptFeedback.blockReason}`;
        if (responseData.promptFeedback.blockReasonMessage) {
             errorMessage += ` (${responseData.promptFeedback.blockReasonMessage})`;
        }
      } else if (firstCandidate?.finishReason) {
        errorMessage = `Failed to get reply from AI. Candidate generation issue. Finish Reason: ${firstCandidate.finishReason}`;
        if (firstCandidate.finishReason === FinishReason.SAFETY) {
            errorMessage += ` (Content blocked by safety settings).`;
            if (firstCandidate.safetyRatings && firstCandidate.safetyRatings.length > 0) {
                const blockedCategories = firstCandidate.safetyRatings
                    .map(rating => rating.category); // Simplified for brevity
                if (blockedCategories.length > 0) {
                    errorMessage += ` Categories: ${blockedCategories.join(', ')}.`;
                }
            }
        } else if (firstCandidate.finishReason === FinishReason.RECITATION) {
            errorMessage += ` (Content may be too similar to copyrighted material).`;
        } else if (firstCandidate.finishReason === FinishReason.OTHER) {
            errorMessage += ` (An unspecified issue occurred).`;
        }
      }
      res.status(500).json({ error: errorMessage }); // Using ResponseData structure
      return;
    }

  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    const message = error.message || 'An unexpected error occurred while communicating with the AI.';
    res.status(500).json({ error: message }); // Using ResponseData structure
    return;
  }
}
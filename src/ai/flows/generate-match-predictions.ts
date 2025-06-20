'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating table tennis match predictions.
 *
 * - generateMatchPredictions - A function that generates predictions for table tennis matches.
 * - GenerateMatchPredictionsInput - The input type for the generateMatchPredictions function.
 * - GenerateMatchPredictionsOutput - The return type for the generateMatchPredictions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMatchPredictionsInputSchema = z.object({
  matchDetails: z
    .string()
    .describe(
      'Detailed information about the upcoming table tennis match, including player statistics, recent performance, and any relevant news or factors.'
    ),
});
export type GenerateMatchPredictionsInput = z.infer<typeof GenerateMatchPredictionsInputSchema>;

const GenerateMatchPredictionsOutputSchema = z.object({
  prediction: z
    .string()
    .describe('The AI-generated prediction for the table tennis match outcome.'),
  confidenceLevel: z
    .string()
    .describe('The confidence level of the prediction, expressed as a percentage.'),
  rationale: z
    .string()
    .describe(
      'A detailed explanation of the factors and analysis that led to the prediction.'
    ),
});
export type GenerateMatchPredictionsOutput = z.infer<typeof GenerateMatchPredictionsOutputSchema>;

export async function generateMatchPredictions(
  input: GenerateMatchPredictionsInput
): Promise<GenerateMatchPredictionsOutput> {
  return generateMatchPredictionsFlow(input);
}

const generateMatchPredictionsPrompt = ai.definePrompt({
  name: 'generateMatchPredictionsPrompt',
  input: {schema: GenerateMatchPredictionsInputSchema},
  output: {schema: GenerateMatchPredictionsOutputSchema},
  prompt: `You are an expert in predicting the outcomes of table tennis matches. Based on the provided match details, generate a prediction, a confidence level (as a percentage), and a detailed rationale for your prediction.

Match Details: {{{matchDetails}}}

Prediction: 
Confidence Level: 
Rationale: `,
});

const generateMatchPredictionsFlow = ai.defineFlow(
  {
    name: 'generateMatchPredictionsFlow',
    inputSchema: GenerateMatchPredictionsInputSchema,
    outputSchema: GenerateMatchPredictionsOutputSchema,
  },
  async input => {
    const {output} = await generateMatchPredictionsPrompt(input);
    return output!;
  }
);

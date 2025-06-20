// Summarize-match-analysis.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing table tennis match analysis.
 *
 * - summarizeMatchAnalysis - A function that takes match analysis as input and returns a summary of key insights.
 * - SummarizeMatchAnalysisInput - The input type for the summarizeMatchAnalysis function.
 * - SummarizeMatchAnalysisOutput - The return type for the summarizeMatchAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMatchAnalysisInputSchema = z.object({
  matchAnalysis: z
    .string()
    .describe(
      'Detailed analysis of a table tennis match, including statistics, player performance, and key moments.'
    ),
});
export type SummarizeMatchAnalysisInput = z.infer<typeof SummarizeMatchAnalysisInputSchema>;

const SummarizeMatchAnalysisOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the key insights from the table tennis match analysis, highlighting crucial factors influencing the match outcome.'
    ),
});
export type SummarizeMatchAnalysisOutput = z.infer<typeof SummarizeMatchAnalysisOutputSchema>;

export async function summarizeMatchAnalysis(input: SummarizeMatchAnalysisInput): Promise<SummarizeMatchAnalysisOutput> {
  return summarizeMatchAnalysisFlow(input);
}

const summarizeMatchAnalysisPrompt = ai.definePrompt({
  name: 'summarizeMatchAnalysisPrompt',
  input: {schema: SummarizeMatchAnalysisInputSchema},
  output: {schema: SummarizeMatchAnalysisOutputSchema},
  prompt: `You are an expert table tennis analyst. Please provide a concise summary of the following match analysis, highlighting the key insights and crucial factors that influenced the match outcome. The summary should be easily understandable and help the user refine their betting strategies.\n\nMatch Analysis: {{{matchAnalysis}}}`,
});

const summarizeMatchAnalysisFlow = ai.defineFlow(
  {
    name: 'summarizeMatchAnalysisFlow',
    inputSchema: SummarizeMatchAnalysisInputSchema,
    outputSchema: SummarizeMatchAnalysisOutputSchema,
  },
  async input => {
    const {output} = await summarizeMatchAnalysisPrompt(input);
    return output!;
  }
);

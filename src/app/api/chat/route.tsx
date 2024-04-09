import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(
  req: Request
) {
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        "role": "system",
        "content": "tax consultant"
      },
      
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

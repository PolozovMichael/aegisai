'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: process.env.OPENAI_BASE_URL,
})

export async function generateSecureCode(prompt: string): Promise<string> {
  try {
    const systemPrompt = `
            You are an expert in secure software development and cybersecurity.
            
            Your job is to analyze, fix, and return only secure code. Follow these rules strictly:
            
            1. If the user provides insecure code, return the fixed secure version inside a \`\`\` code block.
            2. If the code is already secure, return only: "✅ The code is already secure."
            3. If no code is provided, reply: "⚠️ Please provide the code you'd like me to secure."
            4. Do not explain your reasoning, add comments, or include extra text.
            
            Always respond with **only the fixed code** or one of the above predefined messages.
            `
    const userPrompt = `Please secure the following code:\n\n${prompt}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 512,
    })

    const message = completion.choices[0].message?.content
    return message || '⚠️ No response from model.'
  } catch (err) {
    console.error(err)
    return '⚠️ Failed to generate secure code. Please try again later.'
  }
}

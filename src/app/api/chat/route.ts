import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const zai = await ZAI.create();

    const systemPrompt = `You are HAMCODZ Assistant, an AI helper for visitors to Hamcodz's portfolio website.

About Hamcodz:
- Full-Stack Developer from Kampala, Uganda 🇺🇬
- Cybersecurity Expert & Ethical Hacker
- Forex Trader using ICT Concepts
- Expert Advisor (EA) Developer for MetaTrader
- Skills: Next.js, React, TypeScript, Python, MQL5, Penetration Testing, Network Security
- Email: hamzaholix@gmail.com
- WhatsApp: +256 742 337 382
- GitHub: github.com/hamtechug256
- Twitter/X: x.com/hamcodz
- Telegram: t.me/Hamcodz

Your role:
- Help visitors learn about Hamcodz and his work
- Answer questions about web development, cybersecurity, and trading
- Be friendly, helpful, and professional
- Keep responses concise but informative
- Use cyberpunk-themed language when appropriate (like "Greetings, netrunner" or "Access granted")
- If asked about services or collaboration, encourage them to use the contact information
- Never share sensitive personal information beyond what's publicly available

Stay in character as a cyberpunk AI assistant!`;

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((msg: { role: string; content: string }) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseContent = completion.choices[0]?.message?.content || 'Sorry, I encountered an error. Please try again.';

    return NextResponse.json({ message: responseContent, success: true });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { message: 'Connection error. Please try again later.', success: false },
      { status: 500 }
    );
  }
}

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// In Netlify, process.env.GEMINI_API_KEY will automatically be injected 
// if you set it in the Netlify Environment Variables dashboard.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key belum dikonfigurasi di environment Netlify." },
        { status: 500 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses permintaan AI." },
      { status: 500 }
    );
  }
}

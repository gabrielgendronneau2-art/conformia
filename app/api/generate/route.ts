import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { probleme, produit, client } = body;

  const prompt = `Tu es un expert qualité industrielle. Génère un rapport 8D complet et professionnel basé sur ces informations :

Produit : ${produit}
Client : ${client}
Problème : ${probleme}

Structure le rapport avec les 8 disciplines :
D1 - Constitution de l'équipe
D2 - Description du problème
D3 - Actions immédiates
D4 - Analyse des causes racines
D5 - Actions correctives
D6 - Mise en oeuvre des actions
D7 - Actions préventives
D8 - Félicitations de l'équipe

Sois précis et professionnel.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
     model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
 console.log("Réponse Groq:", JSON.stringify(data));
const rapport = data.choices?.[0]?.message?.content || "Erreur de génération";

  return NextResponse.json({ rapport });
}

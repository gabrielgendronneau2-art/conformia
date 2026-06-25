"use client";
import jsPDF from "jspdf";
import { useState } from "react";

export default function Home() {
  const [produit, setProduit] = useState("");
  const [client, setClient] = useState("");
  const [probleme, setProbleme] = useState("");
  const [rapport, setRapport] = useState("");
  const [loading, setLoading] = useState(false);

  const telechargerPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Rapport 8D - Conformia", 20, 20);
    doc.setFontSize(11);
    const lignes = doc.splitTextToSize(rapport, 170);
    doc.text(lignes, 20, 35);
    doc.save("rapport-8D.pdf");
  };

  const generer = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produit, client, probleme }),
    });
    const data = await res.json();
    setRapport(data.rapport);
    setLoading(false);
  };

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#0A0A0A",
      color: "white",
      fontFamily: "sans-serif",
      padding: "60px 40px",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h1 style={{ fontSize: "40px", marginBottom: "8px" }}>Conformia</h1>
      <p style={{ color: "#888", marginBottom: "48px" }}>
        Générez votre rapport 8D en 2 minutes
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <input
          placeholder="Nom du produit"
          value={produit}
          onChange={(e) => setProduit(e.target.value)}
          style={{ padding: "14px", backgroundColor: "#1a1a1a", border: "1px solid #333", color: "white", fontSize: "15px" }}
        />
        <input
          placeholder="Nom du client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          style={{ padding: "14px", backgroundColor: "#1a1a1a", border: "1px solid #333", color: "white", fontSize: "15px" }}
        />
        <textarea
          placeholder="Décrivez le problème..."
          value={probleme}
          onChange={(e) => setProbleme(e.target.value)}
          rows={5}
          style={{ padding: "14px", backgroundColor: "#1a1a1a", border: "1px solid #333", color: "white", fontSize: "15px" }}
        />
        <button
          onClick={generer}
          disabled={loading}
          style={{
            backgroundColor: "#C9A84C",
            color: "black",
            border: "none",
            padding: "16px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Génération en cours..." : "Générer le rapport 8D"}
        </button>
      </div>

      {rapport && (
        <>
          <div style={{
            marginTop: "48px",
            backgroundColor: "#111",
            padding: "32px",
            border: "1px solid #222",
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
            fontSize: "14px"
          }}>
            {rapport}
          </div>
          <button
            onClick={telechargerPDF}
            style={{
              backgroundColor: "#222",
              color: "white",
              border: "1px solid #C9A84C",
              padding: "16px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "16px",
              width: "100%"
            }}
          >
            Télécharger en PDF
          </button>
        </>
      )}
    </main>
  );
}
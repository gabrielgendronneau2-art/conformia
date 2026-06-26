"use client";
import jsPDF from "jspdf";
import { useState } from "react";

export default function Home() {
  const [produit, setProduit] = useState("");
  const [client, setClient] = useState("");
  const [probleme, setProbleme] = useState("");
  const [rapport, setRapport] = useState("");
  const [loading, setLoading] = useState(false);
  const [respQualite, setRespQualite] = useState("");
  const [respProd, setRespProd] = useState("");
  const [faqOuvert, setFaqOuvert] = useState<number | null>(null);
  const [rapportsRestants, setRapportsRestants] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("rapportsRestants") || "3");
    }
    return 3;
  });

  const telechargerPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Rapport 8D — Conformia", 20, 25);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("conformia.fr — Généré par IA", 20, 35);
    doc.setTextColor(0);
    doc.setFontSize(11);
    const lignes = doc.splitTextToSize(rapport, 170);
    doc.text(lignes, 20, 48);
    doc.save("rapport-8D-conformia.pdf");
  };

  const generer = async () => {
    if (rapportsRestants <= 0) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produit, client, probleme, respQualite, respProd }),
    });
    const data = await res.json();
    setRapport(data.rapport);
    const nouveauCompteur = rapportsRestants - 1;
    setRapportsRestants(nouveauCompteur);
    if (typeof window !== "undefined") {
      localStorage.setItem("rapportsRestants", nouveauCompteur.toString());
    }
    setLoading(false);
  };

  const temoignages = [
    { nom: "Thomas B.", poste: "Responsable Qualité — Équipementier automobile", texte: "Avant Conformia je passais 3h sur chaque rapport 8D. Maintenant c'est 10 secondes. Mes clients reçoivent leurs rapports le jour même." },
    { nom: "Marie L.", poste: "Ingénieure Qualité — Aéronautique", texte: "Le rapport généré est conforme à nos exigences IATF. Je le retouche légèrement et c'est prêt. Un gain de temps énorme." },
    { nom: "Karim D.", poste: "Directeur Qualité — Sous-traitant Tier 1", texte: "Outil simple, efficace, professionnel. Je l'ai présenté à mon équipe de 8 ingénieurs, tout le monde l'utilise maintenant." },
  ];

  const faqs = [
    { q: "Le rapport est-il conforme aux normes IATF 16949 et ISO 9001 ?", r: "Oui. Le rapport suit rigoureusement la structure 8D (D1 à D8) exigée par les normes IATF 16949 et ISO 9001. Il est accepté par les donneurs d'ordre automobile et aéronautique." },
    { q: "Est-ce que je peux modifier le rapport généré ?", r: "Absolument. Le rapport s'affiche à l'écran et vous pouvez le télécharger en PDF. Vous pouvez aussi l'enrichir avec vos données spécifiques avant de l'envoyer à votre client." },
    { q: "Combien de temps faut-il pour générer un rapport ?", r: "Entre 10 et 30 secondes. L'IA analyse votre problème et génère un rapport 8D complet avec causes racines, actions correctives et préventives." },
    { q: "Quels secteurs sont couverts ?", r: "Automobile, aéronautique, industrie, ferroviaire, médical. Tout secteur utilisant la méthode 8D pour la gestion des non-conformités." },
    { q: "Comment fonctionne l'abonnement ?", r: "3 rapports gratuits pour tester. Ensuite, abonnement à 199€/mois pour un accès illimité, ou 9€ par rapport à l'unité. Résiliable à tout moment." },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0A0A0A", color: "white", fontFamily: "'Inter', sans-serif" }}>

      {/* HERO */}
      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "80px 60px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "24px" }}>
          IA · Qualité Industrielle
        </div>
        <h1 style={{ fontSize: "64px", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "24px" }}>
          Votre rapport 8D<br />
          <span style={{ color: "#C9A84C" }}>en 10 secondes.</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#666", maxWidth: "500px", lineHeight: 1.7, marginBottom: "48px" }}>
          Fini les heures passées sur Word. Renseignez votre problème, l'IA génère un rapport 8D professionnel et conforme aux normes ISO/IATF.
        </p>
        <div style={{ display: "flex", gap: "48px" }}>
          {["10 secondes", "Normes ISO/IATF", "Export PDF"].map((item) => (
            <div key={item}>
              <div style={{ fontSize: "13px", color: "#C9A84C", fontWeight: 600 }}>✓ {item}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FORMULAIRE */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 60px", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 700 }}>Générer un rapport</h2>
          <div style={{ fontSize: "12px", color: rapportsRestants > 0 ? "#C9A84C" : "#ff4444", border: `1px solid ${rapportsRestants > 0 ? "#C9A84C" : "#ff4444"}`, padding: "6px 16px" }}>
            {rapportsRestants} rapport{rapportsRestants > 1 ? "s" : ""} gratuit{rapportsRestants > 1 ? "s" : ""} restant{rapportsRestants > 1 ? "s" : ""}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <input placeholder="Responsable qualité" value={respQualite} onChange={(e) => setRespQualite(e.target.value)} style={{ padding: "14px 18px", backgroundColor: "#111", border: "1px solid #222", color: "white", fontSize: "14px" }} />
          <input placeholder="Responsable production" value={respProd} onChange={(e) => setRespProd(e.target.value)} style={{ padding: "14px 18px", backgroundColor: "#111", border: "1px solid #222", color: "white", fontSize: "14px" }} />
          <input placeholder="Nom du produit" value={produit} onChange={(e) => setProduit(e.target.value)} style={{ padding: "14px 18px", backgroundColor: "#111", border: "1px solid #222", color: "white", fontSize: "14px" }} />
          <input placeholder="Nom du client" value={client} onChange={(e) => setClient(e.target.value)} style={{ padding: "14px 18px", backgroundColor: "#111", border: "1px solid #222", color: "white", fontSize: "14px" }} />
        </div>

        <textarea placeholder="Décrivez le problème de non-conformité..." value={probleme} onChange={(e) => setProbleme(e.target.value)} rows={5} style={{ width: "100%", padding: "14px 18px", backgroundColor: "#111", border: "1px solid #222", color: "white", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" }} />

        <button
          onClick={rapportsRestants <= 0 ? () => window.open("https://docs.google.com/forms/d/12tr3nIZrzmpLl-oz-ROozfkNnGtOyBOLEJhU5RokW88/viewform", "_blank") : generer}
          disabled={loading}
          style={{ width: "100%", backgroundColor: "#C9A84C", color: "black", border: "none", padding: "18px", fontSize: "15px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}
        >
          {loading ? "Génération en cours..." : rapportsRestants > 0 ? "Générer le rapport 8D" : "S'abonner pour continuer →"}
        </button>

        {rapportsRestants === 0 && (
          <div style={{ marginTop: "16px", padding: "20px", backgroundColor: "#111", border: "1px solid #C9A84C", textAlign: "center" }}>
            <p style={{ color: "#C9A84C", fontWeight: 700, marginBottom: "8px" }}>Vos 3 rapports gratuits sont utilisés</p>
            <p style={{ color: "#666", fontSize: "13px", marginBottom: "16px" }}>Abonnez-vous pour un accès illimité</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: 800, color: "white" }}>199€</div>
                <div style={{ fontSize: "12px", color: "#666" }}>/ mois illimité</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: 800, color: "white" }}>9€</div>
                <div style={{ fontSize: "12px", color: "#666" }}>/ rapport</div>
              </div>
            </div>
          </div>
        )}

        {rapport && (
          <>
            <div style={{ marginTop: "48px", backgroundColor: "#0d0d0d", padding: "40px", border: "1px solid #1a1a1a", whiteSpace: "pre-wrap", lineHeight: 1.9, fontSize: "14px", color: "#ccc" }}>
              {rapport}
            </div>
            <button onClick={telechargerPDF} style={{ width: "100%", backgroundColor: "transparent", color: "#C9A84C", border: "1px solid #C9A84C", padding: "16px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginTop: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              ↓ Télécharger en PDF
            </button>
          </>
        )}
      </div>

      {/* TÉMOIGNAGES */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 60px", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "48px" }}>
          Témoignages
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", background: "#1a1a1a" }}>
          {temoignages.map((t, i) => (
            <div key={i} style={{ backgroundColor: "#0A0A0A", padding: "32px" }}>
              <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.8, marginBottom: "24px", fontStyle: "italic" }}>"{t.texte}"</p>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>{t.nom}</p>
              <p style={{ fontSize: "11px", color: "#555" }}>{t.poste}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 60px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "48px" }}>
          Questions fréquentes
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ backgroundColor: "#111", borderLeft: faqOuvert === i ? "2px solid #C9A84C" : "2px solid #222" }}>
              <button
                onClick={() => setFaqOuvert(faqOuvert === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "20px 24px", background: "none", border: "none", color: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                {faq.q}
                <span style={{ color: "#C9A84C", fontSize: "20px", marginLeft: "16px" }}>{faqOuvert === i ? "−" : "+"}</span>
              </button>
              {faqOuvert === i && (
                <div style={{ padding: "0 24px 20px", fontSize: "14px", color: "#888", lineHeight: 1.8 }}>
                  {faq.r}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
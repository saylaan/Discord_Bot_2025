/**
 * Génère le message de bienvenue dans un salon de feedback
 * @param {string} mention - La mention du joueur (ex: <@123456789>)
 * @param {Role} staffRole - L'objet Role à mentionner
 * @returns {string}
 */
function generateFeedbackMessage(mention, staffRole) {
  return `
${staffRole}
╔═══════════════════════════════════════════╗
**📋  SALON DE FEEDBACK — ${mention}**
╚═══════════════════════════════════════════╝

Bienvenue dans ton espace personnel de suivi et de progression au sein de **Get ReKt**.

Ce salon a été créé pour **optimiser ta performance** et **renforcer ta synergie** avec l'équipe. Il restera ouvert pendant toute la durée de ta présence dans le roster et constitue un **canal de communication direct** avec l'équipe officier.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 🎯  OBJECTIFS ET FONCTIONNEMENT

**Pour les officiers :**
• Fournir des retours réguliers sur tes performances (points forts et axes d'amélioration)
• Partager des analyses détaillées post-raid et recommandations stratégiques
• Assurer un suivi personnalisé de ta progression et de ton intégration

**Pour toi :**
• Poser toutes tes questions concernant les stratégies, compositions ou mécaniques
• Demander des clarifications sur les décisions tactiques et les attentes
• Échanger en temps réel après les raids pour ajuster ta performance
• Solliciter des conseils pour maximiser ton impact dans le roster

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### ⚠️  CADRE ET ÉTAT D'ESPRIT

Ce salon est un **espace de développement professionnel** basé sur :
✓ La **bienveillance** — Les retours visent à te faire progresser, jamais à te dévaloriser
✓ La **transparence** — Communication directe, honnête et constructive
✓ Le **respect mutuel** — Écoute active et dialogue orienté solutions
✓ L'**excellence collective** — Ton amélioration renforce toute l'équipe

**Notre engagement :** Te donner les outils et le soutien nécessaires pour exprimer ton plein potentiel au sein de Get ReKt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*N'hésite jamais à solliciter l'équipe officier — nous sommes là pour t'accompagner vers l'excellence.*`;
}

module.exports = { generateFeedbackMessage };

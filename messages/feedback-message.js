/**
 * Génère le message de bienvenue dans un salon de feedback
 * @param {string} mention - La mention du joueur (ex: <@123456789>)
 * @param {Role} staffRole - L'objet Role à mentionner
 * @returns {string}
 */
function generateFeedbackMessage(mention, staffRole) {
  return `
${staffRole}
**📋 Salon de feedback pour ${mention}**

Bienvenue dans ce salon dédié au **suivi continu** et à l’**amélioration constante** de ta participation au roster **Get ReKt**.  
Il restera actif **aussi longtemps que tu feras partie de l’équipe**, et servira de pont direct entre toi et les offs.
### 🎯 Objectifs de ce salon :
• Offrir aux offs un espace pour te faire des retours réguliers (positifs ou à améliorer)  
• Te permettre de poser des questions, demander des conseils ou clarifier certains choix  
• Faciliter les échanges à chaud après les raids pour ajuster ensemble durant le progress

:warning: Ce salon est un **espace bienveillant et constructif**.  
L’objectif est de progresser ensemble dans une communication claire, respectueuse et orientée équipe.`;
}

module.exports = { generateFeedbackMessage };

const canvas = document.getElementById("gameCanvas"); // Récupère l'élément canvas de la page
const ctx = canvas.getContext("2d"); // Obtient le "pinceau" pour dessiner en 2D

const WALL = 20; // Épaisseur du sol et du plafond en pixels
let gameOver = false; // Vrai quand le joueur a touché un pic

function drawBackground() { // Dessine le fond et les murs
  ctx.fillStyle = "black"; // Choisit le noir pour le fond
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Efface l'écran en le remplissant de noir

  ctx.fillStyle = "gray"; // Choisit le gris pour les murs
  ctx.fillRect(0, 0, canvas.width, WALL); // Dessine le plafond en haut
  ctx.fillRect(0, canvas.height - WALL, canvas.width, WALL); // Dessine le sol en bas
} // Fin de la fonction drawBackground

function restartGame() { // Relance une partie depuis le début
  resetPlayer(); // Remet le joueur à sa place de départ
  resetObstacles(); // Supprime les pics et remet la vitesse de départ
  resetScore(); // Remet le score à zéro
  gameOver = false; // La partie est de nouveau en cours
} // Fin de la fonction restartGame

function main() { // Boucle principale du jeu
  if (!gameOver) { // Tant que la partie n'est pas perdue
    updatePlayer(); // Calcule la nouvelle position du joueur
    updateObstacles(); // Fait avancer les pics et en crée de nouveaux
    updateScore(); // Fait monter le score
    if (checkCollisions()) { // Si le joueur touche un pic
      gameOver = true; // La partie est finie, tout se fige
    } // Fin du test de collision
  } // Fin du test gameOver

  drawBackground(); // Redessine le fond et les murs
  drawObstacles(); // Redessine les pics
  drawPlayer(); // Redessine le joueur par-dessus
  drawScore(); // Affiche le score en haut à gauche

  if (gameOver) { // Si la partie est perdue
    drawGameOver(); // Affiche l'écran de fin avec la consigne pour rejouer
  } // Fin de l'affichage du game over

  requestAnimationFrame(main); // Rappelle main à la prochaine image (~60 fois/s)
} // Fin de la fonction main

main(); // Lance le jeu
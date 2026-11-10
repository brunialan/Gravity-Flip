const canvas = document.getElementById("gameCanvas"); // Récupère l'élément canvas de la page
const ctx = canvas.getContext("2d"); // Obtient le "pinceau" pour dessiner en 2D

const WALL = 32; // Épaisseur du sol et du plafond en pixels (même hauteur que les images agrandies)
let gameStarted = false; // Faux tant que le joueur n'a pas lancé la partie depuis le menu
let gameOver = false; // Vrai quand le joueur a touché un pic

function drawBackground() { // Efface l'écran à chaque image
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Rend le canvas transparent pour laisser voir le sol et le plafond du CSS
} // Fin de la fonction drawBackground

function restartGame() { // Relance une partie depuis le début
  resetPlayer(); // Remet le joueur à sa place de départ
  resetObstacles(); // Supprime les pics et remet la vitesse de départ
  resetScore(); // Remet le score à zéro
  gameOver = false; // La partie est de nouveau en cours
} // Fin de la fonction restartGame

function main() { // Boucle principale du jeu
  if (gameStarted && !gameOver) { // Seulement si la partie a commencé et n'est pas perdue
    updatePlayer(); // Calcule la nouvelle position du joueur
    updateObstacles(); // Fait avancer les pics et en crée de nouveaux
    updateScore(); // Fait monter le score
    if (checkCollisions()) { // Si le joueur touche un pic
      gameOver = true; // La partie est finie, tout se fige
    } // Fin du test de collision
  } // Fin du test gameStarted et gameOver

  drawBackground(); // Efface l'écran (le sol et le plafond viennent du CSS)
  drawObstacles(); // Redessine les pics
  drawPlayer(); // Redessine le joueur par-dessus

  if (!gameStarted) { // Si la partie n'a pas encore commencé
    drawStartMenu(); // Affiche le menu de démarrage
  } else { // Sinon la partie est en cours ou terminée
    drawScore(); // Affiche le score en haut à gauche
  } // Fin du choix menu ou score

  if (gameOver) { // Si la partie est perdue
    drawGameOver(); // Affiche l'écran de fin avec la consigne pour rejouer
  } // Fin de l'affichage du game over

  requestAnimationFrame(main); // Rappelle main à la prochaine image (~60 fois/s)
} // Fin de la fonction main

main(); // Lance la boucle (le jeu reste figé sur le menu tant que gameStarted est faux)
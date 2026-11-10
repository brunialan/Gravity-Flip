let score = 0; // Score actuel du joueur (peut avoir des décimales, on l'arrondit à l'affichage)

function updateScore() { // Augmente le score à chaque image
  score += speed / 50; // Plus le jeu va vite, plus le score monte vite (speed vient de obstacles.js)
} // Fin de la fonction updateScore

function resetScore() { // Remet le score à zéro pour une nouvelle partie
  score = 0; // Repart de zéro
} // Fin de la fonction resetScore

function drawScore() { // Affiche le score en haut à gauche
  ctx.fillStyle = "white"; // Choisit le blanc pour le texte
  ctx.font = "20px Arial"; // Définit la taille et la police du texte
  ctx.textAlign = "left"; // Aligne le texte à partir de la gauche
  ctx.fillText("Score : " + Math.floor(score), 20, 60); // Écrit le score arrondi, juste sous le plafond
} // Fin de la fonction drawScore

function drawStartMenu() { // Affiche le menu de démarrage
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)"; // Choisit un noir semi-transparent
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Assombrit tout l'écran sans cacher le décor

  ctx.fillStyle = "white"; // Choisit le blanc pour les textes
  ctx.textAlign = "center"; // Centre les textes autour du point donné
  ctx.font = "56px Arial"; // Très grande police pour le titre
  ctx.fillText("Gravity Flip", canvas.width / 2, canvas.height / 2 - 30); // Écrit le titre au milieu, un peu plus haut
  ctx.font = "20px Arial"; // Petite police pour les consignes
  ctx.fillText("Espace ou clic : inverser la gravité", canvas.width / 2, canvas.height / 2 + 15); // Explique la seule commande du jeu
  ctx.fillText("Appuyer sur ESPACE pour commencer", canvas.width / 2, canvas.height / 2 + 55); // Indique comment lancer la partie
} // Fin de la fonction drawStartMenu

function drawGameOver() { // Affiche l'écran de fin de partie
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)"; // Choisit un noir semi-transparent
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Assombrit tout l'écran sans cacher le jeu

  ctx.fillStyle = "white"; // Choisit le blanc pour les textes
  ctx.textAlign = "center"; // Centre les textes autour du point donné
  ctx.font = "48px Arial"; // Grande police pour le titre
  ctx.fillText("Game over", canvas.width / 2, canvas.height / 2 - 30); // Écrit le titre au milieu, un peu plus haut
  ctx.font = "24px Arial"; // Police moyenne pour le score
  ctx.fillText("Score : " + Math.floor(score), canvas.width / 2, canvas.height / 2 + 15); // Écrit le score final
  ctx.font = "20px Arial"; // Petite police pour la consigne
  ctx.fillText("Appuyer sur R pour rejouer", canvas.width / 2, canvas.height / 2 + 55); // Écrit la consigne pour rejouer
} // Fin de la fonction drawGameOver

document.addEventListener("keydown", function (event) { // Écoute chaque touche pressée au clavier
  if (event.code === "Space" && !gameStarted) { // Si c'est espace et que le jeu n'a pas encore commencé
    gameStarted = true; // Lance la partie
  } // Fin du test de démarrage
  if (event.code === "KeyR" && gameOver) { // Si la touche est R et que la partie est perdue
    restartGame(); // Relance une nouvelle partie
  } // Fin du test sur la touche R
}); // Fin de l'écouteur clavier

document.addEventListener("mousedown", function () { // Écoute chaque clic de souris
  if (!gameStarted) { // Si le jeu n'a pas encore commencé
    gameStarted = true; // Lance la partie
  } // Fin du test de démarrage
}); // Fin de l'écouteur de clic
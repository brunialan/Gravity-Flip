const gravity = 0.6; // Force qui accélère la chute à chaque image

const player = { // Objet qui représente le personnage
  x: 100, // Position horizontale du personnage
  y: 200, // Position verticale du personnage (haut du carré)
  size: 30, // Taille du carré en pixels
  vy: 0, // Vitesse verticale actuelle (0 = immobile)
  dir: 1, // Direction de la gravité : 1 = vers le sol, -1 = vers le plafond
  onGround: false // Vrai quand le joueur touche le sol ou le plafond
}; // Fin de l'objet player

function flipGravity() { // Inverse la gravité du joueur
  if (player.onGround) { // Autorise l'inversion seulement si le joueur est posé
    player.dir *= -1; // Change le sens de la gravité (1 devient -1, -1 devient 1)
    player.onGround = false; // Le joueur décolle, il n'est plus posé
  } // Fin du test onGround
} // Fin de la fonction flipGravity

document.addEventListener("keydown", function (event) { // Écoute chaque touche pressée au clavier
  if (event.repeat) return; // Ignore les répétitions automatiques quand la touche reste enfoncée
  if (event.code === "Space") { // Si la touche est la barre d'espace
    event.preventDefault(); // Empêche la page de défiler vers le bas
    flipGravity(); // Inverse la gravité
  } // Fin du test sur la touche
}); // Fin de l'écouteur clavier

document.addEventListener("mousedown", flipGravity); // Inverse la gravité à chaque clic de souris

function updatePlayer() { // Met à jour la physique du joueur à chaque image
  player.vy += gravity * player.dir; // La gravité accélère le joueur vers le bas ou vers le haut
  player.y += player.vy; // La vitesse déplace le personnage verticalement

  const floorY = canvas.height - WALL; // Hauteur du sol (canvas et WALL viennent de main.js)
  const ceilingY = WALL; // Hauteur du plafond (le bas de la bande grise du haut)

  player.onGround = false; // On suppose qu'il est en l'air, puis on vérifie plus bas

  if (player.y + player.size > floorY) { // Si le bas du personnage dépasse le sol
    player.y = floorY - player.size; // Le replace exactement sur le sol
    player.vy = 0; // Annule la vitesse car il est posé
    player.onGround = true; // Indique qu'il touche une surface
  } // Fin du test de collision avec le sol

  if (player.y < ceilingY) { // Si le haut du personnage dépasse le plafond
    player.y = ceilingY; // Le replace exactement sous le plafond
    player.vy = 0; // Annule la vitesse car il est collé
    player.onGround = true; // Indique qu'il touche une surface
  } // Fin du test de collision avec le plafond
} // Fin de la fonction updatePlayer

function drawPlayer() { // Dessine le joueur à chaque image
  ctx.fillStyle = "blue"; // Choisit le cyan pour le personnage
  ctx.fillRect(player.x, player.y, player.size, player.size); // Dessine le carré du personnage
} // Fin de la fonction drawPlayer

function resetPlayer() { // Remet le joueur à son état de départ
  player.y = 200; // Position verticale de départ
  player.vy = 0; // Vitesse nulle
  player.dir = 1; // Gravité vers le sol
  player.onGround = false; // Le joueur est en l'air au départ
} // Fin de la fonction resetPlayer
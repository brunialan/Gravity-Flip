const SPEED_START = 5; // Vitesse de défilement au départ (pixels par image)
const ACCEL = 0.005; // Gain de vitesse à chaque image (monte ce chiffre pour accélérer plus vite)
const SPEED_MAX = 13; // Vitesse maximale à ne pas dépasser
const SPIKE_SIZE = 30; // Largeur et hauteur d'un pic en pixels

let speed = SPEED_START; // Vitesse actuelle de défilement
let obstacles = []; // Liste de tous les pics actuellement à l'écran
let distanceSinceSpawn = 0; // Distance parcourue depuis la dernière apparition de pics
let nextGap = 500; // Distance à parcourir avant la prochaine apparition (500 pour le tout premier)

function spawnGroup() { // Crée un groupe de 1 à 3 pics côte à côte
  const side = Math.random() < 0.5 ? "floor" : "ceiling"; // Pile ou face : sol ou plafond
  const count = Math.floor(Math.random() * 3) + 1; // Nombre aléatoire de pics : 1, 2 ou 3
  for (let i = 0; i < count; i++) { // Pour chaque pic du groupe
    obstacles.push({ x: canvas.width + i * SPIKE_SIZE, side: side }); // L'ajoute juste hors écran à droite, collé au précédent
  } // Fin de la boucle
  const groupWidth = count * SPIKE_SIZE; // Largeur totale du groupe
  nextGap = groupWidth + speed * 40 + Math.random() * speed * 25; // Écart minimum qui grandit avec la vitesse, plus un peu de hasard
} // Fin de la fonction spawnGroup

function updateObstacles() { // Met à jour les pics à chaque image
  speed = Math.min(speed + ACCEL, SPEED_MAX); // Accélère un peu, sans dépasser le maximum
  distanceSinceSpawn += speed; // Ajoute la distance parcourue pendant cette image

  if (distanceSinceSpawn >= nextGap) { // Si on a assez avancé depuis le dernier groupe
    spawnGroup(); // Fait apparaître un nouveau groupe
    distanceSinceSpawn = 0; // Remet le compteur de distance à zéro
  } // Fin du test d'apparition

  for (const s of obstacles) { // Pour chaque pic à l'écran
    s.x -= speed; // Le déplace vers la gauche
  } // Fin de la boucle de déplacement

  obstacles = obstacles.filter(function (s) { // Garde uniquement les pics encore utiles
    return s.x + SPIKE_SIZE > 0; // Supprime ceux qui sont complètement sortis à gauche
  }); // Fin du filtre
} // Fin de la fonction updateObstacles

function drawObstacles() { // Dessine tous les pics à chaque image
  ctx.fillStyle = "red"; // Choisit le rouge pour les pics
  for (const s of obstacles) { // Pour chaque pic à l'écran
    ctx.beginPath(); // Commence un nouveau tracé
    if (s.side === "floor") { // Si le pic est posé sur le sol
      const baseY = canvas.height - WALL; // Hauteur du sol, là où le pic est collé
      ctx.moveTo(s.x, baseY); // Place le crayon au coin gauche de la base
      ctx.lineTo(s.x + SPIKE_SIZE / 2, baseY - SPIKE_SIZE); // Trace vers la pointe, en haut au milieu
      ctx.lineTo(s.x + SPIKE_SIZE, baseY); // Trace vers le coin droit de la base
    } else { // Sinon le pic est accroché au plafond
      ctx.moveTo(s.x, WALL); // Place le crayon au coin gauche, sous le plafond
      ctx.lineTo(s.x + SPIKE_SIZE / 2, WALL + SPIKE_SIZE); // Trace vers la pointe, en bas au milieu
      ctx.lineTo(s.x + SPIKE_SIZE, WALL); // Trace vers le coin droit
    } // Fin du choix sol/plafond
    ctx.closePath(); // Ferme le triangle
    ctx.fill(); // Remplit le triangle en rouge
  } // Fin de la boucle de dessin
} // Fin de la fonction drawObstacles

function resetObstacles() { // Remet les pics et la vitesse à leur état de départ
  speed = SPEED_START; // Revient à la vitesse de départ
  obstacles = []; // Supprime tous les pics à l'écran
  distanceSinceSpawn = 0; // Remet le compteur de distance à zéro
  nextGap = 500; // Premier groupe de pics après 500 pixels, comme au début
} // Fin de la fonction resetObstacles
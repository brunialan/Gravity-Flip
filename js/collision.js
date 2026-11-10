function checkCollisions() { // Renvoie true si le joueur touche un pic
  for (const s of obstacles) { // Teste chaque pic à l'écran
    const margin = s.size * 0.2; // Marge sur les côtés, proportionnelle à la taille du pic (plus indulgent)
    const hitX = s.x + margin; // Début de la zone dangereuse, un peu à l'intérieur du pic
    const hitW = s.size - margin * 2; // Largeur de la zone dangereuse
    const hitH = s.size * 0.67; // Hauteur de la zone dangereuse (la pointe est volontairement tolérante)
    const hitY = s.side === "floor" ? canvas.height - WALL - hitH : WALL; // Haut de la zone dangereuse selon le côté

    const overlap = player.x < hitX + hitW && // Le joueur commence avant la fin de la zone
                    player.x + player.size > hitX && // Et finit après le début de la zone
                    player.y < hitY + hitH && // Le haut du joueur est au-dessus du bas de la zone
                    player.y + player.size > hitY; // Le bas du joueur est sous le haut de la zone

    if (overlap) { // Si les deux rectangles se chevauchent
      return true; // Collision détectée
    } // Fin du test de chevauchement
  } // Fin de la boucle sur les pics
  return false; // Aucun pic touché
} // Fin de la fonction checkCollisions
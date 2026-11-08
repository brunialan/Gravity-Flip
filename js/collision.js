function checkCollisions() { // Renvoie true si le joueur touche un pic
  for (const s of obstacles) { // Teste chaque pic à l'écran
    const hitX = s.x + 6; // Zone dangereuse un peu plus étroite que le pic (plus indulgent)
    const hitW = SPIKE_SIZE - 12; // Largeur de la zone dangereuse
    const hitY = s.side === "floor" ? canvas.height - WALL - SPIKE_SIZE + 10 : WALL; // Haut de la zone dangereuse selon le côté
    const hitH = SPIKE_SIZE - 10; // Hauteur de la zone dangereuse (la pointe est volontairement tolérante)

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
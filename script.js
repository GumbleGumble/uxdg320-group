// Animate filter for hover effect (from anime.js) on tile background brightness

document.addEventListener('DOMContentLoaded', () => { //wait for page to load
    document.querySelectorAll('.tile').forEach(tile => { //find all the tiles
      tile.addEventListener('mouseenter', () => { //when mouse enters tile
        anime({
          targets: tile,
          filter: 'brightness(0.88)', //darken tile to 88% brightness
          duration: 30,
          easing: 'easeInQuad' //ease in
        });
      });
      tile.addEventListener('mouseleave', () => { //when mouse leaves tile
        anime({
          targets: tile,
          filter: 'brightness(1)', //return tile to 100% brightness
          duration: 170,
          easing: 'easeOutQuad' //ease out
        });
      });
    });
  });
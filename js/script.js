// Animate filter for hover effect (from anime.js) on tile background brightness, and update definition box with emotion definition

document.addEventListener('DOMContentLoaded', () => { //wait for page to load
    // Get the definition box and its text element
    const definitionBox = document.getElementById('definition-box');
    const definitionText = document.getElementById('definition-text');
    const defaultMessage = 'Hover over an emotion to see definition';

    document.querySelectorAll('.tile').forEach(tile => { //find all the tiles
      // tile darken on hover animation
      tile.addEventListener('mouseenter', () => { //when mouse enters tile
        anime({
          targets: tile,
          filter: 'brightness(0.88)', //darken tile to 88% brightness
          duration: 80,
          easing: 'easeOutQuad' //ease out
        });
        // Update definition text to match hovered emotion
        definitionText.textContent = tile.getAttribute('data-definition');
      });
      // tile lighten on hover animation
      tile.addEventListener('mouseleave', () => { //when mouse leaves tile
        anime({
          targets: tile,
          filter: 'brightness(1)', //return tile to 100% brightness
          duration: 250,
          easing: 'easeInQuad' //ease in
        });
        // Reset definition text to default message when not hovering
        definitionText.textContent = defaultMessage;
      });
    });
  });
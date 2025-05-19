// animate filter effect (from anime.js) on tile background brightness, and update definition box with emotion definition on hover
document.addEventListener("DOMContentLoaded", () => { //wait for page to load
  const definitionText = document.getElementById("definition-text"); //find definition text element
  const defaultMessage = "Hover over an emotion to see definition"; //define default message

  document.querySelectorAll(".tile").forEach((tile) => { //find all the tiles
    tile.addEventListener("mouseenter", () => {  //when mouse enters tile
      anime({
        targets: tile,
        filter: "brightness(0.88)", //darken tile to 88% brightness
        duration: 80,
        easing: "easeOutQuad", //ease out
      });
      definitionText.textContent = tile.getAttribute("data-definition"); //update definition text to match hovered emotion
    });
    tile.addEventListener("mouseleave", () => { //when mouse leaves tile
      anime({
        targets: tile,
        filter: "brightness(1)", //return tile to 100% brightness
        duration: 250,
        easing: "easeInQuad", //ease in
      });
      definitionText.textContent = defaultMessage; //reset definition text to default message when not hovering
    });
  });
});

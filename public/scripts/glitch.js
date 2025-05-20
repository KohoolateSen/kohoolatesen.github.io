document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('main-page-logo');
  const ctx = canvas.getContext('2d');
  const img = document.getElementById('source-img');

  if (!img || !canvas) {
    console.error("Image or canvas element not found");
    return;
  }

  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    glitch({
      amount: 10,
      seed: 25,
      iterations: 20,
      quality: 30,
      glitchCanvas: canvas
    });
  };

  // In case the image is already cached
  if (img.complete) {
    img.onload();
  }
});


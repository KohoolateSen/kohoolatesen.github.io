// static/scripts/typewriter.js

document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById('typing');

  if (app && typeof Typewriter === 'function') {
    const typewriter = new Typewriter(app, {
      loop: true,
      delay: 75,
    });

    typewriter
      .changeCursor('_')
      .typeString('Via Sadra\'s TTY :')
      .pauseFor(2000)
      .deleteAll()
      .typeString('PRESS START !')
      .pauseFor(2000)
      .changeCursor('_')
      .start();
  } else {
    console.error("Typewriter not loaded or #typing element missing.");
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const starCanvas = document.getElementById('starryCanvas');
  const starCtx = starCanvas.getContext('2d');
  const moon = document.querySelector('.moon');
  const astronaut = document.querySelector('.animate-astronomer');
  const rocket = document.querySelector('.rocket');
  const spaceDiv = document.querySelector('.space');

  let isScrolling = false;
  let hasReachedLimit = false;


  // Canvas setup
  function resizeCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = spaceDiv.offsetHeight;
    starCanvas.style.position = 'absolute';
    starCanvas.style.top = '0';
    starCanvas.style.left = '0';
    starCanvas.style.zIndex = '1';
  }
  resizeCanvas();

  const stars = [];
  const numStars = 200; // Adjust for subtlety

  function createStar() {
    return {
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      size: Math.random() * 1.5 + 0.5, // Smaller star size
      speedX: Math.random() * 0.5 - 0.25, // Irregular horizontal speed
      speedY: Math.random() * 0.5 - 0.25 // Irregular vertical speed
    };
  }

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < numStars; i++) {
      stars.push(createStar());
    }
  }

  function drawStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    starCtx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // Slightly increased opacity
    stars.forEach(star => {
      starCtx.beginPath();
      starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      starCtx.fill();
    });
  }

  function updateStars() {
    stars.forEach(star => {
      star.x += star.speedX;
      star.y += star.speedY;

      // Wrap around horizontally
      if (star.x > starCanvas.width) star.x = 0;
      if (star.x < 0) star.x = starCanvas.width;

      // Wrap around vertically
      if (star.y > starCanvas.height) star.y = 0;
      if (star.y < 0) star.y = starCanvas.height;
    });
  }

  function animateStars() {
    updateStars();
    drawStars();
    requestAnimationFrame(animateStars);
  }

  initStars();
  animateStars();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initStars();
  });

  function adjustTopPosition() {
    const windowWidth = window.innerWidth;
    let topPosition = '10%'; // Default value for larger screens

    // Adjust for smaller screens
    if (windowWidth <= 400) {
      topPosition = '23%';
    } else if (windowWidth <= 800) {
      topPosition = '20%';
    } else if (windowWidth <= 1060) {
      topPosition = '10%';
    }

    // Apply the adjusted top position
    astronaut.style.top = topPosition;
  }

  // Initial adjustment on page load
  setTimeout(function() {
    adjustTopPosition();
  }, 0);

  // Re-adjust on window resize
  window.addEventListener('resize', adjustTopPosition);

  // Start moveUpDown animation after reaching initial top position
  astronaut.addEventListener('transitionend', function() {
    astronaut.style.animation = 'moveUpDown 1.5s ease-in-out infinite';
  }, { once: true });

  // Function to handle scroll event

  function handleScroll() {
    if (!isScrolling) {
      // Pause moveUpDown animation for astronaut
      astronaut.style.animationPlayState = 'paused';

      // Play scrollDownAnimation for a limited time
      astronaut.style.animation = 'scrollDownAnimation 1s ease-in-out';

      // Set a timeout to resume moveUpDown animation after scrollDownAnimation ends
      setTimeout(function() {
        astronaut.style.animation = 'moveUpDown 1.5s ease-in-out infinite';
        astronaut.style.animationPlayState = 'running';
        isScrolling = false;
      }, 1000); // Adjust time as needed

      isScrolling = true;
    }

    // Calculate scroll amount
    const scrollAmount = window.scrollY;

    // Calculate rocket's position and rotation based on scroll amount
    const bottomPosition = scrollAmount + 5; // Adjust for starting position
    const leftPosition = (window.innerWidth - 100) * (scrollAmount / (document.body.clientHeight - window.innerHeight)); // Adjust for speed and direction

    // Apply position and rotation to rocket
    rocket.style.bottom = `${bottomPosition}px`;
    rocket.style.left = `${leftPosition}px`;
  }

  // Event listener for scroll
  window.addEventListener('scroll', handleScroll);

// -----------------------------
  // Event listener for card click
  const card = document.getElementById('birthdayCard');
  card.addEventListener('click', function() {
    card.classList.toggle('hover');
  });

  // Additional interactivity for the moon
  moon.addEventListener('click', function() {
    this.style.transform = 'scale(1.1)'; // Slightly increase size
    setTimeout(() => {
      this.style.transform = 'scale(1)'; // Return to normal size
    }, 300);
  });
});

const spawnButton = document.getElementById("spawnDuckBtn");
const spawnFiveButton = document.getElementById("spawnFiveBtn");
const spawnTenButton = document.getElementById("spawnTenBtn");
const spawnTwentyFiveButton = document.getElementById("spawnTwentyFiveBtn");
const spawnFiftyButton = document.getElementById("spawnFiftyBtn");
const spawnHundredButton = document.getElementById("spawnHundredBtn");
const playground = document.getElementById("playground");

const balls = [];
const baseSpeed = 8;
const speedRange = 3;
const maxSpeed = 16;

function createDuck() {
  const ball = document.createElement("div");
  ball.className = "duck";
  ball.draggable = false;

  const size = 20 + Math.random() * 16;
  const hue = Math.random() * 360;
  ball.style.width = `${size}px`;
  ball.style.height = `${size}px`;
  ball.style.borderRadius = "50%";
  ball.style.background = `radial-gradient(circle at 30% 30%, #ffffff 0%, hsl(${hue} 90% 75%) 30%, hsl(${hue} 85% 55%) 60%, hsl(${hue} 80% 35%) 100%)`;
  ball.style.boxShadow = "inset -8px -8px 16px rgba(0,0,0,0.25), inset 8px 8px 16px rgba(255,255,255,0.6), 0 6px 14px rgba(0,0,0,0.16)";
  ball.style.left = "0px";
  ball.style.top = "0px";
  playground.appendChild(ball);

  const ballData = {
    element: ball,
    x: Math.random() * Math.max(0, playground.clientWidth - size - 20),
    y: Math.random() * Math.max(0, playground.clientHeight - size - 20),
    vx: (Math.random() > 0.5 ? 1 : -1) * (baseSpeed + Math.random() * speedRange),
    vy: (Math.random() > 0.5 ? 1 : -1) * (baseSpeed + Math.random() * speedRange),
    size,
    radius: size / 2
  };

  balls.push(ballData);
  animateBall(ballData);
}

function animateBall(ball) {
  const loop = () => {
    const maxX = Math.max(0, playground.clientWidth - ball.size - 20);
    const maxY = Math.max(0, playground.clientHeight - ball.size - 20);

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x <= 0 || ball.x >= maxX) {
      ball.vx *= -1;
      ball.x = Math.max(0, Math.min(maxX, ball.x));
    }

    if (ball.y <= 0 || ball.y >= maxY) {
      ball.vy *= -1;
      ball.y = Math.max(0, Math.min(maxY, ball.y));
    }

    for (const other of balls) {
      if (other === ball) continue;

      const dx = other.x - ball.x;
      const dy = other.y - ball.y;
      const distance = Math.hypot(dx, dy) || 0.0001;
      const minDistance = ball.radius + other.radius;

      if (distance < minDistance) {
        const overlap = minDistance - distance;
        const nx = dx / distance;
        const ny = dy / distance;

        const push = overlap * 0.8;
        ball.x -= nx * push;
        ball.y -= ny * push;
        other.x += nx * push;
        other.y += ny * push;

        const relativeVelocityX = other.vx - ball.vx;
        const relativeVelocityY = other.vy - ball.vy;
        const velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny;

        if (velocityAlongNormal < 0) {
          const restitution = 1.03;
          const friction = 0.02;
          const impulse = -(1 + restitution) * velocityAlongNormal / 2;
          const tangentX = -ny;
          const tangentY = nx;
          const tangentVelocity = relativeVelocityX * tangentX + relativeVelocityY * tangentY;

          ball.vx -= impulse * nx + friction * tangentVelocity * tangentX;
          ball.vy -= impulse * ny + friction * tangentVelocity * tangentY;
          other.vx += impulse * nx - friction * tangentVelocity * tangentX;
          other.vy += impulse * ny - friction * tangentVelocity * tangentY;
        }
      }
    }

    const speed = Math.hypot(ball.vx, ball.vy);
    if (speed > maxSpeed) {
      ball.vx = (ball.vx / speed) * maxSpeed;
      ball.vy = (ball.vy / speed) * maxSpeed;
    }

    ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px)`;

    if (ball.element.isConnected) {
      requestAnimationFrame(loop);
    }
  };

  requestAnimationFrame(loop);
}

function spawnMany(count) {
  for (let i = 0; i < count; i += 1) {
    createDuck();
  }
}

if (spawnButton && playground) {
  spawnButton.addEventListener("click", () => createDuck());
}

if (spawnFiveButton) {
  spawnFiveButton.addEventListener("click", () => spawnMany(5));
}

if (spawnTenButton) {
  spawnTenButton.addEventListener("click", () => spawnMany(10));
}

if (spawnTwentyFiveButton) {
  spawnTwentyFiveButton.addEventListener("click", () => spawnMany(25));
}

if (spawnFiftyButton) {
  spawnFiftyButton.addEventListener("click", () => spawnMany(50));
}

if (spawnHundredButton) {
  spawnHundredButton.addEventListener("click", () => spawnMany(100));
}

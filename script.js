// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Define some constants
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;
const FPS = 60;

// Define the paddles and ball
let paddle1 = {
  x: 10,
  y: canvas.height / 2 - PADDLE_HEIGHT / 2,
  speed: 0
};

let paddle2 = {
  x: canvas.width - 20,
  y: canvas.height / 2 - PADDLE_HEIGHT / 2,
  speed: 0
};

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: 2,
  vy: 2,
  speed: 2
};

// Define the AI
function ai() {
    
  // Move the AI paddle towards the ball
  if (ball.y < paddle2.y + PADDLE_HEIGHT / 2) {
    paddle2.speed = -2;
  } else if (ball.y > paddle2.y + PADDLE_HEIGHT / 2) {
    paddle2.speed = 2;
  } else {
    paddle2.speed = 0;
  }
}

// Main game loop
function update() {
  // Update the paddles
  paddle1.y += paddle1.speed;
  paddle2.y += paddle2.speed;

  // Update the ball
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Collision detection
  if (ball.x <= 0) {
    // Ball hit the left wall, reset the game
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = -ball.vx;
  } else if (ball.x + BALL_SIZE >= canvas.width) {
    // Ball hit the right wall, reset the game
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = -ball.vx;
  }

  if (ball.y <= 0 || ball.y + BALL_SIZE >= canvas.height) {
    // Ball hit the top or bottom wall, bounce
    ball.vy = -ball.vy;
  }

  // Check for collisions with the paddles
  if (ball.x <= paddle1.x + PADDLE_WIDTH && ball.y >= paddle1.y && ball.y <= paddle1.y + PADDLE_HEIGHT) {
    // Ball hit the left paddle, bounce
    ball.vx = -ball.vx;
  } else if (ball.x + BALL_SIZE >= paddle2.x && ball.y >= paddle2.y && ball.y <= paddle2.y + PADDLE_HEIGHT) {
    // Ball hit the right paddle, bounce
    ball.vx = -ball.vx;
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the paddles and ball
  ctx.fillStyle = 'red';
  ctx.fillRect(paddle1.x, paddle1.y, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(paddle2.x, paddle2.y, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE);

  // Update the AI
  ai();

  // Request the next frame
  requestAnimationFrame(update);
}

// Add event listeners for paddle movement
document.addEventListener('keydown', (e) => {
  if (e.key === 'w') {
    paddle1.speed = -4;
  } else if (e.key === 's') {
    paddle1.speed = 4;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'w' || e.key === 's') {
    paddle1.speed = 0;
  }
});

// Start the game loop
update();
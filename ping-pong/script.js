import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));

const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

let lastFrame;
function update(time) {
  if (lastFrame !== null) {
    let diff = time - lastFrame; //time different between the last and current frame change

    ball.update(diff, [playerPaddle.rect(), computerPaddle.rect()]);

    //  Adjust computer paddle according to ball position
    computerPaddle.update(diff, ball.y);

    //  get the hue variable value declared in the root of CSS
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    //  update the hue value to make the background keep changing on each frame change
    document.documentElement.style.setProperty("--hue", hue + 5 * 0.01);

    if (isLose()) {
      handleLose();
    }
  }
  lastFrame = time;

  window.requestAnimationFrame(update); // again catch the timestamp when the frame changes
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left < 0; // check if any user has lost
}

function handleLose() {
  const rect = ball.rect();

  if (rect.right >= window.innerWidth) {
    //  player lost condition
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else {
    //  computer lost condition
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  }

  ball.reset(); //set ball position to center
  computerPaddle.reset(); //set paddle position to center
}

//invoked when mouse moves on the screen.(Must be on the sceen of the browser)
document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update); //catch the timestamp when the frame changes

const INITIAL_VELOCITY = 0.0325;

export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.reset();
  }

  // get x postion on the plain (the variable declared in the CSS)
  get x() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--x")
    );
  }

  // set x postion on the plain (the variable declared in the CSS)
  set x(value) {
    this.ballElement.style.setProperty("--x", value);
  }

  // get y postion on the plain (the variable declared in the CSS)
  get y() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--y")
    );
  }

  // set y postion on the plain (the variable declared in the CSS)
  set y(value) {
    this.ballElement.style.setProperty("--y", value);
  }

  // generate any random number
  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  reset() {
    this.x = 50; // set x position on the screen
    this.y = 50; // set y postion on the screen

    // bogus value
    this.direction = { x: 0 };

    while (true) {
      const heading = this.randomNumber(0, 2 * Math.PI); // select the angle of the movement

      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }; // set vector position of the ball on the plain using the angle

      // convert the negative number into positive number and restrict the angle of movement
      if (Math.abs(this.direction.x) > 0.2 && Math.abs(this.direction.x) < 0.9)
        break;
    }

    this.velocity = INITIAL_VELOCITY; // set velocity of the ball movement
  }

  // All of the details of the element and the area it is covering on the screen
  rect() {
    return this.ballElement.getBoundingClientRect();
  }

  // Update ball position on the screen
  update(diff, paddleRects) {
    const rect = this.rect();

    //revert the direction of the ball
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    //detect collision with the paddle and revert the direction of ball to not end the game
    if (paddleRects.some((r) => this.checkCollision(r, rect))) {
      this.direction.x *= -1;
    }

    if (diff) {
      this.velocity += 0.00005; // Increase speed of the ball

      this.x += this.direction.x * this.velocity * diff; // set new coordonates of the ball in x axis
      this.y += this.direction.y * this.velocity * diff; // set new coordonates of the ball in x axis
    }
  }

  checkCollision(paddle, ball) {
    // check if the surface of the ball is being touched by the paddle or not
    return (
      paddle.left <= ball.right &&
      paddle.right >= ball.left &&
      paddle.top <= ball.bottom &&
      paddle.bottom >= ball.top
    );
  }
}

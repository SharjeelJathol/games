const SPEED = 0.02; // used to update the computer paddle position so that it moves slowly towads the ball position

export default class Paddle {
  constructor(paddle) {
    this.paddleElement = paddle;
    this.reset();
  }

  // get paddle postion on the plain (the variable declared in the CSS)
  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElement).getPropertyValue("--position")
    );
  }

  // set paddle postion on the plain (the variable declared in the CSS)
  set position(value) {
    this.paddleElement.style.setProperty("--position", value);
  }

  // Update paddle position on the screen using the ball y position
  // Ths will be used by the computer paddle
  update(diff, ballPosition) {
    if (diff) {
      this.position += SPEED * diff * (ballPosition - this.position);
    }
  }

  // All of the details of the element and the area it is covering on the screen
  rect() {
    return this.paddleElement.getBoundingClientRect();
  }

  // Set the position on the y plain of the paddle because it move in only one direction
  reset() {
    this.position = 50;
  }
}

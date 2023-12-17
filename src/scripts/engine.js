const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
	lives: 5,
    curretTime: 30,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function resetCountDown() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);
}

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! \n\n Tempos esgotado! \n\n O seu resultado foi: " + state.values.result+ " pontos.");
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
	state.view.squares.forEach((square) => {
		square.addEventListener("mousedown", () => {
			if (square.id === state.values.hitPosition) {
				state.values.hitPosition = null;
				state.values.result++;
				state.view.score.textContent = state.values.result;
				playSound("hit", 0.2);
				square.classList.remove("enemy");
			} else {
				playSound("miss", 0.5);
				state.values.lives--;
				state.view.lives.textContent = state.values.lives;
				if (state.values.lives <= 0) {
					alert("Game Over! \n\n Acabou suas vidas \n\n O seu resultado foi: " + state.values.result + " pontos.");
					resetCountDown();
				}	
			}
			
		})
	});
}

function initialize() {
	state.view.score.textContent = state.values.result;
	state.view.lives.textContent = state.values.lives;
	state.view.timeLeft.textContent = state.values.currentTime;

  addListenerHitBox();
}

initialize();

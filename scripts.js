// TODO: Implement objects for each characters instead of loose variables; This game is going to be so much more cleaner if each character is it's own object with internal attributes and methods, but for now we're going with a little more functional approach, with functions that serve both players.
// TODO: win by convincing enemy to give up;
// TODO: Revise the element styles layout;
// TODO: Add option for player to choose starting stat numbers;
// TODO: Make the die appear ingame during rollings;
// TODO: Add messages accordinly to the context;
// TODO: Add blocking animation;

const btnAttack = document.querySelector("#btnAttack");
const btnCure = document.querySelector("#btnCure");
const btnBlock = document.querySelector("#btnBlock");
const btnStart = document.querySelector(".btn-primary");
let activePlayer = 1;
let diceRoll = () => Math.trunc(Math.random() * 6) + 1;
let attackValue = 0;
let blockValue = 0;
let cureValue = 0;
let lifeValue = 0;
let player1Life = document.querySelector("#player-1-life");
let player1Attack = document.querySelector("#player-1-attack");
let player1Block = document.querySelector("#player-1-block");
let player1Cures = document.querySelector("#player-1-cures");
let player2Life = document.querySelector("#player-2-life");
let player2Attack = document.querySelector("#player-2-attack");
let player2Block = document.querySelector("#player-2-block");
let player2Cures = document.querySelector("#player-2-cures");
let actionButtons = document.querySelector("#button-section");
let endScreenImage = document.querySelector(`#end-screen-image`);
let endScreenText = document.querySelector(`#end-screen-text`);
const btnRestart = document.querySelector(`#restart-button`);

let animationCache;
let player1blocking = false;
let player2blocking = false;

let player1Sprite = document.querySelector(`#player-1`);
let player2Sprite = document.querySelector(`#player-2`);

player1Life.textContent = 30;
let player1LifeTemp = 30;
player2Life.textContent = 30;
let player2LifeTemp = 30;
player1Cures.textContent = 1;
let player1CuresTemp = 1;
player2Cures.textContent = 1;
let player2CuresTemp = 1;
player1Attack.textContent = diceRoll();
let player1AttackTemp = player1Attack.textContent;
player1Block.textContent = diceRoll();
let player1BlockTemp = player1Block.textContent;
player2Attack.textContent = diceRoll();
let player2AttackTemp = player2Attack.textContent;
player2Block.textContent = diceRoll();
let player2BlockTemp = player2Block.textContent;

let cureRestoreChance = 0;

// actionButtons.classList.add(`hidden`);

btnCure.addEventListener("click", function () {
	if (player1CuresTemp > 0) {
		playerCure();
	} else {
		alert(`You don't have cures left!`);
	}
});

btnAttack.addEventListener("click", playerAttack);
btnBlock.addEventListener("click", playerBlock);
btnStart.addEventListener("click", function () {
	toggleActionButtons();
	document.querySelector(".overlay-screen").classList.add("hidden");
	document.querySelector(".overlay").classList.add("hidden");
	battleTurn();
	console.log("STARTED GAME! - THE LEATHER IS GONNA EAT!");
});

btnRestart.addEventListener(`click`, function () {
	location.reload();
});

function toggleActionButtons() {
	document.querySelector(".game-element-buttons").classList.toggle("hidden");
	// console.log(`toggle`);
}

//por alguma razão o toggle hidden não funciona com a div aninhada dentro da section game-element-buttons, só com a div mãe section referida. talvez algum conflito com os estilos pré-definidos do bootsrap nesses elementos.

//---------------------------------BATTLE--------------------------------//

function changeActivePlayer() {
	setTimeout(function () {
		activePlayer = activePlayer === 1 ? 2 : 1;
		battleTurn();
		cureRestoreChance = diceRoll() + diceRoll();

		if (cureRestoreChance > 10) {
			if (activePlayer === 1) {
				player1CuresTemp++;
				player1Cures.textContent = player1CuresTemp;
				console.log(`Good! You restored one cure point!`);
			} else {
				player2CuresTemp++;
				player2Cures.textContent = player2CuresTemp;
				console.log(`Oh shit! The skelly's restored one cure point!`);
			}
		}
	}, 300);
}

function battleTurn() {
	didAnyoneLoseYet();
	if (activePlayer === 1) {
		playerTurn();
		toggleActionButtons();
		console.log(`It's player ${activePlayer}'s turn`);
	} else {
		enemyTurn();
		toggleActionButtons();
		console.log(`It's player ${activePlayer}'s turn, caveirinha is thinking`);
	}
}

function didAnyoneLoseYet() {
	if (player1LifeTemp <= 0) {
		endScreenImage.src = `images/skullwon.png`;
		endScreenText.textContent = `Unfortunately, Caveirinha has managed to subdue you and submit his resumee to your boss and WAS HIRED AS A JUNIOR DEVELOPER!
		Now, somehow he managed to convince your boss to CHANGE ALL THE SYSTEM TO DELPHI! Oh The horror! Do you want to try again?`;
		document.querySelector("#end-screen").classList.remove("hidden");
		document.querySelector(".overlay").classList.remove("hidden");
	} else if (player2LifeTemp <= 0) {
		endScreenImage.src = `images/skulllost.png`;
		endScreenText.textContent = `You broke the entire Caveirinha! Congratulations! What he was thinking trying to mess with the code? Screw him! What? Are you with feather?! Take to your home, put it to sleep in your bed! Skull good is skull dead! Hey, why don't you try again to break even more os his bones? Maybe we can crush his soul this time!`;
		document.querySelector("#end-screen").classList.remove("hidden");
		document.querySelector(".overlay").classList.remove("hidden");
	}
}

/////////////////////////////////////////////////////////////////// TURNS BEHAVIOR

function playerTurn() {
	//does nothing lol
}

function enemyTurn() {
	setTimeout(
		function () {
			console.log(`Player ${activePlayer} acted!`);
			if (player2CuresTemp > 0 && player2LifeTemp <= 20 && diceRoll() <= 3) {
				playerCure();
			} else if (
				(player1blocking === true && diceRoll() <= 4) ||
				(player2CuresTemp === 0 && diceRoll() <= 3)
			) {
				playerBlock();
			} else {
				playerAttack();
			}
		},

		diceRoll() * 1000
	);
}

/////////////////////////////////////////////////////////////////// CURE ACTION

function playerCure() {
	cureValue = diceRoll();
	console.log(
		`Player ${activePlayer} cured himself of ${cureValue} Life points!`
	);
	cureValue += activePlayer === 1 ? player1LifeTemp : player2LifeTemp;

	cureValue > 30 ? (cureValue = 30) : cureValue;

	if (activePlayer === 1) {
		player1LifeTemp = cureValue;
		player1CuresTemp--;
	} else {
		player2LifeTemp = cureValue;
		player2CuresTemp--;
	}

	document.querySelector(`#player-${activePlayer}-life`).textContent =
		cureValue;
	document.querySelector(`#player-${activePlayer}-cures`).textContent =
		activePlayer === 1 ? player1CuresTemp : player2CuresTemp;

	setTimeout(changeActivePlayer, 300);
}

/////////////////////////////////////////////////////////////////// BLOCKING ACTION
function playerBlock() {
	blockValue = 0;
	console.log(`Player ${activePlayer} blocked for the next turn!`);
	blockValue += diceRoll();

	activePlayer === 1 ? (player1blocking = true) : (player2blocking = true);
	setTimeout(changeActivePlayer, 300);
}

/////////////////////////////////////////////////////////////////// ATTACKING ACTION
function playerAttack() {
	attackAnimation();
	attackValue = diceRoll();

	attackValue +=
		activePlayer === 1
			? player1AttackTemp - player2BlockTemp
			: player2AttackTemp - player1BlockTemp;

	if (attackValue < 0) {
		console.log(`the attack was lower than the base blocking!`);
		return changeActivePlayer();
	}

	console.log(`Player ${activePlayer} swinged for ${attackValue} damage!`);

	if (
		activePlayer === 1 ? player1blocking === true : player2blocking === true
	) {
		attackValue - blockValue;
		console.log(`the defense had extra ${blockValue} points!`);
		activePlayer === 1 ? (player1blocking = false) : (player2blocking = false);
		if (attackValue < blockValue) {
			console.log(`the attack was lower than the total blocking!`);
			return changeActivePlayer();
		}
	}

	if (diceRoll() < 3) {
		console.log(`MISSED the Attack!`);
		missedAnimation();
	} else {
		console.log(
			`Player ${activePlayer === 1 ? `2` : `1`} suffered ${attackValue} damage`
		);

		if (activePlayer === 1) {
			player2LifeTemp = player2LifeTemp - attackValue;
			document.querySelector(`#player-2-life`).textContent = player2LifeTemp;
		} else {
			player1LifeTemp = player1LifeTemp - attackValue;
			document.querySelector(`#player-1-life`).textContent = player1LifeTemp;
		}
	}
	setTimeout(changeActivePlayer, 300);
}

/////////////////////////////////////////////////////////////////// ANIMATION

function attackAnimation() {
	console.log(`Player ${activePlayer} attacked!`);
	animationCache = document.querySelector(`#player-${activePlayer}`);
	animationCache.src = `images/player-${activePlayer}--attack1.png`;
	setTimeout(() => {
		animationCache.src = `images/player-${activePlayer}--attack2.png`;
	}, 50);
	setTimeout(() => {
		animationCache.src = `images/player-${activePlayer}--attack3.png`;
	}, 100);
	setTimeout(() => {
		animationCache.src = `images/player-${activePlayer}--idle.png`;
	}, 200);
}

function missedAnimation() {
	document.querySelector(`#missed-box`).classList.remove(`hidden`);
	setTimeout(() => {
		document.querySelector(`#missed-box`).classList.add(`hidden`);
	}, 1000);
}

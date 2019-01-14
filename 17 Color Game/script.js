var numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setModeButtons();
	setSquareListeners();
	reset();
}

function setModeButtons() {
	for (var i=0; i<modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
			reset();
		});
	}
}

function setSquareListeners() {
	for (var i = 0; i < squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener("click", function() {
			//compare color to pickedColor
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = pickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		})
	}
}

function reset() {
	colors = generateRandomColors(numOfSquares);
	//pick a new random color
	pickedColor = pickColor();
	//change pick color text in header
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Color";
	messageDisplay.textContent = "";
	//change color of squares
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none"
		}
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
	reset();
});

function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var arr = []
	//add num random colors to array num times
	for (var i = 0; i < num; i++) {
		//create random color and add to array
		arr.push(randomColor());
	}
	//return array
	return arr;
}

function randomColor() {
	var red = Math.floor(Math.random()*256);
	var blue = Math.floor(Math.random()*256);
	var green = Math.floor(Math.random()*256);
	return "rgb(" + red + ", " + green + ", " + blue + ")"; 
}
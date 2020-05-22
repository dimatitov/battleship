

var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}

}; 


var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  
  ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],

  fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
        view.displayMessage("Якорь вам в глотку!!! Попал!!!");

        if (this.isSunk(ship)) {
          view.displayMessage("Три тысячи чертей на румбу!!! Палубные крысы разбегаются по шлюпкам!!! Корабль тонет!!!")
          this.shipsSunk++;
				}
				return true;
			}
		}
    view.displayMiss(guess);
    view.displayMessage("Чтоб проклятый осьминог выпил весь ром в твоих кишках!!! Всю жизнь будешь палубу драить!!! Мимо!")
    return false;
  },
  
  isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},

	generateShipLocations: function() { 
		var locations;

		for (var i = 0; i < this.numShips; i++) { 
			do {
				locations = this.generateShip(); 
			} while (this.collision(locations)); 
			this.ships[i].locations = locations;
		} 
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2); 
		var row, col;

		if (direction === 1) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		} else {
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength)); 
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			} 
		}
		return newShipLocations; 
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];

			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) { 
					return true;
				} 
			}
		}
		return false; 
	}
}


// model.fire("53"); // miss

// model.fire("06"); // hit
// model.fire("16"); // hit
// model.fire("26"); // hit

// model.fire("34"); // hit
// model.fire("24"); // hit
// model.fire("44"); // hit

// model.fire("12"); // hit
// model.fire("11"); // hit
// model.fire("10"); // hit

var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
        // view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
        view.displayMessage("Девятый вал валит наповал. Все корабли отправились кормить рыб! Победа!!! Колличество выстрелов " + this.guesses);
      }
    }
  }
}

function parseGuess(guess) {
  var alphabet = ["a", "b", "c", "d", "e", "f", "g"];

  if (guess === null || guess.length !== 2) {
    alert("Или ноль или больше двух");
  } else {
		var row = alphabet.indexOf(guess.charAt(0));
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
      alert("Палундра!!! С числами косяк");
    } else if (row < 0 || row >= model.boardSize ||
      column < 0 || column >= model.boardSize) {
      alert("Нет таких значений");
    } else {
			return row + column;
		}
	}
	return null;
}


function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput"); 
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}

function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton"); 
  if (e.keyCode === 13) {
    fireButton.click();
    return false; 
  }
}

function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);

  guessInput.value = "";
}

window.onload = init;

// controller.processGuess("a0"); // miss

// controller.processGuess("a6"); // hit
// controller.processGuess("b6"); // hit
// controller.processGuess("c6"); // hit

// controller.processGuess("c4"); // hit
// controller.processGuess("d4"); // hit
// controller.processGuess("e4"); // hit

// controller.processGuess("b0"); // hit
// controller.processGuess("b1"); // hit
// controller.processGuess("b2"); // hit















const gameContainer = document.getElementById('game');

const COLORS = [
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'grey',
	'grey'
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle (array){
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors (colorArray){
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
let firstCard;
let timeOut;
function handleCardClick (event){
	if (timeOut) {
		return;
	}
	//is this card already face up, if yes then do nothing
	if (event.target.style.backgroundColor === event.target.classList[0]) {
		return;
	}
	//if this is the first click, flip the card
	if (!firstCard) {
		event.target.style.backgroundColor = event.target.classList[0];
		firstCard = event.target;
	}
	else if (firstCard) {
		//if this is the second click, flip the second card and
		event.target.style.backgroundColor = event.target.classList[0];
		//if the two cards match, keep them both up
		if (event.target.style.backgroundColor === firstCard.style.backgroundColor && event.target !== firstCard) {
			firstCard = undefined;
			return;
		}
		else if (event.target.style.backgroundColor !== firstCard.style.backgroundColor) {
			timeOut = setTimeout(function (){
				firstCard.style.backgroundColor = '';
				event.target.style.backgroundColor = '';
				timeOut = undefined;
				firstCard = undefined;
			}, 1000);
		}
	}

	//if they don't match, keep them for one second and put them back
}

// when the DOM loads
createDivsForColors(shuffledColors);

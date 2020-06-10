// Cupcakes JS
const $cupcakeList = $('.cupcake-list');
const $cupcakeForm = $('.cupcake-form');
const BASE_URL = '/api/cupcakes';

$('window').on('load', displayCupcakes());

// Write Javascript (using axios and jQuery) that:

// # handles form submission to both let the API know about the new cupcake and updates the list on the page to show it

async function displayCupcakes() {
	response = await axios.get(BASE_URL);
	cupcakes = response.data.cupcakes;
	for (cupcake of cupcakes) {
		$cupcakeList.append(makeLI(cupcake));
	}
}

const makeLI = (cupcake) => {
	const $newLi = $('<li>');
	$newLi.text(titleCase(cupcake.flavor));
	$newLi.addClass('my-3');
	$newLi.data('id', cupcake.flavor);

	$seeMore = $('<button class="btn btn-sm text-info">See More</button>');
	$newLi.append($seeMore);
	return $newLi;
};

// Returns string in Title Case
function titleCase(str) {
	return str
		.toLowerCase()
		.split(' ')
		.map(function(word) {
			return word.replace(word[0], word[0].toUpperCase());
		})
		.join(' ');
}

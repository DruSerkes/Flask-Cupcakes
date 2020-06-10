// Cupcakes JS
const $cupcakeList = $('.cupcake-list');
const $cupcakeForm = $('.cupcake-form');
const BASE_URL = '/api/cupcakes';

// Display cupcakes on page load
$('window').on('load', displayCupcakes());

// Form submit creates a new cupcake
$cupcakeForm.on('submit', makeCupcake);

// GET Request to Cupcake API - displays all cupcakes on DOM
async function displayCupcakes() {
	response = await axios.get(BASE_URL);
	cupcakes = response.data.cupcakes;
	for (cupcake of cupcakes) {
		$cupcakeList.append(makeLI(cupcake));
	}
}
// POST Request to Cupcake API - adds new cupcake to DOM
async function makeCupcake() {
	// Get values
	const flavor = $('#flavor').val();
	const size = $('#size').val();
	const rating = $('#rating').val();
	const image = $('#image').val() ? null : $('#image').val;
	// API POST Request
	if (image !== null) {
		const response = await axios.post(BASE_URL, { flavor, size, rating, image });
	} else {
		const response = await axios.post(BASE_URL, { flavor, size, rating });
	}
	// Append new cupcake to DOM
	cupcake = response.data.cupcake;
	$cupcakeList.prepend(makeLI(cupcake));
}

// Creates a new LI for a cupcake
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

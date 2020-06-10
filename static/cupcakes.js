// Cupcakes JS
const $cupcakeContainer = $('.cupcake-container');
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
		$cupcakeContainer.append(makeDiv(cupcake));
	}
}
// POST Request to Cupcake API - adds new cupcake to DOM
async function makeCupcake() {
	// Get values
	const flavor = $('#flavor').val();
	const size = $('#size').val();
	const rating = $('#rating').val();
	const image = $('#image').val() ? $('#image').val() : null;
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
const makeDiv = (cupcake) => {
	const $newDiv = $('<div>');
	$newDiv.data('id', cupcake.id);
	$newDiv.addClass('list-group-item justify-content-center text-center');
	addCupcakeInfo($newDiv);
	return $newDiv;
};

function addCupcakeInfo(li) {
	$newh2 = $(`<h2 class='text-primary'>${titleCase(cupcake.flavor)}</h2>`);
	$newImg = $(`<img src=${cupcake.image} class="img img-thumbnail" />`);
	$newRating = $(`<p class='text-info'>Rating: ${cupcake.rating}</p>`);
	$newSize = $(`<p class='text-info'>Size: ${cupcake.size}</p>`);
	li.append($newh2);
	li.append($newImg);
	li.append($newRating);
	li.append($newSize);
}

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

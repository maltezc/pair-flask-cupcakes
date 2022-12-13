"use strict";

let $cupcakesList = $('#cupcakes_list');
let $submitButton = $('#submit_cupcake');

let $flavor = $('#flavor');
let $size = $('#size');
let $rating = $('#rating');
let $image = $('#image');


/** runs on startup */
async function start() {
  console.debug("START");
  const cupcakes = await getCupcakes();
  putCupcakesOnPage(cupcakes);
}

/** Retieves all cupcakes from api */
async function getCupcakes(){
  const response = await axios({
    url : `/api/cupcakes`,
    method : "GET",
  })

  const cupcakes = response.data.cupcakes;
  return cupcakes;
}

/** Appends all retreived cupcakes to cupcakes list in dom */
function putCupcakesOnPage(cupcakes) {
  $cupcakesList.empty();
  for (let cupcake of cupcakes) {
    const $cupcake = generateCupcake(cupcake);
    console.log($cupcake)
    $cupcakesList.prepend($cupcake);
  }
}

/** Generates li for retrieved cupcake  */
function generateCupcake(cupcake) {
  return $(`
      <li>
        <img src="${cupcake.image}">
        <p>Flavor: ${cupcake.flavor}</p>
        <p>Size: ${cupcake.size}</p>
        <p>Rating: ${cupcake.rating}</p>
      </li>
    `);
}

/** Adds cupcake to dom and list */
async function addCupcake(){
  const response = await axios({
    url : `/api/cupcakes`,
    method : "POST",
    data: {
      "flavor": $flavor.val(),
      "size": $size.val(),
      "rating": $rating.val(),
      "image": $image.val()
    }
  })
  const cupcake = response.data.cupcake;
  const newCupcake = generateCupcake(cupcake)
  $cupcakesList.prepend(newCupcake)
}

// click listener
$submitButton.on("click", addCupcake)

$(start);

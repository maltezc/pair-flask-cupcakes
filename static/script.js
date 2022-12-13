"use strict";

let $cupcakesList = $('#cupcakes_list');

// let $flavor = $('#flavor');
// let $size = $('#size');
// let $rating = $('#rating');
// let $image = $('#image');


async function start() {
  console.debug("START");
  const response = await axios({
    url : `/api/cupcakes`,
    method : "GET",
  })
  const cupcakes = response.data.cupcakes;
  putCupcakesOnPage(cupcakes);
}

function putCupcakesOnPage(cupcakes) {
  $cupcakesList.empty();
  for (let cupcake of cupcakes) {
    const $cupcake = generateCupcakes(cupcake);
    console.log($cupcake)
    $cupcakesList.append($cupcake);
  }
}

function generateCupcakes(cupcake) {
  return $(`
      <li>
        <img src="${cupcake.image}">
        <p>Flavor: ${cupcake.flavor}</p>
        <p>Size: ${cupcake.size}</p>
        <p>Rating: ${cupcake.rating}</p>
      </li>
    `);
}

console.warn("this is running");
$(start);

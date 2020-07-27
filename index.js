'use strict';

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getResult() {

  const userHandle = $('#js-user-handle').val();
  const url = `https://api.github.com/users/${userHandle}/repos`;
  console.log(url);

  const options = {
    headers: new Headers({
      "accept": "application/vnd.github.v3+json"})
  };

  fetch(url, options)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.message == "Not Found")  {
        $('#results-list').empty();
        $('#js-error-message').text(`Something went wrong: User Handle does not exist.`);
      } else if (responseJson.length == 0) {
        $('#results-list').empty();
        $('#js-error-message').text(`This user doesn't have any repository.`);
      } else {
        $('#js-error-message').empty();
      displayResults(responseJson)
      }
    })
  }

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getResult();
  });
}

$(watchForm);
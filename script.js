document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('select');
   var instances = M.FormSelect.init(elems, {});
 });

 
 document.querySelector(`#submit`).addEventListener('click', appControlFlow);
 
 //need to switch gif generator to await the results of the Aztro API Fetch, and plug in the mood instead of the sign directly

 function appControlFlow() {
  let aztroURL = createAztroFetchUrl();
  fetchAztroData(aztroURL);
  //  clearGifs();
  //  renderGifs();
  }

function createAztroFetchUrl() {
    let userInputSign = document.querySelector(`#sign`).value;
    let userSelectedDay = document.querySelector(`#day`).value;
    const aztroURL = `https://aztro.sameerkumar.website?sign=${userInputSign}&day=${userSelectedDay}`;
  return aztroURL;
}

function fetchAztroData(aztroURL) {
  fetch(aztroURL, {
    method: 'POST'
  })
    .then (response => response.json())
    .then (json => {
      console.log(json)
      console.log(`Your Color: ${json.color}`)
      console.log(`Your Compatibility: ${json.compatibility}`)
      console.log(`The Current Date: ${json.current_date}`)
      console.log(`Your Sign's Birthdate Range: ${json.date_range}`)
      console.log(`Your Horoscope For Selected Day: ${json.description}`)
      console.log(`Your Lucky Number: ${json.lucky_number}`)
      console.log(`Your Lucky Time For Selected Day: ${json.lucky_time}`)
      console.log(`Your Mood: ${json.mood}`)
    })
}


  //****BEGIN GENERATE GIF LOGIC****
function clearGifs() {
  let previousGifsHTMLCollection = document.querySelector('#gifs').children;
    for (let i = previousGifsHTMLCollection.length -1; i >= 0; i--) {
      previousGifsHTMLCollection[i].remove();
    }
}


async function renderGifs(){
    console.log(`renderMemes FIRED`)
    let userInputSign = captureUserInput();
    fetchGiphyAPIResults(userInputSign);
}


function captureUserInput() {
    console.log(`captureUserInput FIRED`)
    let userInputSign = document.querySelector(`#sign`).value;
    return userInputSign;
}



function fetchGiphyAPIResults(userInput) {
    let giphyAPIKey = `DZltucdua4H0cmMrv8M5wNuJ1Dlf74Ci`;
    let URLTemplate = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=${giphyAPIKey}`;
    fetch(URLTemplate)
        .then( response => response.json() )
        .then( data => {
            //actual gif entries minus irrelevant metadata
            let gifObjectArray = data.data;
        gifObjectArray.forEach(gifObjectEntry => {
              //grab relevant values from specific gif return object
              let imageOptions = gifObjectEntry.images;
              let imageURL = imageOptions.original.url;
                //create and append img El to page
                let imageEl = document.createElement(`img`);
                let gifEl = document.querySelector('#gifs');
                imageEl.setAttribute('src', imageURL);
                gifEl.appendChild(imageEl);
        }
      )
    }
  )
}
//****END GENERATING GIFS****
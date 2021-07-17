document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('select');
   var instances = M.FormSelect.init(elems, {});
 });



//****BEGIN GENERATING GIFS****
document.querySelector(`#submit`).addEventListener('click', renderGifs);
document.querySelector(`#fetch`).addEventListener('click', clearGifs);

async function renderGifs(){
    console.log(`renderMemes FIRED`)
    let userInputSign = captureUserInput();
    let giphyResults = await fetchGiphyAPIResults(userInputSign);
    
}



function captureUserInput() {
    console.log(`captureUserInput FIRED`)
    let userInputSign = document.querySelector(`#sign`).value;
    console.log(userInputSign)
    return userInputSign;
}



function fetchGiphyAPIResults(userInput) {
    let giphyAPIKey = `DZltucdua4H0cmMrv8M5wNuJ1Dlf74Ci`;
    let URLTemplate = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=${giphyAPIKey}`;
    fetch(URLTemplate)
        .then( response => response.json() )
        .then( data => {
            let gifObjectArray = data.data;
            let imageOptions = gifObjectArray[0].images;
            let imagePath = imageOptions.original.url;
            console.log(gifObjectArray);
            console.log(imageOptions);
            console.log(imagePath);

        gifObjectArray.forEach(gifObjectEntry => {
                console.log(gifObjectEntry)
              let imageOptions = gifObjectEntry.images;
                console.log(imageOptions)
              let imageURL = imageOptions.original.url;
                console.log(imageURL)

                let imageEl = document.createElement(`img`);
                    console.log(imageEl)
                let gifEl = document.querySelector('#gifs');
                    console.log(gifEl)
                imageEl.setAttribute('src', imageURL);
                gifEl.appendChild(imageEl);
        }
      )
    }
  )
}
//****END GENERATING GIFS****
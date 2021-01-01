// Get Quote From API
const quotetext = document.getElementById('quote');
const quoteauthor = document.getElementById('author');
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');
// show loading
function loading(){
    loader.hidden =false;
    quoteContainer.hidden = true;
}

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
async function getQuote(){
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        return data;
    }catch(error){
        console.log('no quote yet', error);
    }
}

async function changeQuoteDisplay(){
    var quoteData = await getQuote();

    // If quote text to long, reduce font-size
    if(quoteData['quoteText'].length > 50)
        quotetext.classList.add('long-quote');
    else
        quotetext.classList.remove('long-quote');
 
    quotetext.innerHTML = await quoteData['quoteText'];

    // If Author is blank, add 'Unknown'
    if(quoteData['quoteAuthor'] === '')
        quoteauthor.innerHTML = 'Unknown';
    else
        quoteauthor.innerHTML = await quoteData['quoteAuthor'];
    
    // Completely change quote
    complete();
}

document.getElementById('new-quote').addEventListener('click',changeQuoteDisplay);

//on Load
// Get Quote From API
const quotetext = document.getElementById('quote');
const quoteauthor = document.getElementById('author');

async function getQuote(){
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
}

document.getElementById('new-quote').addEventListener('click',changeQuoteDisplay);

//on Load

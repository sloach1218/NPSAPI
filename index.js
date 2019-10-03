const apiKey = '7T78lewxicIGLyliF5GhBAKtren1HjrkLIoblTa4';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


//handle form submit
function formSubmit(){
    $('form').submit(event => {
        event.preventDefault();
        const parks = $('#chooseState').val().toUpperCase().replace(/\s+/g, '');
        
        let maxLimit = 10;
        if ($('#chooseNumber').val() === ''){
            
        }else{
            maxLimit = $('#chooseNumber').val();
        }
        
        userParkInputs(parks, maxLimit);
      })
}

//get user inputs
function userParkInputs(query, maxLimit){
    
    const params = {
        stateCode: `${query}`,
        limit: maxLimit,
        fields: 'addresses',
        api_key: apiKey
    }
    const queryString = formatQuery(params);
    const url = searchURL + '?' + queryString;
    console.log(url);

    //fetch info
    fetch(url)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {alert(`There was an error! Something went wrong: ${err.message}`)});

};

//create query string
function formatQuery(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${params[key]}`)
    return queryItems.join('&');
}



//handle & display info
function displayResults(responseJson){
    clearCurrent();
    for (let i = 0; i < responseJson.data.length; i++){
        $('ul').append(
            `<li>
                <a href="${responseJson.data[i].url}" target="-blank">
                <h2>${responseJson.data[i].fullName}</h2></a>
                <p>${responseJson.data[i].description}</p>
                <p class="address">
                ${responseJson.data[i].addresses[0].line1}<br>
                ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</br>
                <p>Visit their website: <a href="${responseJson.data[i].url}" target="-blank">${responseJson.data[i].url}</a></p></a>
            </li>`
        )
    };
    console.log(responseJson);
};

//clear current for new search
function clearCurrent(){
    $('ul').empty();
}

$(formSubmit);
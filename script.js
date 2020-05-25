
const countriesSelectEl = document.getElementById('countries-select');
const contentEl = document.getElementById('content');
const countriesApiUrl = 'https://restcountries.eu/rest/v2/all';
let countriesList = [];

function LoadCountries(){
    $.ajax({
        url: 'https://restcountries.eu/rest/v2/all',
        success: function(rez){
            for (var i=0; i<rez.length; i++){
                countriesList = rez;
                const option = document.createElement('option');
                option.value = rez[i].alpha2Code;
                option.innerText = rez[i].name;
                countriesSelectEl.appendChild(option);
            }
        }
    })
}

LoadCountries();




countriesSelectEl.onchange = function(e){
    const countryCode = e.target.value;
    const selectedCountry = countriesList.find(c => c.alpha2Code === countryCode);
    if (selectedCountry){
        var numberFormatter = new Intl.NumberFormat();
        

        const content = `
        <img src="${selectedCountry.flag}" class="card front" />
        <div class="card back padding">
          <p><u>Capital:</u> ${selectedCountry.capital}</p>
          <p><u>Population:</u> ${numberFormatter.format(selectedCountry.population)}</p>
          <p><u>Internet domain:</u> ${selectedCountry.topLevelDomain}</p>
          <p><u>Call number:</u> +${selectedCountry.callingCodes[0]}</p>
        </div>
      `;
      contentEl.innerHTML = content;
    }
}


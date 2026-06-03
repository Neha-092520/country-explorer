const countriesContainer = document.getElementById("countries");
const loading = document.getElementById("loading");
const search = document.getElementById("search");
const regionFilter = document.getElementById("regionFilter");
let countriesData = [];

async function getCountries() {

    try {

        loading.style.display = "block";

        const response = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,flags,region,population"
        );

        if (!response.ok) {
            throw new Error("API Error: " + response.status);
        }

        const data = await response.json();

        console.log(data); // testing

        countriesData = data;

        displayCountries(data);

    } catch (error) {

        console.error(error);

        countriesContainer.innerHTML =
        `<h2>${error.message}</h2>`;

    } finally {

        loading.style.display = "none";
    }
}

function displayCountries(data){

    countriesContainer.innerHTML = "";

    data.forEach(country => {

        countriesContainer.innerHTML += `
            <div class="card">
                <img src="${country.flags.png}">
                <h3>${country.name.common}</h3>
                <p>Region: ${country.region}</p>
                <p>Population: ${country.population}</p>
            </div>
        `;
    });
}

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    const filtered = countriesData.filter(country =>
        country.name.common
        .toLowerCase()
        .includes(value)
    );

    displayCountries(filtered);
});

getCountries();
regionFilter.addEventListener("change", () => {

    const selectedRegion = regionFilter.value;

    if(selectedRegion === ""){
        displayCountries(countriesData);
        return;
    }

    const filteredCountries = countriesData.filter(country =>
        country.region === selectedRegion
    );

    displayCountries(filteredCountries);
});
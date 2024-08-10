const card_container=document.querySelector(".countries_cards");
const filterByRegion=document.querySelector(".filter_by_region")
const search=document.querySelector("#search");
let allCountries;

function countriesCard(data){
    card_container.innerHTML='';
    data.forEach(element => {
        let div=document.createElement("a");
        div.href=`./country.html?name=${element.name.common}`;
        div.classList.add("card");
        div.innerHTML=`
            <div class="card_img">
                <img src="${element.flags.svg}" alt="flag">
            </div>
            <div class="card_details">
                <h3 class="country_name">${element.name.common}</h3>
                <p><b>Population:</b> ${element.population}</p>
                <p><b>Region:</b> ${element.region}</p>
                <p><b>Capital:</b> ${element.capital?.[0]}</p>
            </div>
        `
        card_container.append(div);
    });
}

fetch("https://restcountries.com/v3.1/all")
.then((res)=>{
    return res.json();
})
.then((data)=>{
    allCountries=data;
    countriesCard(data);
})

filterByRegion.addEventListener("change",(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res)=>{
        return res.json();
    })
    .then(countriesCard);
})

search.addEventListener('input',()=>{
    const selectedCountries=allCountries.filter((country)=>{
        return country.name.common.toLowerCase().includes(search.value.toLowerCase());
    })
    countriesCard(selectedCountries);
})
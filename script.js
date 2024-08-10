const card_container=document.querySelector(".countries_cards");
const filterByRegion=document.querySelector(".filter_by_region")
const search=document.querySelector("#search");
const themeContainer=document.querySelector(".theme_container");
let allCountries;

if(localStorage.getItem("dark")=="true"){
    document.body.classList.add("dark");
    themeContainer.querySelector("h4").innerText="Light Mode";
    themeContainer.querySelector(".sun").style.display="block";
    themeContainer.querySelector(".moon").style.display="none";
}

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

themeContainer.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("dark",true);
        themeContainer.querySelector(".sun").style.display="block";
        themeContainer.querySelector(".moon").style.display="none";
        themeContainer.querySelector("h4").innerText="Light Mode"
    }else{
        localStorage.setItem("dark",false);
        themeContainer.querySelector(".sun").style.display="none";
        themeContainer.querySelector(".moon").style.display="block";
        themeContainer.querySelector("h4").innerText="Dark Mode"
    }
})
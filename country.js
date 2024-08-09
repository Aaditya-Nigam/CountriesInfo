const urlParams=new URLSearchParams(location.search)
const country_name_fetched=urlParams.get("name");
const country_container=document.querySelector(".country_container");
const back=document.querySelector(".back_button");

back.addEventListener("click",()=>{
    history.back();
})

fetch(`https://restcountries.com/v3.1/name/${country_name_fetched}?fullText=true`)
.then((res)=>{
    return res.json();
})
.then((data)=>{
    let div1=document.createElement("div");
    div1.classList.add("country_flag");
    div1.innerHTML=`<img src=${data[0].flags.svg} alt="country">`;
    country_container.append(div1);

    let div2=document.createElement("div");
    div2.classList.add("country_details");
    div2.innerHTML=`
            <h1 class="country_name">${data[0].name.common}</h1>
            <div class="country_detail">
                <div class="part1">
                    <p><b>Native Name:</b> &nbsp;${data[0].name.common}</p>
                    <p><b>Population:&nbsp;</b> ${Number(data[0].population).toLocaleString('en-IN')}</p>
                    <p><b>Region:&nbsp;</b> ${data[0].region}</p>
                    <p><b>Sub Region:&nbsp;</b> ${data[0].subregion}</p>
                    <p><b>Capital:&nbsp;</b> ${data[0].capital.join(', ')}</p>
                </div>
                <div class="part2">
                    <p><b>Top Level Domain:&nbsp;</b> ${data[0].flag}</p>
                    <p><b>Currencies:&nbsp;</b> ${Object.keys(data[0].currencies)?.[0]}</p>
                    <p><b>Language:&nbsp;</b> ${Object.values(data[0].languages).join(', ')}</p>
                </div>
            </div>
            <div class="border_countries">
                <p><b>Border Countries:  </b></p>
            </div>
    `;
    country_container.append(div2);
    const border_countries=document.querySelector(".border_countries");
    (data[0].borders).forEach(element => {
        fetch(`https://restcountries.com/v3.1/alpha/${element}`)
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            let span=document.createElement("a");
            span.innerText=data[0].name.common;
            span.href=`./country.html?name=${data[0].name.common}`
            border_countries.append(span);
            // console.log(data[0].name.common);
        })
    });
})
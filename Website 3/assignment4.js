function mySearch() 
{
  var theCountry = document.getElementById("myInput").value;
  fetch("https://api.covid19api.com/summary")
    .then((res1) => res1.json())
    .then((data1) => display(data1, theCountry));

  document.getElementById("myInput").value = "";
  document.getElementById("myResult").textContent = "";
  document.getElementById("detailed").textContent = "";
}

function display(data1, theCountry) 
{
  var outerArea = document.getElementById("myResult");
  var innerArea = document.createElement("div");

  for (var x = 0; x < data1.Countries.length; ++x) {
    if (theCountry == data1.Countries[x].Country) {
      innerArea.innerHTML = `<p class="fs-4 animate__animated animate__slideInLeft"> <span class="tConfirmed"><b>Total Confirmed:</b></span> ${data1.Countries[x].TotalConfirmed} <br><span class="tDeath"><b>Total Deaths:</b></span> ${data1.Countries[x].TotalDeaths} <br> <button onclick="myDetails('${theCountry}')" class="btn btn-outline-primary" type="button">More Details</button> </p>`;
    }
    innerArea.classList.add("theStyle");
    outerArea.appendChild(innerArea);
  }
}

function myDetails(country) 
{
  var toSpin = document.getElementById("mySpinner");
  var toWait = document.createElement("div");
  toWait.innerHTML = `<button class="btn btn-success" type="button" disabled>
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    fetching information...
  </button>`;
  toSpin.appendChild(toWait);

  fetch("https://restcountries.com/v3.1/all")
    .then((res2) => res2.json())
    .then((data2) => displayMore(data2, country));
  document.getElementById("detailed").textContent = "";
}

function displayMore(data2, country) 
{
  var outerDiv = document.getElementById("detailed");
  var innerDiv = document.createElement("div");

  for (y = 0; y < data2.length; ++y) {
    if (country == data2[y].name.common) {
      document.getElementById("mySpinner").textContent = "";
      innerDiv.innerHTML = `<div class="card bg-dark text-white animate__animated animate__zoomIn" style="width: 22rem;">
            <img src="${data2[y].flags.png}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${country}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"> <b>Continent: </b>${data2[y].region}, <i>${data2[y].subregion}</i></li>
              <li class="list-group-item"> <b>Capital: </b>${data2[y].capital[0]}</li>
              <li class="list-group-item"> <b>Population: </b>${data2[y].population}</li>
              <li class="list-group-item"> <b>FIFA Country Codes: </b>${data2[y].fifa}</li>
            </ul>
          </div>`;
    }
    outerDiv.appendChild(innerDiv);
  }
}

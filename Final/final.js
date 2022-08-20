function api () 
{
    var mealName = document.getElementById("search").value ; 
    var quantity = parseInt(document.getElementById("myQuantity").value);
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`; 

    fetch (url)
    .then(res => res.json())
    .then(data => display(data, quantity)); 
  
    document.getElementById("search").value = ""; 
    document.getElementById("myQuantity").value = ""; 
    document.getElementById("outer").textContent = "";
}

function display (data, quantity)
{
   var outerArea = document.getElementById("outer")
   for (var x=0; x<quantity; ++x)
   {
    var innerDiv = document.createElement("div");
    innerDiv.innerHTML = `
    <div class="card bg-dark text-white" style="width: 22rem;">
        <img src="${data.meals[x].strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${data.meals[x].strMeal}</h5>
        <p class="card-text">
        <h4>Cooking Instructions:</h4>
        ${data.meals[x].strInstructions}
        </p>
    </div> ` ;
    outerArea.appendChild(innerDiv);
   }
   outerArea.classList.add('inner-style')
}
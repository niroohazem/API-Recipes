/*
1- نعمل fetch 
---- 1- function (getRecipe)
---- 2- fetch( ..) روح هات البيانات من الانترنت 
---- 3- await => استني البيانات ترجع => الداتا اللي من اللينك نحولها ل object => .json()
2- نعمل dive فاضيه في html  و نمسكها ف يال js 
3- نجيب كل food و نوصلهم باللينك 


*/

// Varibal
// =================
let rowData = document.querySelector(".row");
let links = document.querySelectorAll(".nav-link");
let model = document.getElementById("model");
let exampleModalLabel = document.getElementById("exampleModalLabel");
let input1 = document.getElementById('input1')
let searchWords = document.getElementById('searchWords');
let error = document.getElementById('error')
// console.log(error);




const foods = [
  "carrot",
  "broccoli",
  "asparagus",
  "cauliflower",
  "corn",
  "cucumber",
  "green pepper",
  "lettuce",
  "mushrooms",
  "onion",
  "potato",
  "pumpkin",
  "red pepper",
  "tomato",
  "beetroot",
  "brussel sprouts",
  "peas",
  "zucchini",
  "radish",
  "sweet potato",
  "artichoke",
  "leek",
  "cabbage",
  "celery",
  "chili",
  "garlic",
  "basil",
  "coriander",
  "parsley",
  "dill",
  "rosemary",
  "oregano",
  "cinnamon",
  "saffron",
  "green bean",
  "bean",
  "chickpea",
  "lentil",
  "apple",
  "apricot",
  "avocado",
  "banana",
  "blackberry",
  "blackcurrant",
  "blueberry",
  "boysenberry",
  "cherry",
  "coconut",
  "fig",
  "grape",
  "grapefruit",
  "kiwifruit",
  "lemon",
  "lime",
  "lychee",
  "mandarin",
  "mango",
  "melon",
  "nectarine",
  "orange",
  "papaya",
  "passion fruit",
  "peach",
  "pear",
  "pineapple",
  "plum",
  "pomegranate",
  "quince",
  "raspberry",
  "strawberry",
  "watermelon",
  "salad",
  "pizza",
  "pasta",
  "popcorn",
  "lobster",
  "steak",
  "bbq",
  "pudding",
  "hamburger",
  "pie",
  "cake",
  "sausage",
  "tacos",
  "kebab",
  "poutine",
  "seafood",
  "chips",
  "fries",
  "masala",
  "paella",
  "som tam",
  "chicken",
  "toast",
  "marzipan",
  "tofu",
  "ketchup",
  "hummus",
  "chili",
  "maple syrup",
  "parma ham",
  "fajitas",
  "champ",
  "lasagna",
  "poke",
  "chocolate",
  "croissant",
  "arepas",
  "bunny chow",
  "pierogi",
  "donuts",
  "rendang",
  "sushi",
  "ice cream",
  "duck",
  "curry",
  "beef",
  "goat",
  "lamb",
  "turkey",
  "pork",
  "fish",
  "crab",
  "bacon",
  "ham",
  "pepperoni",
  "salami",
  "ribs"
];


// show cards
// ======================
async function getRecipes(food) {
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${food}`,
  ); // جلب الرد من السيرفر
  let data = await response.json(); // <= object  (هنستعملها كتتير لان الداتا بتعتنا فيها )

  // ====================تعليمي =================================
  // data => count , recipes(Array)
  console.log(data);
  //   // console.log(response);
  //   console.log(Array.isArray(data.recipes)); //  هل ديه ارراي ولا لا => (true)
  //   console.log(Array.isArray(data.count)); // => (false)

  //   console.log(data.recipes[0]); // the first object
  //   console.log(data.recipes[0].title); // title from the the first object
  //   console.log(data.recipes[0].publisher); // publisher from the the first object
  // console.log(data.recipes[0].image_url); // url-image  from the the first object

  // ==================================================

  // ========== 2- نحط الداتا في ال inner html ===============

  let carton = "";
  data.recipes.forEach((items) => {
    // console.log(items);

    carton += `

  <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card">
  <img src="${items.image_url}" class="card-img-top" alt="..." data-bs-toggle="modal" data-bs-target="#exampleModal"
   onclick="showRecipe('${items.title}' , '${items.image_url}' , '${items.recipe_id}') ">
  <div class="card-body">
    <h5 class="card-title text-truncate ">${items.title}</h5>
    <p class="card-text text-muted mb-0 ">${items.publisher}.</p>
  </div>
  </div>
</div>
  `;
  });

  rowData.innerHTML = carton;
}

// show recipe in modal
// ==============================
async function showRecipe(title, img, id) {
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${id}`,
  );
  
  let data = await response.json();  
  
  //  console.log(data.recipe.ingredients); <= ingredients

  // all ingredients from loop
  // ---------------
  
  let ingredientList = ''
  data.recipe.ingredients.forEach((ingredient)=>{
  // console.log(ingredient);
  ingredientList += `<li>${ingredient}</li>`    
  })

  exampleModalLabel.innerHTML = title;
  model.innerHTML = `
   <img src="${img}" class="w-100 rounded-3 mb-3">
    <h2>ingredients</h2>
    <ul>
    ${ingredientList}
    </ul>

`;   


}

// links recipe
// =================
links.forEach((link) => {
  link.addEventListener("click", () => {
    //   console.log(link.dataset.food);

    getRecipes(link.dataset.food); // => (اسم اللينك بتاع الريسيبي ) بعمل كول لكل الفانكشن الي فوق عشان لما اكلك يظهرلي الكاردس بتاعت الحاجه اللي هكلك عليها
  });
});


//1- نجيب اللي اليوزر داخله و نوشف في الكونسيل 

// Search Input
// =======================

function search(word) {
  // console.log(word);
  data = "";
  for (let i = 0; i < foods.length; i++) {
    if (foods[i].toLocaleLowerCase().includes(word.toLocaleLowerCase())) {
      console.log(foods[i]);
      data +=`
      <li onclick ="getRecipes('${foods[i]}')">${foods[i].replace(word , `<span class="span">${word}</span>`)}</li>
      `
    }
        
    
  }

  searchWords.innerHTML = data;

  if (data.length === 0) {
    error.classList.remove('d-none')
    searchWords.classList.add('d-none')

  }else{
    error.classList.add('d-none')
    searchWords.classList.remove('d-none')

  }
  
  
}

input1.addEventListener("keyup" , function () {
  // console.log(input1.value); // => القيمه اللي بداخلها (حلو اوي كده )
  search(input1.value)

  
})

// call for first page when you refresh
// =============================================

getRecipes("pizza"); // العرض الافتراضي للصفحه بدون اي كليك علي اي لينك



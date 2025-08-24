// ---------- Tabs ----------
function openTab(tabName){
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");
  tabs.forEach(t=>t.classList.remove("active"));
  buttons.forEach(b=>b.classList.remove("active"));
  document.getElementById(tabName).classList.add("active");
  document.querySelector(`.tab-btn[onclick="openTab('${tabName}')"]`).classList.add("active");

  if(tabName === "products"){
    filterProducts(); // Load products when the products tab is opened
  }
}

// ---------- To-Do List ----------
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    if(task.done) li.classList.add("completed");
    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask(${i})">
      <span>${task.text}</span>
      <button onclick="deleteTask(${i})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if(!text) return;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, done:false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  loadTasks();
}

function toggleTask(index){
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index){
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index,1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

loadTasks(); // Load tasks when page loads

// ---------- Product Listing ----------
const products = [
  { 
    name: "Smartphone", 
    category: "electronics", 
    price: 300, 
    rating: 4.5, 
    image: "https://www.kovacorp.com/wp-content/uploads/2014/10/smartphone.jpg" 
  },
  { 
    name: "Laptop", 
    category: "electronics", 
    price: 900, 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&h=150&w=250" 
  },
  { 
    name: "T-shirt", 
    category: "clothing", 
    price: 20, 
    rating: 4.0, 
    image: "https://img.lovepik.com/free-png/20210919/lovepik-cotton-short-sleeved-t-shirt-png-image_400477563_wh1200.png" 
  },
  { 
    name: "Jeans", 
    category: "clothing", 
    price: 40, 
    rating: 4.2, 
    image: "https://assets.burberry.com/is/image/Burberryltd/1869525dab6ee63af6a883fa9bc4f3a32721efce.jpg?$BBY_V2_SL_1X1$&wid=1920&hei=1920" 
  },
];

function displayProducts(list){
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  if(list.length===0){ 
    grid.innerHTML="<p>No products found.</p>"; 
    return; 
  }

  list.forEach(p=>{
    const div = document.createElement("div");
    div.className="project-card";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: $${p.price}</p>
      <p>Rating: ⭐ ${p.rating}</p>
    `;
    grid.appendChild(div);
  });
}

function filterProducts(){
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortFilter").value;
  let filtered = [...products];

  if(category!=="all") filtered = filtered.filter(p=>p.category===category);

  if(sort==="priceLow") filtered.sort((a,b)=>a.price-b.price);
  else if(sort==="priceHigh") filtered.sort((a,b)=>b.price-a.price);
  else if(sort==="rating") filtered.sort((a,b)=>b.rating-b.rating);

  displayProducts(filtered);
}

// Initial load
document.addEventListener("DOMContentLoaded", function(){
  filterProducts(); // Display products when page loads
});

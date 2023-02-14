// Kullanacağımız elementleri seçme
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");
eventListeners();
function eventListeners(){
    // Tüm event lsitenerler

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",domContentLoading);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize eminmisiniz?")){
        while(todoList.firstElementChild!=null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block ");
        }
    })
}
function addTodo(e){

    const newTodo=todoInput.value.trim();//trim boşluları siler baştaki ve sondaki
    if(newTodo===""){
        showAlert("danger","Lütfen bir todo giriniz...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi...");
    }
    
    e.preventDefault();//ilk başta boş oldugu için
}
function addTodoStorage(newTodo){
    let todos=getTodosFromStroge();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}
function domContentLoading(e){
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
          
}

function showAlert(type,message){

    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;

    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000)


}
function addTodoToUI(newTodo){
    // List item oluşturma
    const listItem=document.createElement("li");
    listItem.className="list-group-item d-flex justify-content-between";
    // Link oluşturma
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";
    // text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    // lu etiketine oluşturduğumuz listItem ı child olaraka atama
     
  
    todoList.appendChild(listItem);
    todoInput.value="";

}
function deleteTodo(e){

    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        showAlert("success","Todo başarıyla silindi...");
    }
    deleteTodoStroge(e.target.parentElement.parentElement.textContent)

}
function deleteTodoStroge(deletetodo){
    let todos=getTodosFromStroge();
    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1); // arrayden değeri silebiliriz
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}
function getTodosFromStroge(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

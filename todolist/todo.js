
//tum elementleri secme(selecting all elements)
const form=document.querySelector("#todo-form")
const todoInput=document.querySelector("#todo")
const todoList=document.querySelector(".list-group")
const firstCardbody=document.querySelectorAll(".card-body")[0]
const secondCardBody=document.querySelectorAll(".card-body")[1]
const filter=document.querySelector("#filter")
const clearButton=document.querySelector("#clear-todos")

eventListeners()

function eventListeners(){
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",loadAllTodostoUI)
    secondCardBody.addEventListener("click",deleteTodo)
    filter.addEventListener("keyup",filterTodos)
    clearButton.addEventListener("click",clearAllTodos)
}

function clearAllTodos(){
    if(confirm("Tümünü silmek istediginize emin misiniz")){
       // todoList.innerHTML="" //yavas yontem (slower method)
       
        while(todoList.firstElementChild!=undefined){
            todoList.removeChild(todoList.firstElementChild)
        }
        localStorage.removeItem("todos")


    }
}

function filterTodos(e){
    const filterValue= e.target.value .toLowerCase()    
    const listItems=document.querySelectorAll(".list-group-item")
    
    listItems.forEach(function(listItem){
    const text=listItem.textContent.toLowerCase()
    if(text.indexOf(filterValue)===-1){
        listItem.setAttribute("style","display:none !important")
    }
    if(text.indexOf(filterValue)!=-1){
        listItem.setAttribute("style","display:block")
    }
    })


}   

function deleteTodo(e){

    let a = e.target.parentElement.parentElement
    if(e.target.className==="fa fa-remove"){
        a.remove()
        deleteTodoFromStorage(a.textContent)
        showAlert("success","Todo basarıyla silindi")
    }
}

function deleteTodoFromStorage(deleteTodo){
    let todos= getTodosFromStorage()
    
    for(var i=0;i<todos.length;i++){
        if(todos[i]===deleteTodo){
            todos.splice(i,1)
        }
    }
    localStorage.setItem("todos",JSON.stringify(todos))

}
function loadAllTodostoUI(){
    let todos=getTodosFromStorage()
    
    
    for(let i=0;i<todos.length;i++){
        
            addTodoToUI(todos[i])
        
    }
}


function addTodo(e){
    const newTodo=todoInput.value.trim();
    const todos=getTodosFromStorage()
    
    for(let i=0;i<todos.length+1;i++){
        if(newTodo==todos[i]){
            showAlert("danger","Lütfen aynı todoyu tekrar girmeyin")
            break
        }
        else{
            if(newTodo==""){
                showAlert("danger","Lütfen bir todo girin")
                break
            }
            else{
                addTodoToUI(newTodo)
                addTodotoStorage(newTodo)
                showAlert("success","Todo basarıyla eklendi")
                break
            }

        }



    }



    
    

    e.preventDefault()
}
//gets all todos from storage if storage is empty it opens new
function getTodosFromStorage(){//storageden butun todoları alıyo bossa yenı acıyo
    let todos
    if(localStorage.getItem("todos")===null){
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos")) 
    }
    return todos;
}
function addTodotoStorage(newTodo){
    let todos=getTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos",JSON.stringify(todos))
}
function showAlert(type,message){

    const alert=document.createElement("div")
    alert.className="alert alert-"+type
    alert.role="alert"
    alert.textContent=message
    
    firstCardbody.appendChild(alert)

    //settimeout
    setTimeout(() => {
        alert.remove()
    }, 1000);
}

function addTodoToUI(newTodo){
    //string degerini list item olarak eklıyecek(it will add string value as list item)
    /*li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>
                            */

    //list item olusturma(creating list item)
    const listItem=document.createElement("li")
    //link olusturma(creating link)
    const link=document.createElement("a")
    link.href="#"
    link.className="delete-item"
    link.innerHTML="<i class = 'fa fa-remove''></i>"
    
    listItem.className="list-group-item d-flex justify-content-between"

    //text node ekleme(adding text node)
    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(link)
    //todo liste ekleme(adding to the todolist)
    todoList.appendChild(listItem)
    //todo inputun ıcını bosaltmak ıcın(for emptying todo input)
    todoInput.value=""

}
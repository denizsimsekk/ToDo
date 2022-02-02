const list= document.querySelector("#taskList");
const input= document.querySelector("#inputTask");
const btn=document.querySelector("#addTaskBtn");
const deleteBtn=document.querySelector("#buttonDelete");
let tasks;
loadItems();
btn.addEventListener("click",function(e)
{
    if(input.value=="")
    {
        alert("Add An Item");
        return;
    }
    addItem(input.value);
    setItemToLS(input.value);
    input.value="";
    e.preventDefault();
});
function addItem(text)
{
    
    var newTask = document.createElement("li");
    newTask.appendChild(document.createTextNode(text));
    var deleteSymbol=document.createElement("a");
    deleteSymbol.className="delete-item";
    deleteSymbol.setAttribute('href', '#');
    deleteSymbol.innerHTML = '<i class="fas fa-times"></i>';
    deleteSymbol.style.float="right";
    newTask.appendChild(deleteSymbol);
    list.appendChild(newTask);
}
list.addEventListener("click",deleteAnItem);
function deleteAnItem(e)
{
    if(e.target.className=="fas fa-times")
    {
        e.target.parentElement.parentElement.remove();
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
    
    
}
deleteBtn.addEventListener("click",deleteAllItems);
function deleteAllItems(e)
{
   
        for(let i=list.childNodes.length-1;i>0;i--)
        {
            if(list.childNodes[i].nodeType==1)
            {
                console.log("a");
                list.childNodes[i].remove();
                
            }
           
        }
        localStorage.clear();
    e.preventDefault();
}
function loadItems()
{
    tasks=getItemsFromLS();
    tasks.forEach(function(item)
    {
        addItem(item);
    });
    
}

function getItemsFromLS()
{
    
    if(localStorage.getItem("tasks")===null)
    {
        tasks=[];
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
}
function deleteItemFromLS(text)
{
    tasks=getItemsFromLS();
    tasks.forEach(function(item,index)
    {
        if(item===text)
        {
            tasks.splice(index,1);
        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function setItemToLS(text)
{
    tasks=getItemsFromLS();
    tasks.push(text);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

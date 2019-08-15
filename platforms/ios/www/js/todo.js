


//Show Current Date
var options = {  weekday: 'long', month: 'long', day: 'numeric'};
var prnDt = new Date().toLocaleDateString('en-us', options);
document.getElementById("dateMonth").innerHTML = prnDt;


var taskInput=document.getElementById("taskInput");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks
var inputArray = [];

//New task list item
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	var editButton=document.createElement("button");//edit button

	//button.delete
	var deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;

	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
  editButton.className="edit";
	deleteButton.innerText="Delete";
  deleteButton.id="delete"
  deleteButton.className="ui-btn ui-btn-b";
  


	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
  //Create a new list item with the text from the #taskInput:
  saveToLocalStorage();
  if(taskInput.value === ""){
    alert("Can't enter blank field!");
  }else if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
	  listItem=createNewTaskElement(taskInput.value);
	  saveToLocalStorage();
	    incompleteTaskHolder.appendChild(listItem);
	    bindTaskEvents(listItem, taskCompleted);
  }else{
  var listItem=createNewTaskElement(taskInput.value);
  }
	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}
//Set the enter key to Add New a Tasks

var input = document.getElementById("taskInput")
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  
});
//Edit an existing task.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");

var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){

		//switch to .editmode
    //label becomes the inputs value.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}

//Save Data to Local Storage
function saveToLocalStorage(){
	inputArray.push(taskInput.value);
	if(taskInput.value !== ""){
		var str = JSON.stringify(inputArray);
		localStorage.setItem("TodoList",str);
	}
}

//Get Data from Local Storage

window.onload = function(){
	var list = localStorage.getItem('TodoList');

	if(list != null){
		inputArray = JSON.parse(list);
		
		for(var i=0; i<inputArray.length;i++){
            var item = createNewTaskElement(inputArray[i]);
			incompleteTaskHolder.appendChild(item);
			bindTaskEvents(item, taskCompleted);


			taskInput.value="";
        }

	}
}

//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);
		for(var i =0; i < inputArray.length;i++){
			if(inputArray[i]){
				inputArray.splice(i,1);
				updatedLocalStorage();
				break;
			}
		}
}

var updatedLocalStorage = function(){
    var todos = inputArray;
    localStorage.removeItem('TodoList');
    localStorage.setItem('TodoList', JSON.stringify(todos));
}

//Mark task completed
var taskCompleted=function(){
		console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
		console.log("Incomplete Task...");
//Mark task as incomplete.
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
//addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
//select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button#delete");


			//Bind editTask to edit button.
			editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
	//for each list item
	for (var i=0; i<incompleteTaskHolder.children.length;i++){
		
		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}




//cycle over completedTasksHolder ul list items
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
  }


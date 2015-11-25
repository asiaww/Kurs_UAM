window.addEventListener('DOMContentLoaded', function () {
		var toDoList = [];
	
		var toDoInput = document.querySelector('#inputField');
		var taskList = document.querySelector('#taskList');
	
		function getToDoTemplate(value) {
			return "<div class='task'>" + value + "<span>&nbsp &nbsp &nbsp &nbsp</span><button class='removeTask'>x</button></div>";
		}
	
		//zliczanie liczby zadan
		function countTasks() {
			var numberTasks = document.getElementById("numberTasks");
			numberTasks.textContent = "Liczba zadań na liście: " + toDoList.length
		}
	
		//dodawanie zadan po nacisnieciu entera
		toDoInput.addEventListener("keypress", function (e) {
			var key = e.which || e.keyCode;
			if (key === 13) {
				var toDoInputValue = toDoInput.value;
				var toDoDomElement = document.createElement('li');
				toDoList.push(toDoInputValue);
				toDoDomElement.innerHTML = getToDoTemplate(toDoInputValue);
				taskList.appendChild(toDoDomElement);
			
				//usuwanie zadan
				var removeBtn = toDoDomElement.querySelector('.removeTask');
				removeBtn.addEventListener('click', function() {
					var index = toDoList.indexOf(toDoInputValue);
					if (index >= 0) {
						toDoList.splice(index, 1);
					}
				taskList.removeChild(toDoDomElement);
				countTasks();
				})
		countTasks();
		}
	});
});
window.addEventListener('DOMContentLoaded', function () {

    aircrafts = [];

    /*global.UAM.aircrafts.push({
        code: 'SP-ABC',
        services: []
    });

    global.UAM.aircrafts[0].services.push({
        name: 'smth1',
        timeToExecute: 120
    });*/
	
    addAircraft = function (newAircraftCode) {
        if (typeof newAircraftCode == "string") {
            var aircraft = { code: newAircraftCode, services: [] };
			this.aircrafts.push(aircraft);
			return aircraft;
		}
        return;
    };

	removeAircraft = function (aircraftCode) {
		for (var i=0; i<aircrafts.length; i++) {
			if (aircrafts[i].code === aircraftCode) {
				this.aircrafts.splice(i, 1);
			}
		}
    };
	
	addWorkToAircraft = function (aircraftCode, name, timeToExecute) {
        timeToExecute = parseInt(timeToExecute);
        if (typeof aircraftCode === "string" && typeof name === "string" && typeof timeToExecute === "number") {
            aircrafts.forEach(function(aircraft){
				if (aircraft.code === aircraftCode) {
					var work = { name: name, timeToExecute: timeToExecute };
					aircraft.services.push(work);
				}
			});
		}
    };
	
	aircraftReduceTime = function (aircraftCode, time) {
        time = parseInt(time);
        if (typeof aircraftCode === "string" && typeof time === "number") {
            aircrafts.forEach(function(aircraft) {
				aircraft.services.forEach(function(service) {
					service.timeToExecute -= time;
				})
			})
        }
	};
	
	getAircraftsForRepairs = function(maxTimeToExecute) {
        maxTimeToExecute = parseInt(maxTimeToExecute);
        var aircraftsForRepairs = [];

        aircrafts.forEach(function(aircraft) {
			var flag = false;
            aircraft.services.forEach(function(service) {
                if (service.timeToExecute <= maxTimeToExecute) {
                       flag = true;
                }
			});
			if (flag === true) {
				aircraftsForRepairs.push(aircraft);
			}
        });
        return aircraftsForRepairs;
    };
	
	getAircraftTemplate = function(text) {
		return "<div class='aircraft'>" + text + "<span>&nbsp &nbsp &nbsp &nbsp</span><button class='removeButton'>x</button>" +
						"<span>&nbsp &nbsp</span><button class='serviceButton'>s</button><span>&nbsp &nbsp</span><button class='reduceTimeButton'>-</button></div>";
	}
	
	getServiceInputTemplate = function() {
		return "<p><h1>Add services</h1></p><p><input type='text' id='serviceNameInput'><span>&nbsp</span></input><button class='commitService'>Add service</button></p>" +
						"<p><input type='range' min='0' max='500' id='timeRange'><span id='timeToExecute'>250</span></input></p>";
	}
	
	getTimeReduceTemplate = function() {
		return "<p><input type='range' min='0' max='500' id='reduceTimeRange'><span id='reduceTimeToExecute'>250</span></input></p>" +
						"<p><button class='reduceButton'>Reduce</button></p>";
	}
	
	getAircraftRepairListTemplate = function(list) {
		str = "";
		list.forEach(function(element) {
			str += "<li>" + element.code + "</li>\n";
		});
		return str;
	}
	
	var addButton = document.getElementById("addButton");
	var inputField = document.getElementById("addInput");
	var aircraftList = document.getElementById("aircraftList");
	
	//adding aircrafts
	addButton.addEventListener("click", function() {
		var textInput = inputField.value;
		addAircraft(textInput);
		var aircraftDomElement = document.createElement("li");
		aircraftDomElement.innerHTML = getAircraftTemplate(textInput);
		aircraftList.appendChild(aircraftDomElement); 
		
		//removing aircrafts
		var removeButton = aircraftDomElement.querySelector(".removeButton");
		removeButton.addEventListener("click", function() {
			removeAircraft(textInput);
			aircraftList.removeChild(aircraftDomElement);
		});
		
		//adding services to aircrafts
		var addServiceButton = aircraftDomElement.querySelector(".serviceButton");
		addServiceButton.addEventListener("click", function() {
			var addServiceDomElement = document.querySelector(".addService");
			addServiceDomElement.innerHTML = getServiceInputTemplate();
			
			var inputServiceField = document.getElementById("serviceNameInput");
			var inputTimeRange = document.getElementById("timeRange");
			var timeToExecute = document.getElementById("timeToExecute");
			inputTimeRange.addEventListener("input", function() {
				timeToExecute.textContent = inputTimeRange.value;
			})
			
			var commitServiceButton = document.querySelector(".commitService");
			commitServiceButton.addEventListener("click", function() {
				var nameValue = inputServiceField.value;
				var timeToExecuteValue = inputTimeRange.value;
				addWorkToAircraft(textInput, nameValue, timeToExecuteValue);
				alert("Service added!");
				addServiceDomElement.innerHTML = "";
			});
		});
		
		//reducing time to execute services for an aircraft
		var reduceTimeButton = aircraftDomElement.querySelector(".reduceTimeButton");
		reduceTimeButton.addEventListener("click", function() {
			var reduceTimeDomElement = document.querySelector(".reduceTime");
			reduceTimeDomElement.innerHTML = getTimeReduceTemplate();
			
			var inputReduceTimeRange = document.getElementById("reduceTimeRange");
			var reduceTimeToExecute = document.getElementById("reduceTimeToExecute");
			inputReduceTimeRange.addEventListener("input", function() {
				reduceTimeToExecute.textContent = inputReduceTimeRange.value;
			});
			
			var reduceButton = document.querySelector(".reduceButton");
			reduceButton.addEventListener("click", function() {
				var time = inputReduceTimeRange.value;
				aircraftReduceTime(textInput,time);
				alert("Time reduced!");
				reduceTimeDomElement.innerHTML = "";
			});
		})
	});
	
	//getting aircrafts for repairs
	var aircraftRepairsSection = document.querySelector(".aircraftRepairs");
	var aircraftRepairsButton = document.getElementById("aircraftRepairsButton");
	
	var repairRange = document.getElementById("repairRange");
	var repairValue = document.getElementById("repairValue");
	repairRange.addEventListener("input", function() {
		repairValue.textContent = repairRange.value;
	});
	
	aircraftRepairsButton.addEventListener("click", function() {
		var aircraftRepairList = document.getElementById("aircraftRepairList");
		aircraftRepairList.innerHTML = "";
		var maxTime = repairRange.value;
		aircraftRepairList.innerHTML = getAircraftRepairListTemplate(getAircraftsForRepairs(maxTime));
	});
});
(function (global) {
	var mapArray;

	if (!global.UAM) {
		global.UAM = {};
	}
    
    global.UAM.aircrafts = [];
    
    //////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// Sample aircraft with sample service  /////////////// 
    
    global.UAM.aircrafts.push({
        code: 'SP-ABC',
        services: []
    });
    
    global.UAM.aircrafts[0].services.push({
        name: 'smth1',
        timeToExecute: 120
    });
    
    //////////////////////////////////////////////////////////////////////////////////////

    global.UAM.addAircraft = function (newAircraftCode) {
        var aircraft = new Object();
        aircraft.code = newAircraftCode;
        aircraft.services = [];
        global.UAM.aircrafts.push(aircraft);
        return aircraft;
    };

    global.UAM.removeAircraft = function (aircraftObj) {
        for (var i=0; i<global.UAM.aircrafts.length; i++){
            if (global.UAM.aircrafts[i] === aircraftObj){
                global.UAM.aircrafts.splice(i,1);
            }
        }
    };

    global.UAM.addWorkToAircraft = function(aircraftObj, name, timeToExecute) {
        for (var i=0; i<global.UAM.aircrafts.length; i++){
            if (global.UAM.aircrafts[i] === aircraftObj){
                var work = new Object();
                work.name = name;
                work.timeToExecute = timeToExecute;
                aircraftObj.services.push(work);
                return work;
            }
        }
    };
        
    global.UAM.reduceTimeToExecute = function(aircraftObj, time) {
         for (var i=0; i<global.UAM.aircrafts.length; i++){
            if (global.UAM.aircrafts[i] === aircraftObj){
                for (var j=0; j<global.UAM.aircrafts[i].services.length; j++){
                    global.UAM.aircrafts[i].services[j].timeToExecute -= 20;
                }
            }
         }
    };
    
    global.UAM.getAircraftsForRepairs = function(maxTimeToExecute) {
        list = []
        for (var i=0; i<global.UAM.aircrafts.length; i++){
            for (var j=0; j<global.UAM.aircrafts[i].services.length; j++){
                if (global.UAM.aircrafts[i].services[j].timeToExecute < maxTimeToExecute){
                    list.push(global.UAM.aircrafts[i]);
                }
            }
        }
        return list;
    };

}(window));

/*

Przykład użycia:
*/
var newAircraft1 = UAM.addAircraft('SP-XY1');
var newAircraft2 = UAM.addAircraft('SP-XY2');

UAM.addWorkToAircraft(newAircraft1, 'serviceXY1a', 110);
UAM.addWorkToAircraft(newAircraft1, 'serviceXY1b', 130);

UAM.reduceTimeToExecute(newAircraft1, 20);
        
var sxy2a = UAM.addWorkToAircraft(newAircraft2, 'serviceXY2a', 130);
var sxy2b = UAM.addWorkToAircraft(newAircraft2, 'serviceXY2b', 160);
UAM.reduceTimeToExecute(newAircraft2, 20);

UAM.getAircraftsForRepairs(100); // [ newAircraft1 ]

UAM.removeAircraft(newAircraft1);

UAM.getAircraftsForRepairs(100); // []

UAM.reduceTimeToExecute(newAircraft2, 20);

UAM.getAircraftsForRepairs(100); // [ newAircraft2 ]
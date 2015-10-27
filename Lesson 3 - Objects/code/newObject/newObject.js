(function (global) {
	if (!global.UAM) {
		global.UAM = {};
 	}
 
	function newObject() {}
	function newObject() {
		var argList = [];
		for (i=1; i<= arguments.length; i++){
			argList.push(arguments[i]);
		};
		
		var object1 = Object.create(arguments[0].prototype);
		var object2 = arguments[0].apply(object1, argList);

		if (object2 !== null && typeof (object2) === 'object') {
			return object2;
		}
		else {
			return object1;
		};
  };
 
 	global.UAM.newObject = newObject;
}(window));

/*
	Zaimplementuj funkcję newObject, która będzie działać analogicznie do operatora new. Pierwszym parametrem funkcji niech będzie
	konstruktor, natomiast pozostałe to parametry konstruktora. Przykładowe zastosowanie:

	new MyClass(arg1, arg2) -> newObject(MyClass, arg1, arg2)
*/



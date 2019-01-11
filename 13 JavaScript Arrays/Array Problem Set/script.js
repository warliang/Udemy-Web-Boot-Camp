function printReverse(array) {
	for (i=array.length-1; i>=0; i--) {
		console.log(array[i]);
	}
}

function isUniform(array) {
	var item = array[0];
	for (i=1; i<array.length; i++) {
		if (array[i] !== item)
			return false;
	}
	return true;
}

// function sumArray(array) {
// 	var result = 0;
// 	for (i=0; i<array.length; i++) {
// 		result = result + array[i];
// 	}
// 	return result;
// }

function sumArray(array) {
	var result = 0;
	array.forEach(function(item) {
		result += item;
	});
	return result;
}

function max(array) {
	var max = array[0];
	for (i=1; i<array.length; i++) {
		if (max < array[i])
			max = array[i];
	}
	return max;
}
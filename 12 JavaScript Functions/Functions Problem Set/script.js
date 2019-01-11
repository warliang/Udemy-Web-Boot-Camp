function isEven(num) {
	return !(num % 2);
}

function factorial(num) {
	var i = num;
	var count = 1;

	while(i > 0) {
		count *= i;
		i--;
	}
	return count;
}

function kebabToSnake(str) {
	return str.replace(/-/g, "_");
}
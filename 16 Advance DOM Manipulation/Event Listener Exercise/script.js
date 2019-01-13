var button = document.querySelector("button");
var body = document.querySelector("body");
var isWhite = true;

// button.addEventListener("click", function() {
// 	if (isWhite) {
// 		body.style.background = "purple";
// 	} else {
// 		body.style.background = "white";
// 	}
// 	isWhite = !isWhite;
// })

button.addEventListener("click", function() {
	body.classList.toggle("purple");
});
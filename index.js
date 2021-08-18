const singleYtResult = require("./search_yt")

//Fetch result and save it to the file
singleYtResult.search("kurta pajama", "exportfilename")
.then(function(result) {
console.log(result)
});
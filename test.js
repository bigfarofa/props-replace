var propsReplace = require("./index");

var testObj = {
	"fullDocument._id": "123",
  $or: [
  	{
    	"fullDocument.name": "Jotaro",
      $and: [
      	{"fullDocument.shout": "ORA ORA ORA!!"},
        {"fullDocument.catchphrase": "Yare Yare Daze"}
      ]
    },
    {
    	"fullDocument.dio": "WRYYYYY!"
    }
  ]
}

var clonedObj = propsReplace(testObj, "fullDocument.", ""); // Creates a immutable clone with props formatted
console.log("[JSON] IMMUTABLE OBJECT", JSON.stringify(clonedObj));
console.log("[JSON] ORIGINAL OBJECT", JSON.stringify(testObj));


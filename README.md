# props-replace
Applies String.replace in every Object's prop that contains the substring. It can be shallow copied or full cloned.

````javascript
propsReplace(obj, searchValue, replaceValue, clone)
````

 - `obj` Object - where we will search for the props that you want to replace
 - `searchValue` String - Will check for props that contain the searchValue
 - `replaceValue` String - Value that will replace the `searchValue` in props
 - `clone=true` Boolean - Clones the `obj` to prevent mutation.
 

## How to use it
````javascript
var propsReplace = require("props-replace");

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

var propsWithoutFullDocument = propsReplace(testObj, "fullDocument.", "");
````

Now we have a new object with the following props:
````
{
  "_id":"123"
  "$or":[
    {
      "name":"Jotaro"
      "$and":[
        {
          "shout":"ORA ORA ORA"
        },
        {
          "catchphrase":"Yare Yare Daze"
        }
      ],
    },
    {
      "dio":"WRYYYYY!"
    }
  ],
  
}
````

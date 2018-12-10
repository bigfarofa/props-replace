"use strict"

function changeProp(obj, oldProp, newProp){
  if (oldProp !== newProp) {
    Object.defineProperty(obj, newProp,
      Object.getOwnPropertyDescriptor(obj, oldProp));
    delete obj[oldProp];
  }
}

function cloneDeep(obj){
	let x = null;
  function copyValue(value){
  	if (typeof value !== "object") {
      return value;
    } else if (value instanceof Date) {
      return new Date(value);
    } else {
    	return cloneDeep(value);
    }
  }
  if(typeof obj === 'object'){
  	x = {};
  	if (!Array.isArray(obj)) {
    	for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          x[key] = copyValue(obj[key]);
        }
      }
    } else {
    	x = [];
    	for (let i = 0; i < obj.length; i++) {
        x[i] = copyValue(obj[i]);
      }
    }
  }
  
  
  return x;
  
}
/**
 * Applies String.replace in every Object's prop's name that contain the substring. It can be shallow copied or full cloned.
 * @param {Object} objToReplace Object where we will search for the props that you want to replace
 * @param {string} searchValue Will check for props that contain the searchValue
 * @param {string} replaceValue Value that will replace the substring contained in "searchValue" in props
 * @param {boolean} [clone=true] By default, it clones the original object so It cannot mutate. If you want to be shallow copied set this option to false
 * @returns {Object} Object with the props replaced
 */
function propReplace(objToReplace, searchValue, replaceValue, clone = true){
  let formatedObj = (clone === true) ? cloneDeep(objToReplace) : objToReplace;
  for (let key in formatedObj) {
    if (formatedObj.hasOwnProperty(key)) {

      let value = formatedObj[key];
      let newKey = (key.indexOf(searchValue) !== -1) ? key.replace(searchValue, replaceValue) : key;

      changeProp(formatedObj, key, newKey);
      if (typeof value === 'object') {
        propReplace(value, searchValue, replaceValue, false);
      }
    }
  }
  
  return formatedObj;
}

module.exports = propReplace;

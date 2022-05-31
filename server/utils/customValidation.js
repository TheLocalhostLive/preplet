const specialChars =/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

 module.exports = function checkSpecialChar (name){
    const string = name
    if(string.test(specialChars)){
        return true;
    }
    else {
        return false
    }

}

module.exports =function checkNumeric (name){
    var regex = /\d+/g; 
    if(name.match(regex)) return true
    
    return false
     
}

module.exports = function checkAsterisk(passowrd) {
    const string = passowrd 
    return string.includes('*')
}

// console.log(checkNumeric("Tonmay123"))

// console.log(checkNumeric('Tonmay'))


// var format = 

// if( string.match(format) ){
//   return true;
// }else{
//   return false;

const specialChars =/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

 module.exports = function checkSpecialChar (data){
    return specialChars.test(data);

}

module.exports = function checkNumeric (data){
    var regex = /\d+/g;
     const string = data

     return string.match(regex);
}



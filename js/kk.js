//var a = 1;
//(function () {
//    var a = 3;
//    (function () {
//        window.a = 2;
//    }());
//    console.log(a);
//}());
//console.log(a);



//var x=1;
//function foo (){
//    window.x=2;
//}
//console.log(x);
//foo();
//console.log(x);



//var a = 0;
//function foo() {
//    return a;
//    var a = 1;
//}
//console.log(foo());


//var a = 0;
//function foo() {
//    var a = 1;
//    a = 2;
//    console.log(a);
//}
//foo();
//console.log(a);

function checkAge(age) {
    if (age > 18) {
        return true;
    } else {
        return confirm('Родители разрешили?');
    }
}
var age = prompt('Ваш возраст?');
if (checkAge(age)) {
    alert( 'Доступ разрешен' );
} else {
    alert( 'В доступе отказано' );
}

var indy = require('indy-sdk')

let name = "Charlie";
let currentHandle = 0;

let createWallet = function(){
    return indy.createWallet({"id":name}, {"key":"password"});
}

let openWallet = function(){
    return indy.openWallet({"id":name},{"key":"password"});
}

let exportWallet = function(){
    console.log("Current handle: ");
    console.log(currentHandle);
    return indy.exportWallet(1, {"path":"/home/charlie/Desktop/wallets/" + name + ".wallet", "key":"password"});
}

createWallet().then(function(result){
    console.log("Creating wallet...");
    console.log(result);
});

openWallet().then(function(result){
    currentHandle=result;
    console.log("Opening wallet...");
    console.log(result);
});

exportWallet().then(function(result){
    console.log("Exporting wallet...");
    console.log(result);
});

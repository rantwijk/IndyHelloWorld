var indy = require('indy-sdk')

let name = "Henkie";
let currentHandle = 0;

let createWallet = function(){
    return indy.createWallet({"id":name}, {"key":"password"});
}

let openWallet = function(){
    return indy.openWallet({"id":name},{"key":"password"});
}

let closeWallet = function(){
    return indy.closeWallet(currentHandle);
}

let exportWallet = function(){
    return indy.exportWallet(currentHandle, {"path":"/home/charlie/Desktop/wallets/" + name + ".wallet", "key":"password"});
}

// create wallet
createWallet().then(function(result){
    console.log("Creating wallet...");
    if(result==null){
        console.log("Success!");
    }else{
        console.log("ERROR: " + result);
    }

    // open wallet when created
    openWallet().then(function(result){
        currentHandle=result;
        console.log("Opening wallet...");
        if(result==1){
            console.log("Success!");
        }else{
            console.log("ERROR: " + result);
        }

        // export wallet when opened
        exportWallet().then(function(result){
            console.log("Exporting " + name + "'s wallet...");
            if(result==null){
                console.log("Success!");
            }else{
                console.log("ERROR: " + result);
            }

            // close wallet after export
            closeWallet().then(function(result){
                console.log("Closing " + name + "'s wallet");
                if(result==null){
                    console.log("Success!");
                }else{
                    console.log("ERROR: " + result);
                }
            });
        });
    });
});
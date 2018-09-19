var indy = require('indy-sdk')

function nameGen() {
    var name = "";
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    for (let i = 0; i < 10; i++){
        name += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return name;
}

let name = nameGen();
let currentHandle = 0;
let currentDID = "";

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

let createDID = function(){
    return indy.createAndStoreMyDid(currentHandle, "{}");
}

let setMetadata = function(){
    return indy.setDidMetadata(currentHandle, currentDID, "{\"Time\":" + Date.now() +"}");
}

let getDIDData = function(){
    return indy.listMyDidsWithMeta(currentHandle);
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
            // create did
            createDID().then(function(result){
                console.log("Generating DID for "+ name + "...");
                currentDID = result[0];
                console.log(result);

                // set some metadata
                setMetadata().then(function(result){
                    // get DID data
                    getDIDData().then(function(result){
                        console.log("Getting DID data...");
                        console.log(result);
                    });
                });
            });
        });
    });
});
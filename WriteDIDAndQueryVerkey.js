var indy = require('indy-sdk')

let walletName = "myWallet";
let poolName = "NodeJSPool";
let stewardSeed = "000000000000000000000000Steward1";
let poolConfig = "{\"genesis_txn\": \"genesis\"}";

let createPool = function(){
    indy.createPoolLedgerConfig(poolName, poolConfig);
}

let openPool = function(){
    indy.openPoolLedger(poolName, poolConfig);
}

let createWallet = function(){
    return indy.createWallet("{\"id\":"+name+"}, {\"key\":\"password\"}");
}

let openWallet = function(){
    return indy.openWallet("{\"id\":" + name + "},{\"key\"\"password\"}");
}

let createDID = function(){
    return indy.createAndStoreMyDid
}
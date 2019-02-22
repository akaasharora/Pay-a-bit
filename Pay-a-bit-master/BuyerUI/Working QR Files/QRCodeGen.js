// encode BIP21 URI of the form:
// bitcoin:175tWpb8K1S7NmH4Zx6rewF9WQrcZv245W?amount=50&label=Merchant-Name&message=123aB
// message is the reciept number, which must be in base 58 to save space, and to elimenate l, i, O, and 0

var DarshansKey = "bc1qdjo9ed6jz2qu1e8pd8hgufff8um3pqdvy59esx";
var someoneElsesAddress = "1aa5cmqmvQq8YQTEqcTmW7dfBNuFwgdCD"
var myAddress = "14AnA29UZVJbcCJjVBqGPLUgmUcLzKgfYL"

var parag = document.getElementById('toChange');
var canvas = document.getElementById('qrCanvas');

function hexToDec(val, reverse=false) {
  if (!reverse){
    for (place in val) {

    }
  }
}

//var lastResponse; //stores the last response from wherever
function encodeBip21Uri(address, amount, name, receipt){
  var encodedUri = 'bitcoin:' + address + '?amount='+ amount + '&label=' + name + '&message=' + reciept;
  return encodedUri;
}
function getDataAsync(urlToGoTo, thingsToDo){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      document.getElementById('toChange').innerHTML = this.responseText;
      thingsToDo(this);
    }
  }
  req.open(method="GET", url=urlToGoTo, async=true);
  req.send();
  return req
}
function confirmTx(toChange, data, address, amount=null, reciept=null){
    var dataText = data.responseText;
    var recLenBytes = 20;
    var amountMatch = false;
    var recieptMatch = false;
    //alert(amount);
    if (amount == null) {
      amountMatch = true;
    }
    if (reciept == null) {
      recieptMatch = true;
    }
    toChange.innerHTML = dataText;
    var dataObj = JSON.parse(dataText);
    console.log(dataObj);
    for(currentTx in dataObj.txs) {
      //toChange.innerHTML = currentTx.toString();
      currentTx = dataObj.txs[currentTx]
      for (out in currentTx.out) {
        out = currentTx.out[out]
        if (out.script.slice(0, 2) == "6a" && out.script.slice(-2*recLenBytes) == reciept) {
          recieptMatch = true;
        } else if (out.script.slice(0, 6) == "76a914" && out.addr == address && out.value == amount*100000000) {
          amountMatch = true;
        }
          //toChange.innerHTML = "scriptSliced: "+out.script.slice(0, 6)+" vs: "+"76a914"+
          //", address: "+out.addr+" vs: "+address+", amount: "+out.value+" vs: "+ (amount*100000000).toString();
      }
      if (recieptMatch == true && amountMatch == true){
        toChange.innerHTML = "This is the currentTx: "+currentTx.toString();
        //console.log(currentTx.hash.toString())
        return currentTx.hash.toString();
      }
    }
}
function confirmedScreen(txHash, canvas, toChange, intervalId=null) {
  var ctx = canvas.getContext("2d");
  var checkmark = document.getElementById("checkmark");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(checkmark, 0, 0, canvas.width, canvas.height);
  toChange.innerHTML = "tx hash is: "+txHash;
  if (intervalId != null) {
  clearInterval(intervalId);
  }
}

// Generate the QR Code with Nayuki's qrcodegen library (see QR-Code-generator folder)
//from https://github.com/nayuki/QR-Code-generator
function generateQR(message, canvas) {
  var QRC = qrcodegen.QrCode;
  var scale = 8;
  var border = 4;
  var qr0 = QRC.encodeText(message, QRC.Ecc.HIGH);
  qr0.drawCanvas(scale, border, canvas);
}
var message = encodeBip21Uri(myAddress, 0.001, 'Harry-Potter', reciept='Y3r-4-Wiz4rd');
generateQR(message, canvas);

function  txConfirmMaster(address=myAddress, amountMaster=null, recieptMaster=null, hcanvas=canvas, textToChange=parag){
  id = setInterval(function() {getDataAsync("https://cors-anywhere.herokuapp.com/https://blockchain.info/rawaddr/"+address,
    function(response){x = confirmTx(textToChange, response, address, amount=amountMaster);
    if (x != undefined){
      //console.log(x)
      confirmedScreen(x, hcanvas, textToChange, id);};});}, 2000);
}


/*
function txConfirmMaster(address, amount=null, reciept=null, hcanvas=canvas, toChange=parag){
  getDataAsync("https://cors-anywhere.herokuapp.com/https://blockchain.info/rawaddr/"+address,
   function(reqObj){var id = setInterval(function(reqObj){var hash = confirmTx(toChange, reqObj, address, reciept, amount) != undefined ? function(hash, hcanvas, toChange){confirmedScreen(); clearInterval(id);}}, 500);});
}*/
txConfirmMaster(address=myAddress, amountMaster=0.0001);
//setInterval(function() {getDataAsync("https://cors-anywhere.herokuapp.com/https://blockchain.info/rawaddr/"+myAddress, function(response){parag.innerHTML=response; alert("iterated again!");})}, 2000);

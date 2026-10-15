
var left = 0;
var leftMax = 180;
var loading, timer, numbers, qrImage;

var secret;
var privateKey;
var publicKey;
var sessionUuid;
var qrCode;

// Fallback for delay if not defined by bar.js
if (typeof delay !== 'function'){
  function delay(ms){ return new Promise(function(res){ setTimeout(res, ms); }); }
}

function initShowQR(){
  loading = document.querySelector('.loading_bar');
  timer = document.querySelector('.expire_highlight');
  numbers = document.querySelector('.numbers');
  qrImage = document.querySelector('.qr_image');
  if (loading && timer && qrImage){ setLeft(); }
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initShowQR);
} else {
  initShowQR();
}
function setLeft(){
    if (left == 0){
        generateQR();
        left = leftMax;
    }
    var min = parseInt(left/60);
    var sec = parseInt(left - min*60);
    if (min == 0){
        timer.innerHTML = sec + " sek."
    }else{
        timer.innerHTML = min + " min " + sec + " sek."
    }
    loading.style.width = (left/leftMax)*100 + "%"
    left--;
    delay(1000).then(() => {
        setLeft()
    })
}

function generateQR(){

    fetch('/qr/generate?' + params)
    .then(response => response.json())
    .then(result => {
        
        qrCode = result.qrCode;

        qrImage.innerHTML = "";
        qr = new QRCode(qrImage, {
            text: qrCode,
            width: 300,
            height: 300,
            correctLevel: QRCode.CorrectLevel.M
        });

        numbers.innerHTML = result.code

        secret = result.secret;
        publicKey = result.encodedPublicKey;
        privateKey = result.encodedPrivateKey;
        sessionUuid = result.sessionUuid;

        awaitResponse();
    })

}

function awaitResponse(){

    fetch('/qr/check?' + params, {
        method: 'POST',
        body: JSON.stringify({
            'secret': secret,
            'encodedPublicKey': publicKey,
            'encodedPrivateKey': privateKey,
            'sessionUuid': sessionUuid,
            'qrCode': qrCode
        })
    })
    .then(response => {
        if (response.status == 204){
            return delay(5000).then(() => {
                awaitResponse();
                return null
            })
        }else{
            return response.json()
        }
    })
    .then(result => {
        if (result){
            saveTemporaryData(result);
        }
    })
}

async function saveTemporaryData(data) {
    var db = await getDb();

    data['data'] = 'temp';
    await saveData(db, data);

    sendTo('display');
}

function randomSixDigit() {
        return Math.floor(100000 + Math.random() * 900000);
    }
    document.addEventListener("DOMContentLoaded", function() {
        const numbersElem = document.querySelector('.numbers');
        if (numbersElem) {
            numbersElem.textContent = randomSixDigit();
        }
    });
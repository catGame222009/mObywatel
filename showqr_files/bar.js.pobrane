
var params = new URLSearchParams(window.location.search);

var bar = document.querySelectorAll(".bottom_element_grid");

var top = localStorage.getItem('top');
var bottom;

if (localStorage.getItem('bottom')){
    bottom = localStorage.getItem('bottom');

    bar.forEach((element) => {
        var image = element.querySelector('.bottom_element_image');
        var text = element.querySelector('.bottom_element_text');

        var send = element.getAttribute('send');
        if (send === bottom){
            image.classList.add(bottom + "_open");
            text.classList.add("open");
        }else{
            image.classList.remove(send + "_open");
            image.classList.add(send);
            text.classList.remove("open");
        }
    })
}

function sendTo(url, top, bottom){
    if (top){
        localStorage.setItem('top', top)
    }
    if (bottom){
        localStorage.setItem('bottom', bottom)
    }
    location.href = `/${url}?` + params;
}

var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
var optionsTime = { second: '2-digit', minute: '2-digit', hour: '2-digit' };

bar.forEach((element) => {
    element.addEventListener('click', () => {
        localStorage.removeItem('top');
        localStorage.removeItem('bottom');

        sendTo(element.getAttribute("send"))
    })
})

function getRandom(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function gotNewData(data){

    var seriesAndNumber = localStorage.getItem('seriesAndNumber');
    if (!seriesAndNumber){
        seriesAndNumber = "";
        var chars = "ABCDEFGHIJKLMNOPQRSTUWXYZ".split("");
        for (var i = 0; i < 4; i++){
            seriesAndNumber += chars[getRandom(0, chars.length)];
        }
        seriesAndNumber += " ";
        for (var i = 0; i < 5; i++){
            seriesAndNumber += getRandom(0, 9);
        }
        localStorage.setItem('seriesAndNumber', seriesAndNumber);
    }

    var day = data['day'];
    var month = data['month'];
    var year = data['year'];

    var birthdayDate = new Date();
    birthdayDate.setDate(day);
    birthdayDate.setMonth(month-1);
    birthdayDate.setFullYear(year);

    localStorage.setItem('birthDay', birthdayDate.toLocaleDateString("pl-PL", options));

    var givenDate = birthdayDate;
    givenDate.setFullYear(givenDate.getFullYear() + 18);
    localStorage.setItem('givenDate', givenDate.toLocaleDateString("pl-PL", options));

    var expiryDate = givenDate;
    expiryDate.setFullYear(expiryDate.getFullYear() + 5);
    localStorage.setItem('expiryDate', expiryDate.toLocaleDateString("pl-PL", options));

    var sex = data['sex'];
    
    if (parseInt(year) >= 2000){
        month = 20 + parseInt(month);
    }
    
    var later;
    
    if (sex === "m"){
        later = "0295"
    }else{
        later = "0382"
    }
    
    if (day < 10){
        day = "0" + day
    }
    
    if (month < 10){
        month = "0" + month
    }
    
    var pesel = year.toString().substring(2) + month + day + later + "7";
    localStorage.setItem('pesel', pesel);

    var dataEvent = window['dataReloadEvent'];
    if (dataEvent){
        dataEvent(data);
    }
}

loadData();
async function loadData() {
    var db = await getDb();
    var data = await getData(db, 'data');

    if (data){
        gotNewData(data);
    }

    fetch('/get/card?' + params)
    .then(response => response.json())
    .then(result => {

        result['data'] = 'data';
        if (result !== data){
            gotNewData(result);
            saveData(db, result)
        }

    })
}

loadImage();
async function loadImage() {
    var db = await getDb();
    var image = await getData(db, 'image');

    var imageEvent = window['imageReloadEvent'];

    if (image && imageEvent){
        imageEvent(image.image);
    }

    fetch('/images?' + params)
    .then(response => response.blob())
    .then(result => {
        var reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onload = (event) => {
            var base = event.target.result;

            if (base !== image){
                if (imageEvent){
                    imageEvent(base);
                }

                var data = {
                    data: 'image',
                    image: base
                }

                saveData(db, data)
            }
        }
    })
}

function getDb(){
    return new Promise((resolve, reject) => {
        var request = window.indexedDB.open('fobywatel', 1);

        request.onerror = (event) => {
            reject(event.target.error)
        }

        var name = 'data';

        request.onupgradeneeded = (event) => {
            var db = event.target.result;

            if (!db.objectStoreNames.contains(name)){
                db.createObjectStore(name, {
                    keyPath: name
                })
            }
        }

        request.onsuccess = (event) => {
            var db = event.target.result;
            resolve(db);
        }
    })
}

function getData(db, name){
    return new Promise((resolve, reject) => {
        var store = getStore(db);

        var request = store.get(name);
    
        request.onsuccess = () => {
            var result = request.result;
            if (result){
                resolve(result);
            }else{
                resolve(null);
            }
        }

        request.onerror = (event) => {
            reject(event.target.error)
        }
    });
}

function getStore(db){
    var name = 'data';
    var transaction = db.transaction(name, 'readwrite');
    return transaction.objectStore(name);
}

function saveData(db, data){
    return new Promise((resolve, reject) => {
        var store = getStore(db);

        var request = store.put(data);

        request.onsuccess = () => {
            resolve();
        }

        request.onerror = (event) => {
            reject(event.target.error)
        }
    });
}

function deleteData(db, key){
    return new Promise((resolve, reject) => {
        var store = getStore(db);

        var request = store.delete(key);

        request.onsuccess = () => {
            resolve();
        }

        request.onerror = (event) => {
            reject(event.target.error)
        }
    });
}
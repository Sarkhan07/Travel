function forum() {

let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};

let form = document.querySelector('.main-form'),
    formBottom = document.getElementById('form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');
    
function sendForm(form) {


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        function postData(data) {
            return new Promise (function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
                let formData = new FormData(form);
        
                let obj = {};
                formData.forEach(function(value, key) {
                    obj[key] = value;
                });

                let json = JSON.stringify(obj);
        
                request.addEventListener('readystatechange', function() {
                   if (request.readyState < 4) {
                        resolve();
               } else if(request.readyState === 4 && request.status == 200) {
                        resolve();
                   } else {
                        reject();
                    }
                });

                request.send(json);

               
            });
        } //endpostdata
     

        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        postData(form)
        .then(() => statusMessage.innerHTML = message.success)
        .catch(() => statusMessage.innerHTML = message.failure)
        .then(clearInput);
        
    }); 
   

}

sendForm(form);

sendForm(formBottom);

}

module.exports = forum;
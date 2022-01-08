window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function ShowTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    ShowTabContent(i);
                    break;
                }
            } 
        }
    });


    // Timer

    let deadline = '2022-1-10';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        // hours = Math.floor((t/1000/60/60) % 24);  чтобы еще добавить дни  в таймер.
        // days = Math.floor((t/(1000*60*60*60*24)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeİnterval = setInterval(updateClock, 1000);

        
            function updateClock() {
                let t = getTimeRemaining(endtime);
                
                function addZero(num) {
                    if (num <= 9) {
                        return '0' + num;
                    } else return num;
                }

                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);
             

            if (t.total <= 0) {
                clearInterval(timeİnterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }

        
    }
 }

    setClock('timer', deadline);




    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
        
    });

    // Form promise


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


    //slider

    let slideIndex  = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

        showSlides(slideIndex);

    function showSlides(n) {
        if(n > slides.length) {   // если n больше количество всех слайдов то есть мы перелистали все фотки, то аргумент функции равно одному то есть первому,
            slideIndex = 1;
        }

        if(n < 1 ) {
            slideIndex = slides.length; // а если слайд меньше одного то он slideIndex равно общему количество слайдов т.е последнуму.
        }

        slides.forEach((item) => item.style.display = 'none');
    //    for (let i = 1; i < slides.length; i++) {
    //        slides[i],style.display = 'none';
    //    } old version of first
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
        
        
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n); // когда мы кликаем на четвертую точку на месте n пишется 4, и таким образом slideIndex принимает 4 ку и так выполняется 4 слайд
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) { // здесь мы запускаем цикл на один раз больше
            if(event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }  // если кликаем 4 точку, тогда индекс нашей точки будет 3( с нуля начинается) то сюда в квадратные скобки передается тройка dots[i - 1], и здесь не стыковка потому что мы кликаем на 4 кнопку, а он у нас тройка, и таким образом при кликая 4 точку в дот мы передаем 4 ую и таким образом в в куррентслиде тоже передается четвертая.
        
    });
    
});

    
    

function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0], // здесь получаем первый элемент и поэтому указываем что это нулевой.
        restDays = document.querySelectorAll('.counter-block-input')[1], 
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('input', function() {
            personSum = +this.value; // получаем с помощью this именно persons и его значение и ставим в personSUm
            total = (daysSum + personSum)*40;

            if (restDays.value == '') {  //будем проверять что польщователь количество дней пустым не оставил, а если оставит то в общей сумме будет 0
                totalValue.innerHTML = 0; 
            } else if (persons.value == '') {
                totalValue.innerHTML = 0; //обратное делаем то что, когда удалить инпута тоже все обнулилась
            } else {
                totalValue.innerHTML = total; 
            }
        });

        restDays.addEventListener('input', function() {
            daysSum = +this.value; // получаем с помощью this именно persons и его значение и ставим в personSUm
            total = (daysSum + personSum)*4000;

            if (persons.value == '') {  //будем проверять что пользователь количество дней пустым не оставил, а если оставит то в общей сумме будет 0
                totalValue.innerHTML = 0; 
            } else if (restDays.value == '') {
                totalValue.innerHTML = 0; 
            }else {
                totalValue.innerHTML = total; 
            } 
        });

        place.addEventListener('input', function() {
            if (persons.value == '' || restDays.value == '') { //будем проверять заполнены ли наши поля то все равно будем написать 0
                totalValue.innerHTML = 0;
            } else { //в ином случае будем записать новую функцию
                let a = total; // чтобы избежать потеря данных, мы создаем техническое переменное а то при изменение база   данных наш тотал может не показать то значение
                totalValue.innerHTML = a * this.options[this.selectedIndex].value; // this.options относится к тому опцию которую выбрали, place(select), this.selectedIndex это тот элемент который был выбран и его значение.
                    //то есть тотал умножаем на ту значение
            }
        })


}

module.exports = calc;
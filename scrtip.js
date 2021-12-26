
    //  2) когда метод объекта - this равно самому объекту, ручное присваивание "this" относится к текущему элементу. 
    // "this.value" относится к значению, которое имеет текущий элемент. 
    
    let age = document.getElementById('age');
    
    function showUser(surname, name) {
        alert("User " + surname + " " + name + " , his age " + this.value);
    }

    showUser.apply(age, ["Mammedov", "Ali"]);
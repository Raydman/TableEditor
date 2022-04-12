let newTable = document.querySelector('#editor')
let table2 = document.getElementById('tab');
const switcher = document.querySelector('.btn');


function createTable(parent, cols, rows) { // функция создания таблицы
    let table = document.getElementById('tab');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        tr.id = "row"
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            td.id = "col"
            tr.appendChild(td);
        }
        let button = document.createElement('button'); // создание кнопки удаления в таблице
        button.innerHTML = "X";
        tr.appendChild(button)
        table.appendChild(tr);

        button.addEventListener("click", function (e) { // обработчик события удаления
            let buttonElement = e.target; // элемент который вызвал функцию
            ell = buttonElement.closest("tr"); // tr element 
            ell.parentElement.removeChild(ell)
        });
    }
    parent.appendChild(table);
}

switcher.addEventListener('click', function () { // кнопка вызова функции создания таблицы
    createTable(newTable, 4, 1)
});

table2.addEventListener("click", function (event) { // обработчик события добавления поля редактирования
    let td = event.target.closest("td");
    if (!td) return; // отмена нажатия на другие элементы если нажато одно из полей

    // создать HTML-элемент textarea
    let textarea = document.createElement("textarea");
    textarea.value = td.innerHTML; // «содержимое»
    textarea.classList.add("edit"); // CSS-класс
    textarea.style.width = td.offsetWidth + "px"; // размеры
    textarea.style.height = td.offsetHeight + "px";
    // скрыть из разметки HTML-элемент td
    td.style.display = "none";
    // вставить HTML-элемент textarea после HTML-элемента td
    td.after(textarea);
    // устанавим фокус на HTML-элемент textarea, чтобы сразу набирать текст
    textarea.focus();

    textarea.addEventListener("blur", () => {
        td.innerHTML = textarea.value;
        textarea.remove();
        td.style.display = ""

    })
});

let placeholder = "[{'firstName':'firstName1', 'lastName'='lastName1'...}]"
let jsonInput = document.getElementById('textarea')


jsonInput.addEventListener('click', () => {
    jsonInput.placeholder = "";
})

jsonInput.addEventListener('blur', () => {
    jsonInput.placeholder = placeholder;
})


let myJson = '[{"firstname": "bob", "lastname": "Dilan", "age":"21", "salary":"2000$"}]'
let newData = JSON.parse(myJson);
console.log(newData);
let toJson = [{ firstname: "bob", lastname: "Dilan", age: "21", salary: "2000$" }, { firstname: "dean", lastname: "Dilan", age: "21", salary: "2000$" }]
let updData = JSON.stringify(toJson)
console.log(updData);

let finalData = toJson.map(item => item.firstname)
console.log(finalData);


// //////////////////////////////////////////////////////////////////////////////

let loadButton = document.getElementById('loadButton');

function tableCreate(parent, data) {
    
    let table = document.getElementById('tab');
    data.map((item) => {
        let tr = document.createElement('tr');
        tr.id = "row";
        // for (let i = 0; i < 4; i++) {
        //     let td = document.createElement("td");
        //     td.id = "col"
        //     tr.appendChild(td);
        // }
        tr.innerHTML = `<td id="firstname">${item.firstname}</td>
        <td id="lastname">${item.lastname}</td>
        <td id="age">${item.age}</td>
        <td id="salary">${item.salary}</td>`

        let button = document.createElement('button'); // создание кнопки удаления в таблице
        button.innerHTML = "X";
        tr.appendChild(button)
        table.appendChild(tr);

        button.addEventListener("click", function (e) { // обработчик события удаления
            let buttonElement = e.target; // элемент который вызвал функцию
            ell = buttonElement.closest("tr"); // tr element 
            ell.parentElement.removeChild(ell)
        })
    })
    parent.appendChild(table);
}

// console.log(jsonParser(myJson));
// console.log(typeof(jsonInput.value));

loadButton.addEventListener('click', () => {
    let pushToTable = JSON.parse(jsonInput.value)
    tableCreate(newTable, pushToTable)
})

console.log(table2.rows);

let loadBackButton = document.getElementById('loadBackButton');

function variant2(table) { // Современный синтаксис
    //Массив соответствующий строкам таблицы
    var arrayOfTrValues = [];
    for (let row of table.rows) {
        let obj = {};
        for (let column of row.cells)
            obj[column.getAttribute("name")] = column.textContent;
        arrayOfTrValues.push(obj);
    }
    console.log(arrayOfTrValues);
}


loadBackButton.addEventListener('click', () => {
    variant2(table2)
})
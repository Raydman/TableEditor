// variables and getters

let newTable = document.querySelector('#editor')
let table2 = document.getElementById('tab');
const switcher = document.querySelector('.btn');
let placeholder = '[{"firstname":"firstName1","lastname":"lastName1","age":"21","salary":"1000$"}]'
let jsonInput = document.getElementById('textarea')
let loadButton = document.getElementById('loadButton');
let loadBackButton = document.getElementById('loadBackButton');

// Functions

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

function tableCreate(parent, data) {
    
    let table = document.getElementById('tab');
    data.map((item) => {
        let tr = document.createElement('tr');
        tr.id = "row";
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

const loadFromTable = (table) => {
    let database = [];
    for (let i = 1; (row = table.rows[i]); i++) {
    database.push({
        firstname: row.cells[0].innerText, 
        lastname: row.cells[1].innerText, 
        age: row.cells[2].innerText, 
        salary: row.cells[3].innerText 
    });
    }
    if (database.length > 0) {
        jsonInput.value = JSON.stringify(database);
    }
}

// Event listeners:

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

jsonInput.addEventListener('click', () => {
    jsonInput.placeholder = "";
})

jsonInput.addEventListener('blur', () => {
    jsonInput.placeholder = placeholder;
})

loadButton.addEventListener('click', () => {
    let pushToTable = JSON.parse(jsonInput.value)
    tableCreate(newTable, pushToTable)
})

loadBackButton.addEventListener('click', () => {
    loadFromTable(table2)
})
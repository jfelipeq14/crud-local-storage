//#region 1. Variables
//DOM
const $form = document.querySelector('#form');
const $tableContent = document.querySelector('#tbody');

//DATA
let edit = false;
let index = null;
let arrayStudents = []
//#endregion;

//#region 2. Functions
const createStudent = (student) => {
    let studentObject = {
        name: student.name,
        lastname: student.lastname,
        years: student.years,
    }

    arrayStudents.push(studentObject);
    saveLocalStorage();
}

const editStudent = (student, index) => {
    if (student && index !== null) {
        arrayStudents[index].name = student.name;
        arrayStudents[index].lastname = student.lastname;
        arrayStudents[index].years = student.years;    
        index = null;
        saveLocalStorage();
    }
};

const loadContent = () => {
    $tableContent.innerHTML = '';
    arrayStudents = JSON.parse(localStorage.getItem('students')) || [];
    arrayStudents.forEach(student => {
        $tableContent.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.lastname}</td>
                <td>${student.years}</td>
                <td>
                    <button class="btn btn-info">✏</button>
                    <button class="btn btn-danger">✖</button>
                </td>
            </tr>
        `;
    });
};
//#endregion

//#region 3. LocalStorage
const saveLocalStorage = () => {
    localStorage.setItem('students', JSON.stringify(arrayStudents));
    loadContent();
};

const deleteLocalStorage = (student) => {
    arrayStudents.findIndex((studentObject, index) => {
        if (studentObject.name === student.name && studentObject.lastname === student.lastname && studentObject.years === student.years) {
            arrayStudents.splice(index, 1);
            saveLocalStorage();
            console.log(arrayStudents);
        }
    });
};
//#endregion


//#region 4. Events
document.addEventListener('DOMContentLoaded', loadContent);

$form.addEventListener('submit', (e) => {
    e.preventDefault();

    let student = {
        name: $form.name.value,
        lastname: $form.lastname.value,
        years: $form.years.value
    }

    if (edit && index !== null) {
        editStudent(student, index);
    }else{
        createStudent(student);
    }
    index = null;
    $form.reset();
});


$tableContent.addEventListener('click', (e) => {
    e.preventDefault();
    let row = e.target.parentElement.parentElement;

    if (e.target.classList.contains('btn-info')) {
        edit = true;
        for (let i = 0; i < 4; i++) {
            studentObject = {
                name: row.children[0].innerText,
                lastname: row.children[1].innerText,
                years: row.children[2].innerText,
            }
        }
        if (studentObject) {
            index = arrayStudents.findIndex((student) => student.name === studentObject.name && student.lastname === studentObject.lastname && student.years === studentObject.years);

            $form.name.value = studentObject.name;
            $form.lastname.value = studentObject.lastname;
            $form.years.value = studentObject.years;
        }
    }

    if (e.target.classList.contains('btn-danger')) {
        edit = false;
        for (let i = 0; i < 4; i++) {
            studentObject = {
                name: row.children[0].innerText,
                lastname: row.children[1].innerText,
                years: row.children[2].innerText,
            }
        }
        deleteLocalStorage(studentObject);
        loadContent();
    }
});
//#endregion
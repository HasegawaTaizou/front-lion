"use strict";

const listStudents = async function () {
  const studentsData = "http://localhost:8080/v1/lion-school/cursos/RDS";

  const response = await fetch(studentsData);
  const data = await response.json();

  return {
    image: data.alunos.map((aluno) => aluno.foto),
    name: data.alunos.map((aluno) => aluno.nome),
    status: data.alunos.map((aluno) => aluno.status),
  };
};

const fillStudentsData = async function () {
  const studentsData = await listStudents();

  const studentsContainer = document.querySelector(".students-container");

  let student;
  let studentImage;
  let studentName;

  studentsContainer.innerHTML = "";

  for (let i = 0; i < studentsData.image.length; i++) {
    student = document.createElement("div");
    student.classList.add("student");

    studentImage = document.createElement("img");
    studentImage.classList.add("student__image");
    studentImage.setAttribute("src", studentsData.image[i]);

    studentName = document.createElement("span");
    studentName.classList.add("student__name");
    studentName.textContent = studentsData.name[i];

    if (studentsData.status[i] == "Cursando") {
      student.style.backgroundColor = "#3347B0";
    } else {
      student.style.backgroundColor = "#E5B657";
    }
    student.append(studentImage, studentName);

    studentsContainer.append(student);
  }
};

fillStudentsData();

const fillStudentsStudyingData = async function () {
  const studentsData = await listStudents();

  const studentsContainer = document.querySelector(".students-container");

  let student;
  let studentImage;
  let studentName;

  studentsContainer.innerHTML = "";

  for (let i = 0; i < studentsData.image.length; i++) {
    if (studentsData.status[i] == "Finalizado") {
      student = document.createElement("div");
      student.classList.add("student");

      studentImage = document.createElement("img");
      studentImage.classList.add("student__image");
      studentImage.setAttribute("src", studentsData.image[i]);

      studentName = document.createElement("span");
      studentName.classList.add("student__name");
      studentName.textContent = studentsData.name[i];

      student.style.backgroundColor = "#3347B0";
      student.append(studentImage, studentName);
      studentsContainer.append(student);
    }
  }
};

const fillStudentsFinishedData = async function () {
  const studentsData = await listStudents();

  const studentsContainer = document.querySelector(".students-container");

  let student;
  let studentImage;
  let studentName;

  studentsContainer.innerHTML = "";

  for (let i = 0; i < studentsData.image.length; i++) {
    if (studentsData.status[i] == "Cursando") {
      student = document.createElement("div");
      student.classList.add("student");

      studentImage = document.createElement("img");
      studentImage.classList.add("student__image");
      studentImage.setAttribute("src", studentsData.image[i]);

      studentName = document.createElement("span");
      studentName.classList.add("student__name");
      studentName.textContent = studentsData.name[i];

      student.style.backgroundColor = "#E5B657";
      student.append(studentImage, studentName);
      studentsContainer.append(student);
    }
  }
};

const select = document.querySelector(".status__filter");

const getSelectValue = function () {
  const value = select.options[select.selectedIndex].value;
  console.log(value);
  return value;
};

const filterStudents = function () {
  if (getSelectValue() == "") {
    fillStudentsData();
    console.log("vazio");
  } else if (getSelectValue() == "Cursando") {
    fillStudentsStudyingData();
    console.log("funcao cursando");
  } else if (getSelectValue() == "Finalizado") {
    fillStudentsFinishedData();
    console.log("funcao finalizado");
  }
};

select.addEventListener("change", filterStudents);

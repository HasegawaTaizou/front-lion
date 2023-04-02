"use strict";

const listStudents = async function (acronym) {
  const studentsData = `http://localhost:8080/v1/senai/alunos?curso=${acronym}`;

  const response = await fetch(studentsData);
  const data = await response.json();

  return {
    image: data.alunos.map((aluno) => aluno.foto),
    name: data.alunos.map((aluno) => aluno.nome),
    registration: data.alunos.map((aluno) => aluno.matricula),
    conclusion: data.alunos.map((aluno) =>
      aluno.curso.map((curse) => curse.conclusao)
    ),
    status: data.alunos.map((aluno) => aluno.status),
  };
};

const listStudentsStatus = async function (acronym, status) {
  const studentsData = `http://localhost:8080/v1/senai/alunos?curso=${acronym}&status=${status}`;

  const response = await fetch(studentsData);
  const data = await response.json();

  return {
    image: data.alunos.map((aluno) => aluno.foto),
    name: data.alunos.map((aluno) => aluno.nome),
    registration: data.alunos.map((aluno) => aluno.matricula),
    conclusion: data.alunos.map((aluno) =>
      aluno.curso.map((curse) => curse.conclusao)
    ),
    status: data.alunos.map((aluno) => aluno.status),
  };
};

const listStudentsYear = async function (acronym, year) {
  const studentsData = `http://localhost:8080/v1/senai/alunos?curso=${acronym}&ano=${year}`;

  const response = await fetch(studentsData);
  const data = await response.json();

  return {
    image: data.alunos.map((aluno) => aluno.foto),
    name: data.alunos.map((aluno) => aluno.nome),
    registration: data.alunos.map((aluno) => aluno.matricula),
    conclusion: data.alunos.map((aluno) =>
      aluno.curso.map((curse) => curse.conclusao)
    ),
    status: data.alunos.map((aluno) => aluno.status),
  };
};

const listStudentsStatusYear = async function (acronym, status, year) {
  const studentsData = `http://localhost:8080/v1/senai/alunos?curso=${acronym}&status=${status}&ano=${year}`;

  const response = await fetch(studentsData);
  const data = await response.json();

  return {
    image: data.alunos.map((aluno) => aluno.foto),
    name: data.alunos.map((aluno) => aluno.nome),
    registration: data.alunos.map((aluno) => aluno.matricula),
    conclusion: data.alunos.map((aluno) =>
      aluno.curso.map((curse) => curse.conclusao)
    ),
    status: data.alunos.map((aluno) => aluno.status),
  };
};

const fillCourseTitle = async function () {
  let title = localStorage.getItem("courseName");
  const regexpNumber = /[0-9]/g;
  title = title.replace(regexpNumber, "").replace("-", "").trim();
  let courseTitle = document.querySelector(".course__title");
  courseTitle.textContent = title;
};

fillCourseTitle();

const fillSelectYear = async function () {
  let acronym = localStorage.getItem("acronym");

  const studentsData = await listStudents(acronym);

  let years = [];
  studentsData.conclusion.forEach((item) => {
    years.push(item[0]);
  });

  years.sort();

  const filteredYears = years.filter(
    (year, index) => years.indexOf(year) === index
  );

  const selectYear = document.querySelector(".year__filter");

  let filterField;

  filteredYears.forEach((item) => {
    filterField = document.createElement("option");
    filterField.classList.add("filter__field");
    filterField.setAttribute("value", item);
    filterField.textContent = item;

    selectYear.append(filterField);
  });

  let yearsStudents = [];
  studentsData.conclusion.forEach((item) => {
    yearsStudents.push(item[0]);
  });
};

fillSelectYear();

const statusSelect = document.querySelector(".status__filter");

const getStatusSelectValue = function () {
  const status = statusSelect.options[statusSelect.selectedIndex].value;
  console.log(status);
  return status;
};

const yearSelect = document.querySelector(".year__filter");

const getYearSelectValue = function () {
  const year = yearSelect.options[yearSelect.selectedIndex].value;
  console.log(year);
  return year;
};

const fillStudentsData = async function () {
  let acronym = localStorage.getItem("acronym");

  let studentsData;

  if (getYearSelectValue() != "" && getStatusSelectValue() == "") {
    studentsData = await listStudentsYear(acronym, getYearSelectValue());
    console.log("so ano");
  } else if (getYearSelectValue() == "" && getStatusSelectValue() != "") {
    studentsData = await listStudentsStatus(acronym, getStatusSelectValue());
    console.log("so status");
  } else if (getYearSelectValue() != "" && getStatusSelectValue() != "") {
    console.log("ambos");
    studentsData = await listStudentsStatusYear(
      acronym,
      getStatusSelectValue(),
      getYearSelectValue()
    );
  } else {
    console.log("nenhum");
    studentsData = await listStudents(acronym);
  }

  const studentsContainer = document.querySelector(".students-container");

  let student;
  let studentImage;
  let studentName;

  studentsContainer.innerHTML = "";

  for (let i = 0; i < studentsData.image.length; i++) {
    student = document.createElement("a");
    student.setAttribute("href", "./student.html");
    student.classList.add("student");
    student.dataset.index = i;

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

  const getStudentIndex = function (event) {
    const getRegistrationText = function () {
      localStorage.setItem(
        "registrationNumber",
        studentsData.registration[event.currentTarget.dataset.index]
      );
    };

    getRegistrationText();
  };

  const studentsCards = document.querySelectorAll(".student");
  studentsCards.forEach((studentCard) => {
    studentCard.addEventListener("click", getStudentIndex);
  });
};

fillStudentsData();

statusSelect.addEventListener("change", getStatusSelectValue);
statusSelect.addEventListener("change", fillStudentsData);

yearSelect.addEventListener("change", getYearSelectValue);
yearSelect.addEventListener("change", fillStudentsData);

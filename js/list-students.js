"use strict";

const listStudents = async function (acronym) {
  const studentsData = `http://localhost:8080/v1/lion-school/cursos/${acronym}`;

  const response = await fetch(studentsData);
  const data = await response.json();

  return {
    image: data.alunos.map((aluno) => aluno.foto),
    name: data.alunos.map((aluno) => aluno.nome),
    registration: data.alunos.map((aluno) => aluno.matricula),
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

const fillStudentsData = async function () {
  let acronym = localStorage.getItem("acronym");

  const studentsData = await listStudents(acronym);

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

const fillStudentsStudyingData = async function () {
  let acronym = localStorage.getItem("acronym");

  const studentsData = await listStudents(acronym);

  const studentsContainer = document.querySelector(".students-container");

  let student;
  let studentImage;
  let studentName;

  studentsContainer.innerHTML = "";

  for (let i = 0; i < studentsData.image.length; i++) {
    if (studentsData.status[i] == "Finalizado") {
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

      student.style.backgroundColor = "#3347B0";
      student.append(studentImage, studentName);
      studentsContainer.append(student);
    }
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

const fillStudentsFinishedData = async function () {
  let acronym = localStorage.getItem("acronym");

  const studentsData = await listStudents(acronym);

  const studentsContainer = document.querySelector(".students-container");

  let student;
  let studentImage;
  let studentName;

  studentsContainer.innerHTML = "";

  for (let i = 0; i < studentsData.image.length; i++) {
    if (studentsData.status[i] == "Cursando") {
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

      student.style.backgroundColor = "#E5B657";
      student.append(studentImage, studentName);
      studentsContainer.append(student);
    }
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

const select = document.querySelector(".status__filter");

const getSelectValue = function () {
  const value = select.options[select.selectedIndex].value;
  return value;
};

const filterStudents = function () {
  if (getSelectValue() == "") {
    fillStudentsData();
  } else if (getSelectValue() == "Cursando") {
    fillStudentsStudyingData();
  } else if (getSelectValue() == "Finalizado") {
    fillStudentsFinishedData();
  }
};

select.addEventListener("change", filterStudents);

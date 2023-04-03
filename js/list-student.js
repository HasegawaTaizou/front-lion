"use strict";

const listStudent = async function (registration) {
  const studentData = `http://localhost:8080/v1/lion-school/alunos/${registration}`;

  const response = await fetch(studentData);
  const data = await response.json();

  return {
    image: data.aluno[0].foto,
    name: data.aluno[0].nome,
  };
};

let registration = localStorage.getItem("registrationNumber");

const listStudentSubjects = async function (registration) {
  const studentData = `http://localhost:8080/v1/lion-school/alunos-disciplinas/${registration}`;

  const response = await fetch(studentData);
  const data = await response.json();

  return {
    name: data.disciplinas.map((disciplina) => disciplina.nome),
    average: data.disciplinas.map((disciplina) => disciplina.media),
  };
};

const fillCourseData = async function () {
  const studentSubjectsData = await listStudentSubjects(registration);
  const studentData = await listStudent(registration);

  const studentContainer = document.querySelector(".student-container");

  const studentImage = document.createElement("img");
  studentImage.classList.add("student__image");
  studentImage.setAttribute("src", studentData.image);

  const studentName = document.createElement("span");
  studentName.classList.add("student__name");
  studentName.textContent = studentData.name;

  studentContainer.append(studentImage, studentName);

  let acronyms = [];

  for (let i = 0; i < studentSubjectsData.name.length; i++) {
    let names = studentSubjectsData.name[i];
    names = names.split(" ");

    let acronym = "";

    names.forEach((name) => {
      let separateNames = [];
      separateNames.push(name);

      acronym += separateNames[0][0];
    });

    acronyms.push(acronym.toUpperCase());
  }

  const graphContainer = document.querySelector(".graph-container");

  let subject;
  let subjectGrade;
  let subjectGradeContainer;
  let gradeBar;
  let subjectName;

  for (let i = 0; i < studentSubjectsData.average.length; i++) {
    subject = document.createElement("div");
    subject.classList.add("subject");

    subjectGrade = document.createElement("span");
    subjectGrade.classList.add("subject__grade");
    subjectGrade.textContent = studentSubjectsData.average[i];

    subjectGradeContainer = document.createElement("div");
    subjectGradeContainer.classList.add("subject__grade-container");

    gradeBar = document.createElement("div");
    gradeBar.classList.add("grade__bar");

    subjectGradeContainer.append(gradeBar);

    subjectName = document.createElement("div");
    subjectName.classList.add("subject__name");
    subjectName.textContent = acronyms[i];

    subject.append(subjectGrade, subjectGradeContainer, subjectName);
    graphContainer.append(subject);
  }

  const subjectsGrades = document.querySelectorAll(".subject__grade");

  const gradesBars = document.querySelectorAll(".grade__bar");

  const showVerticalGraph = function () {
    subjectsGrades.forEach((subjectGrade, index) => {
      if (subjectGrade.textContent <= 49) {
        let badGrade = subjectGrade.textContent;
        subjectGrade.style.color = "#C11010";
        gradesBars[index].style.backgroundColor = "#C11010";
        gradesBars[index].style.boxShadow = "0px 0px 24px #C11010";
        gradesBars[index].style.height = `${badGrade}%`;
        gradesBars[index].style.width = "100%";
      } else if (
        subjectGrade.textContent >= 50 &&
        subjectGrade.textContent <= 69
      ) {
        let mediumGrade = subjectGrade.textContent;
        subjectGrade.style.color = "#E5B657";
        gradesBars[index].style.backgroundColor = "#E5B657";
        gradesBars[index].style.boxShadow = "0px 0px 24px #E5B657";
        gradesBars[index].style.height = `${mediumGrade}%`;
        gradesBars[index].style.width = "100%";
      } else {
        let highGrade = subjectGrade.textContent;
        subjectGrade.style.color = "#3347B0";
        gradesBars[index].style.backgroundColor = "#3347B0";
        gradesBars[index].style.boxShadow = "0px 0px 24px #3347B0";
        gradesBars[index].style.height = `${highGrade}%`;
        gradesBars[index].style.width = "100%";
      }
    });
  };

  const showHorizontalGraph = function () {
    subjectsGrades.forEach((subjectGrade, index) => {
      if (subjectGrade.textContent <= 49) {
        let badGrade = subjectGrade.textContent;
        gradesBars[index].style.width = `${badGrade}%`;
        gradesBars[index].style.height = "100%";
      } else if (
        subjectGrade.textContent >= 50 &&
        subjectGrade.textContent <= 69
      ) {
        let mediumGrade = subjectGrade.textContent;
        gradesBars[index].style.width = `${mediumGrade}%`;
        gradesBars[index].style.height = "100%";
      } else {
        let highGrade = subjectGrade.textContent;
        gradesBars[index].style.width = `${highGrade}%`;
        gradesBars[index].style.height = "100%";
      }
    });
  };

  let windowSize = window.matchMedia("(max-width: 600px)");

  const changeGraphMode = function () {
    if (windowSize.matches) {
      showHorizontalGraph();
    } else {
      showVerticalGraph();
    }
  };

  window.addEventListener("resize", changeGraphMode);

  if (windowSize.matches) {
    showHorizontalGraph();
  } else {
    showVerticalGraph();
  }
};

fillCourseData();

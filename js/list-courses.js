"use strict";

const listCourses = async function () {
  const courseData = "http://localhost:8080/v1/lion-school/cursos";

  const response = await fetch(courseData);
  const data = await response.json();

  return {
    name: data.cursos.map((course) => course.nome),
    acronym: data.cursos.map((course) => course.sigla),
    icon: data.cursos.map((course) => course.icone),
  };
};

const fillCourseData = async function () {
  const courseData = await listCourses();

  const coursesContainer = document.querySelector(
    ".choose-course__courses-container"
  );

  let courseCard;
  let courseIcon;
  let cardText;

  for (let i = 0; i < courseData.acronym.length; i++) {
    courseCard = document.createElement("a");
    courseCard.setAttribute("href", "./class.html");
    courseCard.classList.add("course__card");
    courseCard.dataset.index = i;

    cardText = document.createElement("span");
    cardText.classList.add("card__text");
    cardText.textContent = courseData.acronym[i];

    courseCard.classList.add("course__card");

    courseIcon = document.createElement("img");
    courseIcon.classList.add("card__icon");
    courseIcon.setAttribute("src", courseData.icon[i]);

    courseCard.append(courseIcon, cardText);
    coursesContainer.append(courseCard);
  }

  const getCourseCardIndex = function (event) {
    const getAcronymText = function () {
      localStorage.setItem(
        "acronym",
        courseData.acronym[event.currentTarget.dataset.index]
      );

      localStorage.setItem(
        "courseName",
        courseData.name[event.currentTarget.dataset.index]
      );

      console.log(localStorage.getItem("acronym"));
      console.log(localStorage.getItem("courseName"));
    };

    getAcronymText();
  };

  const coursesCards = document.querySelectorAll(".course__card");
  coursesCards.forEach((courseCard) => {
    courseCard.addEventListener("click", getCourseCardIndex);
  });
};

fillCourseData();

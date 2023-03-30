"use strict";

const listCourses = async function () {
  const courseData = "http://localhost:8080/v1/lion-school/cursos";

  const response = await fetch(courseData);
  const data = await response.json();

  return {
    acronym: data.map((course) => course.sigla),
    icon: data.map((course) => course.icone),
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
    courseCard = document.createElement("div");
    courseCard.classList.add("course__card");

    courseCard = document.createElement("div");
    cardText = document.createElement("span");
    cardText.classList.add("card__text");
    cardText.textContent = courseData.acronym[i];
    console.log(cardText);

    courseCard = document.createElement("div");
    courseCard.classList.add("course__card");

    courseIcon = document.createElement("img");
    courseIcon.classList.add("card__icon");
    courseIcon.setAttribute("src", courseData.icon[i]);
    console.log(courseIcon);

    courseCard.append(courseIcon, cardText);
    coursesContainer.append(courseCard);
  }
};

fillCourseData();

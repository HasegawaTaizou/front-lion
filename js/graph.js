const subjectsGrades = document.querySelectorAll(".subject__grade");

const gradesBars = document.querySelectorAll(".grade__bar");

subjectsGrades.forEach((subjectGrade, index) => {
  if (subjectGrade.textContent <= 49) {
    let badGrade = subjectGrade.textContent;
    subjectGrade.style.color = "#C11010";
    gradesBars[index].style.backgroundColor = "#C11010";
    gradesBars[index].style.boxShadow = "0px 0px 24px #C11010";
    gradesBars[index].style.height = `${badGrade}%`;
  } else if (subjectGrade.textContent >= 50 && subjectGrade.textContent <= 69) {
    let mediumGrade = subjectGrade.textContent;
    subjectGrade.style.color = "#E5B657";
    gradesBars[index].style.backgroundColor = "#E5B657";
    gradesBars[index].style.boxShadow = "0px 0px 24px #E5B657";
    gradesBars[index].style.height = `${mediumGrade}%`;
  } else {
    let highGrade = subjectGrade.textContent;
    subjectGrade.style.color = "#3347B0";
    gradesBars[index].style.backgroundColor = "#3347B0";
    gradesBars[index].style.boxShadow = "0px 0px 24px #3347B0";
    gradesBars[index].style.height = `${highGrade}%`;
  }
});

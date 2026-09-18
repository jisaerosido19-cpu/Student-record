/* =====================================================================
   STUDENT RECORDS DATA PROCESSOR — Version 5
   Pure vanilla JavaScript. No HTML, no CSS, no Node-only APIs.
   Senior High strand dataset — different domain from earlier versions.
   ===================================================================== */

/* ---------------------------------------------------------------------
   DATA — 30+ hardcoded student records
   --------------------------------------------------------------------- */
const studentList = [
  { id: 3001, name: "Alistair Bumanglag",  year: 1, course: "STEM",  grades: [90, 94, 88],      enrolled: true  },
  { id: 3002, name: "Beatriz Colonia",     year: 2, course: "STEM",  grades: [77, 80, 75],      enrolled: true  },
  { id: 3003, name: "Cornelio Dagondon",   year: 1, course: "ABM",   grades: [65, 68, 62],      enrolled: false },
  { id: 3004, name: "Delfina Estipona",    year: 3, course: "ABM",   grades: [93, 95, 91, 97],  enrolled: true  },
  { id: 3005, name: "Emmanuel Fajilagot",  year: 2, course: "HUMSS", grades: [82, 85, 79],      enrolled: true  },
  { id: 3006, name: "Felicidad Guanzon",   year: 4, course: "HUMSS", grades: [58, 61, 55],      enrolled: true  },
  { id: 3007, name: "Godofredo Hallasgo",  year: 1, course: "GAS",   grades: [70, 73, 68],      enrolled: false },
  { id: 3008, name: "Honeylyn Ibardolaza", year: 3, course: "GAS",   grades: [96, 98, 94],      enrolled: true  },
  { id: 3009, name: "Ignacio Jaravata",    year: 2, course: "TVL",   grades: [63, 66, 60],      enrolled: true  },
  { id: 3010, name: "Josefina Kalalo",     year: 4, course: "TVL",   grades: [88, 90, 86, 92],  enrolled: true  },
  { id: 3011, name: "Kristian Lomibao",    year: 1, course: "STEM",  grades: [59, 62, 57],      enrolled: true  },
  { id: 3012, name: "Leonora Magbanua",    year: 2, course: "ABM",   grades: [91, 89, 93],      enrolled: false },
  { id: 3013, name: "Marciano Nazareno",   year: 3, course: "HUMSS", grades: [74, 77, 71],      enrolled: true  },
  { id: 3014, name: "Nympha Ordonez",      year: 4, course: "GAS",   grades: [67, 70, 64],      enrolled: true  },
  { id: 3015, name: "Oswaldo Pactolin",    year: 1, course: "TVL",   grades: [95, 97, 93],      enrolled: true  },
  { id: 3016, name: "Purificacion Quimpo", year: 2, course: "STEM",  grades: [84, 86, 82, 88],  enrolled: true  },
  { id: 3017, name: "Reynaldo Rosaroso",   year: 3, course: "ABM",   grades: [61, 64, 58],      enrolled: false },
  { id: 3018, name: "Salvacion Tabotabo",  year: 4, course: "HUMSS", grades: [99, 97, 95],      enrolled: true  },
  { id: 3019, name: "Teofilo Ubaldo",      year: 1, course: "GAS",   grades: [72, 75, 69],      enrolled: true  },
  { id: 3020, name: "Ursula Villaester",   year: 2, course: "TVL",   grades: [86, 88, 84],      enrolled: true  },
  { id: 3021, name: "Vidal Wagas",         year: 3, course: "STEM",  grades: [],                enrolled: true  },
  { id: 3022, name: "Wilfreda Yañez",      year: 4, course: "ABM",   grades: [78, 81, 76],      enrolled: true  },
  { id: 3023, name: "Ximenez Zosa",        year: 1, course: "HUMSS", grades: [64, 67, 61],      enrolled: false },
  { id: 3024, name: "Yolanda Abastillas",  year: 2, course: "GAS",   grades: [92, 94, 90],      enrolled: true  },
  { id: 3025, name: "Zosimo Bacaltos",     year: 3, course: "TVL",   grades: [56, 59, 53],      enrolled: true  },
  { id: 3026, name: "Adoracion Caneja",    year: 4, course: "STEM",  grades: [89, 91, 87],      enrolled: true  },
  { id: 3027, name: "Benigno Dacillo",     year: 1, course: "ABM",   grades: [97, 99, 95],      enrolled: true  },
  { id: 3028, name: "Corazon Empuerto",    year: 2, course: "HUMSS", grades: [60, 63, 57],      enrolled: false },
  { id: 3029, name: "Domingo Fabroa",      year: 3, course: "GAS",   grades: [85, 87, 83, 89],  enrolled: true  },
  { id: 3030, name: "Estrella Gabisan",    year: 4, course: "TVL",   grades: [71, 74, 68],      enrolled: true  },
  { id: 3031, name: "Florencio Habla",     year: 1, course: "STEM",  grades: [80, 82, 78, 84],  enrolled: true  },
];

/* ---------------------------------------------------------------------
   REQUIRED FUNCTIONS
   --------------------------------------------------------------------- */

function getAverageGrade(student) {
  const grades = (student && student.grades) || [];
  if (!Array.isArray(grades) || grades.length === 0) return 0;
  const total = grades.reduce((runningTotal, gradeValue) => runningTotal + gradeValue, 0);
  return total / grades.length;
}

function getTopStudents(dataset, count) {
  if (!Array.isArray(dataset)) {
    throw new Error("getTopStudents: dataset must be an array of student records.");
  }
  if (typeof count !== "number" || Number.isNaN(count) || count < 0) {
    throw new Error("getTopStudents: count must be a non-negative number.");
  }
  const ranked = dataset
    .map((entry) => Object.assign({}, entry, { averageGrade: getAverageGrade(entry) }))
    .sort((first, second) => second.averageGrade - first.averageGrade);
  return ranked.slice(0, count);
}

function groupByCourse(dataset) {
  if (!Array.isArray(dataset)) {
    throw new Error("groupByCourse: dataset must be an array of student records.");
  }
  return dataset.reduce((buckets, entry) => {
    const label = entry.course || "Unlisted";
    const existing = buckets[label] || [];
    return Object.assign({}, buckets, { [label]: existing.concat([entry]) });
  }, {});
}

function getEnrolledCount(dataset) {
  if (!Array.isArray(dataset)) {
    throw new Error("getEnrolledCount: dataset must be an array of student records.");
  }
  const enrolledStudents = dataset.filter((entry) => entry.enrolled === true);
  const notEnrolledStudents = dataset.filter((entry) => entry.enrolled === false);
  return { enrolled: enrolledStudents.length, notEnrolled: notEnrolledStudents.length };
}

function findStudent(dataset, searchName) {
  if (!Array.isArray(dataset)) {
    throw new Error("findStudent: dataset must be an array of student records.");
  }
  if (typeof searchName !== "string" || searchName.trim().length === 0) {
    return null;
  }
  const normalizedQuery = searchName.trim().toLowerCase();
  const matches = dataset.filter((entry) => {
    const normalizedName = (entry.name || "").toLowerCase();
    return normalizedName === normalizedQuery;
  });
  return matches.length > 0 ? matches[0] : null;
}

function getCourseAverages(dataset) {
  if (!Array.isArray(dataset)) {
    throw new Error("getCourseAverages: dataset must be an array of student records.");
  }
  const buckets = groupByCourse(dataset);
  const averagesList = Object.keys(buckets).map((courseName) => {
    const members = buckets[courseName];
    const total = members.reduce((sum, entry) => sum + getAverageGrade(entry), 0);
    const average = members.length > 0 ? total / members.length : 0;
    return { course: courseName, average };
  });
  return averagesList.sort((a, b) => b.average - a.average);
}

function exportSummary(dataset) {
  if (!Array.isArray(dataset)) {
    throw new Error("exportSummary: dataset must be an array of student records.");
  }
  if (dataset.length === 0) {
    return { totalStudents: 0, overallAverage: 0, topStudent: null, courseBreakdown: [] };
  }
  const totalStudents = dataset.length;
  const overallAverage =
    dataset.reduce((sum, entry) => sum + getAverageGrade(entry), 0) / totalStudents;
  const topResults = getTopStudents(dataset, 1);
  const topStudent = topResults.length > 0 ? topResults[0] : null;
  const courseBreakdown = getCourseAverages(dataset);
  return { totalStudents, overallAverage, topStudent, courseBreakdown };
}

/* ---------------------------------------------------------------------
   STRETCH GOALS
   --------------------------------------------------------------------- */

function filterByYear(dataset, targetYear) {
  if (!Array.isArray(dataset)) {
    throw new Error("filterByYear: dataset must be an array of student records.");
  }
  if (typeof targetYear !== "number" || targetYear <= 0) {
    throw new Error("filterByYear: targetYear must be a positive number.");
  }
  return dataset.filter((entry) => entry.year === targetYear);
}

function sortByName(dataset) {
  if (!Array.isArray(dataset)) {
    throw new Error("sortByName: dataset must be an array of student records.");
  }
  return dataset.slice().sort((a, b) => a.name.localeCompare(b.name));
}

/* ---------------------------------------------------------------------
   PRINT HELPERS
   --------------------------------------------------------------------- */

function decimals(value) {
  return Number(value).toFixed(2);
}

function heading(text) {
  console.log("\n" + "#".repeat(50));
  console.log(text);
  console.log("#".repeat(50));
}

/* ---------------------------------------------------------------------
   MAIN
   --------------------------------------------------------------------- */

function main() {
  heading("STUDENT RECORDS ANALYSIS REPORT");
  console.log(`Total students: ${studentList.length}`);
  const overallAvg =
    studentList.reduce((sum, s) => sum + getAverageGrade(s), 0) / studentList.length;
  console.log(`Overall average grade: ${decimals(overallAvg)}`);

  heading("ENROLLMENT STATUS");
  const enrollment = getEnrolledCount(studentList);
  console.log(`Enrolled: ${enrollment.enrolled} | Not enrolled: ${enrollment.notEnrolled}`);

  heading("TOP 5 STUDENTS");
  getTopStudents(studentList, 5).forEach((s, index) => {
    console.log(
      `${index + 1}. ${s.name} (#${s.id}) — ${decimals(s.averageGrade)}, ${s.course} Yr ${s.year}`
    );
  });

  heading("COURSE AVERAGES (HIGH TO LOW)");
  getCourseAverages(studentList).forEach((c) => {
    console.log(`${c.course}: ${decimals(c.average)}`);
  });

  heading("STUDENT COUNT PER COURSE");
  const grouped = groupByCourse(studentList);
  Object.keys(grouped).forEach((course) => {
    console.log(`${course}: ${grouped[course].length}`);
  });

  heading("FIND STUDENT DEMO");
  const foundStudent = findStudent(studentList, "honeylyn ibardolaza");
  console.log(
    `"honeylyn ibardolaza" ->`,
    foundStudent ? `${foundStudent.name} (${foundStudent.course})` : "not found"
  );
  const missingStudent = findStudent(studentList, "Nobody At All");
  console.log(
    `"Nobody At All" ->`,
    missingStudent === null ? "not found (null returned)" : missingStudent
  );

  heading("EDGE CASE: STUDENT WITH NO GRADES");
  const emptyGradesStudent = findStudent(studentList, "Vidal Wagas");
  console.log(
    `${emptyGradesStudent.name}: ${emptyGradesStudent.grades.length} grades, average ${decimals(
      getAverageGrade(emptyGradesStudent)
    )}`
  );

  heading("EDGE CASE: EMPTY ARRAY");
  console.log("getTopStudents([], 3) ->", JSON.stringify(getTopStudents([], 3)));
  console.log("groupByCourse([]) ->", JSON.stringify(groupByCourse([])));
  console.log("getEnrolledCount([]) ->", JSON.stringify(getEnrolledCount([])));
  console.log("getCourseAverages([]) ->", JSON.stringify(getCourseAverages([])));
  console.log("exportSummary([]) ->", JSON.stringify(exportSummary([])));

  heading("EDGE CASE: INVALID INPUT");
  try {
    getTopStudents(studentList, -4);
  } catch (err) {
    console.log(`Caught: ${err.message}`);
  }

  heading("STRETCH: FILTER BY YEAR (Year 4)");
  filterByYear(studentList, 4).forEach((s) => console.log(` - ${s.name}`));

  heading("STRETCH: SORT BY NAME (first 5)");
  sortByName(studentList)
    .slice(0, 5)
    .forEach((s) => console.log(` - ${s.name}`));

  heading("EXPORT SUMMARY");
  const summary = exportSummary(studentList);
  console.log(`Students: ${summary.totalStudents}, Overall avg: ${decimals(summary.overallAverage)}`);
  console.log(`Top student: ${summary.topStudent.name} (${decimals(summary.topStudent.averageGrade)})`);
  summary.courseBreakdown.forEach((c) => console.log(`   ${c.course}: ${decimals(c.average)}`));

  heading("IMMUTABILITY CHECK");
  console.log(`studentList.length unchanged: ${studentList.length}`);
  console.log(`studentList[0] has no averageGrade key: ${!("averageGrade" in studentList[0])}`);

  heading("END OF REPORT");
}

main();
const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql://root:@localhost/sql_intro");
const poke_data = require("./poke_data.json");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .query("INSERT INTO company VALUES(null, 'Google', 'Tech', 10000)")
  .then(function ([result]) {
    console.log(result);
  });
sequelize.query("SELECT * FROM company").then(function ([results, metadata]) {
  console.log(results);
});
sequelize.query("SELECT * FROM company").then(function ([results, metadata]) {
  results.forEach((c) => console.log(c.name));
});

const addStudent = async function (name, isBrilliant) {
  let query = `INSERT INTO student VALUES (null, '${name}', ${isBrilliant})`;
  let result = await sequelize.query(query);
  return result[0];
};

const addTeacher = async function (name, isTenured) {
  let query = `INSERT INTO teacher VALUES (null, '${name}', ${isTenured})`;
  let result = await sequelize.query(query);
  return result[0];
};
const enrollStudent = async function (studentName, teacherName) {
  let studentData = await sequelize.query(
    `SELECT s_id FROM student WHERE s_name = '${studentName}'`
  );
  let teacherData = await sequelize.query(
    `SELECT t_id FROM teacher WHERE t_name = '${teacherName}'`
  );

  let studentId = studentData[0][0].s_id; //assuming names are unique
  let teacherId = teacherData[0][0].t_id; //remember tha we receive both an array of results and our metadata, hence the [0][0]

  //validating both student and teacher exist
  if (!(studentId && teacherId)) {
    return;
  }

  sequelize.query(`
       INSERT INTO student_teacher
        VALUES (${studentId}, ${teacherId})`);
};

sequelize.query(
  `
                UPDATE company 
                SET name='Twitter'WHERE name='Apple'`,
  function (result) {
    console.log(result);
  }
);

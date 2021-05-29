import app from "./app";
import addClass from "./endpoints/addClass";
import addStudentToClass from "./endpoints/addStudentToClass";
import addTeacherToClass from "./endpoints/addTeacherToClass";
import addHobby from "./endpoints/addHobby";
import addSpeciality from "./endpoints/addSpeciality";
import addStudent from "./endpoints/addStudent";
import addTeacher from "./endpoints/addTeacher";
import assignHobbyToStudent from "./endpoints/assignHobbyToStudent";
import assignSpecialityToTeacher from "./endpoints/assignSpecialityToTeacher";
import changeClassModule from "./endpoints/changeClassModule";
import changeStudentClass from "./endpoints/changeStudentClass";
import changeTeacherClass from "./endpoints/changeTeacherClass";
import getClassStudents from "./endpoints/getClassStudents";

// import getClassStudents2 from "./endpoints/getClassStudents2";

import getClassTeachers from "./endpoints/getClassTeachers";
import getStudentAge from "./endpoints/getStudentAge";
import removeStudent from "./endpoints/removeStudent";
import removeStudentFromClass from "./endpoints/removeStudentFromClass";
import removeTeacher from "./endpoints/removeTeacher";
import removeTeacherFromClass from './endpoints/removeTeacherFromClass';
import getTeacherAge from './endpoints/getTeacherAge';


// POST -----------------------------------
// Cadastrar aluno
app.post("/student/create", addStudent);

// Cadastrar profesor
app.post("/teacher/create", addTeacher);

// Cadastrar hobby
app.post("/hobby/create", addHobby);

// Cadastrar especialidade
app.post("/speciality/create", addSpeciality);

// Cadastrar turma
app.post("/class/create", addClass);

// Cadastrar aluno em uma turma
app.post("/student/class/assign", addStudentToClass);

// Cadastrar professor em uma turma
app.post("/teacher/class/assign", addTeacherToClass);


// Atribuir hobby a um estudante
app.post("/student/hobby/assign",assignHobbyToStudent)

// Atribuir especialidade a um professor
app.post("/teacher/speciality/assign",assignSpecialityToTeacher);

// GET -----------------------------------
// Pegar estudante pelo ID
app.get("/student/:id", getStudentAge);

// Pegar professor pelo ID
app.get("/teacher/:id", getTeacherAge);

// Pegar estudantes por turma
app.get("/student/list/:classId", getClassStudents);

// Pegar professores por turma
app.get("/teacher/list/:classId", getClassTeachers);

// PUT -----------------------------------
// Alterar módulo da turma
app.put("/class/module/edit",changeClassModule)

// Alterar turma do aluno
app.put("/student/class/edit", changeStudentClass);

// Alterar turma do professor
app.put("/teacher/class/edit", changeTeacherClass);

// DELETE -----------------------------------
// Remover estudate da base
app.delete("/student/:id/delete",removeStudent);

// Remover professor da base
app.delete("/teacher/:id/delete", removeTeacher);

// Remover estudate da turma
app.delete("/student/:id/class/:classId/delete", removeStudentFromClass);

// Remover professor da turma
app.delete("/teacher/:id/class/:classId/delete", removeTeacherFromClass);








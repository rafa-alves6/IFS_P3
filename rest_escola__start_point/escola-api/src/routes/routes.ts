import { Router } from 'express';

import * as alunoController from '../controllers/alunoController';
import * as tipoCursoController from '../controllers/tipoCursoController';
import * as tipoDisciplinaController from '../controllers/tipoDisciplinaController';
import * as tituloController from '../controllers/tituloController';
import * as instituicaoController from '../controllers/instituicaoController';
import * as cursoController from '../controllers/cursoController';
import * as disciplinaController from '../controllers/disciplinaController';
import * as professorController from '../controllers/professorController';
import * as lecionaController from '../controllers/lecionaController';
import * as cursaController from '../controllers/cursaController';

const router = Router();

// aluno
router.get('/alunos', alunoController.getAlunos);
router.get('/alunos/:id', alunoController.getAlunoById);
router.post('/alunos', alunoController.createAluno);
router.put('/alunos/:id', alunoController.updateAluno);
router.delete('/alunos/:id', alunoController.deleteAluno);

// tipo_curso
router.get('/tipos-curso', tipoCursoController.getTiposCurso);
router.get('/tipos-curso/:id', tipoCursoController.getTipoCursoById);
router.post('/tipos-curso', tipoCursoController.createTipoCurso);
router.put('/tipos-curso/:id', tipoCursoController.updateTipoCurso);
router.delete('/tipos-curso/:id', tipoCursoController.deleteTipoCurso);

// tipo_disciplina
router.get('/tipos-disciplina', tipoDisciplinaController.getTiposDisciplina);
router.get('/tipos-disciplina/:id', tipoDisciplinaController.getTipoDisciplinaById);
router.post('/tipos-disciplina', tipoDisciplinaController.createTipoDisciplina);
router.put('/tipos-disciplina/:id', tipoDisciplinaController.updateTipoDisciplina);
router.delete('/tipos-disciplina/:id', tipoDisciplinaController.deleteTipoDisciplina);

// titulo
router.get('/titulos', tituloController.getTitulos);
router.get('/titulos/:id', tituloController.getTituloById);
router.post('/titulos', tituloController.createTitulo);
router.put('/titulos/:id', tituloController.updateTitulo);
router.delete('/titulos/:id', tituloController.deleteTitulo);

// instituicao
router.get('/instituicoes', instituicaoController.getInstituicoes);
router.get('/instituicoes/:id', instituicaoController.getInstituicaoById);
router.post('/instituicoes', instituicaoController.createInstituicao);
router.put('/instituicoes/:id', instituicaoController.updateInstituicao);
router.delete('/instituicoes/:id', instituicaoController.deleteInstituicao);

// curso
router.get('/cursos', cursoController.getCursos);
router.get('/cursos/:id', cursoController.getCursoById);
router.post('/cursos', cursoController.createCurso);
router.put('/cursos/:id', cursoController.updateCurso);
router.delete('/cursos/:id', cursoController.deleteCurso);

// disciplina
router.get('/disciplinas', disciplinaController.getDisciplinas);
router.get('/disciplinas/:id', disciplinaController.getDisciplinaById);
router.post('/disciplinas', disciplinaController.createDisciplina);
router.put('/disciplinas/:id', disciplinaController.updateDisciplina);
router.delete('/disciplinas/:id', disciplinaController.deleteDisciplina);

// professor
router.get('/professores', professorController.getProfessores);
router.get('/professores/:id', professorController.getProfessorById);
router.post('/professores', professorController.createProfessor);
router.put('/professores/:id', professorController.updateProfessor);
router.delete('/professores/:id', professorController.deleteProfessor);

// leciona
router.get('/leciona', lecionaController.getLeciona);
router.post('/leciona', lecionaController.createLeciona);
router.delete('/leciona/:id_professor/:id_disciplina', lecionaController.deleteLeciona);

// cursa
router.get('/cursa', cursaController.getCursa);
router.post('/cursa', cursaController.createCursa);
router.put('/cursa/:id_aluno/:id_disciplina/:in_ano/:in_semestre', cursaController.updateCursa);
router.delete('/cursa/:id_aluno/:id_disciplina/:in_ano/:in_semestre', cursaController.deleteCursa);

export default router;

# Documentação de Requisições da API

Base URL: `http://localhost:3000/api`

---

### ALUNO

- POST
```bash
curl -X POST "http://localhost:3000/api/alunos" -H "Content-Type: application/json" -d '{"tx_nome": "João Silva", "tx_sexo": "m", "dt_nascimento": "2000-05-15"}'
```

- PUT
```bash
curl -X PUT "http://localhost:3000/api/alunos/1" -H "Content-Type: application/json" -d '{"tx_nome": "João Silva Atualizado", "tx_sexo": "m", "dt_nascimento": "2000-05-15"}'
```

- DELETE
```bash
curl -X DELETE "http://localhost:3000/api/alunos/1"
```

---

### TIPO CURSO

- POST
```bash
curl -X POST "http://localhost:3000/api/tipos-curso" -H "Content-Type: application/json" -d '{"tx_descricao": "Graduação"}'
```

- PUT
```bash
curl -X PUT "http://localhost:3000/api/tipos-curso/1" -H "Content-Type: application/json" -d '{"tx_descricao": "Pós-graduação"}'
```

- DELETE
```bash
curl -X DELETE "http://localhost:3000/api/tipos-curso/1"
```

---

### TIPO DISCIPLINA

- POST
```bash
curl -X POST "http://localhost:3000/api/tipos-disciplina" -H "Content-Type: application/json" -d '{"tx_descricao": "Obrigatória"}'
```

- PUT
```bash
curl -X PUT "http://localhost:3000/api/tipos-disciplina/1" -H "Content-Type: application/json" -d '{"tx_descricao": "Eletiva"}'
```

- DELETE
```bash
curl -X DELETE "http://localhost:3000/api/tipos-disciplina/1"
```

---

### TÍTULO

- POST
```bash
curl -X POST "http://localhost:3000/api/titulos" -H "Content-Type: application/json" -d '{"tx_descricao": "Doutor"}'
```

- PUT
```bash
curl -X PUT "http://localhost:3000/api/titulos/1" -H "Content-Type: application/json" -d '{"tx_descricao": "Mestre"}'
```

- DELETE
```bash
curl -X DELETE "http://localhost:3000/api/titulos/1"
```

---

### INSTITUIÇÃO

- POST
```bash
curl -X POST "http://localhost:3000/api/instituicoes" -H "Content-Type: application/json" -d '{"tx_sigla": "UFS", "tx_descricao": "Universidade Federal de Sergipe"}'
```

- PUT
```bash
curl -X PUT "http://localhost:3000/api/instituicoes/1" -H "Content-Type: application/json" -d '{"tx_sigla": "UNIT", "tx_descricao": "Universidade Tiradentes"}'
```

- DELETE
```bash
curl -X DELETE "http://localhost:3000/api/instituicoes/1"
```

---

### CURSO

- POST
```bash
curl -X POST "http://localhost:3000/api/cursos" -H "Content-Type: application/json" -d '{"id_instituicao": 1, "id_tipo_curso": 1, "tx_descricao": "Ciência da Computação"}'
```

- PUT
```bash
curl -X PUT "http://localhost:3000/api/cursos/1" -H "Content-Type: application/json" -d '{"id_instituicao": 1, "id_tipo_curso": 1, "tx_descricao": "Sistemas de Informação"}'
```

- DELETE
```bash
curl -X DELETE "http://localhost:3000/api/cursos/1"
```

---

### DISCIPLINA

- POST
```bash
curl -X POST "http://localhost:3000/api/disciplinas" -H "Content-Type: application/json" -d '{"id_curso": 1, "id_tipo_disciplina": 1, "tx_sigla": "CALC1", "tx_descricao": "Cálculo I", "in_periodo": 1, "in_carga_horaria": 60}'
```

- PUT
```bash
curl -X PUT "http://localhost:3000/api/disciplinas/1" -H "Content-Type: application/json" -d '{"id_curso": 1, "id_tipo_disciplina": 1, "tx_sigla": "CALC2", "tx_descricao": "Cálculo II", "in_periodo": 2, "in_carga_horaria": 60}'
```

- DELETE
```bash
curl -X DELETE "http://localhost:3000/api/disciplinas/1"
```

---

### PROFESSOR

- POST
```bash
curl -X POST "http://localhost:3000/api/professores" -H "Content-Type: application/json" -d '{"id_titulo": 1, "tx_nome": "Carlos Souza", "tx_sexo": "m", "tx_estado_civil": "c", "dt_nascimento": "1975-03-20", "tx_telefone": "7999999999"}'
```

- PUT
```bash
curl -X PUT "http://localhost:3000/api/professores/1" -H "Content-Type: application/json" -d '{"id_titulo": 2, "tx_nome": "Carlos Souza", "tx_sexo": "m", "tx_estado_civil": "d", "dt_nascimento": "1975-03-20", "tx_telefone": "7988888888"}'
```

- DELETE
```bash
curl -X DELETE "http://localhost:3000/api/professores/1"
```

---

### LECIONA

- POST
```bash
curl -X POST "http://localhost:3000/api/leciona" -H "Content-Type: application/json" -d '{"id_professor": 1, "id_disciplina": 1}'
```

- DELETE
```bash
curl -X DELETE "http://localhost:3000/api/leciona/1/1"
```

---

### CURSA

- POST
```bash
curl -X POST "http://localhost:3000/api/cursa" -H "Content-Type: application/json" -d '{"id_aluno": 1, "id_disciplina": 1, "in_ano": 2025, "in_semestre": 1, "in_faltas": 0, "nm_nota1": 8.5, "nm_nota2": 7.0, "nm_nota3": 9.0, "bl_aprovado": false}'
```

- PUT
```bash
curl -X PUT "http://localhost:3000/api/cursa/1/1/2025/1" -H "Content-Type: application/json" -d '{"in_faltas": 2, "nm_nota1": 8.5, "nm_nota2": 7.0, "nm_nota3": 9.0, "bl_aprovado": true}'
```

- DELETE
```bash
curl -X DELETE "http://localhost:3000/api/cursa/1/1/2025/1"
```

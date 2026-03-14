-- ============================================================
-- DDL - Sistema Escolar 
-- Banco: PostgreSQL
-- ============================================================

-- Tipos de curso
CREATE TABLE tipo_curso (
    id_tipo_curso SERIAL      NOT NULL,
    tx_descricao  VARCHAR(150) NOT NULL,
    CONSTRAINT pk_tipo_curso PRIMARY KEY (id_tipo_curso),
    CONSTRAINT uq_tipo_curso_descricao UNIQUE (tx_descricao)
);

-- Tipos de disciplina
CREATE TABLE tipo_disciplina (
    id_tipo_disciplina SERIAL      NOT NULL,
    tx_descricao       VARCHAR(150) NOT NULL,
    CONSTRAINT pk_tipo_disciplina PRIMARY KEY (id_tipo_disciplina),
    CONSTRAINT uq_tipo_disciplina_descricao UNIQUE (tx_descricao)
);

-- Títulos acadêmicos
CREATE TABLE titulo (
    id_titulo    SERIAL      NOT NULL,
    tx_descricao VARCHAR(150) NOT NULL,
    CONSTRAINT pk_titulo PRIMARY KEY (id_titulo),
    CONSTRAINT uq_titulo_descricao UNIQUE (tx_descricao)
);

-- Instituições de ensino
CREATE TABLE instituicao (
    id_instituicao SERIAL      NOT NULL,
    tx_sigla       VARCHAR(15)  NOT NULL,
    tx_descricao   VARCHAR(150) NOT NULL,
    CONSTRAINT pk_instituicao PRIMARY KEY (id_instituicao),
    CONSTRAINT uq_instituicao_sigla UNIQUE (tx_sigla),
    CONSTRAINT uq_instituicao_descricao UNIQUE (tx_descricao)
);

-- Cursos
CREATE TABLE curso (
    id_curso       SERIAL      NOT NULL,
    id_instituicao INTEGER     NOT NULL,
    id_tipo_curso  INTEGER     NOT NULL,
    tx_descricao   VARCHAR(150) NOT NULL,
    CONSTRAINT pk_curso PRIMARY KEY (id_curso),
    -- UNIQUE composto mencionado no ERD (acrescentado manualmente)
    CONSTRAINT uq_curso UNIQUE (id_instituicao, id_tipo_curso, tx_descricao),
    CONSTRAINT fk_curso_instituicao
        FOREIGN KEY (id_instituicao) REFERENCES instituicao (id_instituicao)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_curso_tipo_curso
        FOREIGN KEY (id_tipo_curso) REFERENCES tipo_curso (id_tipo_curso)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Disciplinas
CREATE TABLE disciplina (
    id_disciplina      SERIAL      NOT NULL,
    id_curso           INTEGER,            -- NULL permitido conforme ERD
    id_tipo_disciplina INTEGER     NOT NULL,
    tx_sigla           VARCHAR(10)  NOT NULL,
    tx_descricao       VARCHAR(150) NOT NULL,
    in_periodo         INTEGER     NOT NULL,
    in_carga_horaria   INTEGER     NOT NULL,
    CONSTRAINT pk_disciplina PRIMARY KEY (id_disciplina),
    CONSTRAINT ck_disciplina_periodo
        CHECK (in_periodo >= 1),
    CONSTRAINT ck_disciplina_carga_horaria
        CHECK (in_carga_horaria >= 40),
    CONSTRAINT fk_disciplina_curso
        FOREIGN KEY (id_curso) REFERENCES curso (id_curso)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_disciplina_tipo_disciplina
        FOREIGN KEY (id_tipo_disciplina) REFERENCES tipo_disciplina (id_tipo_disciplina)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Professores
CREATE TABLE professor (
    id_professor    SERIAL      NOT NULL,
    id_titulo       INTEGER     NOT NULL,
    tx_nome         VARCHAR(50) NOT NULL,
    tx_sexo         CHAR(1)     NOT NULL DEFAULT 'm',
    tx_estado_civil CHAR(1)     NOT NULL DEFAULT 's',
    dt_nascimento   DATE        NOT NULL,
    tx_telefone     VARCHAR(13) NOT NULL,
    CONSTRAINT pk_professor PRIMARY KEY (id_professor),
    CONSTRAINT ck_professor_sexo
        CHECK (tx_sexo IN ('m', 'f')),
    CONSTRAINT ck_professor_estado_civil
        CHECK (tx_estado_civil IN ('s', 'c', 'd')),
    CONSTRAINT fk_professor_titulo
        FOREIGN KEY (id_titulo) REFERENCES titulo (id_titulo)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Alunos
CREATE TABLE aluno (
    id_aluno      SERIAL       NOT NULL,
    tx_nome       VARCHAR(100) NOT NULL,
    tx_sexo       CHAR(1)      NOT NULL,
    dt_nascimento DATE         NOT NULL,
    CONSTRAINT pk_aluno PRIMARY KEY (id_aluno),
    CONSTRAINT ck_aluno_sexo
        CHECK (tx_sexo IN ('m', 'f'))
);

-- Leciona (Professor x Disciplina — N:N)
CREATE TABLE leciona (
    id_professor  INTEGER NOT NULL,
    id_disciplina INTEGER NOT NULL,
    CONSTRAINT pk_leciona PRIMARY KEY (id_professor, id_disciplina),
    CONSTRAINT fk_leciona_professor
        FOREIGN KEY (id_professor) REFERENCES professor (id_professor)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_leciona_disciplina
        FOREIGN KEY (id_disciplina) REFERENCES disciplina (id_disciplina)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Cursa (Aluno x Disciplina — histórico escolar)
CREATE TABLE cursa (
    id_aluno      INTEGER      NOT NULL,
    id_disciplina INTEGER      NOT NULL,
    in_ano        INTEGER      NOT NULL,
    in_semestre   INTEGER      NOT NULL,
    in_faltas     INTEGER      NOT NULL DEFAULT 0,
    nm_nota1      NUMERIC(4,2),
    nm_nota2      NUMERIC(4,2),
    nm_nota3      NUMERIC(4,2),
    bl_aprovado   BOOLEAN      NOT NULL DEFAULT false,
    CONSTRAINT pk_cursa PRIMARY KEY (id_aluno, id_disciplina, in_ano, in_semestre),
    CONSTRAINT ck_cursa_faltas
        CHECK (in_faltas >= 0),
    CONSTRAINT ck_cursa_nota1
        CHECK (nm_nota1 IS NULL OR nm_nota1 >= 0),
    CONSTRAINT ck_cursa_nota2
        CHECK (nm_nota2 IS NULL OR nm_nota2 >= 0),
    CONSTRAINT ck_cursa_nota3
        CHECK (nm_nota3 IS NULL OR nm_nota3 >= 0),
    CONSTRAINT fk_cursa_aluno
        FOREIGN KEY (id_aluno) REFERENCES aluno (id_aluno)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_cursa_disciplina
        FOREIGN KEY (id_disciplina) REFERENCES disciplina (id_disciplina)
        ON UPDATE CASCADE ON DELETE CASCADE
);


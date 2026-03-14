-- ============================================================
-- DML - 10 inserções por tabela
-- Ordem respeitando dependências de FK
-- ============================================================

-- Limpa todas as tabelas respeitando as FKs
TRUNCATE TABLE
    cursa, leciona, aluno, professor,
    disciplina, curso, instituicao,
    titulo, tipo_disciplina, tipo_curso
CASCADE;

-- --------------------------------------------------------
-- tipo_curso
-- --------------------------------------------------------
INSERT INTO tipo_curso (tx_descricao) VALUES
    ('Bacharelado'),
    ('Licenciatura'),
    ('Tecnólogo'),
    ('Especialização'),
    ('Mestrado'),
    ('Doutorado'),
    ('Pós-doutorado'),
    ('Extensão'),
    ('Sequencial'),
    ('MBA');

-- --------------------------------------------------------
-- tipo_disciplina
-- --------------------------------------------------------
INSERT INTO tipo_disciplina (tx_descricao) VALUES
    ('Obrigatória'),
    ('Optativa'),
    ('Eletiva'),
    ('Complementar'),
    ('Estágio'),
    ('TCC'),
    ('Monitoria'),
    ('Pesquisa'),
    ('Extensão Curricular'),
    ('Prática de Ensino');

-- --------------------------------------------------------
-- titulo
-- --------------------------------------------------------
INSERT INTO titulo (tx_descricao) VALUES
    ('Graduado'),
    ('Especialista'),
    ('Mestre'),
    ('Doutor'),
    ('Pós-doutor'),
    ('Livre-docente'),
    ('Professor Titular'),
    ('Pesquisador Sênior'),
    ('Técnico Especializado'),
    ('Professor Adjunto');

-- --------------------------------------------------------
-- instituicao
-- --------------------------------------------------------
INSERT INTO instituicao (tx_sigla, tx_descricao) VALUES
    ('USP',    'Universidade de São Paulo'),
    ('UNICAMP','Universidade Estadual de Campinas'),
    ('UFRJ',   'Universidade Federal do Rio de Janeiro'),
    ('UFMG',   'Universidade Federal de Minas Gerais'),
    ('UNESP',  'Universidade Estadual Paulista'),
    ('UNB',    'Universidade de Brasília'),
    ('UFBA',   'Universidade Federal da Bahia'),
    ('UFPE',   'Universidade Federal de Pernambuco'),
    ('UFRGS',  'Universidade Federal do Rio Grande do Sul'),
    ('UFS',    'Universidade Federal de Sergipe');

-- --------------------------------------------------------
-- curso  (depende: instituicao, tipo_curso)
-- --------------------------------------------------------
INSERT INTO curso (id_instituicao, id_tipo_curso, tx_descricao) VALUES
    (1,  1, 'Ciência da Computação'),
    (2,  1, 'Engenharia Elétrica'),
    (3,  1, 'Medicina'),
    (4,  1, 'Direito'),
    (5,  2, 'Matemática'),
    (6,  3, 'Análise e Desenvolvimento de Sistemas'),
    (7,  1, 'Arquitetura e Urbanismo'),
    (8,  1, 'Administração'),
    (9,  5, 'Ciência da Computação'),
    (10, 1, 'Engenharia de Software');

-- --------------------------------------------------------
-- disciplina  (depende: curso, tipo_disciplina)
-- --------------------------------------------------------
INSERT INTO disciplina (id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria) VALUES
    (1,  1, 'CALC1',  'Cálculo I',                           1, 60),
    (1,  1, 'ALGO1',  'Algoritmos e Estruturas de Dados I',  1, 60),
    (2,  1, 'CIRC1',  'Circuitos Elétricos I',               1, 60),
    (3,  1, 'ANAT1',  'Anatomia Humana',                     1, 80),
    (4,  1, 'CCONS',  'Direito Constitucional',              1, 60),
    (5,  1, 'ALG1',   'Álgebra Linear',                      1, 60),
    (6,  1, 'BD1',    'Banco de Dados I',                    2, 40),
    (7,  1, 'ARQ1',   'Teoria da Arquitetura',               1, 60),
    (8,  1, 'ADMIN1', 'Teoria Geral da Administração',       1, 60),
    (10, 1, 'ENG1',   'Engenharia de Requisitos',            2, 40);

-- --------------------------------------------------------
-- professor  (depende: titulo)
-- --------------------------------------------------------
INSERT INTO professor (id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone) VALUES
    (4, 'Ana Paula Ferreira',    'f', 'c', '1975-03-12', '1199001000101'),
    (3, 'Carlos Eduardo Lima',   'm', 's', '1980-07-22', '2198002000202'),
    (4, 'Fernanda Souza',        'f', 'd', '1970-11-05', '3197003000303'),
    (2, 'Roberto Alves',         'm', 'c', '1985-01-30', '6196004000404'),
    (4, 'Juliana Costa',         'f', 's', '1978-09-14', '7195005000505'),
    (3, 'Marcos Oliveira',       'm', 'c', '1982-04-18', '8194006000606'),
    (5, 'Patrícia Nascimento',   'f', 'c', '1968-12-25', '5193007000707'),
    (4, 'Thiago Mendes',         'm', 's', '1990-06-08', '7992008000808'),
    (1, 'Camila Rodrigues',      'f', 'd', '1995-02-19', '1191009000909'),
    (3, 'Leonardo Santos',       'm', 'c', '1977-08-03', '1190010001010');

-- --------------------------------------------------------
-- aluno
-- --------------------------------------------------------
INSERT INTO aluno (tx_nome, tx_sexo, dt_nascimento) VALUES
    ('Beatriz Carvalho',    'f', '2000-05-10'),
    ('Pedro Henrique Lima', 'm', '1999-11-23'),
    ('Isabela Moreira',     'f', '2001-03-07'),
    ('Gabriel Silva',       'm', '2000-08-15'),
    ('Larissa Pereira',     'f', '1998-12-01'),
    ('Lucas Fernandes',     'm', '2002-04-22'),
    ('Mariana Gomes',       'f', '2001-09-30'),
    ('Rafael Costa',        'm', '1999-06-17'),
    ('Letícia Almeida',     'f', '2003-01-11'),
    ('Felipe Ramos',        'm', '2000-07-28');

-- --------------------------------------------------------
-- leciona  (depende: professor, disciplina)
-- --------------------------------------------------------
INSERT INTO leciona (id_professor, id_disciplina) VALUES
    (1,  1),
    (2,  2),
    (3,  3),
    (4,  4),
    (5,  5),
    (6,  6),
    (7,  7),
    (8,  8),
    (9,  9),
    (10, 10);

-- --------------------------------------------------------
-- cursa  (depende: aluno, disciplina)
-- --------------------------------------------------------
INSERT INTO cursa (id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado) VALUES
    (1,  1, 2024, 1,  4, 7.5,  8.0,  6.5,  true),
    (2,  2, 2024, 1,  2, 9.0,  8.5,  9.5,  true),
    (3,  3, 2024, 1,  6, 6.0,  5.5,  7.0,  true),
    (4,  4, 2024, 1,  0, 10.0, 9.0,  9.5,  true),
    (5,  5, 2024, 1,  8, 5.0,  4.5,  NULL, false),
    (6,  6, 2024, 1,  1, 8.0,  8.5,  9.0,  true),
    (7,  7, 2024, 1,  3, 7.0,  7.5,  8.0,  true),
    (8,  8, 2024, 1,  5, 6.5,  7.0,  6.0,  true),
    (9,  9, 2024, 1,  0, 9.5,  9.0,  10.0, true),
    (10, 10, 2024, 1, 2, 8.5,  NULL, NULL, false);


import type { Request, Response } from 'express';
import { pool } from '../db';

export const getCursa = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM cursa');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const createCursa = async (req: Request, res: Response) => {
    const { id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO cursa (id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [id_aluno, id_disciplina, in_ano, in_semestre, in_faltas || 0, nm_nota1, nm_nota2, nm_nota3, bl_aprovado || false]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const updateCursa = async (req: Request, res: Response) => {
    const { id_aluno, id_disciplina, in_ano, in_semestre } = req.params;
    const { in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado } = req.body;
    try {
        const result = await pool.query(
            'UPDATE cursa SET in_faltas = $1, nm_nota1 = $2, nm_nota2 = $3, nm_nota3 = $4, bl_aprovado = $5 WHERE id_aluno = $6 AND id_disciplina = $7 AND in_ano = $8 AND in_semestre = $9 RETURNING *',
            [in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado, id_aluno, id_disciplina, in_ano, in_semestre]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const deleteCursa = async (req: Request, res: Response) => {
    const { id_aluno, id_disciplina, in_ano, in_semestre } = req.params;
    try {
        const result = await pool.query('DELETE FROM cursa WHERE id_aluno = $1 AND id_disciplina = $2 AND in_ano = $3 AND in_semestre = $4 RETURNING *', [id_aluno, id_disciplina, in_ano, in_semestre]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json({ message: 'Deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

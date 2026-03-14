import type { Request, Response } from 'express';
import { pool } from '../db';

export const getLeciona = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM leciona');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const createLeciona = async (req: Request, res: Response) => {
    const { id_professor, id_disciplina } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO leciona (id_professor, id_disciplina) VALUES ($1, $2) RETURNING *',
            [id_professor, id_disciplina]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const deleteLeciona = async (req: Request, res: Response) => {
    const { id_professor, id_disciplina } = req.params;
    try {
        const result = await pool.query('DELETE FROM leciona WHERE id_professor = $1 AND id_disciplina = $2 RETURNING *', [id_professor, id_disciplina]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json({ message: 'Deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

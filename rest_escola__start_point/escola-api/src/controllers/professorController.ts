import type { Request, Response } from 'express';
import { pool } from '../db';

export const getProfessores = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM professor ORDER BY id_professor ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const getProfessorById = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM professor WHERE id_professor = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const createProfessor = async (req: Request, res: Response) => {
    const { id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO professor (id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const updateProfessor = async (req: Request, res: Response) => {
    const { id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone } = req.body;
    try {
        const result = await pool.query(
            'UPDATE professor SET id_titulo = $1, tx_nome = $2, tx_sexo = $3, tx_estado_civil = $4, dt_nascimento = $5, tx_telefone = $6 WHERE id_professor = $7 RETURNING *',
            [id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const deleteProfessor = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM professor WHERE id_professor = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json({ message: 'Deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

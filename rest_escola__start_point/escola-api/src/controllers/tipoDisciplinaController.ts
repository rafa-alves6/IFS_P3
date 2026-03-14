import type { Request, Response } from 'express';
import { pool } from '../db';

export const getTiposDisciplina = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM tipo_disciplina ORDER BY id_tipo_disciplina ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const getTipoDisciplinaById = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM tipo_disciplina WHERE id_tipo_disciplina = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const createTipoDisciplina = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'INSERT INTO tipo_disciplina (tx_descricao) VALUES ($1) RETURNING *',
            [req.body.tx_descricao]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const updateTipoDisciplina = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'UPDATE tipo_disciplina SET tx_descricao = $1 WHERE id_tipo_disciplina = $2 RETURNING *',
            [req.body.tx_descricao, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const deleteTipoDisciplina = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM tipo_disciplina WHERE id_tipo_disciplina = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json({ message: 'Deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

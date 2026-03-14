import type { Request, Response } from 'express';
import { pool } from '../db';

export const getTiposCurso = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM tipo_curso ORDER BY id_tipo_curso ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar tipos de curso' });
    }
};

export const getTipoCursoById = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM tipo_curso WHERE id_tipo_curso = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar' });
    }
};

export const createTipoCurso = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'INSERT INTO tipo_curso (tx_descricao) VALUES ($1) RETURNING *',
            [req.body.tx_descricao]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar' });
    }
};

export const updateTipoCurso = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'UPDATE tipo_curso SET tx_descricao = $1 WHERE id_tipo_curso = $2 RETURNING *',
            [req.body.tx_descricao, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar' });
    }
};

export const deleteTipoCurso = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM tipo_curso WHERE id_tipo_curso = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json({ message: 'Deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar' });
    }
};

import type { Request, Response } from 'express';
import { pool } from '../db';

export const getTitulos = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM titulo ORDER BY id_titulo ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const getTituloById = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM titulo WHERE id_titulo = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const createTitulo = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('INSERT INTO titulo (tx_descricao) VALUES ($1) RETURNING *', [req.body.tx_descricao]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const updateTitulo = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('UPDATE titulo SET tx_descricao = $1 WHERE id_titulo = $2 RETURNING *', [req.body.tx_descricao, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const deleteTitulo = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM titulo WHERE id_titulo = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json({ message: 'Deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

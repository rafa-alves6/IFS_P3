import type { Request, Response } from 'express';
import { pool } from '../db';

export const getInstituicoes = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM instituicao ORDER BY id_instituicao ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const getInstituicaoById = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM instituicao WHERE id_instituicao = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const createInstituicao = async (req: Request, res: Response) => {
    const { tx_sigla, tx_descricao } = req.body;
    try {
        const result = await pool.query('INSERT INTO instituicao (tx_sigla, tx_descricao) VALUES ($1, $2) RETURNING *', [tx_sigla, tx_descricao]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const updateInstituicao = async (req: Request, res: Response) => {
    const { tx_sigla, tx_descricao } = req.body;
    try {
        const result = await pool.query('UPDATE instituicao SET tx_sigla = $1, tx_descricao = $2 WHERE id_instituicao = $3 RETURNING *', [tx_sigla, tx_descricao, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const deleteInstituicao = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM instituicao WHERE id_instituicao = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json({ message: 'Deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

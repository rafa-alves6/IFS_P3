import type { Request, Response } from 'express';
import { pool } from '../db';

export const getCursos = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM curso ORDER BY id_curso ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const getCursoById = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM curso WHERE id_curso = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const createCurso = async (req: Request, res: Response) => {
    const { id_instituicao, id_tipo_curso, tx_descricao } = req.body;
    try {
        const result = await pool.query('INSERT INTO curso (id_instituicao, id_tipo_curso, tx_descricao) VALUES ($1, $2, $3) RETURNING *', [id_instituicao, id_tipo_curso, tx_descricao]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const updateCurso = async (req: Request, res: Response) => {
    const { id_instituicao, id_tipo_curso, tx_descricao } = req.body;
    try {
        const result = await pool.query('UPDATE curso SET id_instituicao = $1, id_tipo_curso = $2, tx_descricao = $3 WHERE id_curso = $4 RETURNING *', [id_instituicao, id_tipo_curso, tx_descricao, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

export const deleteCurso = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM curso WHERE id_curso = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Não encontrado' });
        res.status(200).json({ message: 'Deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro' });
    }
};

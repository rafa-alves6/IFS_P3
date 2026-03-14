import type { Request, Response } from 'express';
import { pool } from '../db';

export const getAlunos = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM aluno ORDER BY id_aluno ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
};

export const getAlunoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM aluno WHERE id_aluno = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar aluno' });
    }
};

export const createAluno = async (req: Request, res: Response) => {
    const { tx_nome, tx_sexo, dt_nascimento } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO aluno (tx_nome, tx_sexo, dt_nascimento) VALUES ($1, $2, $3) RETURNING *',
            [tx_nome, tx_sexo, dt_nascimento]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar aluno' });
    }
};

export const updateAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { tx_nome, tx_sexo, dt_nascimento } = req.body;
    try {
        const result = await pool.query(
            'UPDATE aluno SET tx_nome = $1, tx_sexo = $2, dt_nascimento = $3 WHERE id_aluno = $4 RETURNING *',
            [tx_nome, tx_sexo, dt_nascimento, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
};

export const deleteAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM aluno WHERE id_aluno = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json({ message: 'Aluno deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar aluno' });
    }
};

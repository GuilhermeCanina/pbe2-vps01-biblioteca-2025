const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    const { ra, nome, telefone } = req.body;
    
    try {
        const aluno = await prisma.aluno.create({
        data: {
            ra,
            nome,
            telefone,
        },
        });
        return res.status(201).json(aluno);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar aluno' });
    }
    }

    const getAll = async (req, res) => {
        try {
            const alunos = await prisma.aluno.findMany();
            return res.status(200).json(alunos);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar alunos' });
        }
    }

    const readOne = async (req, res) => {
        const { ra } = req.params;
        try {
            const aluno = await prisma.aluno.findUnique({
                where: { ra },
                include:{
                    emprestimos:{
                        include:{
                            livro:true,
                        },
                    },
                }
            });
            if (!aluno) {
                return res.status(404).json({ error: 'Aluno não encontrado' });
            }
            return res.status(200).json(aluno);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar aluno' });
        }
    }

    const update = async (req, res) => {
        const { ra } = req.params;
        const { nome, telefone } = req.body;
    
        try {
            const aluno = await prisma.aluno.update({
                where: { ra },
                data: { nome, telefone },
            });
            return res.status(200).json(aluno);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar aluno' });
        }
    }

    const remove = async (req, res) => {
        const { ra } = req.params;
    
        try {
            await prisma.aluno.delete({
                where: { ra },
            });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar aluno' });
        }
    }

module.exports = {
    create,
    getAll,
    readOne,
    update,
    remove,
};

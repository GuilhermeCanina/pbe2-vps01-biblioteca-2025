const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    const { alunoRa, livroId} = req.body;

    try {
        const emprestimo = await prisma.emprestimo.create({
            data: {
                alunoRa,
                livroId,
                retirada: new Date(),
                devolucao: null,
                multa: null
            },
        });
        return res.status(201).json(emprestimo);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar empréstimo' });
    }
};

const getAll = async (req, res) => {
    try {
        const emprestimos = await prisma.emprestimo.findMany({
            include: {
                aluno: true,
                livro: true,
            },
        });
        return res.status(200).json(emprestimos);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar empréstimos' });
    }
}

const readOne = async (req, res) => {
    const { id } = req.params;
    try {
        const emprestimo = await prisma.emprestimo.findUnique({
            where: { id: Number(id) },
            include: {
                aluno: true,
                livro: true,
            },
        });
        if (!emprestimo) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }
        return res.status(200).json(emprestimo);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar empréstimo' });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { devolucao } = req.body;

    try {
        const emprestimo = await prisma.emprestimo.findUnique({
            where: { id: Number(id) }
        });

        if (!emprestimo) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }

        if (!devolucao) {
            return res.status(400).json({ error: 'A data de devolução deve ser informada' });
        }

        const retirada = new Date(emprestimo.retirada);
        const devolucaoDate = new Date(devolucao);
        const diasEmprestado = Math.ceil((devolucaoDate - retirada) / (1000 * 60 * 60 * 24));
        let multa = null;

        if (diasEmprestado > 3) {
            multa = (diasEmprestado - 3) * 10.00;
        }

        const emprestimoAtualizado = await prisma.emprestimo.update({
            where: { id: Number(id) },
            data: { devolucao: devolucaoDate, multa }
        });

        return res.status(200).json(emprestimoAtualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar empréstimo' });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const emprestimo = await prisma.emprestimo.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json(emprestimo);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao remover empréstimo' });
    }
}   

module.exports = {
    create,
    getAll,
    readOne,
    update,
    remove
}
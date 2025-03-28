const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const readone = async (req, res) => {
    const { id } = req.params;
    try {
        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) },
        });
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        return res.status(200).json(livro);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar livro' });
    }
}

const getAll = async (req, res) => {
    try {
        const livros = await prisma.livro.findMany();
        return res.status(200).json(livros);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar livros' });
    }
}

const create = async (req, res) => {
    const { titulo, autor, ano, prateleira } = req.body;
    
    try {
        const livro = await prisma.livro.create({
        data: {
            titulo,
            autor,
            prateleira
        },
        });
        return res.status(201).json(livro);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar livro' });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, prateleira } = req.body;

    try {
        const livro = await prisma.livro.update({
            where: { id: Number(id) },
            data: { titulo, autor, prateleira },
        });
        return res.status(200).json(livro);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.livro.delete({
            where: { id: Number(id) },
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao remover livro' });
    }
}

module.exports = {
    create,
    getAll,
    readone,
    update,
    remove
}


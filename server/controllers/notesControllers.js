const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllNotes = async (req, res) => {
  try {
    const allNotes = await prisma.note.findMany();
    res.json(allNotes);
  } catch (error) {
    console.log(error);
  }
};

const createNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newNote = await prisma.note.create({
      data: {
        title,
        body,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    res.json(newNote);
  } catch (error) {
    console.log(error);
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const updatedNote = await prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        body,
      },
    });
    res.json(updatedNote);
  } catch (error) {
    console.log(error);
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedNote);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllNotes, createNote, updateNote, deleteNote };

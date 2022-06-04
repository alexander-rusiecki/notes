const notes = [
  {
    id: 1,
    text: 'item 1',
  },
  {
    id: 2,
    text: 'item 2',
  },
];

const getAllNotes = async (req, res) => {
  try {
    // const user = await client.users.get(req.user_id);
    res.json(notes);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllNotes };

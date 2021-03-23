import { getComments, addComment } from '../../lib/data';
const comments = async (req, res) => {
  const { slug } = req.query.slug;
  if (req.method === 'GET') {
    const comments = await getComments(slug);
    return res.send(comments);
  }

  if (req.method === 'POST') {
    const comment = {
      userId: 'user-id',
      name: 'The User',
      avatar: 'https://api.adorable.io/avatars/255/the-user@email.png',
      content: req.body.content,
      createdAt: Date.now(),
    };

    await addComment(slug, comment);
    return res.send(comment);
  }

  res.status(404).send('Unsupported Method');
};

export default comments;

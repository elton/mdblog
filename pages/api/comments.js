import { getComments, addComment } from '../../lib/data';
import { getSession } from 'next-auth/client';
const comments = async (req, res) => {
  const { slug } = req.query;

  if (req.method === 'GET') {
    const comments = await getComments(slug);
    return res.send(comments);
  }

  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).send('Unauthenrized');
      return;
    }

    const comment = {
      userID: session.user.id,
      name: session.user.name,
      avatar: session.user.image,
      content: req.body.content,
      createdAt: Date.now(),
    };

    await addComment(slug, comment);
    return res.send(comment);
  }

  res.status(404).send('Unsupported Method');
};

export default comments;

import { getComments, addComment } from '../../lib/data';
import { getSession } from 'next-auth/client';
const comments = async (req, res) => {
  const { slug } = req.query.slug;
  if (req.method === 'GET') {
    const comments = await getComments(slug);
    return res.send(comments);
  }

  if (req.method === 'POST') {
    if (!session) {
      res.status(401).send('Unauthenrized');
      return;
    }

    const comment = {
      userID: session.user.id,
      name: session.user.profile.name,
      avatar: session.user.profile.avatar,
      content: req.body.content,
      createAt: Date.now(),
    };

    await addComment(slug, comment);
    return res.send(comment);
  }

  res.status(404).send('Unsupported Method');
};

export default comments;

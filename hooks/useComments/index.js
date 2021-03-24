import { useQuery } from 'react-query';

const fetchComments = (slug) =>
  fetch(`/api/comments?slug=${slug}`).then((res) => res.json());

// Queries
const useComments = (slug) =>
  useQuery('commentsData', () => fetchComments(slug));

export { fetchComments, useComments };

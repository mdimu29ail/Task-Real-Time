export const getTopics = async () => {
  try {
    const res = await fetch(
      'https://crud-mongo-db-iota.vercel.app/api/topics',
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) throw new Error('Failed to fetch topics');

    const data = await res.json();
    return data; // Contains { topics: [...] }
  } catch (error) {
    console.error('Error loading topics:', error);
    return { topics: [] };
  }
};

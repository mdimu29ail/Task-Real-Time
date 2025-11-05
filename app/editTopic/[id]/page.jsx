// import EditTopicForm from '../../../components/EditTopicForm';

// const getTopicById = async id => {
//   try {
//     const res = await fetch(`https://crud-mongo-db-iota.vercel.app/api/topics/${id}`, {
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       throw new Error('Failed to fetch topic');
//     }

//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default async function EditTopic({ params }) {
//   const { id } = params;
//   const { topic } = await getTopicById(id);
//   const { title, description, image } = topic;

//   return <EditTopicForm id={id} title={title} description={description} />;
// }
import EditTopicForm from '../../../components/EditTopicForm';

const getTopicById = async id => {
  try {
    const res = await fetch(
      `https://crud-mongo-db-iota.vercel.app/api/topics/${id}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      // Throwing an error will be caught by the catch block
      throw new Error('Failed to fetch topic');
    }

    // Assuming the API returns a JSON object like: { topic: { title: '...', ... } }
    return res.json();
  } catch (error) {
    console.log(error);
    // 💡 FIX 1: Always return a consistent object structure,
    // even on failure, to prevent destructuring errors in the component.
    return { topic: null };
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;

  // Destructure the result. It will be { topic: null } on failure.
  const result = await getTopicById(id);
  const { topic } = result || {}; // Safely get 'topic' or default to an empty object

  // 💡 FIX 2: Add a guard clause to handle the case where the topic is missing.
  if (!topic) {
    return (
      <div className="text-center p-10 text-xl text-red-600">
        Error: Could not find topic with ID: **{id}**.
      </div>
    );
  }

  // Safely destructure now that we know 'topic' is valid.
  const { title, description, image } = topic;

  // Make sure to pass the 'image' prop if the form uses it.
  return (
    <EditTopicForm
      id={id}
      title={title}
      description={description}
      image={image}
    />
  );
}

import connectMongoDB from '../../../libs/mongodb';
import Topic from '../../../models/topic';
import { NextResponse } from 'next/server';

// export async function POST(request) {
//   const { title, description, creatorEmail } = await request.json();
//   await connectMongoDB();
//   await Topic.create({
//     title,
//     description,

//     creatorEmail,
//   });
//   return NextResponse.json({ message: 'Topic Created' }, { status: 201 });
// }
export async function GET() {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  // 1. Destructure ONLY the fields that exist in the Topic Mongoose schema.
  const { title, description, image, creatorEmail, creatorPhoto } =
    await request.json();

  try {
    await connectMongoDB();

    await Topic.create({
      title,
      description,
      creatorEmail,
      creatorPhoto,
      image: image || '',
      // Mongoose handles createdAt/updatedAt because of {timestamps: true}.
    });

    return NextResponse.json(
      { message: 'Topic created successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json(
      { message: 'Failed to create topic.', error: error.message },
      { status: 500 }
    );
  }
}

// export async function POST(request) {
//   // 1. Destructure ONLY the fields that exist in the Topic Mongoose schema.
//   const { title, description, image, creatorEmail, creatorPhoto } =
//     await request.json();

//   try {
//     await connectMongoDB();

//     await Topic.create({
//       title,
//       description,
//       creatorEmail,
//       creatorPhoto,
//       image: image || '',
//       // Mongoose handles createdAt/updatedAt because of {timestamps: true}.
//     });

//     return NextResponse.json(
//       { message: 'Topic created successfully.' },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error creating topic:', error);
//     return NextResponse.json(
//       { message: 'Failed to create topic.', error: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Topic deleted' }, { status: 200 });
}

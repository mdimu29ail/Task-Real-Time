import connectMongoDB from '../../../../libs/mongodb';
import Topic from '../../../../models/topic';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: 'Topic updated' }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const topic = await Topic.findOne({ _id: id });
    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topic' },
      { status: 500 }
    );
  }
}

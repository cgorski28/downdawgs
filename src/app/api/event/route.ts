import { NextResponse } from 'next/server';
import { MongoClient, Db } from 'mongodb';
import Event from '@/models/Event';

let cachedDb: Db | null = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(uri);
  const db = await client.db();
  cachedDb = db;
  return db;
}

export async function POST(request: Request) {
  const {
    title,
    description,
    eventDate,
    startTime,
    duration,
    eventType,
    location,
    username,
  } = await request.json();
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  try {
    const event = new Event({
      title,
      description,
      eventDate: new Date(eventDate),
      startTime,
      duration,
      eventType,
      location,
      username,
    });

    const result = await db.collection('events').insertOne(event);
    return NextResponse.json(
      { message: 'Event created successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Event creation failed',
        error: (error as Error).message,
      },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get('year') || '');
  const month = parseInt(searchParams.get('month') || '');

  if (!year || !month) {
    return NextResponse.json(
      { message: 'Missing required parameters' },
      { status: 400 }
    );
  }

  const db = await connectToDatabase(process.env.MONGODB_URI!);

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const events = await db
      .collection('events')
      .find({
        eventDate: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .toArray();

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch events',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

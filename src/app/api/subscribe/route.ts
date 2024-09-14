import { NextResponse } from 'next/server';
import { MongoClient, Db } from 'mongodb';

let cachedDb: Db | null = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(uri);
  const db = await client.db();
  cachedDb = db;
  return db;
}

export async function POST(request: Request) {
  const { email } = await request.json();
  const db = await connectToDatabase(process.env.MONGODB_URI!);
  try {
    const result = await db
      .collection('subscriptions')
      .insertOne({ email, createdAt: new Date() });
    return NextResponse.json(
      { message: 'Subscription successful', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Subscription failed',
        error: (error as Error).message,
      },
      { status: 400 }
    );
  }
}

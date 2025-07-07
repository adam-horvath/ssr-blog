import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  const newData = [
    ...data,
    {
      id: Date.now().toString(),
      title,
      content,
    },
  ];

  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));

  return NextResponse.json(newData);
}

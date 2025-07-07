import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  const newPost = {
    id: Date.now().toString(),
    title,
    content,
  };

  data.push(newPost);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(newPost);
}

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { title, content } = await req.json();
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  const index = data.findIndex((p: any) => p.id === params.id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  data[index] = { ...data[index], title, content };
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(data[index]);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  const index = data.findIndex((p: any) => p.id === params.id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const removed = data.splice(index, 1);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(removed[0]);
}

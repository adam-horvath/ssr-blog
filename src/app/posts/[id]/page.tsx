import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

export default async function PostPage({ params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const posts = JSON.parse(jsonData);

  const post = posts.find((p: any) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}

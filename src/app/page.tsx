import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export default async function HomePage() {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const posts = JSON.parse(jsonData);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>My SSR Blog (App Router)</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

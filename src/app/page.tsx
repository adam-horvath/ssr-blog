import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

import PostFormModal from '@/components/PostFormModal';

export default async function HomePage() {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const posts = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  return (
    <main style={{ padding: '2rem' }}>
      <h1>My Blog</h1>
      <PostFormModal mode="create" />
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            &nbsp;
            <PostFormModal mode="edit" post={post} />
          </li>
        ))}
      </ul>
    </main>
  );
}

import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

import PostFormModal from '@/components/PostFormModal';
import classes from './page.module.scss';

export default async function HomePage() {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const posts = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  return (
    <main style={{ padding: '2rem' }}>
      <div className={'d-flex justify-content-between align-items-center w-100'}>
        <h1>My Blog</h1>
        <PostFormModal mode={'create'} />
      </div>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id} className={classes.PostContainer}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            &nbsp;
            <PostFormModal mode={'edit'} post={post} />
          </li>
        ))}
      </ul>
    </main>
  );
}

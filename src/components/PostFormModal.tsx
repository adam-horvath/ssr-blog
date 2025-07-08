'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Post = {
  id?: string;
  title: string;
  content: string;
};

export enum FormMode {
  CREATE = 'create',
  EDIT = 'edit',
}

interface PostFormModalProps {
  readonly mode: FormMode;
  readonly post?: Post;
}

const PostFormModal = ({ mode, post }: PostFormModalProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(post?.title ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === FormMode.CREATE) {
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (mode === 'edit' && post?.id) {
      await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    setLoading(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <button
        className={`btn ${mode === FormMode.CREATE ? 'btn-primary' : 'btn-sm btn-outline-secondary'}`}
        onClick={() => {
          setTitle('');
          setContent('');
          setOpen(true);
        }}
      >
        {mode === FormMode.CREATE ? 'New Post' : 'Edit'}
      </button>
      {mode === FormMode.EDIT && (
        <button
          className={'btn btn-sm btn-outline-danger ms-2'}
          onClick={() => {
            if (post?.id) {
              fetch(`/api/posts/${post.id}`, {
                method: 'DELETE',
              }).then(() => {
                router.refresh();
              });
            }
          }}
        >
          Delete
        </button>
      )}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              width: '400px',
            }}
          >
            <h2>{mode === FormMode.CREATE ? 'Create New Post' : 'Edit Post'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Title'}
                required
                style={{ width: '100%' }}
              />
              <br />
              <br />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={'Content'}
                required
                style={{ width: '100%' }}
              />
              <br />
              <br />
              <button className={'btn btn-primary'} type={'submit'} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              &nbsp;
              <button className={'btn btn-secondary'} type={'button'} onClick={() => setOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const PostFormModalWrapper = (props: any) => {
  return <PostFormModal {...props} />;
};

export default PostFormModalWrapper;

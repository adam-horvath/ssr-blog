'use client';

export const BackButton = () => {
  return (
    <button className={'btn btn-secondary'} onClick={() => window.history.back()}>
      Back
    </button>
  );
};

import React from 'react';
import loading from '../loading.gif';

export const Loading = () => {
  return (
    <>
      <div className='loading'>
        <img alt='Error!' src={loading} />
      </div>
    </>
  );
};

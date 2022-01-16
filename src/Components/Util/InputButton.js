import React from 'react';

export const InputButton = (props) => {
    return (
        <>
            <input
                style={{
                    display: 'block',
                    width: '100%',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    color: 'inherit',
                    marginRight: '1rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: '0.375rem',
                    fontWeight: '600',
                }}
                className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
                type={'file'}
                {...props}
            />
        </>
    );
};

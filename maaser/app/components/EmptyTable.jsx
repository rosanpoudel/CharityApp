import React from 'react';

export default function EmptyTable({ image, msg }) {
  return (
    <div className="empty-table" style={{ textAlign: 'center' }}>
      <img src={image} />
      <p className="no-data" style={{ marginTop: '7px' }}>
        {msg}
      </p>
    </div>
  );
}

import React, { FC } from 'react';

type AddressViewerProps = {
  address: string;
  role: string;
};

const AddressViewer: FC<AddressViewerProps> = ({ address, role }) => {
  return (
    <div>
      {role} Address : {address}
    </div>
  );
};

export default AddressViewer;

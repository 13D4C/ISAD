// components/CenteredBox.tsx

import React from 'react';

interface CenteredBoxProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

class CenteredBox extends React.Component<CenteredBoxProps> {
  render() {
    const { width = '200px', height = '200px', children } = this.props;

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div
          className="bg-white shadow-lg flex items-center justify-center"
          style={{ width, height }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default CenteredBox;

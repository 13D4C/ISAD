// components/Background.tsx
import React from 'react';

class Background {
  color: string;

  constructor(color: string = 'bg-blue-500') {
    this.color = color;
  }

  render(content: React.ReactNode) {
    return (
      <div className={`${this.color} min-h-screen flex items-center justify-center`}>
        {content}
      </div>
    );
  }
}

export default Background;

import React from 'react';

interface TextDisplayProps {
  heading: any;       // Main heading text
  subHeading?: any;    // Subheading text
  color?: string;        // Optional text color
}

const TextDisplay: React.FC<TextDisplayProps> = ({ heading, subHeading, color = '' }) => {
  console.log({heading,subHeading})
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm" style={{ color: color }}>
        {heading}
      </p>
      <p className="text-xs opacity-50" style={{ color: color }}>
        {subHeading}
      </p>
    </div>
  );
};

export default TextDisplay;
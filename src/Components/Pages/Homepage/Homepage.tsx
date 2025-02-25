import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage: React.FC = () => {
  const videoStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1, // Send video to the background
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
    zIndex: 1, // Above the video, below the content
  };

  return (
    <div>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        style={videoStyle} // Background video styling
      >
        <source src="/videos/3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Overlay */}
      <div style={overlayStyle}></div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2, // Above overlay
          color: 'white',
          textAlign: 'center',
          marginTop: '5rem',
        }}
      >
        
      </div>
    </div>
  );
};

export default Homepage;

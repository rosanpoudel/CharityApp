import React from 'react';
import parse from 'html-react-parser';

const About = ({ description }) => {
  return (
    <div className="tab-contents">
      <div className="about">{parse(description)}</div>
    </div>
  );
};

export default About;

import React from 'react';

const FormGuide = ({ guideImage }) => {
  return (
    <div className="form-guide" style={{ margin: '25px 0 30px 0' }}>
      <img src={guideImage} alt="" />
    </div>
  );
};

export default FormGuide;

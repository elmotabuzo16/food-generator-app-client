import React from 'react';

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <footer>
      <div id='footer-copyright'>
        © {year} Keto Food Generator. All Rights Reserved.
      </div>
      <div id='footer-disclaimer'>
        Keto Food Generator content is for informational and educational
        purposes only. Our website is not intended to be a substitute for
        professional medical advice, diagnosis, or treatment.
      </div>
    </footer>
  );
};

export default Footer;

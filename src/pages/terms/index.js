import React from 'react';
import { Container } from 'react-bootstrap';

const index = () => {
  return (
    <>
      <div className='terms__top text-center mt-4'>
        <h1>Terms of Service</h1>
      </div>
      <div className='terms__main mt-4'>
        <Container>
          <p>
            This Terms of Service Agreement (the "Agreement") is a legal
            agreement between you ("You") and Keto Food Generator, Inc.
            ("Company") for use of the ketofoodgenerator.com website ("Site"),
            the servers the Site is stored on, or the computer files stored on
            that server (collectively, the "Service"). By creating an account or
            accessing or using the Service You accept and agree to be bound by
            the terms of this Agreement.
          </p>
          <p>
            IF YOU DO NOT AGREE TO THESE TERMS, THE COMPANY IS UNWILLING TO
            LICENSE USE OF THE SERVICE TO YOU. YOU AGREE THAT YOUR USE OF THE
            SERVICE ACKNOWLEDGES THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND
            IT, AND AGREE TO BE BOUND BY ITS TERMS AND CONDITIONS.
          </p>
          <p>
            All amended terms automatically take effect 10 days after they are
            initially posted on this site. Your use of the Website following the
            effective date of any modifications to this agreement will
            constitute your acceptance of the agreement, as modified. You agree
            that notice on the Website of modifications is adequate notice.
          </p>
          <p>
            SOLE AND EXCLUSIVE JURISDICTION FOR ANY ACTION OR PROCEEDING ARISING
            OUT OF OR RELATED TO THIS AGREEMENT SHALL BE IN AN APPROPRIATE STATE
            OR FEDERAL COURT LOCATED IN SAN FRANCISCO COUNTY, STATE OF
            CALIFORNIA AND THE PARTIES UNCONDITIONALLY WAIVE THEIR RESPECTIVE
            RIGHTS TO A JURY TRIAL.
          </p>
          <h4>1. Limited License</h4>
        </Container>
      </div>
    </>
  );
};

export default index;

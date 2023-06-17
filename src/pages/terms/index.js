import React from 'react';
import { Container } from 'react-bootstrap';
import { APP_NAME, DOMAIN } from '../../../config';
import Head from 'next/head';
import { withRouter } from 'next/router';

const Terms = ({ router }) => {
  const head = () => (
    <Head>
      <title> Terms and conditions | Keto Food Generator</title>
      <meta
        name='description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <link rel='canonical' href={`${DOMAIN}/${router.pathname}`} />
      <meta
        property='og:title'
        content={`Terms and conditions | Keto Food Generator`}
      />
      <meta
        property='og:description'
        content={`${APP_NAME} - Generate delicious and healthy Filipino Keto Meals in seconds. Our keto meal planner creates personalized meal plans based on your dietary preferences and nutritional goals. Say goodbye to boring and repetitive keto meals and hello to a healthier lifestyle with our easy-to-use keto meal generator.`}
      />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/${router.pathname}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta property='og:image' content={`${DOMAIN}/logo.png`} />
      <meta property='og:image:secure_url' content={`${DOMAIN}/logo.png`} />
      <meta property='og:image:type' content='image/png' />
    </Head>
  );

  return (
    <>
      {head()}
      <Container>
        <div className='mt-4'>
          Thank you for taking the time to read our terms of service. By using
          our service, you agree to comply with all of the terms and conditions
          listed below. If you have any questions or concerns about the service
          or the terms, please do not hesitate to contact us.
        </div>
      </Container>
      <div className='terms__top text-center mt-4'>
        <h1>Terms and Conditions</h1>
      </div>
      <div className='terms__main mt-4'>
        <Container>
          <div className='mb-4'>
            The following terms and conditions govern all use of the Keto Food
            Generator website, mobile applications, and all content, services
            and products available at or through the website and mobile
            applications, including, but not limited to, the{' '}
            <strong>Keto Food Generator</strong>
            subscription service, (taken together, "{' '}
            <strong>Keto Food Generator</strong>"). Keto Food Generator is
            offered subject to your acceptance without modification of all of
            the terms and conditions contained herein and all other operating
            rules, policies (including, without limitation,{' '}
            <strong>Keto Food Generator</strong> Privacy Policy) and procedures
            that may be published from time to time on this Site by{' '}
            <strong>Keto Food Generator</strong>
            (collectively, the “Agreement”).
          </div>
          <div className='mb-4'>
            Please read this Agreement carefully before accessing or using Keto
            Food Generator. By accessing or using any part of the website or
            mobile applications, you agree to become bound by the terms and
            conditions of this agreement. If you do not agree to all the terms
            and conditions of this agreement, then you may not access Keto Food
            Generator or use any services. If these terms and conditions are
            considered an offer by <strong>Keto Food Generator</strong>,
            acceptance is expressly limited to these terms.
          </div>
          <h4 className='mb-3'>1. Your Account.</h4>
          <div className='mb-4'>
            If you create an account on <strong>Keto Food Generator</strong>,
            you are responsible for maintaining the security of your account,
            and you are fully responsible for all activities that occur under
            the account and any other actions taken in connection with{' '}
            <strong>Keto Food Generator</strong>. You must immediately notify{' '}
            <strong>Keto Food Generator</strong> of any unauthorized uses of
            your account or any other breaches of security.{' '}
            <strong>Keto Food Generator</strong> will not be liable for any acts
            or omissions by You, including any damages of any kind incurred as a
            result of such acts or omissions.
          </div>
          <h4 className='mb-3'>2. Responsibility of Contributors.</h4>
          <div className='mb-4'>
            When you submit data, images, files, and other material to Keto Food
            Generator, or otherwise make (or allow any third party to make)
            material available by means of <strong>Keto Food Generator</strong>{' '}
            (any such material, “Content”), You are entirely responsible for the
            content of, and any harm resulting from, that Content. That is the
            case regardless of whether the Content in question constitutes text,
            graphics, an audio file, or computer software. By making content
            available, you represent and warrant that:
          </div>
          <div className='mb-4'>
            <ul>
              <li>
                the downloading, copying and use of the Content will not
                infringe the proprietary rights, including but not limited to
                the copyright, patent, trademark or trade secret rights, of any
                third party;
              </li>
              <li>
                if your employer has rights to intellectual property you create,
                you have either (i) received permission from your employer to
                post or make available the Content, including but not limited to
                any software, or (ii) secured from your employer a waiver as to
                all rights in or to the Content;
              </li>
              <li>
                you have fully complied with any third-party licenses relating
                to the Content, and have done all things necessary to
                successfully pass through to end users any required terms;
              </li>
              <li>
                the Content does not contain or install any viruses, worms,
                malware, Trojan horses or other harmful or destructive content;
              </li>
              <li>
                the Content is not spam, is not machine- or randomly-generated,
                and does not contain unethical or unwanted commercial content
                designed to drive traffic to third party sites or boost the
                search engine rankings of third party sites, or to further
                unlawful acts (such as phishing) or mislead recipients as to the
                source of the material (such as spoofing);
              </li>
              <li>
                the Content is not pornographic, does not contain threats or
                incite violence, and does not violate the privacy or publicity
                rights of any third party;
              </li>
              <li>
                your content is not getting advertised via unwanted electronic
                messages such as spam links on newsgroups, email lists, blogs
                and websites, and similar unsolicited promotional methods; and
              </li>
              <li>
                your content is not named in a manner that misleads your readers
                into thinking that you are another person or company.
              </li>
            </ul>
          </div>

          <h4 className='mb-3'>3. Content Posted on Other Websites.</h4>
          <div className='mb-4'>
            We have not reviewed, and cannot review, all of the material,
            including computer software, made available through the websites and
            webpages to which <strong>Keto Food Generator</strong> links, and
            that link to Keto Food Generator.{' '}
            <strong>Keto Food Generator</strong> does not have any control over
            those non-<strong>Keto Food Generator</strong> websites and
            webpages, and is not responsible for their contents or their use. By
            linking to a non-<strong>Keto Food Generator</strong> website or
            webpage, <strong>Keto Food Generator</strong> does not represent or
            imply that it endorses such website or webpage. You are responsible
            for taking precautions as necessary to protect yourself and your
            computer systems from viruses, worms, Trojan horses, and other
            harmful or destructive content.
          </div>

          <h4 className='mb-3'>4. Advertisements.</h4>
          <div className='mb-4'>
            <strong>Keto Food Generator</strong> reserves the right to display
            advertisements on <strong>Keto Food Generator</strong>.
          </div>

          <h4 className='mb-3'>5. Copyright Infringement and DMCA Policy.</h4>
          <div className='mb-4'>
            As <strong>Keto Food Generator</strong> asks others to respect its
            intellectual property rights, it respects the intellectual property
            rights of others. If you believe that material located on or linked
            to by <strong>Keto Food Generator</strong>
            violates your copyright, you are encouraged to notify{' '}
            <strong>Keto Food Generator</strong>.
            <strong>Keto Food Generator</strong> will respond to all such
            notices, including as required or appropriate by removing the
            infringing material or disabling all links to the infringing
            material. <strong>Keto Food Generator</strong> will terminate a
            visitor’s access to and use of <strong>Keto Food Generator</strong>{' '}
            if, under appropriate circumstances, the visitor is determined to be
            a repeat infringer of the copyrights or other intellectual property
            rights of <strong>Keto Food Generator</strong>
            or others. In the case of such termination,{' '}
            <strong>Keto Food Generator</strong> will have no obligation to
            provide a refund of any amounts previously paid to{' '}
            <strong>Keto Food Generator</strong>.
          </div>

          <h4 className='mb-3'>6. Intellectual Property.</h4>
          <div className='mb-4'>
            This Agreement does not transfer from{' '}
            <strong>Keto Food Generator</strong> to you any{' '}
            <strong>Keto Food Generator</strong> or third party intellectual
            property, and all right, title and interest in and to such property
            will remain (as between the parties) solely with{' '}
            <strong>Keto Food Generator</strong>.{' '}
            <strong>Keto Food Generator</strong>, KetoFoodGenerator.com, the{' '}
            <strong>Keto Food Generator</strong> logo, and all other trademarks,
            service marks, graphics and logos used in connection with{' '}
            <strong>Keto Food Generator</strong> are trademarks or registered
            trademarks Apps’s licensors. Other trademarks, service marks,
            graphics and logos used in connection with{' '}
            <strong>Keto Food Generator</strong> may be the trademarks of other
            third parties. Your use of <strong>Keto Food Generator</strong>{' '}
            grants you no right or license to reproduce or otherwise use any
            third-party trademarks.
          </div>

          <h4 className='mb-3'>7. Termination.</h4>
          <div className='mb-4'>
            Keto Food Generator may terminate your access to all or any part of{' '}
            <strong>Keto Food Generator</strong> at any time, with or without
            cause, with or without notice, effective immediately. If you wish to
            terminate this Agreement or your{' '}
            <strong>Keto Food Generator</strong> account (if you have one), you
            may simply discontinue using <strong>Keto Food Generator</strong>.
            Notwithstanding the foregoing, if you have a Subscription account,
            such account can only be terminated by{' '}
            <strong>Keto Food Generator</strong> if you materially breach this
            Agreement and fail to cure such breach within thirty (30) days from{' '}
            <strong>Keto Food Generator's</strong> notice to you thereof;
            provided that, <strong>Keto Food Generator</strong> can terminate
            the account immediately as part of a general shut down of our
            service. All provisions of this Agreement which by their nature
            should survive termination shall survive termination, including,
            without limitation, ownership provisions, warranty disclaimers,
            indemnity and limitations of liability.
          </div>

          <h4 className='mb-3'>8. Disclaimer of Warranties.</h4>
          <div className='mb-4'>
            <strong>Keto Food Generator</strong> is provided “as is”.{' '}
            <strong>Keto Food Generator</strong> and its suppliers and licensors
            hereby disclaim all warranties of any kind, express or implied,
            including, without limitation, the warranties of merchantability,
            fitness for a particular purpose and non-infringement. Neither{' '}
            <strong>Keto Food Generator</strong> nor its suppliers and
            licensors, makes any warranty that{' '}
            <strong>Keto Food Generator</strong> will be error free or that
            access thereto will be continuous or uninterrupted. You understand
            that you download from, or otherwise obtain content or services
            through, <strong>Keto Food Generator</strong> at your own discretion
            and risk. Information posted on
            <strong>Keto Food Generator</strong> may not be accurate or current.
          </div>

          <h4 className='mb-3'>9. Limitation of Liability.</h4>
          <div className='mb-4'>
            In no event will <strong>Keto Food Generator</strong> , or its
            suppliers or licensors, be liable with respect to any subject matter
            of this agreement under any contract, negligence, strict liability
            or other legal or equitable theory for: (i) any special, incidental
            or consequential damages; (ii) the cost of procurement for
            substitute products or services; (iii) for interruption of use or
            loss or corruption of data; or (iv) for any amounts that exceed the
            fees paid by you to <strong>Keto Food Generator</strong> under this
            agreement during the twelve (12) month period prior to the cause of
            action. <strong>Keto Food Generator</strong> shall have no liability
            for any failure or delay due to matters beyond their reasonable
            control. The foregoing shall not apply to the extent prohibited by
            applicable law.
          </div>

          <h4 className='mb-3'>10. Medical Disclaimer.</h4>
          <div className='mb-4'>
            You are responsible for your own health.{' '}
            <strong>Keto Food Generator</strong> is offered for educational and
            entertainment purposes only, and in no way intends to diagnose,
            cure, or treat any medical or other condition. Always seek the
            advice of your physician or other qualified health provider prior to
            changing your diet or exercise plan and ask your physician any
            questions you may have regarding a medical condition. Although we do
            out absolute best to verify the accuracy of information contained
            herein, we cannot guarantee its accuracy.
          </div>

          <h4 className='mb-3'>11. Permitted Uses</h4>
          <div className='mb-4'>
            If you have a serious medical condition, including but not limited
            to pregnancy, diabetes, high blood pressure, cancer or heart
            disorders, you may not use <strong>Keto Food Generator</strong>{' '}
            without the prior approval and supervision of your physician or
            other licensed healthcare provider. If you suffer from anorexia
            nervosa, bulimia, or other related eating disorders, you are not
            permitted to use <strong>Keto Food Generator</strong>. You must be
            at least 16 years of age to use <strong>Keto Food Generator</strong>
            .
          </div>

          <h4 className='mb-3'>12. General Representation and Warranty.</h4>
          <div className='mb-4'>
            You represent and warrant that (i) your use of{' '}
            <strong>Keto Food Generator</strong> will be in strict accordance
            with the <strong>Keto Food Generator</strong> Privacy Policy, with
            this Agreement and with all applicable laws and regulations
            (including without limitation any local laws or regulations in your
            country, state, city, or other governmental area, regarding online
            conduct and acceptable content, and including all applicable laws
            regarding the transmission of technical data exported from the
            United States or the country in which you reside) and (ii) your use
            of <strong>Keto Food Generator</strong>
            will not infringe or misappropriate the intellectual property rights
            of any third party.
          </div>

          <h4 className='mb-3'>13. Indemnification</h4>
          <div className='mb-4'>
            You agree to indemnify and hold harmless{' '}
            <strong>Keto Food Generator</strong> , its contractors, and its
            licensors, and their respective directors, officers, employees and
            agents from and against any and all claims and expenses, including
            attorneys' fees, arising out of your use of{' '}
            <strong>Keto Food Generator</strong>, including but not limited to
            your violation of this Agreement.
          </div>

          <h4 className='mb-3'>14. Miscellaneous</h4>
          <div className='mb-4'>
            This Agreement constitutes the entire agreement between{' '}
            <strong>Keto Food Generator</strong> and you concerning the subject
            matter hereof, and they may only be modified by a written amendment
            signed by an authorized executive of{' '}
            <strong>Keto Food Generator</strong>, or by the posting by{' '}
            <strong>Keto Food Generator</strong> of a revised version. This
            Agreement will be binding upon and will inure to the benefit of the
            parties, their successors and permitted assigns.
          </div>
        </Container>
      </div>
    </>
  );
};

export default withRouter(Terms);

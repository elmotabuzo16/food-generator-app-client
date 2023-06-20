import Adsense, { AdUnit } from '@eisberg-labs/next-google-adsense';

export default function HorizontalAds() {
  return (
    <>
      <Adsense client_id='ca-pub-7167271672127418' />
      <AdUnit
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client='ca-pub-7167271672127418'
        data-ad-slot='7440591188'
        data-ad-format='auto'
        data-full-width-responsive='true'
        onAdLoaded={() => {
          const adLinks = document.querySelectorAll('.adsbygoogle a');
          adLinks.forEach((link) => {
            link.setAttribute('target', '_blank');
          });
        }}
      />

      {/* <script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7167271672127418'
        crossorigin='anonymous'
      ></script>
      <ins
        class='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client='ca-pub-7167271672127418'
        data-ad-slot='7440591188'
        data-ad-format='auto'
        data-full-width-responsive='true'
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script> */}
    </>
  );
}

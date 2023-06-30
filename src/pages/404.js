import Link from 'next/link';
import { Image } from 'react-bootstrap';

export default function Custom404() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '40vh',
        }}
      >
        <Image src='../../logo_top.png' height={60} />

        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;Page not found. &nbsp;&nbsp;
          <Link href='/'>Click here to go to homepage</Link>
        </span>
      </div>
    </>
  );
}

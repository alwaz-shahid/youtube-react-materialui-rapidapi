import React from 'react';

const AboutPage = () => {
  return (
    <div className='about-page'>
      <h1 className='about-title'>About Page</h1>
      <div>
        <h2>👋 Hello and welcome to my world! 🌟</h2>
        <p>
          When I'm not coding, you can find me exploring the great outdoors,
          sipping on a good cup of coffee, or diving into a captivating book.
          Each experience fuels my creativity and inspires me to bring fresh
          perspectives to my work. Thank you for visiting my website. I hope you
          enjoy exploring the digital wonders I've crafted with passion and
          precision. Feel free to connect with me through my social channels or
          drop me a message—I'd love to hear from you! Happy browsing and happy
          coding! 🚀🌈
        </p>
      </div>
      <div className='whats-new'>
        <h2 className='section-title'>What's new ⭐</h2>
        <ul>
          <li>New Offline Database integration</li>
          <li>Search History</li>
          <li>Like Button</li>
          <li>Loop Button</li>
        </ul>
        <hr className='divider' />
      </div>
      <div className='upcoming'>
        <h2 className='section-title'>Upcoming</h2>
        <ul>
          <li>Like History</li>
          <li>User Profile</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;

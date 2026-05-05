import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-200 h-auto mt-26'>
      <div className='flex mt-26 justify-center gap-6 mx-76 pt-26'>
    <h1 className='text-2xl font-mono'>SPECIALS SIGN UP</h1>
    <input type="email" name="" id="" placeholder='Email Address' className=' border px-2 rounded bg-white h-9 ' />
    <button className='w-32 border 2p rounded font-serif bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black'>Sign Up</button>
      </div>
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content grid-rows-2 p-10 mt-26">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  <nav>
    <h6 className="footer-title">Social</h6>
    <a className="link link-hover">Twitter</a>
    <a className="link link-hover">Instagram</a>
    <a className="link link-hover">Facebook</a>
    <a className="link link-hover">GitHub</a>
  </nav>
  <nav>
    <h6 className="footer-title">Explore</h6>
    <a className="link link-hover">Features</a>
    <a className="link link-hover">Enterprise</a>
    <a className="link link-hover">Security</a>
    <a className="link link-hover">Pricing</a>
  </nav>
  <nav>
    <h6 className="footer-title">Apps</h6>
    <a className="link link-hover">Mac</a>
    <a className="link link-hover">Windows</a>
    <a className="link link-hover">iPhone</a>
    <a className="link link-hover">Android</a>
  </nav>
</footer>
    </div>
  )
}

export default Footer

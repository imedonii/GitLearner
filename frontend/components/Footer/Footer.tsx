// since 2025

import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="py-8 text-center text-slate-400 border-t border-slate-800 bg-slate-900 mt-10">
      <div className="container mx-auto">
        <p className="mb-5">
          © {new Date().getFullYear()} Git Learner. All rights reserved.
        </p>
        <p className="mt-2 text-sm">Powered by</p>
        <Image
          src="https://cre8clarity.vercel.app/assets/Logo-BSkYM-iP.svg"
          alt="Cre8Clarity Logo"
          width={150}
          height={150}
          className="h-8 mx-auto mt-2"
        />
      </div>
    </footer>
  )
}

export default Footer

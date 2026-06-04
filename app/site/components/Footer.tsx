export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">

          {/* Logo */}
          <img
            src="/TemplatesLogoWhite.png"
            alt="Templates Logo"
            width={240}
            height={70}
            className="block"
          />

          {/* NAV COLUMNS */}
          <div
            className="
              grid grid-cols-2 
              md:flex md:flex-row md:gap-16 
              gap-10 w-full md:w-auto
            "
          >

            {/* COMPANY */}
            <div className="col-span-1">
              <a href="/about" className="font-semibold text-sm mb-3 text-white block hover:text-blue-200">
                Company
              </a>
              <ul className="space-y-1 text-blue-200 text-sm">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/services" className="hover:text-white">Services</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div className="col-span-1">
              <a href="/resources" className="font-semibold text-sm mb-3 text-white block hover:text-blue-200">
                Resources
              </a>
              <ul className="space-y-1 text-blue-200 text-sm">
                <li><a href="/setup" className="hover:text-white">Getting Started</a></li>
                <li><a href="/apps" className="hover:text-white">Apps</a></li>
                <li><a href="https://www.method.me/contact-us/" className="hover:text-white">Support</a></li>
              </ul>
            </div>

            {/* FOLLOW US */}
            <div className="col-span-2 md:col-span-1">
              <a href="/contact" className="font-semibold text-sm mb-3 text-white block hover:text-blue-200">
                Follow Us
              </a>
              <div className="flex gap-3 mb-6">
                <a href="#"><img src="/facebookcopyy.png" className="h-6 w-6" alt="Facebook" /></a>
                <a href="#"><img src="/instagramcopy.png" className="h-6 w-6" alt="Instagram" /></a>
                <a href="#"><img src="/xcopyy.png" className="h-6 w-6" alt="X" /></a>
                <a href="#"><img src="/youtubecopy.png" className="h-6 w-8" alt="YouTube" /></a>
              </div>

             
            </div>

          </div>
        </div>

        {/* LEGAL + COPYRIGHT */}
        <div className="mt-8 pt-4 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">

          {/* TERMS + PRIVACY */}
          <div className="flex justify-between sm:justify-start gap-4 text-blue-200 w-full sm:w-auto">
            <a href="/terms" className="hover:text-white">Terms of Service</a>
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
          </div>

          {/* COPYRIGHT */}
          <div className="text-white">
            © {new Date().getFullYear()} Templates — All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}

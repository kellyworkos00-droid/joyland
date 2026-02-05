export default function Footer() {
  return (
    <footer className="bg-spa-900 text-white py-12">
      <div className="container-spa">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">JOYLAND SPA</h3>
            <p className="text-spa-300 text-sm">
              Your ultimate relaxation destination. Book your perfect spa experience today.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-spa-300">
              <li><a href="/" className="hover:text-accent-green transition-colors">Home</a></li>
              <li><a href="/services" className="hover:text-accent-green transition-colors">Services</a></li>
              <li><a href="/about" className="hover:text-accent-green transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-spa-300">
              <li>📞 (555) 123-4567</li>
              <li>📧 info@joylandspa.com</li>
              <li>📍 123 Wellness St, Spa City</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-spa-300">
              <li>Mon-Fri: 9AM - 7PM</li>
              <li>Sat: 10AM - 6PM</li>
              <li>Sun: 10AM - 5PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-spa-800 pt-8 text-center text-spa-300 text-sm">
          <p>&copy; 2024 JOYLAND SPA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

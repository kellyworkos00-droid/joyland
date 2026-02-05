import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-cream via-white to-accent-pink min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-green opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-pink opacity-5 rounded-full blur-3xl"></div>

        <div className="container-spa relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-spa-900 mb-4 leading-tight">
                Welcome to
                <span className="text-accent-green"> JOYLAND SPA</span>
              </h1>
              <p className="text-lg text-spa-700 mb-6">
                Escape the daily grind and indulge in luxurious spa treatments. 
                Book your perfect wellness experience online in just a few clicks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services" className="btn-primary inline-block text-center">
                  Explore Services
                </Link>
                <Link href="/book/1" className="btn-secondary inline-block text-center">
                  Quick Book
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-green mb-2">500+</div>
                  <p className="text-sm text-spa-700">Happy Clients</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-green mb-2">20+</div>
                  <p className="text-sm text-spa-700">Services</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-green mb-2">4.9★</div>
                  <p className="text-sm text-spa-700">Rating</p>
                </div>
              </div>
            </div>

            {/* Right side - Image placeholder */}
            <div className="hidden md:flex justify-center">
              <div className="w-full h-96 bg-gradient-to-br from-accent-green to-accent-pink rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-8xl opacity-30">🧖‍♀️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container-spa">
          <h2 className="section-title">Why Choose JOYLAND SPA?</h2>
          <p className="section-subtitle">Experience luxury and wellness combined</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '⚡', title: 'Easy Booking', desc: 'Book appointments online in seconds' },
              { icon: '👥', title: 'Expert Therapists', desc: 'Highly trained and certified professionals' },
              { icon: '🌿', title: 'Premium Products', desc: 'Natural and organic spa products' },
              { icon: '✨', title: 'Luxury Experience', desc: 'High-end facilities and amenities' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-accent-cream hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-spa-900 mb-2">{item.title}</h3>
                <p className="text-spa-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-green to-accent-pink text-white">
        <div className="container-spa text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Ready to Relax?</h2>
          <p className="text-lg mb-8 opacity-90">Book your appointment today and experience the ultimate spa wellness</p>
          <Link href="/services" className="bg-white text-accent-green px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all inline-block">
            Start Booking Now
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

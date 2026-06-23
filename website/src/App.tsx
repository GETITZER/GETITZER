import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { MessageCircle, Zap } from 'lucide-react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import WhatsAppButton from './components/WhatsAppButton'
import SchemaMarkup from './components/SchemaMarkup'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Industries from './pages/Industries'
import IndustryDetail from './pages/IndustryDetail'
import Configurator from './pages/Configurator'
import RFQ from './pages/RFQ'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import SEODashboard from './pages/SEODashboard'
import About from './pages/About'
import DeliveryFAQ from './pages/DeliveryFAQ'
import Catalog from './pages/Catalog'
import Resources from './pages/Resources'
import Calculators from './pages/Calculators'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import { WA_URL } from './components/WhatsAppButton'
import WelkomSplash from './components/WelkomSplash'
import WelcomePopup from './components/WelcomePopup'

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.isavalvesolutions.com/#organization',
  name: 'ISA Valve Solutions & Industrial Supplies',
  description: 'ISO 9001:2015 certified industrial valve supplier in South Africa. Ball valves, butterfly valves, gate valves, knife gate valves, and pinch valves for mining, water treatment, oil & gas, and chemical industries. 35+ years of precision engineering.',
  url: 'https://www.isavalvesolutions.com',
  telephone: '+27-060-688-5648',
  email: 'isa-valve@outlook.com',
  image: 'https://www.isavalvesolutions.com/images/branding/isa-flow-control-hero.png',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Johannesburg',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -26.2041,
    longitude: 28.0473,
  },
  areaServed: {
    '@type': 'Country',
    name: 'South Africa',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Industrial Valve Products',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Ball Valve', url: 'https://www.isavalvesolutions.com/products/ball-valve' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Butterfly Valve', url: 'https://www.isavalvesolutions.com/products/butterfly-valve' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Gate Valve', url: 'https://www.isavalvesolutions.com/products/gate-valve' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Knife Gate Valve', url: 'https://www.isavalvesolutions.com/products/knife-gate-valve' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Pinch Valve', url: 'https://www.isavalvesolutions.com/products/pinch-valve' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'DXST Slurry Knife Gate Valve', url: 'https://www.isavalvesolutions.com/products/dxst-kgv' } },
    ],
  },
  sameAs: [],
}

/* Sticky mobile bar — shown only on small screens */
function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden"
      style={{ background: 'rgba(4,14,34,0.97)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.07)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-3 gap-0">
        <Link to="/rfq"
          className="flex flex-col items-center gap-0.5 py-3 text-accent-400 hover:bg-white/5 transition-colors"
          style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-lg">📋</span>
          <span className="text-[10px] font-bold">Get Quote</span>
        </Link>
        <Link to="/configure"
          className="flex flex-col items-center gap-0.5 py-3 text-blue-400 hover:bg-white/5 transition-colors"
          style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-bold">AI Selector</span>
        </Link>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-3 text-emerald-400 hover:bg-white/5 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <WelkomSplash />
      <WelcomePopup />
      <SchemaMarkup schema={orgSchema} />
      <div className="min-h-screen flex flex-col pb-14 lg:pb-0">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/products"        element={<Products />} />
            <Route path="/products/:slug"  element={<ProductDetail />} />
            <Route path="/industries"      element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/configure"       element={<Configurator />} />
            <Route path="/configurator"    element={<Configurator />} />
            <Route path="/rfq"             element={<RFQ />} />
            <Route path="/blog"            element={<Blog />} />
            <Route path="/blog/:slug"      element={<BlogPost />} />
            <Route path="/about"           element={<About />} />
            <Route path="/delivery-faq"    element={<DeliveryFAQ />} />
            <Route path="/catalog"         element={<Catalog />} />
            <Route path="/resources"       element={<Resources />} />
            <Route path="/calculators"     element={<Calculators />} />
            <Route path="/seo"             element={<SEODashboard />} />
            <Route path="/projects"        element={<Projects />} />
            <Route path="/dashboard"       element={<Dashboard />} />
            <Route path="/privacy-policy"  element={<PrivacyPolicy />} />
            <Route path="/terms"           element={<Terms />} />
            <Route path="*"                element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
        <WhatsAppButton />
        <MobileStickyBar />
      </div>
    </BrowserRouter>
  )
}

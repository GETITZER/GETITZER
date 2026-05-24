import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ISA Valve Solutions & Industrial Supplies',
  description: 'ISO 9001:2015 certified industrial valve supplier in South Africa. Ball valves, butterfly valves, gate valves, and knife gate valves for mining, water treatment, oil & gas, and chemical industries.',
  url: 'https://www.isa-valve.co.za',
  logo: 'https://www.isa-valve.co.za/logo.png',
  telephone: '+27-000-000-0000',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ZA',
  },
  sameAs: [],
}

export default function App() {
  return (
    <BrowserRouter>
      <SchemaMarkup schema={orgSchema} />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/rfq" element={<RFQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/seo" element={<SEODashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  )
}

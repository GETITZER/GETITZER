import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import RFQ from './pages/RFQ'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/rfq" element={<RFQ />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </BrowserRouter>
  )
}

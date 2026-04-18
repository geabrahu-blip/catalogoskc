import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import FindUs from './components/FindUs';
import { db } from './firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { FaSearch } from 'react-icons/fa';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'inventory'));
        const querySnapshot = await getDocs(q);

        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProducts(productsList.filter(p => p.name));
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = product.name?.toLowerCase().includes(searchLower);
    const brandMatch = product.brand?.toLowerCase().includes(searchLower);
    const categoryMatch = product.category?.toLowerCase().includes(searchLower);
    return nameMatch || brandMatch || categoryMatch;
  });

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">
      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <main className="container mx-auto px-4 py-8">

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar productos, marcas o categorías..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-skc-purple focus:border-transparent text-gray-700 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-skc-purple"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-xl mb-2">No encontramos productos.</p>
            <p className="text-sm">Intenta buscar con otras palabras.</p>
          </div>
        )}

        {/* Find Us Section */}
        <FindUs />

      </main>
    </div>
  );
}

export default App;

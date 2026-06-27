import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductSkeleton from './components/ProductSkeleton';
import CartDrawer from './components/CartDrawer';
import FindUs from './components/FindUs';
import ProductModal from './components/ProductModal';
import { db } from './firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { FaSearch } from 'react-icons/fa';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination states
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check if there is an env configuration, otherwise use mocks.
        // Vite env vars are in import.meta.env
        const hasFirebaseConfig = import.meta.env.VITE_FIREBASE_API_KEY;

        let validProducts = [];

        if (!hasFirebaseConfig || !db) {
          // Si no hay DB configurada, usa mocks para testear localmente el diseño
          console.log("Using mock products because DB is not available.");
          validProducts = [
            {
              id: '1',
              name: 'Sérum Ácido Hialurónico',
              brand: 'Mock Skincare',
              category: 'Sérums',
              presentation: '30 ml',
              sellingPrice: '120.00',
              comparePrice: '150.00',
              image: 'https://via.placeholder.com/300x300?text=Serum',
              skinType: 'Todo tipo de piel',
              benefits: 'Hidratación profunda, rellena arrugas.',
              keyIngredients: 'Ácido Hialurónico, Vitamina B5',
              usage: 'Aplicar 2-3 gotas sobre la piel húmeda antes de cremas.',
            },
            {
              id: '2',
              name: 'Crema Hidratante Básica',
              brand: 'Mock Skincare',
              category: 'Cremas',
              presentation: '50 ml',
              sellingPrice: '80.00',
              image: 'https://via.placeholder.com/300x300?text=Crema',
              // Sin campos de skincare adicionales para testear renderizado condicional
            }
          ];
        } else {
          const q = query(collection(db, 'public_catalog'));
          const querySnapshot = await getDocs(q);
          const productsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          validProducts = productsList.filter(p => p.name);
        }

        setProducts(validProducts);

        // Extract unique categories
        const uniqueCategories = [...new Set(validProducts.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories.sort());

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

  // When searchTerm changes, we want to reset visibleCount to 20, but doing it in useEffect causes a warning.
  // Instead of an effect, we can derive the visible products directly by noticing when the search term changes.
  // We'll manage search term here and reset visibleCount synchronously when it changes.
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(20);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setVisibleCount(20);
  };

  const filteredProducts = products.filter(product => {
    // 1. Filter by category
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // 2. Filter by search term
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = product.name?.toLowerCase().includes(searchLower);
    const brandMatch = product.brand?.toLowerCase().includes(searchLower);
    const categoryMatch = product.category?.toLowerCase().includes(searchLower);
    return nameMatch || brandMatch || categoryMatch;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-skc-background font-sans text-gray-800 pb-20">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <main className="container mx-auto px-4 py-8">

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {visibleProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="bg-skc-card border-2 border-skc-copper text-skc-copper hover:bg-skc-copper hover:text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-sm"
                >
                  Ver más productos
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-500 bg-skc-card rounded-xl shadow-sm border border-skc-copper/10">
            <p className="text-xl mb-2">No encontramos productos.</p>
            <p className="text-sm">Intenta buscar con otras palabras.</p>
          </div>
        )}

        {/* Find Us Section */}
        <FindUs />

      </main>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;

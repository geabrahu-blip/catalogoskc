import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductSkeleton from './components/ProductSkeleton';
import ProductCarousel from './components/ProductCarousel';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import FloatingLocations from './components/FloatingLocations';
import Toast from './components/Toast';
import { db } from './firebase';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import { FaSearch } from 'react-icons/fa';
import { normalizeText } from './utils/textUtils';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [featuredBrands, setFeaturedBrands] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Pagination states
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check if there is an env configuration, otherwise use mocks.
        // Vite env vars are in import.meta.env
        const hasFirebaseConfig = import.meta.env.VITE_FIREBASE_API_KEY;

        let validProducts = [];
        let fetchedFeaturedBrands = [];

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
              createdAt: 1716300000000, // Older
              lastRestockDate: 1718892000000, // Newer than createdAt
            },
            {
              id: '2',
              name: 'Crema Hidratante Básica',
              brand: 'Mock Skincare',
              category: 'Cremas',
              presentation: '50 ml',
              sellingPrice: '80.00',
              image: 'https://via.placeholder.com/300x300?text=Crema',
              createdAt: 1718892000000, // Newer
              lastRestockDate: 1718892000000, // Same as createdAt
              // Sin campos de skincare adicionales para testear renderizado condicional
            }
          ];
        } else {
          // Fetch settings for featured brands
          try {
            const settingsDocRef = doc(db, 'settings', 'catalog_config');
            const settingsDocSnap = await getDoc(settingsDocRef);
            if (settingsDocSnap.exists()) {
              const data = settingsDocSnap.data();
              if (data.featuredBrands && Array.isArray(data.featuredBrands)) {
                fetchedFeaturedBrands = data.featuredBrands;
              }
            }
          } catch (settingsError) {
            console.error("Error fetching settings: ", settingsError);
          }

          const q = query(collection(db, 'public_catalog'));
          const querySnapshot = await getDocs(q);
          const productsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          validProducts = productsList.filter(p => p.name);
        }

        setProducts(validProducts);
        setFeaturedBrands(fetchedFeaturedBrands);

        // Extract unique categories
        const uniqueCategories = [...new Set(validProducts.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories.sort());

        // Extract unique brands
        const uniqueBrands = [...new Set(validProducts.map(p => p.brand).filter(Boolean))];
        setBrands(uniqueBrands.sort());

      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product, fromDetails = false) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Show toast
    const message = fromDetails
      ? '¡Producto añadido desde detalles al carrito!'
      : '¡Producto añadido al carrito!';

    setToastMessage(message);
    setIsToastVisible(true);
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

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setVisibleCount(20);
  };

  const filteredProducts = products.filter(product => {
    // 1. Filter by brand
    if (selectedBrand && product.brand !== selectedBrand) {
      return false;
    }

    // 2. Filter by category
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // 3. Filter by search term
    if (!searchTerm) return true;

    // Normalize search term and product fields to improve matching
    const searchNorm = normalizeText(searchTerm);
    if (!searchNorm) return true; // If search term normalizes to empty, don't filter out

    const nameNorm = normalizeText(product.name);
    const brandNorm = normalizeText(product.brand);
    const categoryNorm = normalizeText(product.category);

    const nameMatch = nameNorm.includes(searchNorm);
    const brandMatch = brandNorm.includes(searchNorm);
    const categoryMatch = categoryNorm.includes(searchNorm);

    return nameMatch || brandMatch || categoryMatch;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isPureState = !searchTerm && !selectedCategory && !selectedBrand;

  const newArrivals = [...products]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 10);

  const restockedItems = [...products]
    .filter(p => p.lastRestockDate && p.createdAt && p.lastRestockDate > p.createdAt)
    .sort((a, b) => (b.lastRestockDate || 0) - (a.lastRestockDate || 0))
    .slice(0, 10);

  // Generar datos para los carruseles por marca dinámica
  const featuredBrandCarousels = featuredBrands.map(brandName => {
    const brandProducts = [...products]
      .filter(p => p.brand === brandName)
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      .slice(0, 4); // Tomar los 4 más recientes

    return {
      brandName,
      products: brandProducts
    };
  }).filter(carousel => carousel.products.length > 0); // No renderizar si no hay productos

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
        brands={brands}
        selectedBrand={selectedBrand}
        onBrandSelect={handleBrandSelect}
        searchResults={searchTerm ? visibleProducts.slice(0, 5) : []}
        onProductSelect={(product) => {
          setSelectedProduct(product);
          // Optional: clear search term if desired, but keeping it is fine too.
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <main className="container mx-auto px-4 py-8">

        {/* Carousels (Only on initial state) */}
        {isPureState && !loading && (
          <div className="mb-8 flex flex-col gap-2">
            <ProductCarousel
              title="✨ Novedades"
              products={newArrivals}
              onAddToCart={handleAddToCart}
              onViewDetails={setSelectedProduct}
            />

            {/* Carruseles dinámicos por marca */}
            {featuredBrandCarousels.map((carousel, index) => (
              <ProductCarousel
                key={`brand-carousel-${index}`}
                title={`✨ Novedades en ${carousel.brandName}`}
                products={carousel.products}
                brandName={carousel.brandName}
                onViewAll={setSelectedBrand}
                onAddToCart={handleAddToCart}
                onViewDetails={setSelectedProduct}
              />
            ))}

            <ProductCarousel
              title="📦 ¡Volvieron!"
              products={restockedItems}
              onAddToCart={handleAddToCart}
              onViewDetails={setSelectedProduct}
            />
          </div>
        )}

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
                  className="bg-gradient-to-r from-skc-purple to-skc-purple-dark border-2 border-white/20 text-white hover:opacity-90 font-bold py-3 px-8 rounded-full transition-opacity duration-300 shadow-sm"
                >
                  Ver más productos
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-300 bg-gradient-to-br from-skc-purple to-skc-purple-dark rounded-xl shadow-sm border border-white/10">
            <p className="text-xl mb-2 text-white">No encontramos productos.</p>
            <p className="text-sm">Intenta buscar con otras palabras.</p>
          </div>
        )}

      </main>

      <FloatingLocations />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}

export default App;

// ============================================
// PRODUCT PAGE v2.0 - REDESIGN COMPLET
// Page produit premium avec tous les détails
// ============================================

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Heart, Share2, ShoppingBag, Shield, Truck, RefreshCw,
  Star, MapPin, MessageCircle, ChevronRight, CheckCircle,
  AlertCircle, Package, Award, TrendingUp, Eye, Clock
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';
import ProductImageGallery from '../components/product/ProductImageGallery';
import SellerCard from '../components/product/SellerCard';
import ProductReviews from '../components/product/ProductReviews';
import TrustBadges from '../components/product/TrustBadges';
import ProductCard from '../components/home/ProductCard';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data
  useEffect(() => {
    setLoading(true);
    
    // Simuler un chargement API
    setTimeout(() => {
      setProduct({
        id: parseInt(id),
        title: "Nike Air Max 90 - Édition Limitée",
        brand: "Nike",
        price: 89.99,
        originalPrice: 149.99,
        condition: "Comme neuf",
        stock: 3,
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"
        ],
        description: `Découvrez les iconiques Nike Air Max 90 dans cette édition limitée. 
        
Caractéristiques :
• Condition : Comme neuf, portées 2 fois
• Matière : Cuir premium et mesh respirant
• Technologie Air Max visible pour un confort optimal
• Semelle extérieure en caoutchouc durable
• Coloris : Blanc/Noir/Rouge

Ces sneakers iconiques allient style intemporel et confort exceptionnel. Parfaites pour un usage quotidien ou pour compléter votre collection.`,
        
        sizes: ['38', '39', '40', '41', '42', '43'],
        colors: ['Blanc/Noir', 'Noir/Blanc', 'Rouge/Blanc'],
        
        seller: {
          id: 1,
          name: "Sophie Martin",
          avatar: "https://i.pravatar.cc/150?img=5",
          rating: 4.8,
          reviewCount: 127,
          verifiedSeller: true,
          responseTime: "2h",
          memberSince: "2022-03-15"
        },
        
        reviews: [
          {
            id: 1,
            user: "Marie L.",
            rating: 5,
            comment: "Produit conforme à la description, expédition rapide !",
            date: "2024-01-15",
            helpful: 12
          },
          {
            id: 2,
            user: "Thomas D.",
            rating: 4,
            comment: "Très bon état, légères traces d'usure mais rien de grave.",
            date: "2024-01-10",
            helpful: 8
          },
          {
            id: 3,
            user: "Julie R.",
            rating: 5,
            comment: "Parfait ! Vendeur sérieux et article impeccable.",
            date: "2024-01-05",
            helpful: 15
          }
        ],

        relatedProducts: [] // À remplir avec des produits similaires
      });
      
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600 font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Produit non trouvé</h2>
          <p className="text-neutral-600 mb-6">Ce produit n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isProductFavorite = isFavorite(product.id);

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Produit en rupture de stock');
      return;
    }
    
    addToCart(product, quantity);
    toast.success('Ajouté au panier ! 🛍️');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    toast.success(isProductFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris ❤️');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-fluid mx-auto py-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Link to="/" className="hover:text-primary-600 transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/category/chaussures" className="hover:text-primary-600 transition-colors">Chaussures</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-900 font-semibold">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container-fluid mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* LEFT: Images */}
          <div>
            <ProductImageGallery images={product.images} />
            <div className="mt-6">
              <TrustBadges />
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              {/* Brand + Actions */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 mb-2">
                    {product.brand}
                  </p>
                  <h1 className="text-4xl font-bold text-neutral-900 leading-tight">
                    {product.title}
                  </h1>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={handleToggleFavorite}
                    className={`
                      p-3 rounded-xl border-2 transition-all duration-300
                      ${isProductFavorite
                        ? 'bg-red-500 border-red-500 text-white scale-110'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:border-red-500 hover:text-red-500'
                      }
                    `}
                  >
                    <Heart className={`w-6 h-6 ${isProductFavorite ? 'fill-current' : ''}`} />
                  </button>

                  <button className="p-3 rounded-xl border-2 border-neutral-200 text-neutral-700 hover:border-primary-500 hover:text-primary-500 transition-all">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Rating + Views */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-neutral-900">4.8</span>
                  <span className="text-neutral-600">({product.reviews.length} avis)</span>
                </div>

                <div className="flex items-center gap-1.5 text-neutral-600">
                  <Eye className="w-4 h-4" />
                  <span>234 vues</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-baseline gap-4 mb-2">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent">
                  {product.price}€
                </div>
                {product.originalPrice && (
                  <div className="text-2xl text-neutral-400 line-through font-semibold">
                    {product.originalPrice}€
                  </div>
                )}
                {discount > 0 && (
                  <div className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full font-bold text-sm">
                    -{discount}%
                  </div>
                )}
              </div>
              <p className="text-sm text-neutral-600">
                Économisez {(product.originalPrice - product.price).toFixed(2)}€
              </p>
            </div>

            {/* Condition + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border-2 border-neutral-200 rounded-xl">
                <div className="text-sm text-neutral-600 mb-1">État</div>
                <div className="font-bold text-neutral-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {product.condition}
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-neutral-200 rounded-xl">
                <div className="text-sm text-neutral-600 mb-1">Disponibilité</div>
                <div className="font-bold text-neutral-900 flex items-center gap-2">
                  {product.stock > 0 ? (
                    <>
                      <Package className="w-5 h-5 text-green-500" />
                      {product.stock} en stock
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Rupture
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-3">
                  Taille
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all
                        ${selectedSize === size
                          ? 'bg-primary-500 border-primary-500 text-white'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:border-primary-500'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-3">
                Quantité
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl border-2 border-neutral-200 hover:border-primary-500 font-bold text-lg transition-all"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-neutral-900 w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-12 h-12 rounded-xl border-2 border-neutral-200 hover:border-primary-500 font-bold text-lg transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                size="lg"
                fullWidth
                leftIcon={<ShoppingBag />}
              >
                {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                fullWidth
                onClick={() => {
                  handleAddToCart();
                  navigate('/checkout');
                }}
                disabled={product.stock === 0}
              >
                Acheter maintenant
              </Button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-neutral-200">
              <div className="text-center p-3">
                <Shield className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-neutral-700">Paiement sécurisé</p>
              </div>
              <div className="text-center p-3">
                <Truck className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-neutral-700">Livraison 24-48h</p>
              </div>
              <div className="text-center p-3">
                <RefreshCw className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-neutral-700">Retour 14 jours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          {/* Tab Headers */}
          <div className="flex gap-4 border-b-2 border-neutral-200 mb-8">
            {['description', 'avis'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-4 font-semibold text-lg transition-all relative
                  ${activeTab === tab
                    ? 'text-primary-600'
                    : 'text-neutral-600 hover:text-neutral-900'
                  }
                `}
              >
                {tab === 'description' ? 'Description' : 'Avis clients'}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-pink-500" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'description' ? (
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Description du produit
                </h3>
                <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </div>
              </div>
            </div>
          ) : (
            <ProductReviews reviews={product.reviews} />
          )}
        </div>

        {/* Seller Card */}
        <div className="mb-16">
          <SellerCard seller={product.seller} />
        </div>

        {/* Related Products */}
        {product.relatedProducts?.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">
              Produits similaires
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {product.relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
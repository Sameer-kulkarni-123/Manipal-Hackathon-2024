import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  Linking, 
} from 'react-native';

import { FontAwesome, Entypo } from '@expo/vector-icons';
import { images } from "../../../constants"; // Assuming you are importing images this way

const UPI_PAYMENT_URL = (upiId, payeeName, amount, transactionNote) => {
  return `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${transactionNote}`;
};



const App = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [productRatings, setProductRatings] = React.useState({});
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null); // State for selected product
  const [isModalVisible, setIsModalVisible] = React.useState(false); // State to control modal visibility
  const [cart, setCart] = React.useState([]);
  const [yourOrders, setYourOrders] = React.useState([]); // New state for storing order


  const handleUPIPayment = async () => {
    const upiId = '9008204130@ptaxis';  // Replace with the actual UPI ID of the payee
    const payeeName = 'Vaibhav Kumar'; // Replace with the actual merchant name
    const transactionNote = 'Payment for order'; // Add a transaction note
    const amount = calculateSubtotal().toFixed(2); // Total cart amount
  
    const upiUrl = UPI_PAYMENT_URL(upiId, payeeName, amount, transactionNote);
  
    try {
      const supported = await Linking.canOpenURL(upiUrl);
  
      if (supported) {
        Linking.openURL(upiUrl).catch(() => {
          Alert.alert('Error', 'Unable to open UPI app');
        });
      } else {
        Alert.alert('Error', 'No UPI app found');
      }
    } catch (error) {
      console.error('Error opening UPI:', error);
      Alert.alert('Error', 'Failed to initiate UPI payment.');
    }
  };

  // Updated product data for all products
  const products = [
    {
      id: '1',
      name: 'Dog Food Premium',
      category: 'Food',
      image: images.dogfood,
      rating: Math.floor(Math.random() * 5) + 1,
      price: '₹0.09',
      oldPrice: '₹1,299',
      discount: '10% off',
      delivery: 'Free delivery by Sunday 20 October',
      description: 'A balanced dog food that promotes a healthy weight and provides all essential nutrients for your pet\'s vitality. It supports digestive health and strengthens the immune system.',
      technicalDetails: {
        brand: 'PremiumPet',
        flavor: 'Meat',
        weight: '10kg',
        form: 'Pellet',
        recommended: 'All dog breeds',
      },
      reviews: [
        { user: 'Pratik', review: 'Good quality in good quantity.', rating: 5 },
        { user: 'Premjith', review: 'Excellent food for dog.', rating: 4 },
      ],
    },
    {
      id: '2',
      name: 'Cat Toy Mouse',
      category: 'Toys',
      image: images.toymouse,
      rating: Math.floor(Math.random() * 5) + 1,
      price: '₹499',
      oldPrice: '₹549',
      discount: '9% off',
      delivery: 'Free delivery by Tuesday 22 October',
      description: 'A fun and interactive toy for your cat. The mouse-shaped design encourages hunting instincts and keeps your cat engaged for hours.',
      technicalDetails: {
        brand: 'CatPlay',
        material: 'Plastic',
        dimensions: '10cm x 5cm',
        form: 'Toy',
        recommended: 'All cats',
      },
      reviews: [
        { user: 'Meena', review: 'My cat loves it!', rating: 5 },
        { user: 'Ravi', review: 'Good but a bit small.', rating: 4 },
      ],
    },
    {
      id: '3',
      name: 'Bird Cage Deluxe',
      category: 'Accessories',
      image: images.birdcage,
      rating: Math.floor(Math.random() * 5) + 1,
      price: '₹2,999',
      oldPrice: '₹3,499',
      discount: '14% off',
      delivery: 'Free delivery by Wednesday 23 October',
      description: 'A spacious and durable birdcage perfect for small to medium-sized birds. Comes with perches and feeding cups for easy care.',
      technicalDetails: {
        brand: 'BirdHome',
        material: 'Metal',
        dimensions: '60cm x 60cm x 80cm',
        form: 'Cage',
        recommended: 'Small to medium birds',
      },
      reviews: [
        { user: 'Amit', review: 'Perfect for my parrot.', rating: 5 },
        { user: 'Sneha', review: 'Good build quality.', rating: 4 },
      ],
    },
    {
      id: '4',
      name: 'Fish Tank Cleaner',
      category: 'Care',
      image: images.tankcleaner,
      rating: Math.floor(Math.random() * 5) + 1,
      price: '₹899',
      oldPrice: '₹999',
      discount: '10% off',
      delivery: 'Free delivery by Thursday 24 October',
      description: 'Keep your fish tank clean and healthy with this easy-to-use fish tank cleaner. Ideal for both saltwater and freshwater tanks.',
      technicalDetails: {
        brand: 'AquaClean',
        type: 'Cleaner',
        material: 'Plastic',
        recommended: 'All fish tanks',
      },
      reviews: [
        { user: 'Kiran', review: 'Keeps the tank crystal clear.', rating: 5 },
        { user: 'John', review: 'Works well, easy to use.', rating: 4 },
      ],
    },
    {
      id: '5',
      name: 'Rabbit Hutch',
      category: 'Housing',
      image: images.rabbithouse,
      rating: Math.floor(Math.random() * 5) + 1,
      price: '₹4,500',
      oldPrice: '₹5,000',
      discount: '10% off',
      delivery: 'Free delivery by Friday 25 October',
      description: 'A spacious and secure hutch for your rabbit. Made from durable materials to withstand outdoor conditions while keeping your rabbit safe.',
      technicalDetails: {
        brand: 'BunnyHome',
        material: 'Wood',
        dimensions: '100cm x 50cm x 60cm',
        recommended: 'Rabbits',
      },
      reviews: [
        { user: 'Deepa', review: 'My bunny loves it!', rating: 5 },
        { user: 'Sam', review: 'Great for the price.', rating: 4 },
      ],
    },
  ];

  // Handle search input
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // Handle rating selection
  const handleRating = (productId, rating) => {
    setProductRatings({ ...productRatings, [productId]: rating });
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle side navigation visibility
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  // Open product detail modal
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  // Close product detail modal
  const closeProductDetail = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  // Add to Cart Function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return cart.reduce((sum, product) => {
      const price = parseFloat(product.price.replace('₹', '').replace(',', ''));
      return sum + price * product.quantity;
    }, 0);
  };

  // Handle Pay Now and add items to Your Orders
  const handlePayNow = () => {
    // Add current cart items to your orders
    setYourOrders([...yourOrders, ...cart]);
    // Clear the cart after placing the order
    setCart([]);
    setSelectedProduct(null); // Go back to shop
  };

  // Side Navigation Bar Component with Close Button
  const SideNav = () => {
    return (
      <View
        className="absolute top-0 left-0 w-64 bg-gray-800 h-full p-4"
        style={{ zIndex: 10 }}
      >
        {/* Close Button */}
        <View className="flex-row justify-end mb-4">
          <TouchableOpacity onPress={toggleSideNav}>
            <Entypo name="cross" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <TouchableOpacity className="mb-4">
            <Text className="text-white text-lg">Your Orders</Text>
            {yourOrders.length > 0 ? (
              yourOrders.map((order, index) => (
                <View key={index} style={{ paddingVertical: 5 }}>
                  <Text style={{ color: 'white' }}>{order.name} (x{order.quantity})</Text>
                </View>
              ))
            ) : (
              <Text style={{ color: 'white', marginTop: 10 }}>No orders yet</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity className="mb-4">
            <Text className="text-white text-lg">Trending Products</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mb-4">
            <Text className="text-white text-lg">Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mb-4" onPress={() => setSelectedProduct('cart')}>
            <Text className="text-white text-lg">My Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

 // Search Bar Component with fixed keyboard issue
const SearchBar = () => {
  return (
    <View className="flex-row items-center p-4 bg-white mt-12">
      <TouchableOpacity onPress={toggleSideNav} className="mr-4">
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        placeholder="Search for products..."
        className="flex-1 bg-gray-100 p-2 rounded"
        onChangeText={handleSearch}
        value={searchQuery}
        returnKeyType="search" // Enable a 'Search' button on the keyboard
        onSubmitEditing={() => console.log("Search query submitted")} // Optional: Handle on submit
        blurOnSubmit={false} // This prevents the keyboard from closing after typing
      />
    </View>
  );
};

// Add keyboardShouldPersistTaps to ScrollView
const ProductGrid = () => {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      keyboardShouldPersistTaps="handled" // Prevents keyboard from closing when tapping other areas
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {filteredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={{ width: '48%', backgroundColor: '#f0f0f0', padding: 8, marginBottom: 16, borderRadius: 8 }}
            onPress={() => openProductDetail(product)}
          >
            <View style={{ backgroundColor: '#e0e0e0', height: 150, borderRadius: 8, marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
              {product.image ? (
                <Image
                  source={product.image}
                  style={{ width: '100%', height: '100%', borderRadius: 8 }}
                  resizeMode="cover"
                />
              ) : (
                <Text style={{ color: '#888' }}>Image not available</Text>
              )}
            </View>
            <Text style={{ fontSize: 16, marginBottom: 4 }}>{product.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome
                  key={index}
                  name="star"
                  size={16}
                  color={
                    index < (productRatings[product.id] || product.rating)
                      ? '#FFD700'
                      : '#CCCCCC'
                  }
                />
              ))}
            </View>
            <Text>{product.price} <Text style={{ textDecorationLine: 'line-through' }}>{product.oldPrice}</Text> ({product.discount})</Text>
            <Text>{product.delivery}</Text>
            <TouchableOpacity
              style={{ backgroundColor: '#FFD700', padding: 10, borderRadius: 5 }}
              onPress={() => addToCart(product)}
            >
              <Text style={{ textAlign: 'center' }}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};


  // Modal Component for Product Details
 // Modal Component for Product Details
const ProductDetailModal = () => {
  if (!selectedProduct) return null;

  // Ensure that selectedProduct.technicalDetails exists before rendering details
  const { technicalDetails = {} } = selectedProduct || {};

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
          }}
        >
          <Image
            source={selectedProduct.image}
            style={{ width: '100%', height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 10 }}>
            {selectedProduct.name}
          </Text>
          <Text style={{ fontSize: 16, marginVertical: 10 }}>
            {selectedProduct.description}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>Technical Details:</Text>
          <Text>Brand: {technicalDetails.brand || 'N/A'}</Text>
          <Text>Flavor: {technicalDetails.flavor || 'N/A'}</Text>
          <Text>Weight: {technicalDetails.weight || 'N/A'}</Text>
          <Text>Form: {technicalDetails.form || 'N/A'}</Text>
          <Text>Recommended For: {technicalDetails.recommended || 'N/A'}</Text>
          <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>Customer Reviews:</Text>
          {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
            selectedProduct.reviews.map((review, index) => (
              <View key={index}>
                <Text>{'⭐'.repeat(review.rating)}</Text>
                <Text>{review.user}: {review.review}</Text>
              </View>
            ))
          ) : (
            <Text>No reviews available</Text>
          )}
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: '#007bff',
              padding: 10,
              borderRadius: 5,
            }}
            onPress={closeProductDetail}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Cart Modal
const CartModal = () => {
  return (
    <Modal visible={isSideNavOpen && selectedProduct === 'cart'} animationType="slide" transparent={true}>
      <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        <ScrollView>
          {cart.map((product) => (
            <View key={product.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text>{product.name} (x{product.quantity})</Text>
              <Text>{product.price}</Text>
            </View>
          ))}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>Subtotal: ₹{calculateSubtotal().toFixed(2)}</Text>
        </ScrollView>

        {/* UPI Payment Button */}
        <TouchableOpacity
          style={{ marginTop: 20, backgroundColor: '#007bff', padding: 15, borderRadius: 5 }}
          onPress={handleUPIPayment} // UPI Payment functionality
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Pay with UPI</Text>
        </TouchableOpacity>

        {/* Cash on Delivery Option */}
        <TouchableOpacity
          style={{ marginTop: 10, backgroundColor: '#28a745', padding: 15, borderRadius: 5 }}
          onPress={handlePayNow} // Handle Cash on Delivery option
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Cash on Delivery</Text>
        </TouchableOpacity>

        {/* Back to Shop Button */}
        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: '#FF6347', // Use a different color to differentiate
            padding: 15,
            borderRadius: 5,
          }}
          onPress={() => setSelectedProduct(null)} // Close the cart modal and go back to the shop
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Back to Shop</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

return (
  <View className="flex-1">
    {isSideNavOpen && (
      <TouchableOpacity
        activeOpacity={1}
        onPress={toggleSideNav}
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
        style={{ zIndex: 9 }}
      />
    )}
    {isSideNavOpen && <SideNav />}
    <View className="flex-1">
      <SearchBar />
      <ProductGrid />
      <ProductDetailModal />
      <CartModal />
    </View>
  </View>
);
};

export default App;
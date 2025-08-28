# AliExpress Clone - Modern E-commerce Platform

A full-featured e-commerce web application inspired by AliExpress, built with modern web technologies and best practices.

## 🚀 Live Demo

[Live Demo Link](https://ali-express-six.vercel.app/) <!-- Add your deployed link here -->


## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** with Firebase Authentication
- **Email/Password** authentication
- **User Profile Management** with photo upload support
- **Secure logout** with session management
- **Protected routes** for authenticated users

### 🛍️ Product Management
- **Product Catalog** with 25+ mock products across 6 categories
- **Category Navigation** (Electronics, Fashion, Home & Garden, Sports, Books, Jewelry)
- **Product Search** with real-time filtering
- **Product Details** modal with comprehensive information
- **Product Cards** with ratings, reviews, and discount badges
- **Responsive grid layout** for optimal viewing

### 🛒 Shopping Cart
- **Add to Cart** functionality
- **Cart Management** (add, remove, update quantities)
- **Cart Persistence** using Redux store
- **Real-time cart updates** with item count display
- **Cart summary** with total calculations

### 🎨 User Interface
- **Modern Design** with Tailwind CSS
- **Responsive Layout** for all device sizes
- **Modal-based Navigation** for seamless UX
- **Loading States** and error handling
- **Smooth Animations** and transitions
- **Professional Typography** with Google Fonts (Geist)

### 🔍 Search & Filter
- **Real-time Search** across products and categories
- **Category Filtering** with visual icons
- **Search Suggestions** and autocomplete
- **Advanced Product Filtering** by price, rating, and availability

### 👤 User Experience
- **User Profile** with order history and settings
- **Wishlist Functionality** (UI ready)
- **Order Management** (UI ready)
- **Account Settings** management

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - Latest React with modern features
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Headless UI** - Unstyled accessible components

### State Management
- **Redux Toolkit** - Modern Redux with simplified syntax
- **React Redux** - React bindings for Redux
- **Async Thunks** - For handling async operations

### Backend & Database
- **Firebase Authentication** - User authentication service
- **Firestore** - NoSQL database for data storage
- **Firebase Analytics** - User behavior tracking

### Development Tools
- **Turbopack** - Next.js bundler for faster development
- **PostCSS** - CSS post-processing
- **Axios** - HTTP client for API calls

### Utilities
- **Mock Data System** - Comprehensive product catalog
- **API Service Layer** - Centralized API management
- **Error Handling** - Comprehensive error management
- **Loading States** - User feedback for async operations

## 🏗️ Project Structure

```
aliexpress/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── AuthForms.js     # Authentication forms
│   │   ├── Cart.js          # Shopping cart component
│   │   ├── CategoryNav.js   # Category navigation
│   │   ├── Header.js        # Main header component
│   │   ├── LoginModal.js    # Login modal
│   │   ├── ProductCard.js   # Product display card
│   │   ├── ProductDetails.js # Product details modal
│   │   ├── ProductGrid.js   # Products grid layout
│   │   ├── Search.js        # Search functionality
│   │   ├── SignupModal.js   # Registration modal
│   │   └── UserProfile.js   # User profile management
│   ├── features/            # Redux slices
│   │   ├── auth/           # Authentication state
│   │   ├── cart/           # Shopping cart state
│   │   └── products/       # Products state
│   ├── services/           # External services
│   │   ├── apiService.js   # API client
│   │   └── firebase.js     # Firebase configuration
│   ├── store/              # Redux store
│   ├── utils/              # Utility functions
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   ├── page.js             # Home page
│   └── providers.js        # Context providers
├── public/                 # Static assets
├── package.json           # Dependencies
└── next.config.mjs        # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaniaAnsarii/AliExpress
   cd aliexpress
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Update `app/services/firebase.js` with your config

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

### Firebase Setup
Update the Firebase configuration in `app/services/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### Environment Variables
Create a `.env.local` file for sensitive configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

## 📱 Features in Detail

### Authentication Flow
- Seamless modal-based authentication
- Real-time form validation
- Error handling with user feedback
- Automatic redirect after authentication

### Product Management
- Dynamic product loading with mock data
- Category-based filtering
- Search functionality across title, category, and description
- Product details with image gallery and specifications

### Shopping Cart
- Persistent cart state across sessions
- Real-time quantity updates
- Price calculations with discounts
- Cart item management (add/remove/update)

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized layouts
- Touch-friendly interactions
- Optimized performance across devices

## 🎯 Future Enhancements

- [ ] **Payment Integration** (Stripe/PayPal)
- [ ] **Order Management System**
- [ ] **Product Reviews & Ratings**
- [ ] **Wishlist Functionality**
- [ ] **Advanced Search Filters**
- [ ] **Product Recommendations**
- [ ] **Multi-language Support**
- [ ] **Admin Dashboard**
- [ ] **Inventory Management**
- [ ] **Email Notifications**

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Your Name**
- GitHub: [@your-username](https://github.com/SaniaAnsarii)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/sania-ansari/)
- Email: ansarisania789@gmail.com

## 🙏 Acknowledgments

- Inspired by AliExpress user experience
- Firebase for authentication services
- Unsplash for product images
- Lucide React for beautiful icons
- Tailwind CSS for rapid styling

---

⭐ **Star this repository if you found it helpful!**

# Gaming Arena E-Commerce Platform

[![Gaming Arena](https://img.shields.io/badge/Gaming-Arena-orange)]()
[![Next.js 13](https://img.shields.io/badge/Next.js-13-black)]()
[![Strapi CMS](https://img.shields.io/badge/Strapi-CMS-blue)]()
[![Stripe Payments](https://img.shields.io/badge/Stripe-Payments-purple)]()

A full-stack e-commerce platform built for gamers, featuring a modern tech stack, seamless UX, and powerful admin capabilities.

## Features

### Core Functionality
- Modern E-Commerce Platform for video games
- Multi-Platform Support (PlayStation, Xbox, Nintendo, PC)
- Secure Authentication (JWT-based)
- Shopping Cart with persistent data
- Wishlist System for saved items
- Order Management and tracking
- Stripe-powered secure payments
- Mobile-first responsive design

### Technical Highlights
- **Next.js 13**: React framework with App Router
- **Strapi**: Headless CMS for content management
- **Semantic UI**: Modern component library
- **SCSS Modules**: Custom theming with variables
- **Context API**: State management for authentication and cart
- **External APIs**: OpenCritic integration for ratings
- **AWS S3**: Cloud storage for optimized images
- **Yup & Formik**: Validation and form handling

## Project Structure

```
gaming-arena-ecommerce/
├── ecommerce-client/                 # Next.js Frontend
│   ├── src/
│   │   ├── components/              # UI Components
│   │   │   ├── Account/
│   │   │   ├── Auth/
│   │   │   ├── Cart/
│   │   │   ├── Game/
│   │   │   ├── Home/
│   │   │   ├── Layout/
│   │   │   └── Shared/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── scss/
│   │   └── utils/
│   └── public/
└── ecommerce-server/                # Strapi Backend
    ├── config/
    ├── src/
    │   ├── api/
    │   │   ├── address/
    │   │   ├── game/
    │   │   ├── order/
    │   │   ├── platform/
    │   │   └── wishlist/
    │   └── admin/
    └── types/
```

## Design System

### Colors
```scss
$primary: #ff5400;          // Vibrant orange
$primary-hover: #ffa700;    // Golden hover
$secondary: #7a00ff;        // Electric purple
$background-primary: #272727; // Dark theme
$text-primary: #fff;        // White text
```

### Typography
- **Headings**: Orbitron
- **Body**: Inter
- **Code**: Fira Code

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Strapi CLI
- Stripe account
- AWS S3 credentials

### Backend Setup (Strapi)
```bash
cd ecommerce-server
npm install
cp .env.example .env
npm run develop
```

### Frontend Setup (Next.js)
```bash
cd ecommerce-client
npm install
cp .env.local.example .env.local
npm run dev
```

### Environment Variables

#### Backend (.env)
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
JWT_SECRET=your_jwt_secret
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
AWS_ACCESS_KEY_ID=your_aws_key
AWS_ACCESS_SECRET=your_aws_secret
AWS_REGION=your_aws_region
AWS_BUCKET=your_aws_bucket
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
NEXT_PUBLIC_API_URL=http://localhost:1337/api
NEXT_PUBLIC_SERVER_HOST=http://localhost:1337/
```

## Key Features Deep Dive

### Game Management
- CRUD operations for games
- Media uploads for cover images
- Multi-platform support
- Pricing, discounts, and OpenCritic metadata

### Shopping Experience
- Multi-step checkout process
- Persistent cart and wishlist
- Quantity and discount calculations
- Address and order management

### User System
- Role-based access (admin/customer)
- Profile management
- Order history and address book

### Payment Processing
- Secure Stripe integration
- Real-time card validation
- Automatic order creation and receipts

## API Endpoints

### Authentication
```
POST /api/auth/local/register
POST /api/auth/local
GET /api/users/me
```

### Games
```
GET /api/games
GET /api/games/:slug
POST /api/games
PUT /api/games/:id
```

### Orders
```
GET /api/orders
POST /api/payment-order
```

### Wishlist
```
GET /api/wishlists
POST /api/wishlists
DELETE /api/wishlists/:id
```

## Security
- JWT authentication
- Form and input validation
- XSS and CORS protection
- PCI-compliant payment flow

## Responsive Design
- Adaptive grid layouts
- Touch-friendly interactions
- Progressive enhancement
- Optimized performance

## Development Scripts

### Backend
```bash
npm run develop
npm run build
npm run start
npm run strapi
```

### Frontend
```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deployment

### Backend (Strapi)
- Build and configure database
- Set up AWS S3 for media storage
- Deploy to hosting provider (e.g. Railway, Render, AWS)

### Frontend (Next.js)
- Build production version
- Configure environment variables
- Deploy to Vercel, Netlify, or other platform

## Contributing
1. Fork the repository
2. Create a new feature branch
3. Commit and push changes
4. Open a pull request

## License
MIT License

## Support
- Open an issue in the repository
- Refer to documentation
- Contact the development team

Built with passion for the gaming community.

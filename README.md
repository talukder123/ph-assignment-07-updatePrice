# 🛒 বাজার দর | BazarDor

A responsive web application that helps users explore the latest prices of essential daily products across different markets in Bangladesh.

## 📌 About the Project

**বাজার দর (BazarDor)** provides a simple way to check daily product prices, compare prices across markets, and track price changes. Users can browse products by category, view detailed market price information, and manage their accounts through secure authentication.

The project is built with Next.js and Better Auth, focusing on responsive design, a user-friendly interface, and a smooth browsing experience.

## ✨ Key Features

- **Daily Price Updates:** Explore essential product prices and daily price changes.
- **Product Details:** View minimum, maximum, and average prices, along with market-wise prices.
- **Category Browsing:** Explore products by category and sort them by price.
- **User Authentication:** Sign up, sign in, and sign out using email/password or social login.
- **Protected Routes:** Restrict product detail pages to authenticated users.
- **Responsive Design:** Optimized for mobile, tablet, and desktop devices.
- **Loading & Error States:** Display loading skeletons, error messages, and friendly 404 pages.
- **Profile Management:** View and update user profile information.
- **Price Ticker:** Follow daily price changes through a continuously scrolling ticker.

## 🛠️ Technologies Used

- **Next.js** — React framework and App Router
- **React** — User interface development
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling and responsive layouts
- **DaisyUI** — UI components
- **Better Auth** — Authentication and user management
- **MongoDB** — Database
- **React Hot Toast** — Toast notifications
- **Vercel** — Deployment

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/talukder123/bajar-dor.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bajar-dor
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and configure your environment variables:

   ```env
   MONGODB_URL=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   ```

   Add any additional environment variables required by your authentication providers or API configuration.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
bajar-dor/
├── public/             # Static assets
├── src/
│   └── app/            # App Router pages and layouts
├── .env.local          # Environment variables
├── package.json
└── README.md
```

*The structure above is a simplified overview.*

## 🌐 Live Demo

[Visit BazarDor](https://bajar-dor.vercel.app/)

## ⚠️ Disclaimer

Product prices are indicative and may vary depending on market conditions, location, and availability.

## 👨‍💻 Author

**Abdus Salam Talukder**

- GitHub: [@talukder123](https://github.com/talukder123)

---

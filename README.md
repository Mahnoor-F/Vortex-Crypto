# 🚀 VORTEX CRYPTO — Real-Time Dashboard

**Vortex Crypto** is a high-performance cryptocurrency tracking application built with **React.js**. It provides real-time market data, interactive charts, and secure authentication, designed with a premium Web3 aesthetic.

---

## ✨ Key Features

* **Live Market Data:** Fetches real-time prices, market cap, and 24h changes using the **CoinGecko API**.
* **Interactive Analytics:** Visual 7-day price performance charts powered by **Recharts**.
* **Secure Authentication:** Integrated **Clerk Authentication** for a seamless and secure user login experience.
* **Smart Search:** Quickly find specific coins with an optimized live search functionality.
* **Optimized Performance:** Uses **TanStack Query** (React Query) for efficient data caching and synchronization.
* **Premium UI/UX:** Styled with **Tailwind CSS** featuring Glassmorphism effects and custom gradients for a modern look.
* **Fully Responsive:** Perfectly optimized for a seamless experience across Mobile, Tablet, and Desktop screens.

---

## 🛠️ Tech Stack

* **Frontend Library:** React.js (Vite)
* **Styling:** Tailwind CSS
* **State Management:** TanStack Query (React Query)
* **Charts:** Recharts
* **Authentication:** Clerk Auth
* **API Integration:** CoinGecko API
* **Icons:** Lucide-React

---

## ⚙️ Technical Highlights

* **Custom Hooks:** Utilized `useQuery` for managing server state, reducing redundant API calls, and handling loading/error states.
* **Data Formatting:** Implemented complex data mapping logic to transform API responses into chart-ready formats.
* **Modern Design:** Applied advanced CSS techniques to achieve a high-end "Web3" feel with glassmorphism and smooth transitions.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Mahnoor-F/vortex-crypto.git](https://github.com/Mahnoor-F/vortex-crypto.git)
    cd vortex-crypto
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Set Environment Variables:**
    Create a `.env` file and add your Clerk API keys:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
    ```

4.  **Launch Project:**
    ```bash
    npm run dev
    ```

---

## 👤 Author

* **Created by:** Mahnoor
* **GitHub:** [https://github.com/Mahnoor-F](https://github.com/Mahnoor-F)

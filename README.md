<div align="center">

<h1 style="font-size: 3rem; font-weight: 800; color: #ffffff;">
	<img src="./src/app/icon.svg" alt="BazarDor icon" width="52" style="vertical-align: middle;" />
	বাজার দর / <font color="#008a45">BazarDor</font>
</h1>

<h3 style="font-size: 1.1rem; font-weight: 700;"><font color="#008a45">B14-A07 · Daily Bazaar Price Tracker</font></h3>

<h2 style="font-size: 1.8rem; font-weight: 800; color: #ffffff;">Know Today&apos;s Market Price Before You Buy.</h2>

Browse daily essentials, compare detailed prices, and access protected product insights with a secure account.

**Live Demo:** <a href="https://b14-a7-bazar-dor-svk8.vercel.app/" target="_blank" rel="noopener noreferrer">Open BazarDor</a>

</div>

---

<h2 style="font-size: 1.5rem; font-weight: 800;"><font color="#008a45">About BazarDor</font></h2>

BazarDor is a modern, responsive Bengali market price tracking application built to help users check daily prices of essential products in Bangladesh. The platform presents grocery categories, product details, market-wise breakdowns, price comparisons, dynamic date information, and authenticated profile access in one clean interface. Built with the Next.js App Router, TypeScript, Better Auth, MongoDB, and Tailwind CSS, BazarDor focuses on speed, clarity, secure authentication, and a polished user experience for everyday shoppers.

<h2 style="font-size: 1.5rem; font-weight: 800;"><font color="#008a45">🌟 Key Features</font></h2>

<p style="font-size: 1.2rem; font-weight: 700; color: #b45309; border: 2px solid #f59e0b; border-radius: 12px; background: #fffbeb; padding: 16px;">
  ⚠️ <strong>One email address can be used with only one sign-in method.</strong> If you sign up with an email using Google, GitHub, or a password, you must continue signing in with that same method. You cannot use another method with the same email address, and accounts are not automatically linked. To use a different sign-in method, register with a separate email address.
</p>

- **Secure Email Authentication:** Users can create an account and sign in with email and password using Better Auth.
- **Password Strength Safeguards:** Sign in and sign up forms enforce clear password rules: minimum characters, required digits, and required symbols.
- **Social Sign In Support:** Google and GitHub authentication flows are included for faster account access.
- **Protected Routes With Proxy:** Sensitive pages such as profile and product details are guarded through a Next.js proxy, redirecting unauthenticated users to sign in with a safe callback URL.
- **Profile Management:** Authenticated users can view account details, update their display name, and sign out securely.
- **Navbar Toast Feedback:** Sign in, sign up, sign out, and profile update actions show centered `react-hot-toast` messages with a custom bouncy magic-lamp animation.
- **Dynamic Bengali Date:** The navbar and hero banner display the current Bengali-formatted date using the `Asia/Dhaka` timezone.
- **Category-Based Browsing:** Users can browse daily essentials by category through a responsive category navigation system.
- **Detailed Product Pages:** Product details include today&apos;s price, unit information, price changes, and a clear breakdown of minimum, average, and maximum prices.
- **Market Breakdown Table:** Product pages show market-wise price ranges so users can compare where prices are lower or higher.
- **Live Price Ticker:** A scrolling ticker highlights market price information across the application.
- **Loading Skeletons:** Dedicated skeleton states are included for the home page, category pages, product pages, profile page, and navigation loading.
- **Custom Bengali UI:** The interface is designed for Bengali users with Bangla text, localized number formatting, and clean responsive layouts.
- **Responsive Design:** The layout adapts smoothly across mobile, tablet, and desktop screens.
- **Robust Error Handling:** Includes a custom not-found page and an authentication error page for failed sign-in flows.

<h2 style="font-size: 1.5rem; font-weight: 800;"><font color="#008a45">🛠️ Technologies Used</font></h2>

- **Framework:** Next.js 16 App Router, React 19, React DOM
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, DaisyUI, HeroUI Styles
- **UI Components:** HeroUI React, React Icons
- **Authentication:** Better Auth, Better Auth Mongo Adapter
- **Database:** MongoDB
- **Feedback & Motion:** React Hot Toast, custom CSS keyframe animations
- **Data & UI Utilities:** React Fast Marquee, Bengali number/date formatting helpers
- **Linting & Compilation:** ESLint, ESLint Config Next, Babel Plugin React Compiler
- **Type Definitions:** `@types/node`, `@types/react`, `@types/react-dom`

<h2 style="font-size: 1.5rem; font-weight: 800;"><font color="#008a45">📂 Project Structure</font></h2>

BazarDor follows a modular App Router structure with grouped layout, product, auth, feedback, and shared UI components.

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── profile/
│   │   ├── signin/
│   │   └── signup/
│   ├── api/
│   │   └── auth/
│   ├── category/
│   │   └── [productName]/
│   ├── product/
│   │   └── [id]/
│   ├── auth/
│   │   └── error/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── assets/
│   └── bazar-hero.png
├── components/
│   ├── auth/
│   │   └── PasswordRequirements.tsx
│   ├── feedback/
│   │   └── AppToaster.tsx
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── PriceTicker.tsx
│   ├── products/
│   │   ├── ProductBreakDownTable.tsx
│   │   ├── ProductBreadcrumbs.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetailsHeader.tsx
│   │   └── ProductsSelection.tsx
│   └── ui/
│       ├── BrandTrolleyIcon.tsx
│       ├── CurrentBanglaDate.tsx
│       └── LoadingSkeletons.tsx
├── lib/
│   ├── auth-client.ts
│   ├── auth.ts
│   ├── bazaar-api.ts
│   ├── bengali-date.ts
│   ├── format-bengali-number.ts
│   ├── password-policy.ts
│   └── user-name.ts
└── proxy.ts
```

<h2 style="font-size: 1.5rem; font-weight: 800;"><font color="#008a45">🚀 Getting Started</font></h2>

To run this project locally, follow these steps:

**GitHub Repository:** [BazarDor](#)

**HTTPS Clone URL:** `https://github.com/your-username/bazar-dor.git`

**SSH Clone URL:** `git@github.com:your-username/bazar-dor.git`

<h3 style="font-size: 1.1rem; font-weight: 700; color: #ffffff;">Clone the repository</h3>

Using HTTPS:

```bash
git clone https://github.com/your-username/bazar-dor.git
cd bazar-dor
```

Using SSH:

```bash
git clone git@github.com:your-username/bazar-dor.git
cd bazar-dor
```

<h3 style="font-size: 1.1rem; font-weight: 700; color: #ffffff;">Install dependencies</h3>

```bash
npm install
```

<h3 style="font-size: 1.1rem; font-weight: 700; color: #ffffff;">Set environment variables</h3>

Create a `.env` file and add the required Better Auth, MongoDB, and social provider credentials.

```bash
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

<h3 style="font-size: 1.1rem; font-weight: 700; color: #ffffff;">Start the development server</h3>

```bash
npm run dev
```

<h3 style="font-size: 1.1rem; font-weight: 700; color: #ffffff;">Open your browser</h3>

Navigate to http://localhost:3000 to view the application.

Thank you for exploring BazarDor. This project was developed to fulfill the B14-A07 requirements while extending the baseline with secure authentication, protected routing, dynamic Bengali UI details, polished toast feedback, and a fully responsive market price browsing experience.

---

<div align="center">

Built with 💚 by <a href="#">Showvik</a>

</div>

# Fan Store 🏟️

The Fan Store is an e-commerce platform designed for sports fans to purchase official team merchandise, including kits, scarves, caps, and more. The application is built using modern technologies like Nuxt.js, AWS S3, Stripe for payments. It supports various interactive features like dynamic image loading from AWS S3 and secure payments through Stripe.

## Features ✨

- **Product Listings:** Browse merchandise for your favorite teams, including kits, caps, and accessories.
- **Dynamic Image Loading:** Images are securely fetched from a protected AWS S3 bucket using signed URLs, ensuring data privacy.
- **Cart Management:** Add items to your cart, adjust quantities, and remove products easily.
- **Responsive UI:** The store adapts to various screen sizes, ensuring a smooth experience on mobile and desktop devices.
- **Product Filtering:** Filter products base on options such as colors, sizes, etc.
- **Checkout & Payments:** Secure payments through Stripe (test payments available in demo).
- **State Management:** Cart items, product options, and user information are stored using Pinia state management for efficiency.

## Technologies & Services Used 🛠️

- **Frontend:**
    - Nuxt.js 3 (Vue.js framework)
    - Tailwind CSS for styling
    - Pinia for state management
    - Nuxt Image Module for optimized image handling
    - NuxtUI for reusable UI components

- **Backend:**
    - AWS S3 for secure image storage and dynamic image resizing
    - Stripe for payments (test mode)

- **Deployment & Hosting:**
    - AWS Amplify for deployment and hosting
    - GitHub Actions for CI/CD pipeline

## Project Setup 🛠️

### Requirements

- **Node.js:** Make sure you have Node.js installed (v14.x or later).
- **AWS Account:** You’ll need an AWS account for S3 and Amplify setup.
- **Stripe Account:** Required for payment processing (can use test mode).

### Setup Instructions
1. **Clone the Repository:**

```
git clone https://github.com/n-timurka/fan-store.git
cd fan-store
```

2. **Install Dependencies:** Install the necessary dependencies using npm or yarn.

```
npm install
```

3. **Configure Environment Variables:** Create a .env file with the following variables:

```
NUXT_PUBLIC_AWS_S3_BUCKET=<your-s3-bucket-name>
NUXT_PUBLIC_AWS_S3_REGION=<your-region>
AWS_ACCESS_KEY_ID=<your-aws-access-key>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
```

4. **Run the Application:** Start the development server:

```
npm run dev
```

5. **Build for Production:** Build the app for production:

```
npm run build
```

6. **Deploy to AWS Amplify:** Deploy the project using AWS Amplify or your preferred hosting service. For AWS Amplify:

- Set up an Amplify project.
- Connect the GitHub repository.
- Add the necessary environment variables in the Amplify console.

## Demo

Check out the live demo of the Fan Store:

[Demo Link](https://master.dqaqcztng291a.amplifyapp.com/)

## Author 👨‍💻

### Mykola Timurka

Feel free to check out my portfolio and contact me for inquiries:

[GitHub](https://github.com/n-timurka)

[LinkedIn](https://www.linkedin.com/in/mykola-timurka/)

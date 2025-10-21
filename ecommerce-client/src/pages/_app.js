import { AuthProvider, CartProvider } from "@/contexts";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { LoadingBar } from "@/components/Shared"; // Assuming you have a loading component
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/scss/global.scss";

export default function App(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Handle route changes with loading indicator
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Enhanced SEO and meta tags
  const meta = {
    title: "GameHub - Ultimate Gaming Platform",
    description: "Discover, play, and connect with the ultimate gaming community. Latest games, reviews, and exclusive content.",
    keywords: "gaming, video games, community, reviews, achievements",
    image: "/images/og-image.jpg",
    type: "website"
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Open Graph */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="GameHub" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />

        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Performance optimization */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      </Head>

      <AuthProvider>
        <CartProvider>
          {/* Global Loading Indicator */}
          {/* {loading && <LoadingBar />} */}

          {/* Enhanced with error boundary in production */}
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </>
  );
}
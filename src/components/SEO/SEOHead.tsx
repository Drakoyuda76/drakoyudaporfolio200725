import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  path?: string;
}

const SEOHead = ({ title, description, keywords, path = '' }: SEOHeadProps) => {
  const fullTitle = `${title} | DrakoYuda Soluções - AI Microsolutions Angola`;
  const canonicalUrl = `https://drakoyuda.com${path}`;
  const siteName = "DrakoYuda Soluções";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://drakoyuda.com/og-image.jpg" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="pt_AO" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="https://drakoyuda.com/og-image.jpg" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="geo.region" content="AO" />
      <meta name="geo.country" content="Angola" />
      <meta name="author" content="DrakoYuda Soluções" />
      
      {/* Technical Meta Tags */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1F5F1F" />
      
      {/* Structured Data for better search results */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "DrakoYuda Soluções",
          "description": "Microsoluções de inteligência artificial human-cêntricas desenvolvidas em Angola",
          "url": "https://drakoyuda.com",
          "logo": "https://drakoyuda.com/drakoyuda_simbolo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "areaServed": "AO",
            "availableLanguage": "Portuguese"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "AO",
            "addressRegion": "Angola"
          },
          "sameAs": []
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
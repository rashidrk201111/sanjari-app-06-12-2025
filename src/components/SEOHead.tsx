import { useEffect } from "react";
import { useAdmin } from "../context/AdminContext";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords,
  ogImage,
  ogType,
  canonicalUrl,
  noIndex = false,
}: SEOHeadProps) {
  const { seoSettings } = useAdmin();

  useEffect(() => {
    // Set page title
    const pageTitle = title || seoSettings.defaultTitle;
    document.title = pageTitle;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("description", description || seoSettings.defaultDescription);
    setMetaTag("keywords", keywords || seoSettings.defaultKeywords);
    
    // Author
    if (seoSettings.author) {
      setMetaTag("author", seoSettings.author);
    }

    // Viewport
    if (seoSettings.viewport) {
      setMetaTag("viewport", seoSettings.viewport);
    }

    // Theme color
    if (seoSettings.themeColor) {
      setMetaTag("theme-color", seoSettings.themeColor);
    }

    // Open Graph tags
    setMetaTag("og:title", pageTitle, true);
    setMetaTag("og:description", description || seoSettings.defaultDescription, true);
    setMetaTag("og:type", ogType || seoSettings.ogType || "website", true);
    setMetaTag("og:image", ogImage || seoSettings.ogImage || "", true);
    setMetaTag("og:site_name", seoSettings.ogSiteName || seoSettings.defaultTitle, true);
    
    if (seoSettings.ogLocale) {
      setMetaTag("og:locale", seoSettings.ogLocale, true);
    }

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", pageTitle);
    setMetaTag("twitter:description", description || seoSettings.defaultDescription);
    setMetaTag("twitter:image", ogImage || seoSettings.ogImage || "");
    if (seoSettings.twitterHandle) {
      setMetaTag("twitter:site", seoSettings.twitterHandle);
    }

    // Custom meta tags
    if (seoSettings.customMetaTags) {
      seoSettings.customMetaTags.forEach(({ name, content }) => {
        setMetaTag(name, content);
      });
    }

    // Robots meta tag
    const currentPath = window.location.pathname;
    const shouldNoIndex = noIndex || seoSettings.noIndexPages?.includes(currentPath);
    
    if (shouldNoIndex) {
      setMetaTag("robots", "noindex, nofollow");
    } else {
      setMetaTag("robots", "index, follow");
    }

    // Canonical URL
    const finalCanonicalUrl = canonicalUrl || (seoSettings.canonicalUrl ? `${seoSettings.canonicalUrl}${currentPath}` : "");
    if (finalCanonicalUrl) {
      let linkTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkTag) {
        linkTag = document.createElement("link");
        linkTag.setAttribute("rel", "canonical");
        document.head.appendChild(linkTag);
      }
      linkTag.setAttribute("href", finalCanonicalUrl);
    }

    // Alternate language tags (hreflang)
    if (seoSettings.alternateLanguages && seoSettings.alternateLanguages.length > 0) {
      // Remove existing hreflang tags
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(tag => tag.remove());
      
      // Add new hreflang tags
      seoSettings.alternateLanguages.forEach(({ lang, url }) => {
        const linkTag = document.createElement("link");
        linkTag.setAttribute("rel", "alternate");
        linkTag.setAttribute("hreflang", lang);
        linkTag.setAttribute("href", url);
        document.head.appendChild(linkTag);
      });
    }

    // Preconnect URLs for performance
    if (seoSettings.preconnectUrls && seoSettings.preconnectUrls.length > 0) {
      seoSettings.preconnectUrls.forEach(url => {
        let linkTag = document.querySelector(`link[rel="preconnect"][href="${url}"]`) as HTMLLinkElement;
        if (!linkTag) {
          linkTag = document.createElement("link");
          linkTag.setAttribute("rel", "preconnect");
          linkTag.setAttribute("href", url);
          linkTag.setAttribute("crossorigin", "");
          document.head.appendChild(linkTag);
        }
      });
    }

    // Google Analytics
    if (seoSettings.googleAnalyticsId && !window.location.hostname.includes("localhost")) {
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${seoSettings.googleAnalyticsId}`;
      
      const gaConfigScript = document.createElement("script");
      gaConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${seoSettings.googleAnalyticsId}');
      `;

      if (!document.querySelector(`script[src*="${seoSettings.googleAnalyticsId}"]`)) {
        document.head.appendChild(gaScript);
        document.head.appendChild(gaConfigScript);
      }
    }

    // Google Tag Manager
    if (seoSettings.googleTagManagerId && !window.location.hostname.includes("localhost")) {
      const gtmScript = document.createElement("script");
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${seoSettings.googleTagManagerId}');
      `;

      if (!document.querySelector(`script[src*="${seoSettings.googleTagManagerId}"]`)) {
        document.head.appendChild(gtmScript);
      }
    }

    // Facebook Pixel
    if (seoSettings.facebookPixelId && !window.location.hostname.includes("localhost")) {
      const fbScript = document.createElement("script");
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${seoSettings.facebookPixelId}');
        fbq('track', 'PageView');
      `;

      if (!document.querySelector(`script[src*="fbevents.js"]`)) {
        document.head.appendChild(fbScript);
      }
    }

    // Organization Schema (if provided)
    if (seoSettings.organizationSchema) {
      try {
        const schemaData = JSON.parse(seoSettings.organizationSchema);
        let schemaScript = document.querySelector('script[type="application/ld+json"]#org-schema') as HTMLScriptElement;
        
        if (!schemaScript) {
          schemaScript = document.createElement("script");
          schemaScript.type = "application/ld+json";
          schemaScript.id = "org-schema";
          document.head.appendChild(schemaScript);
        }
        
        schemaScript.innerHTML = JSON.stringify(schemaData);
      } catch (e) {
        console.warn("Invalid organization schema JSON");
      }
    }
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, noIndex, seoSettings]);

  return null;
}

// Structured Data component for product/organization schema
interface StructuredDataProps {
  type: "Organization" | "Product" | "Service" | "FAQPage" | "BreadcrumbList" | "LocalBusiness" | "Article";
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    };
    
    script.innerHTML = JSON.stringify(schemaData);
    script.id = `schema-${type.toLowerCase()}`;

    // Remove existing schema of same type
    const existing = document.getElementById(script.id);
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      const element = document.getElementById(script.id);
      if (element) {
        element.remove();
      }
    };
  }, [type, data]);

  return null;
}

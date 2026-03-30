import React, { useEffect, useState } from "react";

const SiteLogo = ({ className = "", fallbackText = "Automobile" }) => {
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch(
          "https://store.januskitchen.nl/wp-json/custom/v1/site-logo"
        );

        const data = await res.json();

        if (data?.url) {
          setLogoUrl(data.url);
        }
      } catch (err) {
        console.error("Logo fetch error:", err);
      }
    };

    fetchLogo();
  }, []);

  if (!logoUrl) {
    return <span className={className}>{fallbackText}</span>;
  }

  return (
    <img
      src={logoUrl}
      alt={fallbackText}
      className={className}
      loading="lazy"
    />
  );
};

export default SiteLogo;

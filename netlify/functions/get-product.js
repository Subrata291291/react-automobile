export async function handler(event) {
  try {
    const { id } = event.queryStringParameters;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Product ID missing" })
      };
    }

    const url = `${process.env.NETLIFY_WC_URL}/wp-json/wc/v3/products/${id}`;

    const auth = Buffer.from(
      `${process.env.NETLIFY_WC_KEY}:${process.env.NETLIFY_WC_SECRET}`
    ).toString("base64");

    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Failed to fetch product" })
      };
    }

    const product = await res.json();

    // Extract ACF fields from WooCommerce meta_data
    const acf = {};
    const allowedFields = [
      "engine",
      "power",
      "transmission",
      "ground_clearance",
      "torque",
      "drive_type"
    ];

    if (Array.isArray(product.meta_data)) {
      product.meta_data.forEach((meta) => {
        if (allowedFields.includes(meta.key)) {
          acf[meta.key] = meta.value;
        }
      });
    }

    // Attach ACF to product response
    product.acf = acf;

    return {
      statusCode: 200,
      body: JSON.stringify(product)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}

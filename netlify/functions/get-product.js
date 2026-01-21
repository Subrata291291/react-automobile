const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { id } = event.queryStringParameters || {};

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Product ID missing" }),
    };
  }

  const url = `${process.env.NETLIFY_WC_URL}/wp-json/wc/v3/products/${id}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.NETLIFY_WC_KEY}:${process.env.NETLIFY_WC_SECRET}`
          ).toString("base64"),
      },
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Product not found" }),
      };
    }

    const product = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

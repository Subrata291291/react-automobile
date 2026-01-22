// netlify/functions/get-products.js

exports.handler = async (event) => {
  try {
    const {
      per_page = 10,
      page = 1,
      category
    } = event.queryStringParameters || {};

    let url = `${process.env.NETLIFY_WC_URL}/wp-json/wc/v3/products?per_page=${per_page}&page=${page}`;

    if (category) {
      url += `&category=${category}`;
    }

    const auth = Buffer.from(
      `${process.env.NETLIFY_WC_KEY}:${process.env.NETLIFY_WC_SECRET}`
    ).toString("base64");

    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await res.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

import fetch from "node-fetch";

export const handler = async () => {
  try {
    const url = process.env.NETLIFY_WC_URL;
    const key = process.env.NETLIFY_WC_KEY;
    const secret = process.env.NETLIFY_WC_SECRET;

    if (!url || !key || !secret) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing environment variables" })
      };
    }

    const auth = Buffer.from(`${key}:${secret}`).toString("base64");

    const response = await fetch(
      `${url}/wp-json/wc/v3/products?per_page=20`,
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

export const handler = async (event) => {
  try {
    const { id } = event.queryStringParameters;

    const url = process.env.NETLIFY_WC_URL;
    const key = process.env.NETLIFY_WC_KEY;
    const secret = process.env.NETLIFY_WC_SECRET;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Product ID is required" })
      };
    }

    const auth = Buffer.from(`${key}:${secret}`).toString("base64");

    const response = await fetch(
      `${url}/wp-json/wc/v3/products/${id}`,
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

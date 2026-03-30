import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SingleBlog = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://store.januskitchen.nl/wp-json/wp/v2/posts?slug=${slug}&_embed`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPost(data[0]);
        } else {
          setPost(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Single blog fetch error:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <h2 className="text-center p-100">Loading blog...</h2>;
  }

  if (!post) {
    return <h2 className="text-center p-100">Blog not found</h2>;
  }

  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

  const categories =
    post._embedded?.["wp:term"]?.[0] || [];

  return (
    <>
      <Header />

      {/* Banner */}
      <div className="common-banner text-center">
        <h3>{post.title.rendered}</h3>
      </div>

      {/* Blog Content */}
      <section className="single-blog-area p-100">
        <div className="single-blog-bg">
            {/* Featured Image */}
              {featuredImage && (
                <div className="single-blog-image mb-4">
                  <img
                    src={featuredImage}
                    alt={post.title.rendered}
                    className="img-fluid w-100"
                  />
                </div>
              )}
        </div>
        <div className="container">
          <div className="row justify-content-center">

            <div className="col-lg-12">
              {/* Meta */}
              <div className="blog-meta mb-3 d-flex justify-content-between align-items-center">
                <div className="categories">
                  {categories.map((cat) => (
                    <span key={cat.id} className="badge bg-warning me-2">
                      {cat.name}
                    </span>
                  ))}
                </div>
                <div className="date">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>

              {/* Title */}
              <h2 className="mb-4">{post.title.rendered}</h2>

              {/* Content */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html: post.content.rendered,
                }}
              />

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SingleBlog;

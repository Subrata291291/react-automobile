import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import CommonBanner from "../components/CommonBanner";
import Footer from "../components/Footer";

const Csr = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://store.januskitchen.nl/wp-json/wp/v2/posts?_embed")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Blog fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <CommonBanner />

      <section className="blog-area p-100">
        <div className="container">
          <div className="row gy-5">

            {loading && <p className="text-center">Loading blogs...</p>}

            {!loading && posts.map(post => {
              const featured =
                post._embedded?.["wp:featuredmedia"]?.[0];

              const categories =
                post._embedded?.["wp:term"]?.[0] || [];

              return (
                <div className="col-12 col-md-6 col-lg-4" key={post.id}>
                  <div className="blog-box position-relative">
                    <div className="blog-left shadow">

                      {/* IMAGE */}
                      <Link
                        className="blogpgimg"
                        to={`/blog/${post.slug}`}
                      >
                        {featured && (
                          <img
                            src={featured.source_url}
                            alt={post.title.rendered}
                          />
                        )}
                      </Link>

                      {/* CATEGORY */}
                      <h6>
                        <ul className="post-categories">
                          {categories.map(cat => (
                            <li key={cat.id}>{cat.name}</li>
                          ))}
                        </ul>
                      </h6>

                      {/* TITLE */}
                      <h4>
                        <Link
                          to={`/blog/${post.slug}`}
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered
                          }}
                        />
                      </h4>

                      {/* EXCERPT */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered
                        }}
                      />

                      <hr className="border-2" />

                      {/* FOOTER */}
                      <div className="info-wrapper">
                        <div className="more">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="read-btn"
                          >
                            Read more
                          </Link>
                        </div>
                        <div className="date">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Csr;

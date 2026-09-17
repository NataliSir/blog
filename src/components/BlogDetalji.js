import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link, NavLink } from "react-router-dom";
import { db } from "../firebase";

function BlogDetalji() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dohvatiBlog = async () => {
      try {
        const blogRef = doc(db, "blogZapisi", id);
        const blogSnapshot = await getDoc(blogRef);

        if (blogSnapshot.exists()) {
          setBlog({
            id: blogSnapshot.id,
            ...blogSnapshot.data(),
          });
        } else {
          console.log("Blog ne postoji.");
        }
      } catch (error) {
        console.error("Greška prilikom dohvaćanja bloga:", error);
      } finally {
        setLoading(false);
      }
    };

    dohvatiBlog();
  }, [id]);

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (!blog) {
    return <p>Blog nije pronađen.</p>;
  }

  return (
    <article className="blog-detalji">
      <h1>{blog.naslov}</h1>

      <h4>{blog.kategorija}</h4>

      <small>
        {blog.datum}
      </small>

      <div>
        <p>{blog.sadrzajBloga}</p>
      </div>

      
      <NavLink to="/" end className="btn-vise">
    Natrag na blogove
  </NavLink>
                       
    </article>
  );
}

export default BlogDetalji;
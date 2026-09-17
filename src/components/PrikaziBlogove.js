import { useEffect, useState } from "react";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";


function PrikaziBlogove() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const prikaziBlogove = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "blogZapisi"),

        );

        const podaci = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

          .sort((a, b) => {
            return new Date(b.datum) - new Date(a.datum);
          });
        setBlog(podaci);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja blogova:", error);
      }
    };

    prikaziBlogove();
  }, []);

  return (
    <div>
      <h2 className="h2">Podijelimo svoju priču:</h2>
      <section id="blogovi" className="records-grid">
        {blog.map((blogZapisi) => (
          <article key={blogZapisi.id} className="artikl-index">
            <h2>{blogZapisi.naslov}</h2>

            <h4>{blogZapisi.kategorija}</h4>

            <p>{blogZapisi.sadrzajBloga}</p>

            <small>
              {blogZapisi.datum}
            </small>


            <br />

            <Link
              to={`/blog/${blogZapisi.id}`}
              className="btn-vise"
            >
              Pročitaj više
            </Link>



          </article>
        ))}
      </section>
    </div>
  );
}

export default PrikaziBlogove;

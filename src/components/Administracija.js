import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    doc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase";

function Administracija() {
    const [currentUser, setCurrentUser] = useState(null);
    const [blogovi, setBlogovi] = useState([]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Sve");

    const navigate = useNavigate();

    // Provjera korisnika
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                window.location.href = "/login";
            }
        });

        return () => unsubscribe();
    }, []);

    // Učitavanje blogova
    useEffect(() => {
        if (currentUser) {
            prikaziBlogove();
        }
    }, [currentUser]);

    const prikaziBlogove = async () => {
        if (!currentUser) return;

        try {
            const q = query(
                collection(db, "blogZapisi"),
                where("autorId", "==", currentUser.uid)
            );

            const snapshot = await getDocs(q);

            const ucitaniBlogovi = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data()
            }));

            // Najnoviji blog prvi
            ucitaniBlogovi.sort((a, b) => {
                return (
                    new Date(b.datum) -
                    new Date(a.datum)
                );
            });

            setBlogovi(ucitaniBlogovi);

        } catch (error) {
            console.error(
                "Greška kod učitavanja blogova:",
                error
            );
        }
    };

    // Brisanje bloga
    const obrisiBlog = async (id) => {
        const potvrda = window.confirm(
            "Želite li obrisati blog?"
        );

        if (!potvrda) return;

        try {
            await deleteDoc(
                doc(db, "blogZapisi", id)
            );

            alert("Blog je obrisan.");

            await prikaziBlogove();

        } catch (error) {
            console.error(
                "Greška prilikom brisanja bloga:",
                error
            );

            alert("Greška prilikom brisanja bloga.");
        }
    };

    // Pretraga i filter
    const filtriraniBlogovi = blogovi.filter((blog) => {
        const trazenaRijec =
            search.toLowerCase().trim();

        const naslovBloga =
            (blog.naslov || "").toLowerCase();

        const sadrzaj =
            (blog.sadrzajBloga || "").toLowerCase();

        const odgovaraPretrazi =
            naslovBloga.includes(trazenaRijec) ||
            sadrzaj.includes(trazenaRijec);

        const odgovaraKategoriji =
            filter === "Sve" ||
            blog.kategorija === filter;

        return (
            odgovaraPretrazi &&
            odgovaraKategoriji
        );
    });

    // Dok Firebase provjerava korisnika
    if (!currentUser) {
        return null;
    }

    return (
        <div>
            <main className="container">

                {/* NOVI BLOG */}
                <div className="btn-container">
                    <button
                        className="btn-noviblog"
                        onClick={() =>
                            navigate("/novi-blog")
                        }
                    >
                        Upiši novi blog
                    </button>
                </div>

                {/* PRETRAGA I FILTER */}
                <section className="toolbar">

                    <input
                        type="search"
                        placeholder="Pronađi blog..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <select
                        value={filter}
                        onChange={(e) =>
                            setFilter(e.target.value)
                        }
                    >
                        <option value="Sve">
                            Sve kategorije
                        </option>

                        <option value="Putovanja">
                            Putovanja
                        </option>

                        <option value="Biljke">
                            Biljke
                        </option>

                        <option value="Životinje">
                            Životinje
                        </option>

                        <option value="Kuća">
                            Kuća
                        </option>

                        <option value="Informatika">
                            Informatika
                        </option>

                        <option value="Ostalo">
                            Ostalo
                        </option>
                    </select>

                </section>

                {/* BLOGOVI */}
                <section>

                    <h2 className="h2">
                        Blogovi
                    </h2>

                    <section className="records-grid">

                        {filtriraniBlogovi.map((blog) => (
                            <article
                                className="artikl"
                                key={blog.id}
                            >
                                <h3>
                                    {blog.naslov}
                                </h3>

                                <h4>
                                    Kategorija:{" "}
                                    {blog.kategorija}
                                </h4>

                                <p>
                                    {blog.sadrzajBloga}
                                </p>

                                <small>
                                    {blog.datum}
                                </small>

                                <br />
                                <br />

                                {/* UREDI */}
                                <button
                                    className="btn-uredi"
                                    onClick={() =>
                                        navigate(
                                            `/novi-blog/${blog.id}`
                                        )
                                    }
                                >
                                    Uredi
                                </button>

                                {/* OBRIŠI */}
                                <button
                                    className="btn-delete"
                                    onClick={() =>
                                        obrisiBlog(
                                            blog.id
                                        )
                                    }
                                >
                                    Obriši
                                </button>

                            </article>
                        ))}

                    </section>

                </section>

            </main>
        </div>
    );
}

export default Administracija;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    collection,
    doc,
    getDoc,
    addDoc,
    updateDoc
} from "firebase/firestore";

import { auth, db } from "../firebase";

function NoviBlog() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [naslov, setNaslov] = useState("");
    const [kategorija, setKategorija] = useState("Informatika");
    const [sadrzajBloga, setSadrzajBloga] = useState("");
    const [datum, setDatum] = useState("");

    const [ucitavanje, setUcitavanje] = useState(false);

    // Ako postoji id -> uređivanje
    // Ako ne postoji id -> novi blog
    const uredjivanje = Boolean(id);

    useEffect(() => {
        const ucitajBlog = async () => {
            // Ako nema ID-a, ne učitavamo ništa
            if (!id) {
                return;
            }

            setUcitavanje(true);

            try {
                console.log("Učitavam blog:", id);

                const blogRef = doc(db, "blogZapisi", id);
                const blogSnapshot = await getDoc(blogRef);

                if (!blogSnapshot.exists()) {
                    alert("Blog nije pronađen.");
                    navigate("/administracija");
                    return;
                }

                const blog = blogSnapshot.data();

                console.log("Učitani blog:", blog);

                setNaslov(blog.naslov || "");
                setKategorija(blog.kategorija || "Informatika");
                setSadrzajBloga(blog.sadrzajBloga || "");
                setDatum(blog.datum || "");
            } catch (error) {
                console.error(
                    "Greška kod učitavanja bloga:",
                    error
                );

                alert("Greška kod učitavanja bloga.");
            } finally {
                setUcitavanje(false);
            }
        };

        ucitajBlog();
    }, [id, navigate]);

    const spremiBlog = async (e) => {
        e.preventDefault();

        if (!auth.currentUser) {
            alert("Korisnik nije prijavljen.");
            navigate("/login");
            return;
        }

        try {
            if (uredjivanje) {
                // UREĐIVANJE POSTOJEĆEG BLOGA
                const blogRef = doc(db, "blogZapisi", id);

                await updateDoc(blogRef, {
                    naslov: naslov,
                    kategorija: kategorija,
                    sadrzajBloga: sadrzajBloga,
                    datum: datum
                });

                alert("Blog je uspješno uređen.");
            } else {
                // NOVI BLOG
                await addDoc(collection(db, "blogZapisi"), {
                    naslov: naslov,
                    kategorija: kategorija,
                    sadrzajBloga: sadrzajBloga,
                    datum: datum,
                    autorId: auth.currentUser.uid
                });

                alert("Blog je uspješno dodan.");
            }

            navigate("/administracija");
        } catch (error) {
            console.error(
                "Greška prilikom spremanja bloga:",
                error
            );

            alert("Greška prilikom spremanja bloga.");
        }
    };

    return (
        <div>
            <section className="form-section">
                <h2 className="h2">
                    {uredjivanje
                        ? "Uređivanje bloga"
                        : "Upis novog bloga"}
                </h2>

                {ucitavanje ? (
                    <p>Učitavanje bloga...</p>
                ) : (
                    <form onSubmit={spremiBlog}>

                        <div className="form-group">
                            <label>
                                Upiši naslov bloga:
                            </label>

                            <input
                                type="text"
                                placeholder="Naslov bloga"
                                value={naslov}
                                onChange={(e) =>
                                    setNaslov(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Kategorija
                            </label>

                            <select
                                value={kategorija}
                                onChange={(e) =>
                                    setKategorija(e.target.value)
                                }
                            >
                                <option value="Informatika">
                                    Informatika
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

                                <option value="Ostalo">
                                    Ostalo
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                Upiši sadržaj bloga:
                            </label>

                            <textarea
                                rows="22"
                                cols="50"
                                placeholder="Sadržaj bloga"
                                value={sadrzajBloga}
                                onChange={(e) =>
                                    setSadrzajBloga(e.target.value)
                                }
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>
                                Upiši datum:
                            </label>

                            <br />

                            <input
                                type="date"
                                className="datum-input"
                                value={datum}
                                onChange={(e) =>
                                    setDatum(e.target.value)
                                }
                            />
                        </div>

                        <br />
                        <br />

                        <button
                            type="submit"
                            id="btnSpremi"
                            className="btn-primary"
                        >
                            {uredjivanje
                                ? "Spremi promjene"
                                : "Zapiši blog"}
                        </button>

                        <button
                            type="button"
                            id="btnOdustani"
                            className="btn-odustani"
                            onClick={() =>
                                navigate("/administracija")
                            }
                        >
                            Odustani
                        </button>

                    </form>
                )}
            </section>
        </div>
    );
}

export default NoviBlog;
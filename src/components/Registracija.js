import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import { auth } from "../firebase";

function Registracija() {
    const navigate = useNavigate();

    const [ime, setIme] = useState("");
    const [adresa, setAdresa] = useState("");
    const [eposta, setEposta] = useState("");
    const [password, setPassword] = useState("");

    const registrirajKorisnika = async (e) => {
        e.preventDefault();

        try {
            const korisnik = await createUserWithEmailAndPassword(
                auth,
                eposta,
                password
            );

            console.log("Registriran korisnik:", korisnik.user);

            // Nakon uspješne registracije
            // otvori Administracija.js
            navigate("/administracija");

        } catch (error) {
            console.error(
                "Greška kod registracije:",
                error
            );

            if (error.code === "auth/email-already-in-use") {
                alert("Ovaj e-mail je već registriran.");
            } else if (error.code === "auth/invalid-email") {
                alert("E-mail adresa nije ispravna.");
            } else if (error.code === "auth/weak-password") {
                alert("Lozinka mora imati najmanje 6 znakova.");
            } else {
                alert("Registracija nije uspjela.");
            }
        }
    };

    return (
        <div>
            <section className="form-registracija">
                <h2>Popunite podatke za registraciju</h2>

                <form
                    id="addUserForm"
                    onSubmit={registrirajKorisnika}
                >
                    <div className="form-group">
                        <label>Ime i prezime:</label>

                        <input
                            type="text"
                            id="ime"
                            placeholder="ime i prezime"
                            value={ime}
                            onChange={(e) =>
                                setIme(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Adresa:</label>

                        <input
                            type="text"
                            id="adresa"
                            placeholder="adresa"
                            value={adresa}
                            onChange={(e) =>
                                setAdresa(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Upišite e-mail:</label>

                        <input
                            type="email"
                            id="eposta"
                            placeholder="email"
                            value={eposta}
                            onChange={(e) =>
                                setEposta(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Upišite lozinku:</label>

                        <input
                            type="password"
                            id="password"
                            placeholder="lozinka"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="btn-containerLogin">
                        <button
                            type="submit"
                            id="btnRegistracija"
                            className="btn-primary"
                        >
                            Registracija
                        </button>

                        <Link
                            to="/login"
                            id="btnPovratak"
                            className="btn-primary"
                        >
                            Povratak na prijavu
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Registracija;
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBlogAuth } from "../utils/Utils";

function LoginLink() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [greska, setGreska] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setGreska("");

        try {
            await signInWithEmailAndPassword(
                getBlogAuth(),
                email,
                lozinka
            );

            navigate("/administracija");
        } catch (error) {
            console.log(error);
            setGreska("Pogrešan e-mail ili lozinka.");
        }
    };

    return (
        <div>
            <section className="form-login">
                <h2 className="h2">Popunite podatke za prijavu</h2>

                <form id="userLogin" onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Upišite e-mail:</label>

                        <input
                            type="email"
                            id="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Upišite lozinku:</label>

                        <input
                            type="password"
                            id="lozinka"
                            placeholder="lozinka"
                            value={lozinka}
                            onChange={(e) => setLozinka(e.target.value)}
                            required
                        />
                    </div>

                    {greska && (
                        <p className="error">
                            {greska}
                        </p>
                    )}

                    <div className="btn-containerLogin">

                        <button
                            type="submit"
                            id="btnLogin"
                            className="btn-primary"
                        >
                            Prijava
                        </button>

                        <Link
                            to="/registracija"
                            id="btnOtvaramReg"
                            className="btn-primary"
                        >
                            Želim se registrirati
                        </Link>

                    </div>
                </form>
            </section>
        </div>
    );
}

export default LoginLink;
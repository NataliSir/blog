import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getBlogAuth } from "../utils/Utils";

function Navigacija() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getBlogAuth();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(getBlogAuth());
            navigate("/login");
        } catch (error) {
            console.error("Greška prilikom odjave:", error);
        }
    };

    return (
        <div>
            <nav className="glavna-navigacija">
                <ul className="nav-list">

                    <li>
                        <NavLink
                            to="/"
                            end
                            className="a"
                        >
                            Početna
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/autor"
                            className="a"
                        >
                            Autor
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/kontakt"
                            className="a"
                        >
                            Kontakt
                        </NavLink>
                    </li>

                    {user ? (
                        <>
                            <li>
                                <NavLink
                                    to="/administracija"
                                    className="a"
                                >
                                    Administracija
                                </NavLink>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="a logout-button"
                                >
                                    Odjava
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <NavLink
                                to="/login"
                                className="a"
                            >
                                Prijava
                            </NavLink>
                        </li>
                    )}

                </ul>
            </nav>
        </div>
    );
}

export default Navigacija;
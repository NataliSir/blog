import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {db} from "../firebase"

function Kontakt() {
    const [formData, setFormData] = useState({
        ime:"",
        prezime:"",
        telefon:"",
        email:"",
        poruka:""
    });
    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await addDoc(collection(db, "upitAutoru"),{
                ime:formData.ime.trim(),
                prezime:formData.prezime.trim(),
                telefon:formData.telefon.trim(),
                email:formData.email.trim(),
                poruka:formData.poruka.trim(),
                datum:serverTimestamp()
            });
            alert("Vaš upit je uspješno spremljen.");
            setFormData({
                ime:"",
                prezime:"",
                telefon:"",
                email:"",
                poruka:"",
            });
        }catch(error){
            console.error("Greška prilikom spremanja:", error);
            alert("Došlo je do greške prilikom spremanja.");
        }
    };

    return (
        <div>
            <section className="form-poruka">
                <h2 className="h2">Upit autoru</h2>
                <form id="upitAutoru" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Vaše ime:
                        </label>
                        <input
                            type="text"
                            name="ime"
                            value={formData.ime}
                            onChange={handleChange}
                            placeholder="Vaše ime"
                            required />
                    </div>
                    <div className="form-group">
                        <label>
                            Vaše prezime:
                        </label>
                        <input
                            type="text"
                            name="prezime"
                            value={formData.prezime}
                            onChange={handleChange}
                            placeholder="Vaše prezime"
                            required />
                    </div>

                    <div className="form-group">
                        <label>
                            Kontakt broj:
                        </label>
                        <input
                            type="text"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            placeholder="Kontakt broj"
                            required />
                    </div>
                    <div className="form-group">
                        <label>
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required />
                    </div>
                    <div class="form-group">
                        <label>
                            Vaša poruka:
                        </label>
                        <textarea
                            type="text"
                            rows="22"
                            cols="50"
                            name="poruka"
                            value={formData.poruka}
                            onChange={handleChange}
                            placeholder="Vaša poruka"
                            required></textarea>
                    </div>
                    <br /> <br />
                    <button
                        type="submit"
                        id="btnPoruka"
                        class="btn-primary">Pošalji poruku</button>

                </form>
            </section>
        </div>
    );
}
export default Kontakt;
import { useState } from "react";
import homme from '/public/homme.png';
import femme from '/public/femme.png';
import imagee from '/public/img.jpg'; 
import "./App.css"

export default function App() {
    const [taille, setTaille] = useState("");
    const [genre, setGenre] = useState("");
    const [res, setRes] = useState("");
    const [error, setError] = useState("");
    const [isHovered, setIsHovered] = useState(false); // State to handle hover effect

    const calculateWeight = () => {
        if (!taille || !genre) {
            setError("Veuillez remplir tous les champs");
            setRes("");
            return;
        }

        const value = parseInt(taille);
        if (isNaN(value)) {
            setError("La taille doit être un entier");
            return;
        } else if (value < 150) {
            setError("La taille minimum est: 150cm");
            return;
        }

        const hommec = value - 100 - ((value - 150) / 4);
        const femmec = value - 100 - ((value - 150) / 2.5);
        setRes(`${genre === "homme" ? hommec : femmec} Kg`);
        setError("");
    };

    return (
      <div className="container">
      <div className="card">
          <h1>Calcul de Poids Idéal</h1>

          {/* Taille Input */}
          <div className="input-group">
              <label>Taille en CM</label><br />
              <input
                  type="number"
                  value={taille}
                  onChange={(e) => setTaille(e.target.value)}
              />
          </div>

          {/* Genre Input */}
          <div className="input-group">
              <label>Genre</label><br />
              <div className="gender-select">
                  <select
                      onChange={(e) => setGenre(e.target.value)}
                  >
                      <option value="">Choisissez</option>
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                  </select>
                  {genre && (
                      <img
                          src={genre === "homme" ? homme : femme}
                          alt={genre}
                          style={{ width: '35px', marginLeft: '10px' }}
                      />
                  )}
              </div>
          </div>

          {/* Error/Result Display */}
          <div className={`error-result ${error ? 'error' : ''}`}>
              {error || res}
          </div>

          {/* Calculate Button */}
          <button
              onClick={calculateWeight}
              className="button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
          >
              Calculer
          </button>
      </div>
  </div>
    );
}

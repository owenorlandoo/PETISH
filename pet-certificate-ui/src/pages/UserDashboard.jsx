import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const contract = await getContract();
      const count = await contract.petCounter();
      const petList = [];

      for (let i = 0; i < parseInt(count); i++) {
        const pet = await contract.getPet(i);
        petList.push({
          id: i,
          name: pet.name,
          species: pet.species,
          owner: pet.owner,
          vaccines: pet.vaccines,
          health: pet.health,
          achievements: pet.achievements,
        });
      }

      setPets(petList);
    };

    fetchPets();
  }, []);

  const handleRequestAdoption = async (petId) => {
    try {
      const contract = await getContract();
      const tx = await contract.requestAdoption(petId);
      await tx.wait();
      alert("Adoption request sent!");
    } catch (err) {
      alert("Failed to request adoption: " + err.reason || err.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <button className="btn btn-secondary mb-4" onClick={() => navigate("/")}>← Back to Role Selection</button>
      <h2 className="text-center mb-4">User Dashboard: Available Pets</h2>

      {pets.length === 0 ? (
        <p className="text-center">No pets available.</p>
      ) : (
        <div className="row justify-content-center">
          {pets.map((pet) => (
            <div key={pet.id} className="col-md-4 mb-4">
              <div className="card" style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <div className="card-body">
                  <h5 className="card-title">{pet.name} ({pet.species})</h5>
                  <p><strong>Owner:</strong> {pet.owner}</p>
                  <p><strong>Achievements:</strong> {pet.achievements.join(", ") || "None"}</p>
                  <p><strong>Vaccines:</strong> {pet.vaccines.join(", ") || "None"}</p>
                  <p><strong>Health Records:</strong> {pet.health.join(", ") || "None"}</p>
                  <button className="btn btn-success w-100" onClick={() => handleRequestAdoption(pet.id)}>
                    Request Adoption
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

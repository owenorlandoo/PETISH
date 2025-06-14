import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getContract } from "../utils/contract";
import { uploadToIPFS } from "../utils/uploadToIPFS";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function VetDashboard() {
  const navigate = useNavigate();
  const [petId, setPetId] = useState("");
  const [vaccine, setVaccine] = useState("");
  const [health, setHealth] = useState("");
  const [contract, setContract] = useState(null);
  const [status, setStatus] = useState("");
  const [vaccineFile, setVaccineFile] = useState(null);
  const [achievement, setAchievement] = useState("");
  const [achievementFile, setAchievementFile] = useState(null);



  useEffect(() => {
    const init = async () => {
      const c = await getContract();
      setContract(c);
    };
    init();
  }, []);

  const handleAddVaccine = async () => {
    if (!vaccineFile){
      setStatus("Please upload a vaccine certificate file.");
      return;
    }
    try {
      setStatus("Uploading to IPFS...");
      const ipfsHash = await uploadToIPFS(vaccineFile); // gunakan langsung

      setStatus("Saving to blockchain...");
      const tx = await contract.addVaccine(petId, ipfsHash, vaccine);
      await tx.wait();
      setStatus("Vaccine certificate saved to blockchain!");
    } catch (err) {
      setStatus("Error adding vaccine: " + err.message);
    }
  };

  const handleAddAchievement = async () => {
    if (!achievementFile) {
      setStatus("Please upload an achievement certificate file.");
      return;
    }
    try {
      setStatus("Uploading achievement to IPFS...");
      const ipfsHash = await uploadToIPFS(achievementFile);

      setStatus("Saving achievement to blockchain...");
      const tx = await contract.addAchievement(petId, ipfsHash,achievement);
      await tx.wait();
      setStatus("Achievement certificate saved to blockchain!");
    } catch (err) {
      setStatus("Error adding achievement: " + err.message);
    }
  };


  const handleAddHealth = async () => {
    try {
      const tx = await contract.addHealth(petId, health);
      await tx.wait();
      setStatus("Health record added!");
    } catch (err) {
      setStatus("Error adding health record: " + err.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <button className="btn btn-secondary mb-4" onClick={() => navigate("/")}>← Back to Role Selection</button>
      <h2 className="text-center mb-4">Vet Dashboard</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Pet ID</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter pet ID"
              onChange={(e) => setPetId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Vaccine</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter vaccine name"
              onChange={(e) => setVaccine(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Vaccine Certificate File</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setVaccineFile(e.target.files[0])}
            />
          </div>

          <div className="d-grid gap-2 mb-4">
            <button className="btn btn-primary" onClick={handleAddVaccine}>
              Add Vaccine
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label">Achievement</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter achievement description"
              onChange={(e) => setAchievement(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Achievement Certificate File</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setAchievementFile(e.target.files[0])}
            />
          </div>

          <div className="d-grid gap-2 mb-4">
            <button className="btn btn-warning" onClick={handleAddAchievement}>
              Add Achievement
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label">Health Record</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter health record details"
              onChange={(e) => setHealth(e.target.value)}
            />
          </div>

          <div className="d-grid gap-2 mb-4">
            <button className="btn btn-success" onClick={handleAddHealth}>
              Add Health Record
            </button>
          </div>

          <p className="text-center">{status}</p>
        </div>
      </div>
    </div>
  );
}

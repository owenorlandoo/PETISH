import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContract } from "../utils/contract";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ShelterDashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

const handleUploadPetImage = async () => {
  if (!file || !name || !species) {
    alert("Lengkapi semua kolom.");
    return;
  }

  try {
    setStatus("Uploading image to Pinata...");
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: "694b3cd0db2cf7db9c1d",
        pinata_secret_api_key: "9664c393d0dc13430a2695f0a828a2ccd70cc0bea9dcbc22355bda8da4092ff3",
      },
    });

    const hash = res.data.IpfsHash;
    const ipfsURI = `ipfs://${hash}`;

    setIpfsHash(ipfsURI);
    setStatus("Minting pet data to blockchain...");

    const contract = await getContract(); // pastikan ini diimport
    const tx = await contract.mint(name, species, ipfsURI);
    await tx.wait();

    setStatus("Upload successful! Gambar siap ditampilkan di User Dashboard.");
  } catch (err) {
    console.error(err);
    setStatus("Upload error: " + err.message);
  }
};


  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <button className="btn btn-secondary mb-4" onClick={() => navigate("/")}>← Back to Role Selection</button>
      <h2 className="text-center mb-4">Shelter Dashboard</h2>
      {/* <h3 className="text-center mb-4">Upload Pet Image</h3> */}

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Pet Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter pet's name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Species</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter species"
              onChange={(e) => setSpecies(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pet Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button className="btn btn-primary w-100 mb-4" onClick={handleUploadPetImage}>
            Upload Pet Image
          </button>

          <p className="text-center">{status}</p>

          {/* {ipfsHash && (
            <div className="text-center mt-4">
              <p><strong>Image IPFS Hash:</strong> {ipfsHash}</p>
              <a
                href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-link"
              >
                View Pet Image on IPFS
              </a>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

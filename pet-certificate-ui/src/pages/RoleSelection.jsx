// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BrowserProvider, Contract } from "ethers";
// import PetCertificateABI from "../constants/PetCertificateABI.json";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const CONTRACT_ADDRESS = "0xYourContractAddressHere"; // ← Ganti ke alamat kontrak aslimu

// const Role = {
//   None: { value: 0, route: "/register" },
//   Shelter: { value: 1, route: "/shelter", color: "#0d6efd" },
//   Vet:     { value: 2, route: "/vet", color: "#ffc107" },
//   Owner:   { value: 3, route: "/owner", color: "#0dcaf0" },
//   User:    { value: 4, route: "/user", color: "#198754" }, // Public Viewer
// };

// export default function RoleSelection() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkUserRole = async () => {
//       if (!window.ethereum) {
//         alert("Please install MetaMask!");
//         navigate("/register");
//         return;
//       }

//       try {
        
//         const provider = new BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         const contract = new Contract(CONTRACT_ADDRESS, PetCertificateABI.abi, provider);

//         const role = await contract.getRole(address);

//         const roleNumber = Number(role);

//         // Jika role adalah 0, berarti belum punya role
//         if (roleNumber === 0) {
//           alert("You are not registered yet. Redirecting to register...");
//           navigate("/register");
//           return;
//         }

//         // Valid roles: 1–4
//         const roleIsValid = Object.values(Role).some(r => r.value === roleNumber);

//         if (!roleIsValid) {
//           alert("Invalid role found. Redirecting to register...");
//           navigate("/register");
//           return;
//         }

//       } catch (err) {
//         console.error("Error checking role:", err);
//         alert("Failed to check role. Redirecting to register...");
//         navigate("/register");
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUserRole();
//   }, [navigate]);

//   const handleGoToDashboard = (roleKey) => {
//     navigate(Role[roleKey].route);
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
//         <div className="spinner-border text-primary" role="status" />
//       </div>
//     );
//   }

//   return (
//     <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", paddingTop: "2rem" }}>
//       <div className="text-center w-100" style={{ maxWidth: "400px" }}>
//         <img
//           src="Petish_Logo.png"
//           alt="Petish Logo"
//           style={{ width: "250px", height: "auto", marginBottom: "20px" }}
//         />

//         <h1 className="mb-4 display-5" style={{ fontWeight: "400", color: "#3A3A3A" }}>
//           Choose Dashboard
//         </h1>

//         <div className="d-flex flex-column align-items-center">
//           {Object.keys(Role).map((role) => (
//             <button
//               key={role}
//               className="btn mb-3 w-100 p-3 shadow-sm"
//               style={{
//                 borderRadius: "25px",
//                 transition: "all 0.3s ease",
//                 backgroundColor: Role[role].color,
//                 color: "#fff"
//               }}
//               onClick={() => handleGoToDashboard(role)}
//             >
//               {role}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Role = {
  Shelter: { value: 1, route: "/shelter", color: "#0d6efd" },
  Vet:     { value: 2, route: "/vet", color: "#ffc107" },
  Owner:   { value: 3, route: "/owner", color: "#0dcaf0" },
  User:    { value: 4, route: "/user", color: "#198754" }, // Public Viewer
};

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleGoToDashboard = (roleKey) => {
    navigate(Role[roleKey].route);
  };
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", paddingTop: "2rem" }}>
      <div className="text-center w-100" style={{ maxWidth: "400px" }}>
        <img
          src="Petish_Logo.png"
          alt="Petish Logo"
          style={{ width: "250px", height: "auto", marginBottom: "20px" }}
        />

        <h1 className="mb-4 display-5" style={{ fontWeight: "400", color: "#3A3A3A" }}>
          Choose Dashboard
        </h1>

        <div className="d-flex flex-column align-items-center">
          {Object.keys(Role).map((role) => (
            <button
              key={role}
              className="btn mb-3 w-100 p-3 shadow-sm"
              style={{
                borderRadius: "25px",
                transition: "all 0.3s ease",
                backgroundColor: Role[role].color,
                color: "#fff"
              }}
              onClick={() => handleGoToDashboard(role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

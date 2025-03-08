import React, { useState } from "react";
import { ethers } from "ethers";
import MedGuardABI from "./MedGuardABI.json"; // ABI from compiled contract

const contractAddress = "0xE1Fe9Ff45D03f3574aA359C4aa91E73217e9a1BF"; // Replace with your contract address

function App() {
  const [recordData, setRecordData] = useState("");
  const [recordId, setRecordId] = useState("");
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [searchBloodType, setSearchBloodType] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [matchingDonors, setMatchingDonors] = useState([]);
  const [contract, setContract] = useState(null);

  // Connect to the contract
  const connectContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const medGuardContract = new ethers.Contract(contractAddress, MedGuardABI, signer);
      setContract(medGuardContract);
      alert("Contract connected!");
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Add a medical record
  const addRecord = async () => {
    if (contract) {
      const tx = await contract.addRecord(recordData);
      await tx.wait();
      alert("Record added!");
    }
  };

  // Get a medical record
  const getRecord = async () => {
    if (contract) {
      const record = await contract.getRecord(recordId);
      alert(`Record data: ${record}`);
    }
  };

  // Register as a blood donor
  const registerDonor = async () => {
    if (contract) {
      const tx = await contract.registerDonor(name, bloodType, location, contactInfo);
      await tx.wait();
      alert("Donor registered!");
    }
  };

  // Search for donors
  const searchDonors = async () => {
    if (contract) {
      const donors = await contract.searchDonors(searchBloodType, searchLocation);
      setMatchingDonors(donors);
    }
  };

  return (
    <div>
      <h1>Healthcare-MedGuard</h1>
      <button onClick={connectContract}>Connect Contract</button>

      <div>
        <h2>Add Medical Record</h2>
        <input
          type="text"
          placeholder="Record data"
          value={recordData}
          onChange={(e) => setRecordData(e.target.value)}
        />
        <button onClick={addRecord}>Add Record</button>
      </div>

      <div>
        <h2>Get Medical Record</h2>
        <input
          type="text"
          placeholder="Record ID"
          value={recordId}
          onChange={(e) => setRecordId(e.target.value)}
        />
        <button onClick={getRecord}>Get Record</button>
      </div>

      <div>
        <h2>Blood Donation</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Blood Type"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <button onClick={registerDonor}>Register as Donor</button>
      </div>

      <div>
        <h2>Search for Donors</h2>
        <input
          type="text"
          placeholder="Blood Type"
          value={searchBloodType}
          onChange={(e) => setSearchBloodType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <button onClick={searchDonors}>Search</button>

        <h3>Matching Donors:</h3>
        <ul>
          {matchingDonors.map((donor, index) => (
            <li key={index}>{donor}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
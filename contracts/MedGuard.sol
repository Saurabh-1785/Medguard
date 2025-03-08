// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedGuard {
    struct Record {
        string data;
        address owner;
    }

    struct Donor {
        string name;
        string bloodType;
        string location;
        string contactInfo;
        uint256 lastDonationTimestamp;
    }

    mapping(uint256 => Record) public records;
    mapping(address => Donor) public donors;
    address[] public donorList;

    uint256 public totalRecords;

    event RecordAdded(uint256 id, string data);
    event DonorRegistered(address donor, string name, string bloodType);
    event DonationRequested(string bloodType, string location);

    // Add a medical record
    function addRecord(string memory _data) public {
        records[totalRecords] = Record(_data, msg.sender);
        emit RecordAdded(totalRecords, _data);
        totalRecords++;
    }

    // Get a medical record
    function getRecord(uint256 id) public view returns (string memory) {
        require(records[id].owner == msg.sender, "Not authorized");
        return records[id].data;
    }

    // Register as a blood donor
    function registerDonor(
        string memory name,
        string memory bloodType,
        string memory location,
        string memory contactInfo
    ) public {
        donors[msg.sender] = Donor(name, bloodType, location, contactInfo, 0);
        donorList.push(msg.sender);
        emit DonorRegistered(msg.sender, name, bloodType);
    }

    // Update donation timestamp
    function updateDonationTimestamp() public {
        require(donors[msg.sender].lastDonationTimestamp != 0, "Not a donor");
        donors[msg.sender].lastDonationTimestamp = block.timestamp;
    }

    // Search for donors by blood type and location
    function searchDonors(string memory bloodType, string memory location)
        public
        view
        returns (address[] memory)
    {
        address[] memory matchingDonors = new address[](donorList.length);
        uint256 count = 0;

        for (uint256 i = 0; i < donorList.length; i++) {
            Donor memory donor = donors[donorList[i]];
            if (
                keccak256(abi.encodePacked(donor.bloodType)) ==
                    keccak256(abi.encodePacked(bloodType)) &&
                keccak256(abi.encodePacked(donor.location)) ==
                    keccak256(abi.encodePacked(location))
            ) {
                matchingDonors[count] = donorList[i];
                count++;
            }
        }

        // Resize the array to remove empty slots
        address[] memory result = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = matchingDonors[i];
        }

        return result;
    }

    // Create a blood donation request
    function requestDonation(string memory bloodType, string memory location) public {
        emit DonationRequested(bloodType, location);
    }
}
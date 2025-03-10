// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        string partyLogo;
        string partyName;
        string photo;
        string position;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => uint) public voters;
    uint public _candidatesCount;
    uint public voterCount;
    event Voted(address indexed voter, uint indexed candidateId);

    constructor(string[] memory candidateNames, string[] memory partyLogos, string[] memory partyNames, string[] memory photos, string[] memory positions) {
        require(candidateNames.length == partyLogos.length && 
                candidateNames.length == partyNames.length &&
                candidateNames.length == photos.length &&
                candidateNames.length == positions.length, 
                "All input arrays must have the same length.");
        
        for (uint i = 0; i < candidateNames.length; i++) {
            addCandidate(candidateNames[i], partyLogos[i], partyNames[i], photos[i], positions[i]);
        }
    }

    function addCandidate(string memory _name, string memory _partyLogo, string memory _partyName, string memory _photo, string memory _position) private {
        _candidatesCount++;
        candidates[_candidatesCount] = Candidate(_candidatesCount, _name, _partyLogo, _partyName, _photo, _position, 0);
    }

    function vote(uint _candidateId) public {
        require(voters[msg.sender] == 0, "You have already voted.");
        require(_candidateId > 0 && _candidateId <= _candidatesCount, "Invalid candidate ID.");

        voters[msg.sender] = _candidateId;
        candidates[_candidateId].voteCount++;
        voterCount++;

        emit Voted(msg.sender, _candidateId);
    }

    function getCandidate(uint _candidateId) public view returns (uint, string memory, string memory, string memory, string memory, uint) {
        require(_candidateId > 0 && _candidateId <= _candidatesCount, "Invalid candidate ID.");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.partyLogo, candidate.partyName, candidate.photo, candidate.voteCount);
    }

    function getVoterCount() public view returns (uint) {
        return voterCount;
    }

    function getVoterVote(address _voterAddress) public view returns (uint) {
        return voters[_voterAddress];
    }

    function candidatesCount() public view returns (uint) {
        return _candidatesCount;
    }

    function getTotalVotesForCandidates() public view returns (uint[] memory, uint[] memory) {
        uint[] memory candidateIds = new uint[](_candidatesCount);
        uint[] memory voteCounts = new uint[](_candidatesCount);

        for (uint i = 1; i <= _candidatesCount; i++) {
            candidateIds[i - 1] = candidates[i].id;
            voteCounts[i - 1] = candidates[i].voteCount;
        }

        return (candidateIds, voteCounts);
    }
}
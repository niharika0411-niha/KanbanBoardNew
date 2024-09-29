import React, { useState } from "react"; // Importing React and useState hook

import "./DisplayDropdown.css"; // Importing CSS for styling
import Display from "../../Assets/Display.svg"; // Importing the display icon
import Down from "../../Assets/down.svg"; // Importing the down arrow icon

const DisplayDropdown = ({ onGroupChange, onSortChange }) => { // Functional component receiving props
  const [isOpen, setIsOpen] = useState(false); // State to manage the dropdown's open/closed status

  // Function to toggle the visibility of the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Switches the state between open and closed
  };

  return (
    <div className={`dropdown ${isOpen ? 'active' : ''}`}> {/* Applies 'active' class when dropdown is open */}
      <div className="display-container">
        <button className="display-button" onClick={toggleDropdown}> {/* Button to toggle dropdown */}
          <img src={Display} alt="Display Icon" /> {/* Display icon */}
          <span>Display</span> {/* Button text */}
          <img src={Down} alt="Down Arrow" /> {/* Down arrow icon */}
        </button>
      </div>
      <div className="dropdown-content"> {/* Dropdown menu content */}
        <div>
          <label>Grouping</label> {/* Label for grouping options */}
          <select onChange={(e) => onGroupChange(e.target.value)}> {/* Dropdown for selecting grouping */}
            <option value="">Select</option> {/* Default option */}
            <option value="status">Status</option> {/* Grouping by status */}
            <option value="userId">User ID</option> {/* Grouping by user ID */}
            <option value="priority">Priority</option> {/* Grouping by priority */}
          </select>
        </div>
        <div>
          <label>Sorting</label> {/* Label for sorting options */}
          <select onChange={(e) => onSortChange(e.target.value)}> {/* Dropdown for selecting sorting */}
            <option value="">Select</option> {/* Default option */}
            <option value="priority">Priority</option> {/* Sorting by priority */}
            <option value="title">Title</option> {/* Sorting by title */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DisplayDropdown; // Exporting the component for use in other files

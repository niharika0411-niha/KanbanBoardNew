import React from "react";
import "./Card.css";
import greyDot from "../Assets/gray dot.png"; 
import Todo from "../Assets/To-do.svg"; 
import inProgress from "../Assets/in-progress.svg"; 
import done from "../Assets/Done.svg"; 
import canceled from "../Assets/Cancelled.svg"; 
import backlog from '../Assets/Backlog.svg';
import NP from '../Assets/No-priority.svg'; 
import LP from '../Assets/Img - Low Priority.svg'; 
import MP from '../Assets/Img - Medium Priority.svg'; 
import HP from '../Assets/Img - High Priority.svg'; 
import UP from '../Assets/SVG - Urgent Priority grey.svg';

const Card = ({ id, title, tag, userId, status, priority }) => {
  let statusIcon, priorityIcon;

  // Determine the appropriate icon for the status
  switch (status) {
    case 'Todo':
      statusIcon = Todo;
      break;
    case 'In progress':
      statusIcon = inProgress;
      break;
    case 'Done':
      statusIcon = done;
      break;
    case 'Cancelled':
      statusIcon = canceled;
      break;
    case 'Backlog':
      statusIcon = backlog;
      break;
    default:
      break;
  }

  // Determine the appropriate icon for the priority
  switch (priority) {
    case 0:
      priorityIcon = NP;
      break;
    case 1:
      priorityIcon = LP;
      break;
    case 2:
      priorityIcon = MP;
      break;
    case 3:
      priorityIcon = HP;
      break;
    case 4:
      priorityIcon = UP;
      break;
    default:
      break;
  }

  return (
    <div className="card">
      {/* Card Header: Displays the ID and User Avatar */}
      <div className="card-header">
        <span className="card-id">{id}</span>
        <img src={userId} alt="User Avatar" className="user-avatar" />
      </div>

      {/* Card Body: Displays the Status Icon and Title */}
      <div className="card-body">
        <img src={statusIcon} alt="Status Icon" className="status-icon" />
        <h2 className="card-title">{title}</h2>
      </div>

      {/* Card Tags: Displays the Priority Icon and Tags */}
      <div className="card-tag">
        <img src={priorityIcon} alt="Priority Icon" className="priority-icon" />
        {/* Display tags if available */}
        {tag.length > 0 && tag.map((t, index) => (
          <div className="tag-body" key={index}>
            <img src={greyDot} alt="" className="tag-icon" />
            <span className="tag-text">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;


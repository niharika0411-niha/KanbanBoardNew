import React from "react";

import Card from "./Card";
import "./Column.css";
import Todo from "../Assets/To-do.svg";
import inProgress from "../Assets/in-progress.svg";
import done from "../Assets/Done.svg";
import canceled from "../Assets/Cancelled.svg";
import backlog from "../Assets/Backlog.svg";
import NP from "../Assets/No-priority.svg";
import LP from "../Assets/Img - Low Priority.svg";
import MP from "../Assets/Img - Medium Priority.svg";
import HP from "../Assets/Img - High Priority.svg";
import UP from "../Assets/SVG - Urgent Priority grey.svg";
import ADD from "../Assets/add.svg";
import Dot from "../Assets/3 dot menu.svg";

const Column = ({ title, cards, grouping }) => {
  var columnLogo;
  if (grouping === "priority") {
    switch (title) {
      case "No Priority":
        columnLogo = NP;
        break;
      case "Low Priority":
        columnLogo = LP;
        break;
      case "Medium Priority":
        columnLogo = MP;
        break;
      case "High Priority":
        columnLogo = HP;
        break;
      case "Urgent Priority":
        columnLogo = UP;
        break;

      default:
        break;
    }
  } else if (grouping === "status") {
    switch (title) {
      case "Todo":
        columnLogo = Todo;
        break;
      case "In progress":
        columnLogo = inProgress;
        break;
      case "Done":
        columnLogo = done;
        break;
      case "Cancelled":
        columnLogo = canceled;
        break;
      case "Backlog":
        columnLogo = backlog;
        break;

      default:
        break;
    }
  } else if (grouping === "userId") {
    columnLogo = null;
  }
  return (
    <div className="column">
      <div className="col-header">
        <div className="head-start">
          <img src={columnLogo} alt="" />
          <h2>{title}</h2>
        </div>
        <div className="head-end">
          <img src={ADD} alt="" />
          <img src={Dot} alt="" />
        </div>
      </div>
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default Column;

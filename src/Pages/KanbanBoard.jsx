import React, { useEffect, useState } from 'react';
import './KanbanBoard.css';
import Column from '../Components/Column';
import DisplayDropdown from '../Components/Display/DisplayDropdown';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]); // State to store tickets
  const [grouping, setGrouping] = useState('status'); // State to track the current grouping (initially by status)
  const [sorting, setSorting] = useState(''); // State to handle sorting criteria

  // Labels for priority levels
  const priorityLabels = {
    0: 'No Priority',
    1: 'Low Priority',
    2: 'Medium Priority',
    3: 'High Priority',
    4: 'Urgent Priority'
  };

  // Fetch tickets when the component mounts
  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets'); // Try retrieving tickets from local storage
    const storedUsers = localStorage.getItem('users');

    if (storedTickets && storedUsers) {
      setTickets(JSON.parse(storedTickets)); // If found, set tickets from local storage
    } else {
      fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
        .then(response => response.json())
        .then(data => {
          setTickets(data.tickets); // Set tickets from API response
          localStorage.setItem('tickets', JSON.stringify(data.tickets)); // Save tickets to local storage
        })
        .catch(error => console.error('Error fetching data:', error)); // Handle errors
    }
  }, []);

  // Function to handle changes in the grouping selection
  const handleGroupChange = (group) => {
    setGrouping(group);
  };

  // Function to handle changes in the sorting selection
  const handleSortChange = (sort) => {
    setSorting(sort);
  };

  // Organize tickets based on the current grouping and sorting
  const getGroupedTickets = () => {
    let groupedTickets = {};
    
    // Set up default groups based on status if grouping by status
    if (grouping === 'status') {
      groupedTickets = {
        'Todo': [],
        'In progress': [],
        'Done': [],
        'Backlog': [],
        'Cancelled': []
      };
    }

    // Group tickets based on the selected grouping criteria
    tickets.forEach(ticket => {
      const groupKey = String(ticket[grouping]); // Convert the grouping value to a string
      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = []; // Initialize group if not already present
      }
      groupedTickets[groupKey].push(ticket); // Add the ticket to its corresponding group
    });

    // Apply sorting if needed
    if (sorting) {
      Object.keys(groupedTickets).forEach(key => {
        groupedTickets[key].sort((a, b) => {
          if (sorting === 'priority') {
            return b.priority - a.priority; // Sort by priority in descending order
          } else if (sorting === 'title') {
            return a.title.localeCompare(b.title); // Sort by title alphabetically
          }
          return 0;
        });
      });
    }

    return groupedTickets; // Return the grouped and sorted tickets
  };

  const groupedTickets = getGroupedTickets(); // Get the grouped tickets

  console.log('Grouped Tickets:', groupedTickets); // Log grouped tickets for debugging

  return (
    <div>
      {/* Dropdown for group and sort selection */}
      <DisplayDropdown onGroupChange={handleGroupChange} onSortChange={handleSortChange} />
      
      {/* Display the Kanban board with columns */}
      <div className="kanban-board">
        {Object.keys(groupedTickets).map(groupKey => (
          <Column
            key={groupKey}
            title={grouping === 'priority' ? priorityLabels[groupKey] : groupKey} // Use priority labels if grouped by priority
            cards={groupedTickets[groupKey]} // Pass the grouped tickets to the column
            grouping={grouping} // Pass the current grouping criterion
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

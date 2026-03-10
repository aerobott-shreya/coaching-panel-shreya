import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function CustomAccordion({
  defaultOpen = false,
  keys,
  RouteModule,
  title,
  handleEvent,
  data,
  icon,
  onToggle,
  ...props
}) {
  const [activeItem, setActiveItem] = useState(null);

  const handleAccordionClick = () => {
    if (onToggle) {
      onToggle(); // Notify the parent to toggle the accordion state
    }
  };

  const handleInnerItemClick = (item, url) => {
    setActiveItem(item.title); // Set the clicked item as active
    handleEvent(item, url); // Handle the inner item click
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* Main Accordion Header */}
      <ListItemButton onClick={handleAccordionClick}>
        <ListItemIcon>
          <img src={icon} style={{ width: "30px" }} alt={`${title}-icon`} />
        </ListItemIcon>
        <div>
          <p
            style={{
              margin: "0px",
              overflowWrap: "break-word",
              whiteSpace: "initial",
              width: "170px",
            }}
          >
            {title}
          </p>
        </div>
        {defaultOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Inner List Items */}
      <Collapse in={defaultOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.map((item, idx) => (
            <ListItemButton
              sx={{
                pl: 6,
                bgcolor: activeItem === item.title ? "rgba(0, 123, 255, 0.1)" : "inherit",
              }}
              onClick={() => handleInnerItemClick(item, item.url)}
              key={idx}
            >
              <img
                src={item.icon}
                style={{ width: "25px", marginRight: "10px" }}
                alt={`${item.title}-icon`}
              />
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

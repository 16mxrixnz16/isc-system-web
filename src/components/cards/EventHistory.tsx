import React, { useState } from "react";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { events } from "../../data/events";

type Event = {
  id_event: number;
  name: string;
  validatedHours: string;
  startDate: dayjs.Dayjs;
  place: string;
  status: string;
};

const groupEventsByMonth = (events: Event[]): Record<string, Event[]> => {
  return events.reduce((acc: Record<string, Event[]>, event: Event) => {
    const month = event.startDate.format("MMMM YYYY");
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {});
};

const SplitButton = ({ options }: { options: { label: string, onClick: () => void }[] }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    options[selectedIndex].onClick();
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(false);
    options[index].onClick();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button onClick={handleClick} style={{backgroundColor: '#2c387e', color: 'white'}}>
          {options[selectedIndex].label}
        </Button>
        <Button size="small" onClick={handleToggle} style={{backgroundColor: '#2c387e', color: 'white'}}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'center top' }}>
            <div>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem key={option.label} selected={index === selectedIndex} onClick={() => handleMenuItemClick(index)}>
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const EventHistory = () => {
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const filteredEvents = (semester: number) =>
    events.filter((event) =>
      semester === 0 ? event.startDate.isBefore(dayjs("2024-07-01")) : event.startDate.isAfter(dayjs("2024-06-30"))
    );

  const groupedEvents = (semester: number) => groupEventsByMonth(filteredEvents(semester));

  return (
    <div style={{ position: 'relative', padding: '40px' }}>
      <IconButton
        onClick={() => window.history.back()}
        aria-label="back"
        style={{
          position: 'absolute',
          top: '17px',
          left: '-9px'
          
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <div style={{ marginTop: '-20px', marginLeft: '5px' }}>
  <SplitButton
    options={[
      { label: 'Primer Semestre', onClick: () => setSelectedSemester(0) },
      { label: 'Segundo Semestre', onClick: () => setSelectedSemester(1) }
    ]}
  />
</div>

      {selectedSemester !== null && Object.entries(groupedEvents(selectedSemester)).map(([month, events]) => (
        <div key={month} style={{ marginBottom: '20px' }}>
          <Typography variant="h6" style={{ color: '#2c387e', fontWeight: 'bold' }}>{month}</Typography>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', maxWidth: '100%' }}>
            {events.map(({ id_event, name, startDate, place, validatedHours, status }) => (
              <div key={id_event} style={{ border: '1px solid #ccc', padding: '10px', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="body2" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {name} - {startDate.format("DD MMM YYYY")}
                </Typography>
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '10px', flexGrow: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12px', textAlign: 'center' }}>
                    <div style={{ border: '1px solid #000', padding: '5px' }}>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>Lugar</Typography>
                      <Typography variant="body2">{place}</Typography>
                    </div>
                    <div style={{ border: '1px solid #000', padding: '5px' }}>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>Horas Becarias</Typography>
                      <Typography variant="body2">{validatedHours}</Typography>
                    </div>
                    <div style={{ border: '1px solid #000', padding: '5px' }}>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>Participación</Typography>
                      <Typography variant="body2" style={{ color: status === "Validado" ? "green" : status === "Pendiente" ? "#c49100" : "red" }}>
                        {status}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventHistory;
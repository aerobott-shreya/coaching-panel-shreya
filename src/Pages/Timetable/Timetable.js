import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Timetable.css';
import { api_calln, api_call_token } from '../../Utils/Network'
import { falseChecker } from '../../Utils/Utils';
import { monthNumberMapper } from '../../Utils/Utils.js'
import DeleteIcon from '../../Assets/DeleteIcon.svg';
import clearIcon from '../../Assets/clearIcon.svg';
import cal from '../../Assets/cal.svg';
import EditIcon from '../../Assets/EditIcon.svg';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getDayName, convertDateToFormat } from '../../Utils/Utils.js';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { CalCredsContext } from '../../ContextApi/CalCredsContext/CalCredsContext';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from '@emotion/react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top:10%;
  margin-left:45%;
  position:absolute;
`;
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


function eventStyleGetter(event, start, end, isSelected) {
  console.log(event);
  var backgroundColor = '#' + 'b32d00';
  var style = {
    backgroundColor: 'green',
    borderRadius: '0px',
    opacity: 0.8,
    color: 'black',
    border: '0px',
    display: 'block'
  };
  return {
    style: style
  };
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Event({ event }) {
  console.log(event, "EEEVVENT")

  const { state_runCalendar, set_runCalendar } = useContext(CalCredsContext);
  const [loading, setLoading] = useState(false);


  // console.log(event, 'whole data')

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const stopProp = (e, text) => {
    e.stopPropagation();
  }

  const [actionValue, setActionValue] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };



  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const popoverClickRootClose = (
    <div id="popover-trigger-click-root-close" style={{ zIndex: 10000 }}>
      <strong>Holy guacamole!</strong> Check this info.
      <strong>{event.title}</strong>
    </div>
  );
  const [batchLists, setBatchLists] = useState({ title: '', startTime: '', endTime: '', color: '', id: null, batch: null, date: '' })

  const getTime = (currentTime) => {
    var giveTime;
    var current_time = currentTime;
    var current_hour = current_time.getHours();
    if (current_hour < 10) {
      current_hour = "0" + current_hour;
    }
    var current_minutes = current_time.getMinutes();
    if (current_minutes < 10) {
      current_minutes = "0" + current_minutes;
    }
    giveTime = current_hour + ':' + current_minutes;
    return giveTime.toString();
  }

  const [selectColor, setSelectColor] = useState(null);

  console.log(selectColor, "SelectColor")
  useEffect(() => {
    // var getCurrentTime = getTime(event.start);
    // var getEndTime = getTime(event.end);
    // var color = coloScheme.find(x => x.color === event.color)
    // if (color != undefined) {
    //   setSelectColor(color.id);
    // } else {
    //   color = ''
    // }
    // setBatchLists({ ...batchLists, title: event.title, startTime: getCurrentTime, endTime: getEndTime, date: event.date, id: event.id, batch: event.batch, color: color.color })
    // getDateTime();
  }, [])

  const getTimeDateDetails = (data) => {
    var yearStart = data.start.getFullYear();
    var month = data.start.getMonth();
    var day = data.start.getDay();
    var day = getDayName(day);
    var monthName = monthNumberMapper(month, true);
    var date = data.start.getDate();


    var hourss = data.start.getHours();
    var minutess = data.start.getMinutes();
    var years = data.start.getFullYear();
    var ampms = hourss >= 12 ? 'pm' : 'am';
    hourss = hourss % 12;
    hourss = hourss ? hourss : 12; // the hour '0' should be '12'
    minutess = minutess < 10 ? '0' + minutess : minutess;
    var strTimes = hourss + ':' + minutess + ' ' + ampms;


    var hours = data.end.getHours();
    var minutes = data.end.getMinutes();
    var year = data.end.getFullYear();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var Id = event?.Id;
    var join = event?.join;

    return { yearStart, monthName, date, day, strTimes, strTime, join, Id }
  }

  

  function getDateTime() {
    const { year, monthName, date, day, strTimes, strTime, yearStart, join, Id } = getTimeDateDetails(event);
    console.log(Id, join, 'everything');
    
    return (
      <div style={{ marginTop: '10px', padding: '5px 15px' }}>
        <div className="template-calendar-grid">
          <div style={{ background: `${event.color}`, width: '15px', height: '15px', borderRadius: '3px', marginTop: '5px' }}></div> <p style={{ marginTop: '0px', fontWeight: '600', fontSize: '18px', display: 'block' }}><span style={{ borderBottom: `3px solid ${event.color}` }}>{event.title}</span></p>
        </div>
        <div>{ <button className="temp-cal_button" onClick={() => JoinSession(Id)}>Join</button>}</div>
        <div className="template-calendar-grid" style={{ marginTop: '10px' }}>
          <img src={cal} style={{ width: '15px', marginTop: '5px' }} />
          <div>
            <p style={{ fontSize: '18px', marginTop: '0px', marginBottom: '8px' }}>Timing</p>
            <p style={{ marginTop: '15px' }}><span>{date}</span>, <span>{day}</span>, <span>{monthName}</span>, <span>{yearStart}</span></p>
            <p><span>{strTimes}</span> to <span>{strTime}</span></p>
          </div>
        </div>
      </div>
    )
  }
  const JoinSession = (id) => {
    api_call_token
    .get(`counseling/session/${id}/join/`)
    .then((res) => {
      window.open(res.data.data.url);
    })
    .catch(err => console.log(err))
  }
  const [opens, setOpens] = React.useState(false);
  const [modalValue, setModalValue] = useState('');
  const handleCloseModal = () => {
    setOpens(false);

  };

  const editModal = (e, value) => {
    e.stopPropagation();
    var getCurrentTime = getTime(event.start);
    var getEndTime = getTime(event.end);
    var color = coloScheme.find(x => x.color === event.color)
    if (color != undefined) {
      setSelectColor(color.id);
    } else {
      color = ''
    }
    setBatchLists({ ...batchLists, title: event.title, startTime: getCurrentTime, endTime: getEndTime, date: event.date, id: event.id, batch: event.batch, color: color.color })
    getDateTime();
    setModalValue(value);
    // console.log('treu')
    handleClose();
    setOpens(true);
  }


  const textValue = (e, name) => {
    setBatchLists({ ...batchLists, [name]: e.target.value })
  }

  const [colorString, setColorString] = useState('');


  const colorStick = (colors, id) => {
    setColorString(colors);
    setSelectColor(id);
    setBatchLists({ ...batchLists, color: colors })
  }

  const editBatch = () => {

    setLoading(true)
    var data = {
      batch: batchLists.batch,
      colour: batchLists.color,
      date: batchLists.date,
      conclude: batchLists.endTime + ":00",
      id: batchLists.id,
      commence: batchLists.startTime + ":00",
      title: batchLists.title,
    }
    api_call_token.patch(`/offline/panel/calendar/${batchLists.id}/`, data)
      .then(response => {
        console.log("list is created ", response.data.data);
        set_runCalendar(true);
        setBatchLists({ title: '', startTime: '', endTime: '', color: '', id: null, batch: null, date: '' })
        setOpenSnack(true);
        setActionValue('Edited')
        setLoading(false);

      })
      .catch(error => {

        if (error.response) {
          if (error.response.status == 403) {
            let error_message = error.response.data.error.message;
          }
        }
      })
    setOpens(false);

  }

  const deleteBatch = () => {
    setOpens(false);
    setLoading(true)

    api_call_token.delete(`/offline/panel/calendar/${batchLists.id}/`)
      .then(response => {
        console.log("list is created ", response.data.data);
        handleClose();
        set_runCalendar(true);
        setLoading(false)

        // setOpenSnack(true);
        // setActionValue('Deleted')
      })
      .catch(error => {

        if (error.response) {
          if (error.response.status == 403) {
            let error_message = error.response.data.error.message;
          }
        }
      })
  }

  return (
    <div onClick={(e) => stopProp(e, 'done')} style={{ borderRadius: '5px' }}>
      {/* <div id={`${loading == true  && "overlay"}`}>
                <div class="overlay-content" style={{zIndex:9999999 }}>
                    {(loading == true )&& <ScaleLoader
                        css={override}
                        color={"white	"}
                        loading={loading}
                        height={35}
                        width={4}
                        radius={2}
                        margin={2}
                        style={{ bacground: 'grey' }}
                    />}
                </div>
            </div> */}
      <div onClick={handleClick}>
        {/* onClick={popoverClickRootClose} */}
        <div>
          <div>{event.title}</div>

        </div>
      </div>
      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={(e) => handleClose(e)}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          style={{ marginTop: '5px' }}
        >
          <div onClick={(e) => stopProp(e, 'done')} style={{ borderRadius: '5px', padding: '5px' }}>
            <div className="read-event-card" style={{ paddingTop: '5px' }}>
              <div className="event-crud-icons" >
                <p></p>
                <img className="crud-icon-c" src={EditIcon} onClick={(e) => editModal(e, 'edit')} />
                <img className="crud-icon-c" onClick={(e) => editModal(e, 'delete')} src={DeleteIcon} />
                <img onClick={(e) => handleClose(e)} className="crud-icon-c" src={clearIcon} />
              </div>
              {/* deleteBatch */}
              {getDateTime()}
            </div>
          </div>
        </Popover>
      </div>
      <Dialog
        open={opens}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      > {modalValue == 'edit' && <DialogTitle id="alert-dialog-slide-title">{"Edit Batch"}</DialogTitle>}
        {modalValue == 'edit' && <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Title"
                variant="outlined"
                name="title"
                onChange={(e) => textValue(e, 'title')}
                value={batchLists.title}
                style={{ width: '90%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: '85%' }}

                id="date"
                label="Date"
                type="date"
                // defaultValue={date}
                className={classes.textField}
                variant="outlined"
                name="date"
                value={batchLists.date}
                onChange={(e) => textValue(e, 'date')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="time"
                label="Start Time"
                type="time"

                defaultValue="07:30"
                className={classes.textField}
                style={{ width: '90%' }}
                variant="outlined"
                value={batchLists.startTime}
                name="startTime"
                onChange={(e) => textValue(e, 'startTime')}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="time"
                label="End Time"
                type="time"

                defaultValue="07:30"
                className={classes.textField}
                style={{ width: '90%' }}
                variant="outlined"
                value={batchLists.endTime}
                onChange={(e) => textValue(e, 'endTime')}
                name="endTime"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item xs={12} className="weekday-container">
              <div className="event-color-section">
                <p>
                  Event Color Selected
                </p>
                <div style={{ background: `${batchLists.color}`, width: '50px', height: '15px', marginTop: '15px', border: '2px solid ', borderColor: 'black' }}>

                </div>
              </div>
              <div className="select-color-div">
                {coloScheme.map((colorList, id) => {

                  return (
                    <div className={`color-block-div ${id == selectColor ? 'color-block-div-active' : ''}`} onClick={() => colorStick(colorList.color, id)} style={{ backgroundColor: `${colorList.color}` }}></div>
                  )
                })}
              </div>
            </Grid>
          </Grid>
        </DialogContent>}
        {modalValue == 'delete' && <DialogTitle id="alert-dialog-slide-title">{"Delete Batch"}</DialogTitle>}

        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          {modalValue == 'edit' && <Button onClick={editBatch} color="primary">
            Edit
          </Button>}
          {modalValue == 'delete' && <Button onClick={deleteBatch} color="primary">
            Delete
          </Button>}
        </DialogActions>
      </Dialog>

      {/* <Snackbar
      style={{zIndex:9999999}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnack}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        message={`New Lecture ${actionValue}`}
        action={
          <React.Fragment>
            
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
              <AiOutlineCloseCircle fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      /> */}
    </div>
  );
}


function Timetable(props) {
  const [loading, setLoading] = useState(true);
  console.log(CalCredsContext, "context data")
  const { state_runCalendar, set_runCalendar } = useContext(CalCredsContext);
  const [batchList, setBatchList] = useState({ title: '', startTime: '', endTime: '', color: '', id: null, batch: null, date: '' })
  const [selectColor, setSelectColor] = useState(null);
  const classes = useStyles();

  const localizer = momentLocalizer(moment);
  const [selectDate, setSelectDate] = useState({ month: null, year: null });

  useEffect(() => {
    var date = new Date();


  }, [])

  const [changeDates, setChangeDates] = useState(new Date())
  const [batchListData, setBatchListData] = useState([]);
  const [selectBatch, setSelectBatch] = useState({ batchId: null });
  const [events, setEvents] = useState([]);

  useEffect(() => {

    var month = changeDates.getMonth() + 1;
    var year = changeDates.getFullYear();
    setSelectDate({ month, year });
    getCalendarData(month, year);

    getList();
    
  }, [state_runCalendar])

  useEffect(() => {
    createEvents(events)
  }, [events])

  const getCalendarData =  (month, year) => {
    setLoading(true);
    // console.log(`/offline/panel/calendar/?month=${month}&year=${year}`, 'month year')
     api_call_token.get(`/offline/panel/calendar/?month=${month}&year=${year}`)
      .then(response => {
        console.log("This month Data", response.data.data);
        // setEvents([...events, ...response.data.data]);
        councellors(month, year, response.data.data);
        // createEvents(response.data.data);
        // set_runCalendar(false);
        setLoading(false);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status == 403) {
            let error_message = error.response.data.error.message;
          }
        }
      })

    
  }

  const councellors = (month, year, data) => {
    api_call_token.get(`counseling/all_slots/counselor_slots/?month=${month}&year=${year}`)
    .then(response => {
      console.log("This month Data", response.data.data);
      setEvents([...data, ...response.data.data]);
      // console.log(events, "counselEvent")
      // createEvents([...events, ...response.data.data]);
      // createEvents(response.data.data);
      // set_runCalendar(false);
      setLoading(false);
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status == 403) {
          let error_message = error.response.data.error.message;
        }
      }
    })
  }
  
  console.log(events, "counselEvent")
  const getList = () => {
    api_call_token.get('/offline/panel/batch/')
      .then(response => {
        console.log("The response is batch", response.data.data);
        setBatchListData(response.data.data);

      })
      .catch(error => {
        if (error.response) {
          if (error.response.status == 403) {
            let error_message = error.response.data.error.message;
          }
        }
      })
  }
  console.log(events, "Evnts")
  const [anchorEls, setAnchorEls] = React.useState(null);


  const handleCloses = (e) => {
    setAnchorEls(null);
  };

  const stopProp = (e, text) => {
    e.stopPropagation();
  }

  const opens = Boolean(anchorEls);
  const id = opens ? 'simple-popover' : undefined;

  const getTimeDateDetails = (data) => {
    // const { commence, conclude } = data;
    let commence;
    let conclude;
    if(data?.slot?.time_slot){
      commence = data?.slot?.time_slot?.commence;
    }else{
      commence = data?.commence;
    }

    if(data?.slot?.time_slot){
      conclude = data?.slot?.time_slot?.conclude;
    }else{
      conclude = data?.conclude;
    }
    var year = data.date.substr(0, 4);
    var month = data.date.substr(5, 2);
    var month = parseInt(month - 1, 10);
    var date = data.date.substr(8, 2);
    var join = data?.slot?.join;
    var Id = data?.slot?.id;
    var monthName = monthNumberMapper(month, true);
    return { year, month, date, commence, conclude, monthName, join, Id }
  }


  const [openss, setOpenss] = React.useState(false);
  const [modalValue, setModalValue] = useState('');
  const handleCloseModal = (e) => {
    e.stopPropagation();
    setOpenss(false);
    setSelectBatch({ batchId: null })
    setBatchList({ title: '', startTime: '', endTime: '', color: '', id: null, batch: null, date: '' })
    setSelectColor(null);
  };

  const editModal = (value) => {
    setModalValue(value);
    // console.log('treu')
    handleCloses();
    setOpenss(true);
  }

  const openModalAgain = () => {
    setOpenss(true);

  }


  const textValue = (e, name) => {
    setBatchList({ ...batchList, [name]: e.target.value })
  }

  const [colorString, setColorString] = useState('');


  const colorStick = (colors, id) => {
    setColorString(colors);
    setSelectColor(id);
    setBatchList({ ...batchList, color: colors })
  }


  const [eventList, setEventList] = useState([]);

  const createEvents = (calendarData) => {
    console.log(calendarData, "calendar")
    var eventLists = [];
    // if(x === 1){
      const newList = calendarData.map((list, id) => {
        console.log(list, "LISt")
        const { year, month, date, commence, conclude, monthName, join, Id } = getTimeDateDetails(list);
        
        console.log(year, month, date, commence, conclude, monthName, join, Id, 'yearss')
        return (
          eventLists.push({
            allDay: false, 
            end: new Date(`${monthName} ${date}, ${year} ${conclude}`),
            start: new Date(`${monthName} ${date}, ${year} ${commence}`), 
            title: list?.title || 'counsellor', 
            color: list?.colour || list?.slot?.colour, 
            id: list.id, 
            batch: list?.batch || 'cc', 
            date: list.date,
            join: join,
            Id: Id,
          })
        )
      });   
    setEventList(eventLists);
  }
  
  console.log(eventList, "EEEEE")
  const dummyEvents = [
    {
      allDay: false,
      end: new Date('June 18, 2020 7:13:00'),
      start: new Date('June 18, 2020 6:13:00'),
      title: `MH-Cet`,
      isMine: true,
    }, {
      allDay: false,
      end: new Date('June 18, 2020 10:13:00'),
      start: new Date('June 18, 2020 8:13:00'),
      title: `Chemistry`,
      isMine: true,
    },
    {
      allDay: false,
      end: new Date('June 18, 2020 15:13:00'),
      start: new Date('June 18, 2020 12:13:00'),
      title: `Physics`,
      isMine: true,
    },
    {
      allDay: false,
      end: new Date('June 18, 2020 18:13:00'),
      start: new Date('June 18, 2020 16:13:00'),
      title: `Biology`,
      isMine: true,
    },

    {
      allDay: false,
      end: new Date('June 19, 2020 15:13:00'),
      start: new Date('June 19, 2020 12:13:00'),
      title: 'NEET',
      isMine: true,
    },
    {
      allDay: true,
      end: new Date('December 09, 2018 11:13:00'),
      start: new Date('December 09, 2017 11:13:00'),
      title: 'JEE',
      isMine: true,
    },
  ];

  const onEventClick = (event) => {
    console.log(event, 'event') //Shows the event details provided while booking
  }
  // const CustomEvent = (event) => { 
  //   console.log(event)
  //   return ( 
  //     <span> <strong> event.title </strong> </span> 
  //   ) 
  // }
  let popup = ({ localizer }) => (
    <strong>
      Click the "+x more" link on any calendar day that cannot fit all the
      days events to see an inline popup of all the events.
    </strong>
  )

  const get_date = (yearIncrement, newdate) => {
    var today = newdate;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear() + yearIncrement;

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  const getTime = (timenew) => {
    var giveTime;
    var current_time = timenew;
    var current_hour = current_time.getHours();
    if (current_hour < 10) {
      current_hour = "0" + current_hour;
    }
    var current_minutes = current_time.getMinutes();
    if (current_minutes < 10) {
      current_minutes = "0" + current_minutes;
    }
    giveTime = current_hour + ':' + current_minutes;
    return giveTime.toString();
  }

  const onSlotChange = (slotInfo) => {
    console.log(slotInfo, 'slot');
    setChangeDates(slotInfo.start);
    var month = slotInfo.start.getMonth() + 1;
    var year = slotInfo.start.getFullYear();
    setBatchList({ ...batchList, date: get_date(0, slotInfo.start), startTime: getTime(slotInfo.start), endTime: getTime(slotInfo.end) })
    openModalAgain();

  }

  const changeDate = (view, date) => {
    console.log('now');
    setChangeDates(date);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    getCalendarData(month, year)

  }

  const getEvent = (e) => {
    console.log(e, 'event of cal')
  }

  const createBatch = () => {
    var currentDate = convertDateToFormat(new Date());
    if (currentDate > batchList.date) {
      return alert('Cannot set Past date')
    }
    var data = {
      "title": batchList.title,
      "commence": batchList.startTime + ":00",
      "conclude": batchList.endTime + ":00",
      "date": batchList.date,
      "colour": batchList.color,
      "batch": selectBatch.batchId,
    }
    for (var key in data) {
      if (data[key] === '' || data[key] === null) {
        setLoading(false);
        return (alert('Please enter all fields'))
      }
    }
    setLoading(true)
    // console.log(data, 'data to create')
    api_call_token.post(`/offline/panel/calendar/`, data)
      .then(response => {
        console.log("list is created ", response.data.data);
        set_runCalendar(true);
        setSelectBatch({ batchId: null })
        setBatchList({ title: '', startTime: '', endTime: '', color: '', id: null, batch: null, date: '' })
        setSelectColor(null);
        setOpenSnack(true);
        setActionValue('Created');
        setLoading(false);
        setOpenss(false);
      })
      .catch(error => {

        if (error.response) {
          if (error.response.status == 403) {
            let error_message = error.response.data.error.message;
            setLoading(false);
            alert('something went wrong')
          }
        }
      })
  }

  const changeBatchId = (e, name) => {
    setSelectBatch({ [name]: e.target.value });

  }
  const [actionValue, setActionValue] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const createEventNew = () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    setBatchList({ ...batchList, date: get_date(0, new Date()), startTime: getTime(new Date()), endTime: getTime(new Date()) })
    openModalAgain();
  }

  const dontShow = () => {

  }

  const redirectToJitsi = () => {
    // if (falseChecker(props.match.params.batchid)) {
      api_call_token.get(`content/course/${eventList[0].batch}/issue_token/`)
        .then(res => {
          let redirectjitsi = res.data.data;
          console.log(redirectjitsi,'jitsidata');

          console.log("ive session response is ", redirectjitsi);
          if (res.status === 200) {
            api_call_token.post(`/content/meeting/participant/`, { user_type: 3, domain: redirectjitsi.domain, meeting_room: redirectjitsi.meeting_room, participant: '129' })
              .then(par_res => {
                console.log("jitsi post res ", par_res);
                window.open(redirectjitsi.url)
              })
          }

        })
    // }
  }

  return (
    <>

      <Grid container style={{ paddingTop: '2%' }}>
        <Grid item xs={1} md={1} lg={1} xl={1} style={{}}>
          {/* <div><List component="nav" aria-label="secondary mailbox folders">
            <ListItem button style={{background:'#fff'}}>
              <ListItemText primary="Month" />
            </ListItem>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Week" />
            </ListItemLink>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Day" />
            </ListItemLink>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Agenda" />
            </ListItemLink>
          </List></div> */}
        </Grid>
        <Grid item xs={10} md={10} lg={10} xl={10}>
          <div className="component-container">
            <div id={`${loading == true && "overlay"}`} style={{ zIndex: '99999999' }}>
              <div class="overlay-content" style={{ zIndex: 9999999 }}>
                {(loading == true) && <ScaleLoader
                  css={override}
                  color={"white	"}
                  loading={loading}
                  height={35}
                  width={4}
                  radius={2}
                  margin={2}
                  style={{ bacground: 'grey' }}
                />}
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Button color="primary" onClick={createEventNew} variant="contained" style={{ textTransform: 'none', marginRight: '2%' }}>
                Create Lecture
              </Button>
              <Button color="primary" disabled={!eventList || !eventList?.length} onClick={redirectToJitsi} variant="contained" style={{ textTransform: 'none', marginRight: '2%' }}>
                Meet Now
              </Button>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '50px;' }}>
              {/* <div style={{position:'absolute',top:'336px',left:'357px',zIndex:'9999'}}>hello</div> */}
              <Calendar
                // popup
                messages={{
                  showMore: total => (
                    <div onClick={dontShow}
                      style={{ cursor: 'pointer', zIndex: '-1' }}
                      onMouseOver={e => {
                        // e.stopPropagation();
                        e.preventDefault();
                      }}
                    >{`+${total} more`}
                    </div>)
                }}
                selectable
                onClick={(e) => getEvent(e)}
                onSelectEvent={event => onEventClick(event)}
                onSelectSlot={(slotInfo) => onSlotChange(slotInfo)}
                localizer={localizer}
                // elementProps={{ onClick: event =>  setAnchorEls(event.currentTarget) }}
                eventPropGetter={(eventStyleGetter)}
                events={eventList}
                showMultiDayTimes
                startAccessor="start"
                endAccessor="end"
                // components={{
                //   event: CustomEvent
                // }}
                components={{
                  event: Event,
                }}
                // defaultDate={new Date(2020, 5, 1)}
                style={{ height: 600 }}
                onNavigate={(date = 'June 20, 2020 15:13:00', view) => {
                  console.log('#### onNavigate');
                  console.log('#### date=', date);
                  console.log('#### view=', view);
                  changeDate(view, date);
                  //this.setState({currentDate: date}); }}
                }}
                onView={(view) => {
                  console.log('#### onView');
                  console.log('#### view=', view);
                  //this.setState({currentView: view});
                }}
                eventPropGetter={
                  (event, start, end, isSelected) => {
                    let newStyle = {
                      backgroundColor: `${event.color}`,
                      color: 'black',
                      borderRadius: "0px",
                      border: "none"
                    };

                    // if (event.color) {
                    //   newStyle.backgroundColor = "lightgreen"
                    // }

                    return {
                      className: "",
                      style: newStyle
                    };
                  }
                }
              />
              <Popover
                id={id}
                open={opens}
                anchorEl={anchorEls}
                onClose={(e) => handleCloses(e)}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
              >
                <div onClick={(e) => stopProp(e, 'done')}>
                  <div className="">
                    hello js
                  </div>
                </div>
              </Popover>
            </div>
            <Dialog
              open={openss}
              TransitionComponent={Transition}
              keepMounted
              onClose={(e) => handleCloseModal(e)}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >  <DialogTitle id="alert-dialog-slide-title">{"Create Lecture"}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Title"
                      variant="outlined"
                      name="title"
                      onChange={(e) => textValue(e, 'title')}
                      value={batchList.title}
                      style={{ width: '90%' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      style={{ width: '85%' }}

                      id="date"
                      label="Date"
                      type="date"
                      // defaultValue={date}
                      className={classes.textField}
                      variant="outlined"
                      name="date"
                      value={batchList.date}
                      onChange={(e) => textValue(e, 'date')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="time"
                      label="Start Time"
                      type="time"

                      defaultValue="07:30"
                      className={classes.textField}
                      style={{ width: '90%' }}
                      variant="outlined"
                      value={batchList.startTime}
                      name="startTime"
                      onChange={(e) => textValue(e, 'startTime')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="time"
                      label="End Time"
                      type="time"

                      defaultValue="07:30"
                      className={classes.textField}
                      style={{ width: '90%' }}
                      variant="outlined"
                      value={batchList.endTime}
                      onChange={(e) => textValue(e, 'endTime')}
                      name="endTime"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Batch"
                      value={selectBatch['batchId']}
                      onChange={(e) => changeBatchId(e, 'batchId')}
                      style={{ width: '85%' }}
                      variant="outlined"
                      name="batchId"
                    >
                      {batchListData.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} className="weekday-container">
                    <div className="event-color-section">

                      {batchList.color == '' ? <p>No color selected</p> : <p>Event Color Selected</p>}

                      {batchList.color != '' && <div style={{ background: `${batchList.color}`, width: '50px', height: '15px', marginTop: '15px', border: '2px solid ', borderColor: 'black' }}>

                      </div>}
                    </div>
                    <div className="select-color-div">
                      {coloScheme.map((colorList, id) => {

                        return (
                          <div className={`color-block-div ${id == selectColor ? 'color-block-div-active' : ''}`} onClick={() => colorStick(colorList.color, id)} style={{ backgroundColor: `${colorList.color}` }}></div>
                        )
                      })}
                    </div>
                  </Grid>

                </Grid>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                  Cancel
                </Button>
                {/* {modalValue== 'edit' && <Button onClick={editBatch} color="primary">
            Edit
          </Button>}
          {modalValue== 'delete' && <Button onClick={deleteBatch} color="primary">
            Delete
          </Button>} */}
                <Button onClick={createBatch} color="primary">
                  Create
                </Button>
              </DialogActions>
            </Dialog>

            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={openSnack}
              autoHideDuration={4000}
              onClose={handleCloseSnack}
              message={`New Lecture ${actionValue}`}
              action={
                <React.Fragment>
                  {/* <Button color="secondary" size="small" onClick={handleCloseSnack}>
                UNDO
              </Button> */}
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
                    {/* <CloseIcon fontSize="small" /> */}
                  </IconButton>
                </React.Fragment>
              }
            />
          </div>
        </Grid>
        <Grid item xs={1} md={1} lg={1} xl={1} style={{}}></Grid>
      </Grid>
    </>

  );
}

export default Timetable;


const coloScheme = [{
  color: '#d581d6',
  id: 0
}, {
  color: '#d6819f',
  id: 1
}, {
  color: '#d68d8d',
  id: 2
}, {
  color: '#e59881',
  id: 3
}, {
  color: '#d6d678',
  id: 4
}, {
  color: '#95d681',
  id: 5
}, {
  color: '#81d6a1',
  id: 6
}, {
  color: '#81d6ce',
  id: 7
}, {
  color: '#81bad6',
  id: 8
}, {
  color: '#92b2d6',
  id: 9
}
]
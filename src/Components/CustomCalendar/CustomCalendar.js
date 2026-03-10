import React, { useEffect, useState } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import globalize from 'globalize';
import { myEventsList } from './Event.js';
import { api_token } from '../../Utils/Network.js';
import { convertCalendarDate, getCurrentDateTime } from '../../Utils/Utils.js';
import { useLocation } from 'react-router-dom';

const localizer = globalizeLocalizer(globalize)

function CustomCalendar({calendarData, setDateTime = () => {}}) {
    // const [calendarData, setCalendarData] = useState([]);
    // const [dateTime, setDateTime] = useState(getCurrentDateTime());
    // console.log(dateTime, 'date');
    // useEffect(() => {
    //     getListing();
    // }, [dateTime])

    // const getListing = () => {
    //     const { month, year } = dateTime;
    //     api_token.get(`calendar/v1/events/?month=${month+1}&year=${year}`)
    //         .then(response => {
    //             console.log(response)
    //             const data = convertCalendarDate(response.data.data);
    //             setCalendarData(data)
    //         })
    //         .catch(error => {

    //         })
    // }

    console.log(calendarData,'calendarData')

    const getEvent = (e) => {
        console.log(e)
    }

    const onEventClick = (e) => {
        console.log(e)
    }

    const onSlotChange = (e) => {
        console.log(e)
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <Calendar
                localizer={localizer}
                events={calendarData}
                startAccessor="start"
                endAccessor="end"
                selectable
                style={{ height: '90vh' }}
                onClick={(e) => getEvent(e)}
                onSelectEvent={event => onEventClick(event)}
                onSelectSlot={(slotInfo) => onSlotChange(slotInfo)}
                onView={(view) => {
                    console.log('#### onView');
                    console.log('#### view=', view);
                    //this.setState({currentView: view});
                }}
                onNavigate={(date, view) => {
                    console.log('#### onNavigate');
                    console.log('#### date=', date);
                    console.log('#### view=', view);
                    setDateTime(date)
                    // changeDate(view, date);
                    //this.setState({currentDate: date}); }}
                }}
            // popup
            // showMultiDayTimes
            // startAccessor="start"
            // endAccessor="end"   
            />
        </div>
    )
}

export default CustomCalendar; 
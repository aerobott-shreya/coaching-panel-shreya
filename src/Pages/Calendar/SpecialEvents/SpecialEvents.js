import React, {useState, useEffect} from 'react'
import CustomCalendar from '../../../Components/CustomCalendar/CustomCalendar'
import { convertCalendarDate, getCurrentDateTime } from '../../../Utils/Utils';
import { api_token } from '../../../Utils/Network';

function SpecialEvents() {

    const [calendarData, setCalendarData] = useState([]);
    const [dateTime, setDateTime] = useState(getCurrentDateTime());
    console.log(dateTime, 'date');
    useEffect(() => {
        getListing();
    }, [dateTime])

    const getListing = () => {
        const { month, year } = dateTime;
        api_token.get(`calendar/v1/events?event_type=3`)
            .then(response => {
                console.log(response)
                const data = convertCalendarDate(response.data.data);
                setCalendarData(data)
            })
            .catch(error => {

            })
    }

    console.log(calendarData,'calendarData')
  return (
    <div>
        <CustomCalendar calendarData={calendarData}/>
    </div>
  )
}

export default SpecialEvents
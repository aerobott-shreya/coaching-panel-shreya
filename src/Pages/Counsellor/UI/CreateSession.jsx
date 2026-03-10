import React, { useState } from 'react'
import { Button, Checkbox, Grid, TextField } from "@material-ui/core";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import moment from 'moment';

const dayOptions = [
    { label: "Sun", value: "sunday" },
    { label: "Mon", value: "monday" },
    { label: "Tue", value: "tuesday" },
    { label: "Wed", value: "wednesday" },
    { label: "Thu", value: "thursday" },
    { label: "Fri", value: "friday" },
    { label: "Sat", value: "saturday" },
];

const batchData = {
    colour: "#d581d6",
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,  
    discount_type: "Percentage",
};

function CreateSession({
    onDone = () => { },
    goToPath = () => { }
}) {

    const [data, setData] = useState(batchData);

    const createBatchHandler = (demo = {}) => {
        let starts = moment(data.start).format("DD-MM-YYYY");
        let ends = moment(data.end).format("DD-MM-YYYY");
        let coms = moment(data.commence).format("HH:mm:ss");
        let conc = moment(data.conclude).format("HH:mm:ss");
        var myArray = [];
        const daysList = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'boolean') {
                if(value){
                    console.log(key, "key")
                    let getIndex = daysList.indexOf(key) + 1;
                    myArray.push(getIndex)
                } 
            }
        }
        console.log(myArray, "myArray")
        demo = {
            session_name: data.session_name,
            price: +(data.price),
            start: starts,
            end: ends,
            commence: coms,
            conclude: conc,
            days: myArray,
        }
        onDone(demo);
        goToPath('/counsellor')
    }

    return (
        <div>
            <div>
                <Grid xs={12} container style={{ padding: "2% 5%" }}>
                    <Grid style={{ paddingLeft: "2%" }} container spacing={2} xs={12} md={6}>
                        <Grid item xs={12}>
                            <h2 style={{ color: "#313e6c", margin: 0 }}>Create New Session</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                // required
                                id="outlined-required"
                                label="Session Name"
                                variant="outlined"
                                name="session_name"
                                size="small"
                                fullWidth
                                onChange={(e) => setData({ ...data, session_name: e.target.value })}
                                value={data.session_name}
                            // error={errors.title ? true : false}
                            // helperText={errors.showError && errors.title}
                            />
                        </Grid>
                        <Grid item xs={12} className="weekday-container">
                            <p style={{ color: "#313e6c", margin: 0, fontWeight: "bold" }}>
                                Select Days
                            </p>
                            <Checkbox
                                checked={
                                    data.sunday &&
                                    data.monday &&
                                    data.tuesday &&
                                    data.wednesday &&
                                    data.thursday &&
                                    data.friday &&
                                    data.saturday 
                                }
                                onChange={(e, v) =>
                                    setData({
                                        ...data,
                                        sunday: v,
                                        monday: v,
                                        tuesday: v,
                                        wednesday: v,
                                        thursday: v,
                                        friday: v,
                                        saturday: v,     
                                    })
                                }
                                color="primary"
                                style={{ marginTop: -3 }}
                            />
                            <span>Select all</span>
                            <br />
                            {dayOptions.map((d) => (
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        marginTop: -5,
                                    }}
                                    key={d.value}
                                >
                                    <Checkbox
                                        required
                                        checked={data[d.value]}
                                        color="primary"
                                        onChange={(e, checkedState) =>
                                            setData({ ...data, [d.value]: checkedState })
                                        }
                                    />
                                    <span>{d.label}</span>
                                </div>
                            ))}
                            {/* <p className="batch-error-message-c">{errorMessages.errorDay}</p> */}
                        </Grid>
                        <Button
                            color="primary"
                            variant="contained"
                            style={{
                                width: "100%",
                                margin: "2% 10% 0",
                                borderRadius: "0.6rem",
                                fontSize: "1rem",
                                height: "2.5rem",
                            }}
                            onClick={createBatchHandler}
                        >
                            Create
                        </Button>
                    </Grid>
                    <Grid style={{ paddingLeft: "2%" }} container spacing={2} xs={12} md={6}>
                        <Grid item xs={12}>
                            <h2 style={{ color: "#313e6c", margin: 0 }}></h2>
                        </Grid>
                        <Grid style={{ marginTop: "2%" }} item xs={6}>
                            <DatePicker
                                required
                                label="Start Date"
                                value={data.start}
                                onChange={(e) => setData({ ...data, start: e })}
                                format="DD MMMM YY"
                                animateYearScrolling
                                size="small"
                                // variant='inline'
                                inputVariant="outlined"
                                fullWidth
                                autoOk
                            />
                        </Grid>
                        <Grid style={{ marginTop: "2%" }} item xs={6}>
                            <TimePicker
                                showTodayButton
                                required
                                todayLabel="now"
                                label="Start Time"
                                // value={selectedDate}
                                minutesStep={5}
                                value={data.commence}
                                onChange={(e, v) => setData({ ...data, commence: e })}
                                size="small"
                                // variant='inline'
                                inputVariant="outlined"
                                fullWidth
                                autoOk
                            // SelectProps={{ endAdornment: <InputAdornment position='end'><Search /></InputAdornment> }}
                            />
                        </Grid>
                        <Grid style={{ marginTop: "2%" }} item xs={6}>
                            <DatePicker
                                required
                                label="End Date"
                                value={data.end}
                                onChange={(e) => setData({ ...data, end: e })}
                                format="DD MMMM YY"
                                animateYearScrolling
                                size="small"
                                // variant='inline'
                                inputVariant="outlined"
                                fullWidth
                                autoOk
                            />
                        </Grid>
                        <Grid style={{ marginTop: "2%" }} item xs={6}>
                            <TimePicker
                                showTodayButton
                                required
                                todayLabel="now"
                                label="End Time"
                                // value={selectedDate}
                                minutesStep={5}
                                value={data.conclude}
                                onChange={(e, v) => setData({ ...data, conclude: e })}
                                size="small"
                                // variant='inline'
                                inputVariant="outlined"
                                fullWidth
                                autoOk
                            // SelectProps={{ endAdornment: <InputAdornment position='end'><Search /></InputAdornment> }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Price"
                                variant="outlined"
                                name="price"
                                onChange={(e) => setData({ ...data, price: e.target.value })}
                                value={data.price}
                                type="number"
                                size="small"
                                // error={errors.price ? true : false}
                                // helperText={errors.showError && errors.price}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </div>
            {/* <button onClick={() => goToPath('/counsellor')}>Back</button> */}
        </div>
    )
}

export default CreateSession
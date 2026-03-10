import React, { useContext, useState, useEffect } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from "./index.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import { api_open, api_token } from '../../Utils/Network';
import InputField from '../../Components/Input/InputField';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import { checkEmptyObject } from '../../Utils/Utils';

function ContentDIYSCreateTest() {
    let navigate = useNavigate();
    let location = useLocation();
    const [value, setValue] = React.useState(dayjs('2022-04-07'));
    const [sessionObject, setSessionObject] = useState({});
    const [chapterList, setChapterList] = useState([]);
    const [chapter, setChapter] = React.useState(null);
    const [isSubmit, setIsSubmit] = useState(0);
    const { sectionList, content_selection } = useContext(UserCredsContext);
    const [chapterObj, setChapterObj] = useState({
        title: "",
        description: "",
        total_marks: "",
        chapter_id: "",
    });

    useEffect(() => {
        getChapters();
    }, []);

    useEffect(() => {
        setAssignment();
    }, [location.state]);


    const setAssignment = () => {
        if(location.state){
            let {title, total_marks,
                
                // duration  // Duration missing
            } = location.state;
            setIsSubmit(1);
            setChapterObj({
                title: title,
                total_marks: total_marks,
            })
            // setValue(duration)
        }
    }

    const getChapters = () => {
        api_token
            .get(`content/v1/chapter_wise_books/?subject=${content_selection.subject}&grade=${content_selection.grade}&board=${content_selection.board}`)
            .then((res) => {
                setChapterList(res.data.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const backToPrevious = () => {
        navigate('/dashboard/content/doityourself/doityourselflist')
    }

    const handleChange = (event) => {
        console.log(event.target.value, "eventsssss")
        setChapter(event.target.value);
        setChapterObj({ ...chapterObj, chapter_id: event.target.value })
    };

    const handleDate = (event) => {
        console.log(event, "Events")
    }

    const handleData = (e) => {
        const { name, value } = e.target;
        setChapterObj({ ...chapterObj, [name]: value })
    }

    const sectionSelection = (data) => {
        setSessionObject(data);
    }

    const MoveToQuestion = () => {
        navigate(`/dashboard/content/doityourself/addQuestion/${location?.state?.id}`, {state: location?.state, pageData: 1})
    }

    const submitData = () => {
        const hrs = value.$H;
        const mins = value.$m;
        const sec = value.$s;

        const data = (hrs * 60 * 60) + (mins * 60) + sec;

        const finalData = {
            ...chapterObj,
            duration: data,
            provider: 1,
            subject_id: content_selection.subject,
            grade_id: content_selection.grade,
            board_id: content_selection.board,
            test_format: 2,
        }

        let checkEmpy = checkEmptyObject(finalData);


        // console.log(valuea, "ChapterObj")
        if (!checkEmpy) {
            alert("Please Fill in Proper Detail")
        } else {


            api_token
                .post(`cms/v1/test/`, finalData)
                .then((res) => {
                    // console.log(res.data.data, "CreateData")

                    if (res.data.data) {
                        const { id } = res.data.data;
                        navigate(`/dashboard/content/doityourself/addQuestion/${id}`, {state: res.data.data})
                    }
                })
                .catch(err => console.log(err))
        }
        // navigate("/dashboard/content/assignment/addQuestion")
    }

    console.log(value, "vals")
  return (
    <div>
            <div className={`${styles.flex_content} ${styles.dataHeader}`}>
                <ArrowBackIosIcon className={styles.arrows} onClick={() => backToPrevious()} />
                <div>Create a New Q&A</div>
            </div>

            {/* <div className={`${styles.flex_content} ${styles.mr_top}`}>
            {sectionList && sectionList.map((v,i) => (
                <div className={`${styles.sectionBox} ${(v.id == sessionObject.id) ? styles.sectionColor: ""}`} onClick={() => sectionSelection(v)}>
                    {v.title}
                </div>
            ))}
        </div> */}
            <div className={styles.mainContentBox}>
                <div className={styles.inputbox}>
                    <InputField label="Title" name="title" width="100%" size="md" value={chapterObj.title} onChange={handleData} />
                    {/* <TextField label="Title" name="title" width="100%" onChange={handleData} /> */}
                </div>
                <div className={styles.inputbox}>
                    <InputField multiline={true} rows={5} width="100%" label="Description" value={chapterObj.description} name="description" onChange={handleData} />
                </div>
                <div className={styles.inputbox}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={chapterObj.chapter_id}
                            label="Chapter"
                            onChange={handleChange}
                        >
                            {chapterList && chapterList.map((v, i) => (<MenuItem value={v.id}>{v.title}</MenuItem>))}
                        </Select>
                    </FormControl>
                </div>
                <div className={styles.flex_content}>
                    <div className={styles.inputbox}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <TimePicker
                                    ampm={false}
                                    openTo="hours"
                                    views={['hours', 'minutes', 'seconds']}
                                    inputFormat="HH:mm:ss"
                                    mask="__:__:__"
                                    label="Test seconds"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                    <div className={styles.inputbox}>
                        <InputField label="Total Marks" size="md" name="total_marks" value={chapterObj.total_marks} onChange={handleData} />
                    </div>
                </div>
                {isSubmit == 0 && <div>
                    <Button onClick={() => submitData()}>Submit</Button>
                </div>}

                {isSubmit == 1 && <div>
                    <Button onClick={() => MoveToQuestion()}>Update</Button>
                    </div>}
            </div>


        </div>
  )
}

export default ContentDIYSCreateTest

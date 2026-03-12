
import React, { useContext, useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./index.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import { api_token } from "../../Utils/Network";
import InputField from "../../Components/Input/InputField";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { checkEmptyObject } from "../../Utils/Utils";

function ContentDIYSCreateTest() {

  const navigate = useNavigate();
  const location = useLocation();

  const { content_selection } = useContext(UserCredsContext);

  const [value, setValue] = useState(dayjs());
  const [chapterList, setChapterList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(0);

  const [chapterObj, setChapterObj] = useState({
    title: "",
    description: "",
    total_marks: "",
    chapter_id: ""
  });

  useEffect(() => {
    getChapters();
  }, []);

  useEffect(() => {
    if (location?.state) {
      setAssignment();
    }
  }, [location.state]);

  const setAssignment = () => {

    const { title, total_marks } = location.state;

    setIsSubmit(1);

    setChapterObj({
      title: title || "",
      total_marks: total_marks || "",
      description: "",
      chapter_id: ""
    });

  };

  const getChapters = () => {

    api_token
      .get(
        `content/v1/chapter_wise_books/?subject=${content_selection.subject}&grade=${content_selection.grade}&board=${content_selection.board}`
      )
      .then((res) => {
        setChapterList(res?.data?.data || []);
      })
      .catch(console.log);

  };

  const backToPrevious = () => {
    navigate("/dashboard/content/doityourself/doityourselflist");
  };

  const handleChange = (event) => {

    setChapterObj({
      ...chapterObj,
      chapter_id: event.target.value
    });

  };

  const handleData = (e) => {

    const { name, value } = e.target;

    setChapterObj({
      ...chapterObj,
      [name]: value
    });

  };

  const MoveToQuestion = () => {

    navigate(
      `/dashboard/content/doityourself/addQuestion/${location?.state?.id}`,
      { state: location?.state }
    );

  };

  const submitData = () => {

    const hrs = value.hour();
    const mins = value.minute();
    const sec = value.second();

    const duration = hrs * 3600 + mins * 60 + sec;

    const finalData = {
      ...chapterObj,
      duration: duration,
      provider: 1,
      subject_id: content_selection.subject,
      grade_id: content_selection.grade,
      board_id: content_selection.board,
      test_format: 2
    };

    const checkEmpy = checkEmptyObject(finalData);

    if (!checkEmpy) {
      alert("Please Fill in Proper Detail");
      return;
    }

    api_token
      .post(`cms/v1/test/`, finalData)
      .then((res) => {

        if (res?.data?.data) {

          const { id } = res.data.data;

          navigate(`/dashboard/content/doityourself/addQuestion/${id}`, {
            state: res.data.data
          });

        }

      })
      .catch(console.log);

  };

  return (
    <div>

      <div className={`${styles.flex_content} ${styles.dataHeader}`}>

        <ArrowBackIosIcon
          className={styles.arrows}
          onClick={backToPrevious}
        />

        <div>Create a New Q&A</div>

      </div>

      <div className={styles.mainContentBox}>

        <div className={styles.inputbox}>

          <InputField
            label="Title"
            name="title"
            width="100%"
            value={chapterObj.title}
            onChange={handleData}
          />

        </div>

        <div className={styles.inputbox}>

          <InputField
            multiline
            rows={5}
            width="100%"
            label="Description"
            value={chapterObj.description}
            name="description"
            onChange={handleData}
          />

        </div>

        <div className={styles.inputbox}>

          <FormControl fullWidth>

            <InputLabel>Chapter</InputLabel>

            <Select
              value={chapterObj.chapter_id}
              label="Chapter"
              onChange={handleChange}
            >

              {chapterList.map((chapter) => (
                <MenuItem key={chapter.id} value={chapter.id}>
                  {chapter.title}
                </MenuItem>
              ))}

            </Select>

          </FormControl>

        </div>

        <div className={styles.flex_content}>

          <div className={styles.inputbox}>

            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <Stack spacing={3}>

                <TimePicker
                  ampm={false}
                  views={["hours", "minutes", "seconds"]}
                  label="Test Duration"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />

              </Stack>

            </LocalizationProvider>

          </div>

          <div className={styles.inputbox}>

            <InputField
              label="Total Marks"
              name="total_marks"
              value={chapterObj.total_marks}
              onChange={handleData}
            />

          </div>

        </div>

        {isSubmit === 0 && (
          <Button onClick={submitData}>
            Submit
          </Button>
        )}

        {isSubmit === 1 && (
          <Button onClick={MoveToQuestion}>
            Update
          </Button>
        )}

      </div>

    </div>
  );
}

export default ContentDIYSCreateTest;

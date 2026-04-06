
import Checkbox from "@mui/material/Checkbox";
import { Button, TextField } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import EditorCms from "../../Components/EditorCms/EditorCms";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { api_token } from "../../Utils/Network";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styles from "./index.module.css";
import { checkEmptyObject } from "../../Utils/Utils";
import NewAccord from "./NewAccord";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import DialogBox from "../../Components/DialogBox/DialogBox";
import InputField from "../../Components/Input/InputField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

function ContentDIYSAddQuestion({ access }) {

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { content_selection, tagList } = useContext(UserCredsContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [value, setValue] = useState(new Date());
  const [show, setShow] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState([
    {
      tags_id: null,
      provider: 1,
      title: "",
      marks: "",
      complexity: null,
      question_type: "1",
      negative_marks: 0,
      is_active: true,
      subjective_choices: [{ solution: "" }],
      objective_choices: [
        { title: "", is_correct: false },
        { title: "", is_correct: false },
        { title: "", is_correct: false },
        { title: "", is_correct: false }
      ]
    }
  ]);

  const [chapterObj, setChapterObj] = useState({
    title: "",
    description: "",
    total_marks: ""
  });

  const [showDetail, setShowDetail] = useState({
    title: location?.state?.title,
    description: location?.state?.description,
    total_marks: location?.state?.total_marks,
    duration: location?.state?.time
  });

  useEffect(() => {
    getQuestion();

    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  const getQuestion = () => {
    api_token
      .get(`content/test_configuration/${id}/`)
      .then((res) => {
        if (res?.data?.data?.questions?.length > 0) {
          setQuestionList(res.data.data.questions);
          setCurrentQuestion([]);
        }
      })
      .catch(console.log);
  };

  const handleDataChange = (content, i, name) => {
    const updated = [...currentQuestion];
    updated[i][name] = content;
    setCurrentQuestion(updated);
  };

  const handleOptionChange = (content, ds, value, index) => {
    const updated = [...currentQuestion];
    updated[value].objective_choices[index].title = content;
    setCurrentQuestion(updated);
  };

  const handleOptionExplain = (content, ds, value, index) => {
    const updated = [...currentQuestion];
    updated[value].objective_choices[index].solution = content;
    setCurrentQuestion(updated);
  };

  const handleCheckData = (e, ds, value, index) => {
    const updated = [...currentQuestion];

    const correctIndex = ds.objective_choices.findIndex(
      (v) => v.is_correct === true
    );

    if (correctIndex !== -1) {
      updated[value].objective_choices[correctIndex].is_correct = false;
    }

    updated[value].objective_choices[index].is_correct = e.target.checked;

    setCurrentQuestion(updated);
  };

  const handleDatas = (e) => {
    const { name, value } = e.target;
    setChapterObj({ ...chapterObj, [name]: value });
  };

  const backToPrevious = () => {
    navigate("/dashboard/content/doityourself/doityourselflist");
  };

  const handlepop = () => {
    setOpenDialog(true);
    setChapterObj(showDetail);
  };

  const SubmitFile = () => {

    const hrs = value.$H || 0;
    const mins = value.$m || 0;
    const sec = value.$s || 0;

    const time = hrs * 3600 + mins * 60 + sec;

    const finalData = {
      ...chapterObj,
      duration: time,
      provider: 1,
      subject_id: content_selection.subject,
      grade_id: content_selection.grade,
      board_id: content_selection.board
    };

    if (!checkEmptyObject(finalData)) {
      alert("Please Fill in Proper Detail");
      return;
    }

    api_token
      .patch(`cms/v1/test/${id}/`, finalData)
      .then((res) => {
        if (res.data.data) {
          alert("Data Updated Successfully");
          setOpenDialog(false);

          const { title, total_marks, description, duration } = res.data.data;

          setShowDetail({
            title,
            total_marks,
            description,
            duration
          });
        }
      })
      .catch(console.log);
  };

  return (
    <div>

      <div className={styles.backContainer} onClick={backToPrevious}>
        <ArrowBackIosIcon className={styles.arrows} />
        <span className={styles.backbutton}>Back</span>
      </div>

      <div className={styles.TotalCount}>

        <div>
          <div className={styles.QuestionTitle}>
            <div className={styles.titles}>{showDetail?.title?.replace("✏️", "")?.trim()}</div>
            {showDetail?.description && showDetail?.description !== showDetail?.title && (
              <p> - {showDetail?.description}</p>
            )}
          </div>

          <div>Total Marks : {showDetail?.total_marks}</div>
        </div>

        <div>
          <div style={{ textAlign: "right" }}>
            {/* View only screen, no edit icon */}
          </div>

          <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#64748b" }}>
            Duration: {showDetail?.duration}
          </div>
        </div>

      </div>

      <Stack spacing={1}>

        {show ? (
          <Skeleton variant="rounded" width={950} height={40} />
        ) : (
          questionList.map((v, i) => (
            <NewAccord
              key={v.id || i}
              data={v}
              index={i}
              setQuestionList={setQuestionList}
              id={id}
              access={access}
              getQuestion={getQuestion}
            />
          ))
        )}

      </Stack>

      {currentQuestion.length === 0 && <p>No Question</p>}

      <DialogBox
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        dataSend={SubmitFile}
      >

        <h1>Update Details</h1>

        <div className={styles.inputbox}>
          <InputField
            label="Title"
            name="title"
            width="100%"
            value={chapterObj.title}
            onChange={handleDatas}
          />
        </div>

        <div className={styles.inputbox}>
          <InputField
            multiline
            rows={5}
            label="Description"
            width="100%"
            value={chapterObj.description}
            name="description"
            onChange={handleDatas}
          />
        </div>

        <div className={styles.flex_content}>

          <div className={styles.inputbox} style={{ width: "50%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <TimePicker
                  ampm={false}
                  views={["hours", "minutes", "seconds"]}
                  label="Assignment seconds"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>

          <div className={styles.inputbox} style={{ width: "50%" }}>
            <InputField
              label="Total Marks"
              name="total_marks"
              value={chapterObj.total_marks}
              onChange={handleDatas}
            />
          </div>

        </div>

      </DialogBox>

    </div>
  );
}

export default ContentDIYSAddQuestion;

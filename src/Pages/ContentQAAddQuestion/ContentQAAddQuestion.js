import Checkbox from "@mui/material/Checkbox";
import { Button, Switch, TextField } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import EditorCms from "../../Components/EditorCms/EditorCms";
import MCQQuestionForm from "../../Components/MCQQuestionForm/MCQQuestionForm";
import Accord from "./Accord";
import { useLocation, useParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DialogBox from "../../Components/DialogBox/DialogBox";
import InputField from "../../Components/Input/InputField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

function ContentQAAddQuestion({ access }) {
  let navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [value, setValue] = React.useState(new Date());
  const { sectionList, content_selection, tagList } =
    useContext(UserCredsContext);
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
      subjectives: "",
      subjective_choices: [
        {
          solution: "",
        },
      ],
      objective_choices: [
        {
          title: "",
          is_correct: false,
        },
        {
          title: "",
          is_correct: false,
        },
        {
          title: "",
          is_correct: false,
        },
        {
          title: "",
          is_correct: false,
        },
      ],
    },
  ]);
  const [questionType, setQuestionType] = useState(true);
  const [taxonomy, setTaxonomy] = useState([]);
  const [chapterObj, setChapterObj] = useState({
    title: "",
    description: "",
    total_marks: "",
    // chapter_id: "",
  });

  const [showDetail, setShowDetail] = useState({
    title: location?.state?.title,
    description: location?.state?.description,
    total_marks: location?.state?.total_marks,
    duration: location?.state?.time,
  });
  const [show, setShow] = useState(true);

  const delay = 2;
  useEffect(() => {
    // getTaxonomy();
    getQuestion();

    let timer1 = setTimeout(() => {
      setShow(false);
    }, delay * 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const getTaxonomy = () => {
    api_token
      .get(`base/v1/tags`)
      .then((res) => {
        setTaxonomy(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getQuestion = () => {
    api_token
      .get(`content/test_configuration/${id}/`)
      .then((res) => {
        // console.log(res.data.data);
        if (res.data.data.questions.length > 0) {
          setQuestionList(res.data.data.questions);
          setCurrentQuestion([]);
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(questionList, "bsgdysdehfdygkhlkdfjdf");
  const CreateQuestion = () => {
    const data = {
      tags_id: null,
      provider: 1,
      title: "",
      marks: "",
      complexity: null,
      question_type: "1",
      negative_marks: 0,
      is_active: true,
      subjectives: "",
      subjective_choices: [
        {
          solution: "",
        },
      ],
    };

    setCurrentQuestion([data]);
  };

  const handleChange = (event) => {
    setQuestionType(event.target.checked);
  };
  // location?.state

  const handleOptionExplain = (content, ds, value, index) => {
    ds.objective_choices.map((v, i) => {
      if (v.is_correct === false) {
        const haskey =
          "solution" in currentQuestion[value].objective_choices[index];
        if (haskey) {
          delete currentQuestion[value].objective_choices[index].solution;
        }
      }
    });

    currentQuestion[value].objective_choices[index].solution = content;
    setCurrentQuestion([...currentQuestion]);
  };

  const handleCheckData = (e, ds, value, index) => {
    let data = ds.objective_choices.findIndex((v) => {
      return v.is_correct === true;
    });

    console.log(data);
    if (data !== -1) {
      currentQuestion[value].objective_choices[data].is_correct =
        !e.target.checked;
      setCurrentQuestion([...currentQuestion]);
    }
    currentQuestion[value].objective_choices[index].is_correct =
      e.target.checked;
    setCurrentQuestion([...currentQuestion]);
  };

  const handlepop = () => {
    setOpenDialog(true);
    console.log(location.state, "SSSSSSSSSS");
    // let { title, total_marks, total_questions, description, duration } = location.state;
    // setChapterObj({ title, total_marks, description, duration })
    setChapterObj(showDetail);
  };

  const saveQuestion = () => {
    let data = [...currentQuestion];
    if (questionType) {
      data[0].question_type = 2;
      data[0].subjective_choices[0].solution = data[0]?.subjectives;
      // delete data[0].subjectives;
      // delete data[0].objective_choices;
    } else {
      data[0].question_type = 1;
      delete data[0].subjective_choices;
      delete data[0].subjectives;
    }

    console.log(data, "Datasssssssss");

    const hasCorrectAns = data[0].question_type === 1 
      ? data[0].objective_choices?.some(choice => choice.is_correct)
      : true;

    const checks = checkEmptyObject(data[0]);
    if (checks && hasCorrectAns) {
      api_token
        .patch(`cms/v1/test/${id}/`, { question: data })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data) {
            setQuestionList(res.data.data.question);
            setCurrentQuestion([]);
          }
        })
        .catch((err) => console.log(err));
    } else if (!hasCorrectAns) {
        alert("Please mark at least one option as the correct answer.");
    } else {
      alert("Field should not be empty");
    }
  };

  const handleDataChange = (content, i, name) => {
    console.log(content, i, name);
    // const { name, value } = e.target;

    currentQuestion[i][name] = content;
    setCurrentQuestion([...currentQuestion]);
  };

  const handleDatas = (e) => {
    const { name, value } = e.target;
    setChapterObj({ ...chapterObj, [name]: value });
  };

  const handleData = (e, i) => {
    const { name, value } = e.target;

    currentQuestion[i][name] = value;
    setCurrentQuestion([...currentQuestion]);
  };

  const handleOptionChange = (content, ds, value, index) => {
    currentQuestion[value].objective_choices[index].title = content;
    setCurrentQuestion([...currentQuestion]);
  };

  const backToPrevious = () => {
    navigate("/dashboard/content/qa/qalist");
  };

  const SubmitFile = () => {
    // debugger;
    const hrs = value.$H;
    const mins = value.$m;
    const sec = value.$s;

    const data = hrs * 60 * 60 + mins * 60 + sec;
    let time;

    if (data) {
      time = data;
    } else {
      time = chapterObj?.duration;
    }

    const finalData = {
      ...chapterObj,
      duration: time,
      provider: 1,
      subject_id: content_selection.subject,
      grade_id: content_selection.grade,
      board_id: content_selection.board,
    };

    let checkEmpy = checkEmptyObject(finalData);

    console.log(finalData, "finalData");
    if (!checkEmpy) {
      alert("Please Fill in Proper Detail");
    } else {
      console.log(finalData, "finalData");
      api_token
        .patch(`cms/v1/test/${id}/`, finalData)
        .then((res) => {
          // console.log(res.data.data, "CreateData")

          if (res.data.data) {
            alert("Data Updated Successfully");
            setOpenDialog(false);
            const { title, total_marks, description, duration } = res.data.data;
            setShowDetail({
              ...showDetail,
              title,
              total_marks,
              description,
              duration,
            });
          }
        })
        .catch((err) => console.log(err));
    }
    // navigate(`/dashboard/content/assignment/addQuestion/1`)
  };

  const hours = Math.floor(showDetail?.duration / 3600);
  const minutes = Math.floor((showDetail?.duration % 3600) / 60);
  const remainingSeconds = showDetail?.duration % 60;

  console.log(questionList, "ParamsID");
  // console.log(currentQuestion, "currentQuestion")
  console.log(location?.state, "currentQuestion");
  return (
    <div>
      {/* {console.log("datatas")} */}

      <div
        onClick={() => backToPrevious()}
        style={{ marginBottom: "20px" }}
        className={styles.backContainer}
      >
        <ArrowBackIosIcon className={styles.arrows} />
        <div>
          <span className={styles.backbutton}>Back</span>
        </div>
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
      {/* <div style={{ textAlign: 'right' }}>
        <Button className={styles.btns}>Assign To</Button>
      </div> */}

      {/* {
        questionList.length && [...questionList].reverse().map((v, i) => (
          <NewAccord data={v} index={i} setQuestionList={setQuestionList} id={id} />
        ))
      } */}

      <Stack spacing={1}>
        {show ? (
          <Skeleton variant="rounded" width={950} height={40} />
        ) : (
          questionList.length &&
          [...questionList]
            // .reverse()
            .map((v, i) => (
              <NewAccord
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

      {/* <Accord data={questionList} setQuestionList={setQuestionList} /> */}


      {questionList.length <= 0 && <p>No Question</p>}

      {/* <Button onClick={() => CreateQuestion()} variant="contained" style={{marginTop: '20px'}} disabled={!access?.writeAccess}>Add Question</Button> */}

      <DialogBox
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        dataSend={() => SubmitFile()}
      >
        <h1>Update Details</h1>
        <div className={styles.inputbox}>
          <InputField
            label="Title"
            name="title"
            width="100%"
            size="md"
            value={chapterObj.title}
            onChange={handleDatas}
          />
          {/* <TextField label="Title" name="title" width="100%" onChange={handleData} /> */}
        </div>
        <div className={styles.inputbox}>
          <InputField
            multiline={true}
            rows={5}
            label="Description"
            width="100%"
            value={chapterObj.description}
            name="description"
            onChange={handleDatas}
          />
        </div>
        {/* <div className={styles.inputbox}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chapterObj.chapter_id}
              label="Chapter"
              onChange={handleChanges}
            >
              {chapterList && chapterList.map((v, i) => (<MenuItem value={v.id}>{v.title}</MenuItem>))}
            </Select>
          </FormControl>
        </div> */}
        <div className={styles.flex_content}>
          <div className={styles.inputbox} style={{ width: "50%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <TimePicker
                  ampm={false}
                  openTo="hours"
                  views={["hours", "minutes", "seconds"]}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  label="Assignment seconds"
                  value={value}
                  onChange={(newValue) => {
                    console.log(newValue, "NNNNNNNN");
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div className={styles.inputbox} style={{ width: "50%" }}>
            <InputField
              label="Total Marks"
              size="md"
              name="total_marks"
              value={chapterObj.total_marks}
              width="100%"
              onChange={handleDatas}
            />
          </div>
        </div>
      </DialogBox>
    </div>
  );
}

export default ContentQAAddQuestion;

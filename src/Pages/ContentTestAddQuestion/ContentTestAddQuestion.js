import Checkbox from "@mui/material/Checkbox";
import { Button, Switch, TextField } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import EditorCms from "../../Components/EditorCms/EditorCms";
import MCQQuestionForm from "../../Components/MCQQuestionForm/MCQQuestionForm";
import Accord from "./Accord";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { api_token } from "../../Utils/Network";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styles from "./index.module.css";
import { checkEmptyObject } from "../../Utils/Utils";
import NewAccord from "./NewAccord";
import { ArrowBack } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DialogBox from "../../Components/DialogBox/DialogBox";
import InputField from "../../Components/Input/InputField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import Stack from "@mui/material/Stack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Skeleton from "@mui/material/Skeleton";

function ContentTestAddQuestion({ access }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState([
    {
      taxonomy: null,
      provider: 1,
      title: "",
      positive_marks: "",
      complexity: null,
      question_type: "1",
      negative_marks: 0,
      is_active: true,
      subjectives: "",
      avg_time_to_solve: "00:01:00",
      subjective_choices: [
        {
          solution: "",
        },
      ],
      choices: [
        {
          title: "",
          is_correct_answer: false,
        },
        {
          title: "",
          is_correct_answer: false,
        },
        {
          title: "",
          is_correct_answer: false,
        },
        {
          title: "",
          is_correct_answer: false,
        },
      ],
    },
  ]);
  const [questionType, setQuestionType] = useState(false);
  const [taxonomy, setTaxonomy] = useState([]);
  const [value, setValue] = React.useState(new Date());
  const { sectionList, content_selection, tagList } =
    useContext(UserCredsContext);
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
    getTaxonomy();
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
      .get(`content/taxonomy`)
      .then((res) => {
        setTaxonomy(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getQuestion = () => {
    // .get(`cms/v1/test/${id}/`)
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

  const CreateQuestion = () => {
    const data = {
      taxonomy: null,
      provider: 1,
      title: "",
      positive_marks: "",
      complexity: null,
      question_type: "1",
      negative_marks: 0,
      is_active: true,
      subjectives: "",
      avg_time_to_solve: "00:01:00",
      subjective_choices: [
        {
          solution: "",
        },
      ],
      choices: [
        {
          title: "",
          is_correct_answer: false,
        },
        {
          title: "",
          is_correct_answer: false,
        },
        {
          title: "",
          is_correct_answer: false,
        },
        {
          title: "",
          is_correct_answer: false,
        },
      ],
    };

    setCurrentQuestion([data]);

    // setQuestionList([...questionList, data]);
  };

  const handleChange = (event) => {
    setQuestionType(event.target.checked);
  };

  const handleOptionExplain = (content, ds, value, index) => {
    ds.choices.map((v, i) => {
      if (v.is_correct_answer === false) {
        const haskey = "explanation" in currentQuestion[value].choices[index];
        if (haskey) {
          delete currentQuestion[value].choices[index].explanation;
        }
      }
    });

    currentQuestion[value].choices[index].explanation = content;
    setCurrentQuestion([...currentQuestion]);
  };

  const handleCheckData = (e, ds, value, index) => {
    let data = ds.choices.findIndex((v) => {
      return v.is_correct_answer === true;
    });

    console.log(data);
    if (data !== -1) {
      currentQuestion[value].choices[data].is_correct_answer =
        !e.target.checked;
      setCurrentQuestion([...currentQuestion]);
    }
    currentQuestion[value].choices[index].is_correct_answer = e.target.checked;
    setCurrentQuestion([...currentQuestion]);
  };

  const saveQuestion = () => {
    // // // setQuestionList([...questionList, ...currentQuestion]);

    let datas = [...currentQuestion];
    // console.log(data, "DDDDDDDDD")

    // let data = [...currentQuestion];
    if (questionType) {
      datas[0].question_type = 2;
      datas[0].subjective_choices[0].explanation = datas[0].subjectives;
      delete datas[0].subjectives;
      delete datas[0].choices;
    } else {
      datas[0].question_type = 1;
      delete datas[0].subjective_choices;
      delete datas[0].subjectives;
    }

    const newData = datas.map((v, i) => {
      if (!v.test_configuration_id) {
        datas[i].test_configuration_id = id;
      }
      if (v?.taxonomy) {
        datas[i].taxonomy = [+v.taxonomy];
      }
    });

    console.log(datas, "Datasssssssss");

    const checks = checkEmptyObject(datas[0]);
    if (checks) {
      api_token
        .post(`content/questions/`, datas[0])
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data) {
            setQuestionList([...questionList, res.data.data]);
            getQuestion();
            setCurrentQuestion([
              {
                taxonomy: null,
                provider: 1,
                title: "",
                positive_marks: "",
                complexity: null,
                question_type: "1",
                negative_marks: 0,
                is_active: true,
                subjectives: "",
                avg_time_to_solve: "00:01:00",
                subjective_choices: [
                  {
                    solution: "",
                  },
                ],
                choices: [
                  {
                    title: "",
                    is_correct_answer: false,
                  },
                  {
                    title: "",
                    is_correct_answer: false,
                  },
                  {
                    title: "",
                    is_correct_answer: false,
                  },
                  {
                    title: "",
                    is_correct_answer: false,
                  },
                ],
              },
            ]);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Field should not be empty");
    }
  };

  const setBack = () => {
    navigate(`/dashboard/content/test/testList`);
  };

  const handleDataChange = (content, i, name) => {
    console.log(content, i, name);
    // const { name, value } = e.target;

    currentQuestion[i][name] = content;
    setCurrentQuestion([...currentQuestion]);
  };

  const handleData = (e, i) => {
    const { name, value } = e.target;
    currentQuestion[i][name] = value;
    setCurrentQuestion([...currentQuestion]);
  };

  const handleDatas = (e) => {
    const { name, value } = e.target;
    setChapterObj({ ...chapterObj, [name]: value });
  };

  const handlepop = () => {
    setOpenDialog(true);
    console.log(location.state, "SSSSSSSSSS");
    // let { title, total_marks, total_questions, description } = location.state;
    // setChapterObj({ title, total_marks, total_questions, description })
    setChapterObj(showDetail);
  };

  const handleOptionChange = (content, ds, value, index) => {
    currentQuestion[value].choices[index].title = content;
    setCurrentQuestion([...currentQuestion]);
  };

  const SubmitFile = () => {
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
      course: content_selection.course,
      // subject_id: content_selection.subject,
      grade_id: content_selection.grade,
      // board_id: content_selection.board,
    };

    let checkEmpy = checkEmptyObject(finalData);

    // console.log(valuea, "ChapterObj")
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
            // const { id } = res.data.data;
            // navigate(`/dashboard/content/assignment/addQuestion/${id}`, {state: res.data.data})
          }
        })
        .catch((err) => console.log(err));
    }
    // navigate(`/dashboard/content/assignment/addQuestion/1`)
  };

  const hours = Math.floor(showDetail?.duration / 3600);
  const minutes = Math.floor((showDetail?.duration % 3600) / 60);
  const remainingSeconds = showDetail?.duration % 60;

  // const hours = Math.floor(location?.state?.duration / 3600);
  // const minutes = Math.floor((location?.state?.duration % 3600) / 60);
  // const remainingSeconds = location?.state?.duration % 60;

  console.log(id, "ParamsID");
  // console.log(currentQuestion, "currentQuestion")
  console.log(questionList, "currentQuestion");
  return (
    <div>
      {/* {console.log("datatas")} */}

      <div onClick={() => setBack()} className={styles.backContainer}>
        <ArrowBackIosIcon className={styles.arrows} />
        <div>
          <span className={styles.backbutton}>Back</span>
        </div>
      </div>

      <div className={styles.TotalCount}>
        <div>
          <div className={styles.QuestionTitle}>
            <div className={styles.titles}>{showDetail?.title}</div>
            <p> - {showDetail?.description}</p>
          </div>
          <div>Total Marks : {showDetail?.total_marks}</div>
        </div>
        <div>
          <div style={{ textAlign: "right" }}>
            {access?.updateAccess && <EditIcon onClick={() => handlepop()} />}
          </div>
          <div style={{ fontSize: "19px" }}>
            {/* Duration: {`${hours}:${minutes}:${remainingSeconds}`} */}
            Duration: {showDetail?.duration}
          </div>
        </div>
      </div>
      {/* <div style={{ textAlign: "right" }}>
        <Button className={styles.btns}>Assign To</Button>
      </div> */}
      {/* 
      {
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
                getQuestion={getQuestion}
                id={id}
                questionID={v.id}
                access={access}
              />
            ))
        )}
      </Stack>

      {/* <Accord data={questionList} setQuestionList={setQuestionList} /> */}
      {show === false &&
        currentQuestion.length > 0 &&
        currentQuestion.map((v, i) => (
          <div className={styles.mainBox}>
            {/* <div style={{ display: 'flex', alignItem: 'center' }}>
            <p>Objective</p>
            <Switch
              checked={questionType}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <p>Subjective</p>
          </div> */}

            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "20px" }}>
                <TextField
                  label="Marks"
                  name="positive_marks"
                  onChange={(e) => handleData(e, i)}
                />
              </div>
              <div>
                <TextField
                  label="Negative marks"
                  name="negative_marks"
                  onChange={(e) => handleData(e, i)}
                />
              </div>

              <div style={{ margin: "0 30px" }}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Difficulty Level
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="complexity"
                    onChange={(e) => handleData(e, i)}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Easy"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Medium"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="Hard"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Taxonomy
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="taxonomy"
                  onChange={(e) => handleData(e, i)}
                >
                  {tagList &&
                    tagList.map((v, i) => (
                      <FormControlLabel
                        value={v.id}
                        control={<Radio />}
                        label={v.title}
                      />
                    ))}
                  {/* <FormControlLabel value="2" control={<Radio />} label="Medium" />
                  <FormControlLabel value="3" control={<Radio />} label="Hard" /> */}
                </RadioGroup>
              </FormControl>
            </div>

            {/* Professional MCQ Question Builder */}
            <MCQQuestionForm />
          </div>
        ))}

      {questionList.length <= 0 && <p>No Question</p>}

      {/* <Button
        onClick={() => CreateQuestion()}
        variant="contained"
        style={{ marginTop: "20px" }}
        //  disabled={!access.updateAccess}
      >
        Add Question
      </Button> */}

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

export default ContentTestAddQuestion;

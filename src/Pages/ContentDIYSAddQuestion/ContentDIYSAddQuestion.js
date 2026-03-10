import Checkbox from "@mui/material/Checkbox";
<<<<<<< HEAD
import { Button, Switch, TextField } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import EditorCms from "../../Components/EditorCms/EditorCms";
import Accord from "./Accord";
import { useLocation, useParams } from "react-router-dom";
=======
import { Button, TextField } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import EditorCms from "../../Components/EditorCms/EditorCms";
import { useLocation, useParams, useNavigate } from "react-router-dom";
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
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
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
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
<<<<<<< HEAD
  let navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [value, setValue] = React.useState(new Date());
  const { sectionList, content_selection, tagList } =
    useContext(UserCredsContext);
=======

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { content_selection, tagList } = useContext(UserCredsContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [value, setValue] = useState(new Date());
  const [show, setShow] = useState(true);

>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
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
<<<<<<< HEAD
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
=======
      subjective_choices: [{ solution: "" }],
      objective_choices: [
        { title: "", is_correct: false },
        { title: "", is_correct: false },
        { title: "", is_correct: false },
        { title: "", is_correct: false }
      ]
    }
  ]);

  const [questionType, setQuestionType] = useState(true);

  const [chapterObj, setChapterObj] = useState({
    title: "",
    description: "",
    total_marks: ""
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
  });

  const [showDetail, setShowDetail] = useState({
    title: location?.state?.title,
    description: location?.state?.description,
    total_marks: location?.state?.total_marks,
<<<<<<< HEAD
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

=======
    duration: location?.state?.time
  });

  useEffect(() => {
    getQuestion();

    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
  const getQuestion = () => {
    api_token
      .get(`content/test_configuration/${id}/`)
      .then((res) => {
<<<<<<< HEAD
        // console.log(res.data.data);
        if (res.data.data.questions.length > 0) {
=======
        if (res?.data?.data?.questions?.length > 0) {
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
          setQuestionList(res.data.data.questions);
          setCurrentQuestion([]);
        }
      })
<<<<<<< HEAD
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

    const checks = checkEmptyObject(data[0]);
    if (checks) {
      api_token
        .patch(`cms/v1/test/${id}/`, { question: currentQuestion })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data) {
            setQuestionList(res.data.data.question);
            setCurrentQuestion([]);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Field should not be empty");
    }
  };

  const handleDataChange = (content, i, name) => {
    console.log(content, i, name);
    // const { name, value } = e.target;

    currentQuestion[i][name] = content;
    setCurrentQuestion([...currentQuestion]);
=======
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

  const handleData = (e, i) => {
    const { name, value } = e.target;

    const updated = [...currentQuestion];
    updated[i][name] = value;

    setCurrentQuestion(updated);
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
  };

  const handleDatas = (e) => {
    const { name, value } = e.target;
    setChapterObj({ ...chapterObj, [name]: value });
  };

<<<<<<< HEAD
  const handleData = (e, i) => {
    const { name, value } = e.target;

    currentQuestion[i][name] = value;
    setCurrentQuestion([...currentQuestion]);
  };

  const handleOptionChange = (content, ds, value, index) => {
    currentQuestion[value].objective_choices[index].title = content;
    setCurrentQuestion([...currentQuestion]);
  };

=======
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
  const backToPrevious = () => {
    navigate("/dashboard/content/doityourself/doityourselflist");
  };

<<<<<<< HEAD
  const SubmitFile = () => {
    // debugger;
=======
  const handlepop = () => {
    setOpenDialog(true);
    setChapterObj(showDetail);
  };

  const SubmitFile = () => {

>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
    const hrs = value.$H;
    const mins = value.$m;
    const sec = value.$s;

<<<<<<< HEAD
    const data = hrs * 60 * 60 + mins * 60 + sec;
    let time;

    if (data) {
      time = data;
    } else {
      time = chapterObj?.duration;
    }
=======
    const time = hrs * 3600 + mins * 60 + sec;
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)

    const finalData = {
      ...chapterObj,
      duration: time,
      provider: 1,
      subject_id: content_selection.subject,
      grade_id: content_selection.grade,
<<<<<<< HEAD
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
=======
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
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
      </div>

      <div className={styles.TotalCount}>
        <div>
          <div className={styles.QuestionTitle}>
            <div className={styles.titles}>{showDetail?.title}</div>
            <p> - {showDetail?.description}</p>
          </div>
          <div>Total Marks : {showDetail?.total_marks}</div>
        </div>
<<<<<<< HEAD
        <div>
          <div style={{ textAlign: "right" }}>
            {access?.updateAccess && <EditIcon onClick={() => handlepop()} />}
          </div>
          <div style={{ fontSize: "19px" }}>
            {/* Duration: {`${hours}:${minutes}:${remainingSeconds}`} */}
=======

        <div>
          <div style={{ textAlign: "right" }}>
            {access?.updateAccess && <EditIcon onClick={handlepop} />}
          </div>
          <div style={{ fontSize: "19px" }}>
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
            Duration: {showDetail?.duration}
          </div>
        </div>
      </div>
<<<<<<< HEAD
      {/* <div style={{ textAlign: 'right' }}>
        <Button className={styles.btns}>Assign To</Button>
      </div> */}

      {/* {
        questionList.length && [...questionList].reverse().map((v, i) => (
          <NewAccord data={v} index={i} setQuestionList={setQuestionList} id={id} />
        ))
      } */}
=======
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)

      <Stack spacing={1}>
        {show ? (
          <Skeleton variant="rounded" width={950} height={40} />
        ) : (
<<<<<<< HEAD
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
                  name="tags_id"
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

            <p>Question Title</p>
            <EditorCms
              height={350}
              onChange={(content) => handleDataChange(content, i, "title")}
            />

            {questionType ? (
              <>
                <div>
                  <p>Answer</p>
                  <EditorCms
                    height={250}
                    onChange={(content) =>
                      handleDataChange(content, i, "subjectives")
                    }
                    // onChange={(content, editor) => {
                    //   // handleDataChange(content, i, "value");
                    //   handleOptionChange(content, v, i, j)
                    // }}
                  />
                </div>
              </>
            ) : (
              <>
                {v?.objective_choices?.map((content, j) => (
                  <>
                    <p>
                      Option {j + 1}{" "}
                      <Checkbox
                        checked={content.is_correct}
                        onChange={(e) => handleCheckData(e, v, i, j)}
                      />{" "}
                    </p>
                    <div>
                      <EditorCms
                        height={250}
                        onChange={(content) =>
                          handleOptionChange(content, v, i, j)
                        }
                        // onChange={(content, editor) => {
                        //   // handleDataChange(content, i, "value");
                        //   handleOptionChange(content, v, i, j)
                        // }}
                      />
                    </div>

                    {content.is_correct && (
                      <div>
                        <p>Explaination</p>
                        <div>
                          <EditorCms
                            height={250}
                            onChange={(content) =>
                              handleOptionExplain(content, v, i, j)
                            }
                            // onChange={(content, editor) => {
                            //   // handleDataChange(content, i, "value");
                            //   handleOptionChange(content, v, i, j)
                            // }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </>
            )}

            {/* <Button onClick={() => saveQuestion()} variant="contained" style={{margin: '20px'}}>Save Question</Button> */}
          </div>
        ))}

      {questionList.length <= 0 && <p>No Question</p>}

      {/* <Button onClick={() => CreateQuestion()} variant="contained" style={{marginTop: '20px'}} disabled={!access?.writeAccess}>Add Question</Button> */}
=======
          questionList.map((v, i) => (
            <NewAccord
              key={v.id || i}
              data={v}
              index={i}
              setQuestionList={setQuestionList}
              id={id}
              access={access}
            />
          ))
        )}
      </Stack>

      {currentQuestion.length === 0 && <p>No Question</p>}
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)

      <DialogBox
        open={openDialog}
        onClose={() => setOpenDialog(false)}
<<<<<<< HEAD
        dataSend={() => SubmitFile()}
      >
        <h1>Update Details</h1>
=======
        dataSend={SubmitFile}
      >
        <h1>Update Details</h1>

>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
        <div className={styles.inputbox}>
          <InputField
            label="Title"
            name="title"
            width="100%"
<<<<<<< HEAD
            size="md"
            value={chapterObj.title}
            onChange={handleDatas}
          />
          {/* <TextField label="Title" name="title" width="100%" onChange={handleData} /> */}
        </div>
        <div className={styles.inputbox}>
          <InputField
            multiline={true}
=======
            value={chapterObj.title}
            onChange={handleDatas}
          />
        </div>

        <div className={styles.inputbox}>
          <InputField
            multiline
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
            rows={5}
            label="Description"
            width="100%"
            value={chapterObj.description}
            name="description"
            onChange={handleDatas}
          />
        </div>
<<<<<<< HEAD
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
=======

        <div className={styles.flex_content}>

>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
          <div className={styles.inputbox} style={{ width: "50%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <TimePicker
                  ampm={false}
<<<<<<< HEAD
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
=======
                  views={["hours", "minutes", "seconds"]}
                  label="Assignment seconds"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
<<<<<<< HEAD
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
=======

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

>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)
    </div>
  );
}

<<<<<<< HEAD
export default ContentDIYSAddQuestion;
=======
export default ContentDIYSAddQuestion;
>>>>>>> 1aa4e79 (Replace TinyMCE with Quill editor)

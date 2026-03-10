import Checkbox from '@mui/material/Checkbox';
import { Button, Switch, TextField } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react'
import EditorCms from '../../Components/EditorCms/EditorCms'
import Accord from './Accord';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { api_token } from '../../Utils/Network';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from './index.module.css';
import NewAccord from './NewAccord';
import { checkEmptyObject } from '../../Utils/Utils';
import EditIcon from '@mui/icons-material/Edit';
import DialogBox from '../../Components/DialogBox/DialogBox';
import InputField from '../../Components/Input/InputField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import { ArrowBack } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function ContentAddAssignQuestion({access}) {
  let navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [questionList, setQuestionList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = React.useState(new Date());
  const { sectionList, content_selection, tagList } = useContext(UserCredsContext);


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
        }],
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
        }
      ]
    }
  ]);
  const [questionType, setQuestionType] = useState(false);
  const [taxonomy, setTaxonomy] = useState([]);
  const [chapter, setChapter] = React.useState(null);
  const [chapterObj, setChapterObj] = useState({
    title: "",
    description: "",
    total_marks: "",
    chapter_id: "",
  });
  const [showDetail, setShowDetail] = useState({
    title: location?.state?.title,
    description: location?.state?.description,
    total_marks: location?.state?.total_marks,
    duration: location?.state?.duration,
  })

  const [chapterList, setChapterList] = useState([]);
  const [show, setShow] = useState(true);

  const delay = 2;
  useEffect(() => {
    // getTaxonomy();
    getQuestion();
    getChapters();



    let timer1 = setTimeout(() => {
      setShow(false)
    }, delay * 1000);

    return () => {
      clearTimeout(timer1);
    };

  }, []);

  // const getTaxonomy = () => {
  //   api_token
  //     .get(`base/v1/tags`)
  //     .then((res) => {
  //       setTaxonomy(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  const getQuestion = () => {
    api_token
      .get(`cms/v1/assignment/${id}/`)
      .then((res) => {
        // console.log(res.data.data);
        if (res.data.data.question.length > 0) {
          setQuestionList(res.data.data.question)
          setCurrentQuestion([]);
        }
      })
      .catch(err => console.log(err));
  }

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
      subjective_choices: [{
        solution: "",
      }],
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
        }
      ]
    }

    setCurrentQuestion([data]);

    // setQuestionList([...questionList, data]);
  }

  const handleChange = (event) => {
    setQuestionType(event.target.checked);
  };


  const handleOptionExplain = (content, ds, value, index) => {
    ds.objective_choices.map((v, i) => {
      if (v.is_correct === false) {
        const haskey = "solution" in currentQuestion[value].objective_choices[index];
        if (haskey) {
          delete currentQuestion[value].objective_choices[index].solution;
        }
      }
    })
    currentQuestion[value].objective_choices[index].solution = content;
    setChapterObj(showDetail)
    setCurrentQuestion([...currentQuestion])
  }

  const handleCheckData = (e, ds, value, index) => {
    let data = ds.objective_choices.findIndex((v) => {
      return v.is_correct === true;
    })

    console.log(data);
    if (data !== -1) {
      currentQuestion[value].objective_choices[data].is_correct = !e.target.checked;
      setCurrentQuestion([...currentQuestion])
    }
    currentQuestion[value].objective_choices[index].is_correct = e.target.checked;
    setCurrentQuestion([...currentQuestion])
  }


  const saveQuestion = () => {
    // setQuestionList([...questionList, ...currentQuestion]);(
    let data = [...currentQuestion];
    if (questionType) {
      data[0].question_type = 2;
      data[0].subjective_choices[0].solution = data[0].subjectives;
      delete data[0].subjectives;
      delete data[0].objective_choices;
    } else {
      data[0].question_type = 1;
      delete data[0].subjective_choices;
      delete data[0].subjectives;
    }

    console.log(data, "Datasssssssss")

    const checks = checkEmptyObject(data[0]);
    if (checks) {
      api_token
        .patch(`cms/v1/assignment/${id}/`, { question: data })
        .then((res) => {
          // console.log(res.data.data);
          if (res.data.data) {
            setQuestionList(res.data.data.question)
            setCurrentQuestion([]);
          }
        })
        .catch(err => console.log(err));
    } else {
      alert("Field should not be empty")
    }
  }

  const handleDataChange = (content, i, name) => {

    currentQuestion[i][name] = content;
    setCurrentQuestion([...currentQuestion]);
  }

  const handleDatas = (e) => {
    const { name, value } = e.target;
    setChapterObj({ ...chapterObj, [name]: value })
  }

  const handleData = (e, i) => {
    const { name, value } = e.target;

    currentQuestion[i][name] = value;
    setCurrentQuestion([...currentQuestion]);
  }

  const handlepop = () => {
    setOpenDialog(true);
    console.log(location.state, "SSSSSSSSSS")
    // let { title, total_marks, total_questions, description, duration } = location.state;
    // setChapterObj({ title, total_marks, total_questions, description })
    // console.log(duration, "duration")
    setChapterObj(showDetail)




  }

  const getChapters = () => {
    // .get(`content/v1/chapter_wise_books/?subject=${content_selection.subject}&grade=${content_selection.grade}&board=${content_selection.board}`)

    api_token
      .get(`content/v1/chapter_wise_books/?grade=${content_selection.grade}`)
      .then((res) => {
        setChapterList(res.data.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChanges = (event) => {
    console.log(event.target.value, "eventsssss")
    setChapter(event.target.value);
    setChapterObj({ ...chapterObj, chapter_id: event.target.value })
  };

  const arrowBack = () => {
    navigate(`/dashboard/content/assignment/assignList`)
  }

  const SubmitFile = () => {
    const hrs = value.$H;
    const mins = value.$m;
    const sec = value.$s;

    const data = (hrs * 60 * 60) + (mins * 60) + sec;
    let time;

    if(data){
      time = data; 
    }else{
      time = chapterObj?.duration;
    }

    console.log(data, "mydata")

    const finalData = {
      ...chapterObj,
      duration: time,
      provider: 1,
      subject_id: content_selection.subject,
      grade_id: content_selection.grade,
      board_id: content_selection.board,
    }

    let checkEmpy = checkEmptyObject(finalData);


    // console.log(valuea, "ChapterObj")
    if (!checkEmpy) {
      alert("Please Fill in Proper Detail")
    } else {

      console.log(finalData, "finalData")
      api_token
        .patch(`cms/v1/assignment/${id}/`, finalData)
        .then((res) => {
          // console.log(res.data.data, "CreateData")

          if (res.data.data) {
            alert("Data Updated Successfully")
            setOpenDialog(false)
            const {title, total_marks, description, duration } = res.data.data;
            setShowDetail({...showDetail, title, total_marks, description, duration});
            // const { id } = res.data.data;
            // navigate(`/dashboard/content/assignment/addQuestion/${id}`, {state: res.data.data})
          }
        })
        .catch(err => console.log(err))
    }
    // navigate(`/dashboard/content/assignment/addQuestion/1`)
  }

  const handleOptionChange = (content, ds, value, index) => {

    currentQuestion[value].objective_choices[index].title = content;
    setCurrentQuestion([...currentQuestion])
  }

  const hours = Math.floor(showDetail?.duration / 3600);
  const minutes = Math.floor((showDetail?.duration % 3600) / 60);
  const remainingSeconds = showDetail?.duration % 60;

  // const hours = Math.floor(location?.state?.duration / 3600);
  // const minutes = Math.floor((location?.state?.duration % 3600) / 60);
  // const remainingSeconds = location?.state?.duration % 60;

  console.log(access, "accessaccessaccess")
  // console.log(currentQuestion, "currentQuestion")
  // console.log(questionList, "currentQuestion")
  return (
    <div>
      {/* {console.log("datatas")} */}
      <div onClick={() => arrowBack()} className={styles.backContainer}>
          <ArrowBackIosIcon  className={styles.arrows} />
        <div>
          <span className={styles.backbutton} >Back</span>
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
          <div style={{ textAlign: 'right' }}>
            {access?.updateAccess && <EditIcon onClick={() => handlepop()} />}
          </div>
          <div style={{ fontSize: '19px' }}>
            Duration: {`${hours}:${minutes}:${remainingSeconds}`}
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button className={styles.btns}>Assign To</Button>
      </div>

      <Stack spacing={1}>
        {
          show ? <Skeleton variant="rounded" width={950} height={40} /> :
            questionList.length && questionList.map((v, i) => (
              <NewAccord data={v} index={i} setQuestionList={setQuestionList} id={id} access={access} />
            ))
        }
      </Stack>


      {/* <Accord data={questionList} setQuestionList={setQuestionList} /> */}
      {(show === false) && currentQuestion.length > 0 &&

        currentQuestion.map((v, i) => (<div className={styles.mainBox}>

          <div style={{ display: 'flex', alignItem: 'center' }}>
            <p>Objective</p>
            <Switch
              checked={questionType}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <p>Subjective</p>
          </div>

          <div style={{ display: 'flex' }}>

            <div style={{ marginRight: '20px' }}><TextField label="Marks" name="marks" onChange={(e) => handleData(e, i)} /></div>
            <div><TextField label="Negative marks" name="negative_marks" onChange={(e) => handleData(e, i)} /></div>

            <div style={{ margin: '0 30px' }}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Difficulty Level</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="complexity"
                  onChange={(e) => handleData(e, i)}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Easy" />
                  <FormControlLabel value="2" control={<Radio />} label="Medium" />
                  <FormControlLabel value="3" control={<Radio />} label="Hard" />
                </RadioGroup>
              </FormControl>
            </div>


          </div>

          <div>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Taxonomy</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="tags_id"
                onChange={(e) => handleData(e, i)}
              >
                {tagList && tagList.map((v, i) => (<FormControlLabel value={v.id} control={<Radio />} label={v.title} />))}
              </RadioGroup>
            </FormControl>
          </div>

          <p>Question Title</p>
          <EditorCms
            height={350}
            onChange={(content) => handleDataChange(content, i, "title")}
          />


          {questionType ?
            <>
              <div>
                <p>Answer</p>
                <EditorCms
                  height={250}
                  onChange={(content) => handleDataChange(content, i, "subjectives")}
                // onChange={(content, editor) => {
                //   // handleDataChange(content, i, "value")dashboard_img;
                //   handleOptionChange(content, v, i, j)
                // }}
                />
              </div>
            </> : <>
              {v?.objective_choices?.map((content, j) => (
                <>
                  <p>Option {j + 1} <Checkbox checked={content.is_correct} onChange={(e) => handleCheckData(e, v, i, j)} /> </p>
                  <div>
                    <EditorCms
                      height={250}
                      onChange={(content) => handleOptionChange(content, v, i, j)}
                    // onChange={(content, editor) => {
                    //   // handleDataChange(content, i, "value");
                    //   handleOptionChange(content, v, i, j)
                    // }}
                    />
                  </div>

                  {content.is_correct && <div>
                    <p>Explaination</p>
                    <div>
                      <EditorCms
                        height={250}
                        onChange={(content) => handleOptionExplain(content, v, i, j)}
                      // onChange={(content, editor) => {
                      //   // handleDataChange(content, i, "value");
                      //   handleOptionChange(content, v, i, j)
                      // }}
                      />
                    </div>
                  </div>}
                </>
              ))}
            </>
          }


          <Button onClick={() => saveQuestion()} variant="contained" style={{margin: '20px'}} disabled={!access.updateAccess}>Save Question</Button>
        </div>))
      }

      {questionList.length <= 0 && <p>No Question</p>}

      <Button onClick={() => CreateQuestion()} variant="contained" style={{marginTop: '20px'}} disabled={!access.updateAccess}>Add Question</Button>


      <DialogBox open={openDialog} onClose={() => setOpenDialog(false)} dataSend={() => SubmitFile()}>
        <h1>Update Details</h1>
        <div className={styles.inputbox}>
          <InputField label="Title" name="title" width="100%" size="md" value={chapterObj.title} onChange={handleDatas} />
          {/* <TextField label="Title" name="title" width="100%" onChange={handleData} /> */}
        </div>
        <div className={styles.inputbox}>
          <InputField multiline={true} rows={5} label="Description" width="100%" name="description" value={chapterObj.description} onChange={handleDatas} />
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
          <div className={styles.inputbox} style={{ width: '50%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <TimePicker
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes', 'seconds']}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  label="Assignment seconds"
                  value={value}
                  onChange={(newValue) => {
                    console.log(newValue, "NNNNNNNN")
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div className={styles.inputbox} style={{ width: '50%' }}>
            <InputField label="Total Marks" size="md" name="total_marks" value={chapterObj.total_marks} width="100%" onChange={handleDatas} />
          </div>
        </div>

      </DialogBox>
    </div>
  )
}

export default ContentAddAssignQuestion
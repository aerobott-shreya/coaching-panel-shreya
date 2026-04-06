
import Checkbox from "@mui/material/Checkbox";
import { Button, Switch, TextField } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import EditorCms from "../../Components/EditorCms/EditorCms";
import MCQQuestionForm from "../../Components/MCQQuestionForm/MCQQuestionForm";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { api_token } from "../../Utils/Network";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styles from "./index.module.css";
import NewAccord from "./NewAccord";
import { checkEmptyObject } from "../../Utils/Utils";
import EditIcon from "@mui/icons-material/Edit";
import DialogBox from "../../Components/DialogBox/DialogBox";
import InputField from "../../Components/Input/InputField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Stack from "@mui/material/Stack";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import Skeleton from "@mui/material/Skeleton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function ContentAddAssignQuestion({ access }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { content_selection, tagList } = useContext(UserCredsContext);

  const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(new Date());
  const [questionType, setQuestionType] = useState(false);
  const [show, setShow] = useState(true);

  const [chapterObj, setChapterObj] = useState({
    title: "",
    description: "",
    total_marks: "",
    chapter_id: ""
  });

  const [showDetail, setShowDetail] = useState({
    title: location?.state?.title,
    description: location?.state?.description,
    total_marks: location?.state?.total_marks,
    duration: location?.state?.duration
  });

  useEffect(() => {
    getQuestion();

    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, []);

  const getQuestion = () => {
    api_token
      .get(`cms/v1/assignment/${id}/`)
      .then((res) => {
        if (res.data.data.question.length > 0) {
          setQuestionList(res.data.data.question);
        }
      })
      .catch(console.log);
  };

  const CreateQuestion = () => {
    const newQuestion = {
      tags_id: null,
      provider: 1,
      title: "",
      marks: "",
      complexity: null,
      question_type: "1",
      negative_marks: 0,
      is_active: true,
      subjectives: "",
      subjective_choices: [{ solution: "" }],
      objective_choices: [
        { title: "", is_correct: false },
        { title: "", is_correct: false },
        { title: "", is_correct: false },
        { title: "", is_correct: false }
      ]
    };

    setCurrentQuestion([newQuestion]);
  };

  const handleChange = (event) => {
    setQuestionType(event.target.checked);
  };

  const handleData = (e, index) => {
    const { name, value } = e.target;

    setCurrentQuestion((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [name]: value
      };
      return updated;
    });
  };

  const handleDataChange = (content, index, name) => {
    setCurrentQuestion((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [name]: content
      };
      return updated;
    });
  };

  const saveQuestion = () => {
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

    const hasCorrectAns = data[0].question_type === 1 
      ? data[0].objective_choices?.some(choice => choice.is_correct)
      : true;

    const checks = checkEmptyObject(data[0]);

    if (checks && hasCorrectAns) {
      api_token
        .patch(`cms/v1/assignment/${id}/`, { question: data })
        .then((res) => {
          if (res.data.data) {
            setQuestionList(res.data.data.question);
            setCurrentQuestion([]);
          }
        })
        .catch(console.log);
    } else if (!hasCorrectAns) {
        alert("Please mark at least one option as the correct answer.");
    } else {
      alert("Field should not be empty");
    }
  };

  const arrowBack = () => {
    navigate(`/dashboard/content/assignment/assignList`);
  };

  const hours = Math.floor(showDetail?.duration / 3600);
  const minutes = Math.floor((showDetail?.duration % 3600) / 60);
  const seconds = showDetail?.duration % 60;

  return (
    <div>

      <div onClick={arrowBack} className={styles.backContainer}>
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
            Duration: {`${hours}:${minutes}:${seconds}`}
          </div>
        </div>
      </div>

      <Stack spacing={1}>
        {show ? (
          <Skeleton variant="rounded" width={950} height={40} />
        ) : (
          questionList.map((v, i) => (
            <NewAccord
              key={i}
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



      <DialogBox
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <h1>Update Details</h1>

        <InputField
          label="Title"
          name="title"
          value={chapterObj.title}
        />
      </DialogBox>

    </div>
  );
}

export default ContentAddAssignQuestion;


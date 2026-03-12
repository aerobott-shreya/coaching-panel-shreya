
import React, { useContext, useState, useEffect } from "react";
import { Button, Checkbox, Switch, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import EditorCms from "../../Components/EditorCms/EditorCms";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styles from "./index.module.css";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";

function Accord({ data, setQuestion = () => {} }) {

  const [newbox, setNewbox] = useState([]);
  const { tagList } = useContext(UserCredsContext);

  useEffect(() => {
    setNewbox([...data]);
  }, [data]);

  // Select correct option
  const handleCheckData = (e, value, index) => {
    const updated = [...newbox];

    const correctIndex = updated[value].objective_choices.findIndex(
      (v) => v.is_correct === true
    );

    if (correctIndex !== -1) {
      updated[value].objective_choices[correctIndex].is_correct = false;
    }

    updated[value].objective_choices[index].is_correct = e.target.checked;

    setNewbox(updated);
  };

  // Question title change
  const handleDataChange = (content, index) => {
    const updated = [...newbox];
    updated[index].title = content;
    setNewbox(updated);
  };

  // Option change
  const handleOptionChange = (content, qIndex, optIndex) => {
    const updated = [...newbox];
    updated[qIndex].objective_choices[optIndex].title = content;
    setNewbox(updated);
  };

  const submitData = () => {
    setQuestion([...newbox]);
  };

  return (
    <div>
      {newbox.length > 0 &&
        [...newbox].reverse().map((v, i) => (
          <Accordion key={i} sx={{ marginBottom: "10px" }}>

            <AccordionSummary>
              <Typography sx={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div style={{ margin: "3px", fontWeight: "bold" }}>
                      {`Question ${i + 1} : `}
                    </div>

                    <div
                      dangerouslySetInnerHTML={{ __html: v?.title }}
                      className={styles.modules}
                    />
                  </div>

                  <div style={{ display: "flex", marginLeft: "30px" }}>

                    <div style={{ marginRight: "20px" }}>
                      Marks: {v.marks}
                    </div>

                    <div style={{ marginRight: "20px" }}>
                      Negative: {v.negative_marks}
                    </div>

                    <div style={{ marginRight: "20px" }}>
                      Taxonomy: {v?.tags?.title}
                    </div>

                    <div>
                      Difficulty:{" "}
                      {v.complexity == 1
                        ? "Easy"
                        : v.complexity == 2
                        ? "Medium"
                        : "Hard"}
                    </div>

                  </div>
                </div>
              </Typography>
            </AccordionSummary>

            <AccordionDetails>

              <Typography>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <p>Objective</p>
                  <Switch />
                  <p>Subjective</p>
                </div>

                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <TextField
                    label="Marks"
                    name="marks"
                    value={v?.marks}
                    sx={{ marginRight: "15px" }}
                  />

                  <TextField
                    label="Negative marks"
                    name="negative_marks"
                    value={v?.negative_marks}
                  />
                </div>

                <FormControl sx={{ marginBottom: "15px" }}>
                  <FormLabel>Difficulty Level</FormLabel>

                  <RadioGroup row value={v?.complexity} name="complexity">
                    <FormControlLabel value="1" control={<Radio />} label="Easy" />
                    <FormControlLabel value="2" control={<Radio />} label="Medium" />
                    <FormControlLabel value="3" control={<Radio />} label="Hard" />
                  </RadioGroup>
                </FormControl>

                <FormControl sx={{ marginBottom: "15px" }}>
                  <FormLabel>Taxonomy</FormLabel>

                  <RadioGroup row name="tags_id">
                    {tagList &&
                      tagList.map((tag, idx) => (
                        <FormControlLabel
                          key={idx}
                          value={tag.id}
                          control={<Radio />}
                          label={tag.title}
                        />
                      ))}
                  </RadioGroup>
                </FormControl>

                <p>Question Title</p>

                <EditorCms
                  height={400}
                  question={v.title}
                  onChange={(content) => handleDataChange(content, i)}
                />

                {v?.objective_choices?.map((option, j) => (
                  <div key={j}>

                    <p>
                      Option {j + 1}

                      <Checkbox
                        checked={option.is_correct}
                        onChange={(e) => handleCheckData(e, i, j)}
                      />
                    </p>

                    <EditorCms
                      height={250}
                      question={option.title}
                      onChange={(content) =>
                        handleOptionChange(content, i, j)
                      }
                    />

                  </div>
                ))}

                <Button
                  onClick={submitData}
                  variant="contained"
                  sx={{ marginTop: "20px" }}
                >
                  Save Question
                </Button>

              </Typography>

            </AccordionDetails>

          </Accordion>
        ))}
    </div>
  );
}

export default Accord;


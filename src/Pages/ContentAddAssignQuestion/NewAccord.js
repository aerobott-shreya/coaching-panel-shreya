
import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Checkbox, Switch, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import EditorCms from "../../Components/EditorCms/EditorCms";
import { api_token } from "../../Utils/Network";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styles from "./index.module.css";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import { stripHtml } from "../../Utils/Utils";

function NewAccord({ access, data, index, setQuestionList = () => {}, id }) {
  const [newbox, setNewBox] = useState({
    tags_id: data?.tags?.id || null,
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
  });

  const [questionType, setQuestionType] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const { tagList } = useContext(UserCredsContext);

  useEffect(() => {
    setNewBox((prev) => ({ ...prev, ...data }));

    if (data?.question_type === 2) {
      setQuestionType(true);
    }
  }, [data]);

  const handleChange = (event) => {
    if (!event.target.checked) {
      setNewBox((prev) => ({
        ...prev,
        objective_choices: [
          { title: "", is_correct: false },
          { title: "", is_correct: false },
          { title: "", is_correct: false },
          { title: "", is_correct: false }
        ]
      }));
    }
    setQuestionType(event.target.checked);
  };

  const handleData = (e) => {
    const { name, value } = e.target;

    setNewBox((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDataChange = (content, name) => {
    setNewBox((prev) => {
      const updated = { ...prev };

      if (name === "subjective_choices") {
        updated.subjective_choices[0].solution = content;
      } else {
        updated[name] = content;
      }

      return updated;
    });
  };

  const handleCheckData = (e, ds, index) => {
    setNewBox((prev) => {
      const updated = { ...prev };

      updated.objective_choices = updated.objective_choices.map((opt, i) => ({
        ...opt,
        is_correct: i === index ? e.target.checked : false
      }));

      return updated;
    });
  };

  const handleOptionChange = (content, index) => {
    setNewBox((prev) => {
      const updated = { ...prev };
      updated.objective_choices[index].title = content;
      return updated;
    });
  };

  const handleOptionExplain = (content, ds, index) => {
    setNewBox((prev) => {
      const updated = { ...prev };
      updated.objective_choices[index].solution = content;
      return updated;
    });
  };

  const submitData = () => {
    let payload = [{ ...newbox }];

    if (questionType) {
      payload[0].question_type = 2;
      delete payload[0].objective_choices;
    } else {
      payload[0].question_type = 1;
      delete payload[0].subjective_choices;
    }

    api_token
      .patch(`cms/v1/assignment/${id}/`, { question: payload })
      .then((res) => {
        if (res.data?.data) {
          setQuestionList(res.data.data.question);
          alert("Question Updated Successfully");
          setExpanded(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Accordion sx={{ marginBottom: "10px" }}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                className={styles.tableQuestion}
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <div style={{ margin: "3px", fontWeight: "bold" }}>
                  {`Question ${index + 1} : `}
                </div>

                <div
                  dangerouslySetInnerHTML={{ __html: data?.title }}
                  className={styles.modules}
                />
              </div>

              <div style={{ display: "flex", marginLeft: "30px" }}>
                <div style={{ marginRight: "30px", whiteSpace: "nowrap" }}>
                  Marks: {data?.marks}
                </div>

                <div style={{ marginRight: "30px", whiteSpace: "nowrap" }}>
                  Negative Marks: {data?.negative_marks}
                </div>

                <div style={{ marginRight: "30px", whiteSpace: "nowrap" }}>
                  Taxonomy: {data?.tags?.title}
                </div>

                <div style={{ marginRight: "30px", whiteSpace: "nowrap" }}>
                  Difficulty Level:{" "}
                  {data?.complexity === 1
                    ? "easy"
                    : data?.complexity === 2
                    ? "medium"
                    : "hard"}
                </div>
              </div>
            </div>
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            <div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <p>Objective</p>

                <Switch checked={questionType} onChange={handleChange} />

                <p>Subjective</p>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "20px" }}>
                  <TextField
                    label="Marks"
                    name="marks"
                    value={newbox?.marks}
                    onChange={handleData}
                  />
                </div>

                <div>
                  <TextField
                    label="Negative marks"
                    name="negative_marks"
                    value={newbox?.negative_marks}
                    onChange={handleData}
                  />
                </div>

                <div style={{ margin: "0 30px" }}>
                  <FormControl>
                    <FormLabel>Difficulty Level</FormLabel>

                    <RadioGroup
                      row
                      name="complexity"
                      value={newbox?.complexity}
                      onChange={handleData}
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
                  <FormLabel>Taxonomy</FormLabel>

                  <RadioGroup
                    row
                    name="tags_id"
                    value={`${newbox?.tags_id}`}
                    onChange={handleData}
                  >
                    {tagList &&
                      tagList.map((v) => (
                        <FormControlLabel
                          key={v.id}
                          value={`${v.id}`}
                          control={<Radio />}
                          label={v.title}
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              </div>

              <p>Question Title</p>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={stripHtml(newbox?.title)}
                onChange={(e) => handleDataChange(e.target.value, "title")}
              />

              {questionType ? (
                <>
                  <p>Answer</p>

                  <EditorCms
                    height={250}
                    question={newbox.subjective_choices[0]?.solution}
                    onChange={(content) =>
                      handleDataChange(content, "subjective_choices")
                    }
                  />
                </>
              ) : (
                <>
                  {newbox?.objective_choices?.map((content, j) => (
                    <Box 
                      key={j} 
                      sx={{ 
                        display: "flex", 
                        alignItems: "flex-start", 
                        mb: 2, 
                        p: 2, 
                        border: "1px solid #e0e0e0", 
                        borderRadius: 2,
                        backgroundColor: content.is_correct ? "#f0f7ff" : "transparent",
                        borderColor: content.is_correct ? "#1976d2" : "#e0e0e0",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          borderColor: "#1976d2",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 1 }}>
                        <Radio
                          checked={content.is_correct}
                          onChange={(e) => handleCheckData(e, newbox, j)}
                          value={j}
                          name={`correct-answer-assign-${index}`}
                          sx={{ p: 0.5 }}
                        />
                        <Typography variant="caption" sx={{ fontWeight: "bold", color: "#666" }}>
                          {String.fromCharCode(65 + j)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ flexGrow: 1, ml: 2 }}>
                        <TextField
                          fullWidth
                          label={`Option ${String.fromCharCode(65 + j)}`}
                          variant="outlined"
                          value={stripHtml(content.title)}
                          onChange={(e) => handleOptionChange(e.target.value, j)}
                          size="small"
                        />

                        {content.is_correct && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "600", color: "#1976d2" }}>
                              Explanation
                            </Typography>
                            <EditorCms
                              height={200}
                              question={content.solution}
                              onChange={(content) => handleOptionExplain(content, newbox, j)}
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))}
                </>
              )}

              <Button
                onClick={submitData}
                variant="contained"
                style={{ margin: "20px" }}
                disabled={!access.updateAccess}
              >
                Save Question
              </Button>

            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default NewAccord;
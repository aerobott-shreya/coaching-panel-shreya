import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Paper,
} from "@mui/material";
import EditorCms from "../EditorCms/EditorCms";

const MCQQuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });
  const [correctAnswer, setCorrectAnswer] = useState("A");
  const [explanation, setExplanation] = useState("");

  const handleOptionChange = (optionKey, value) => {
    setOptions((prev) => ({
      ...prev,
      [optionKey]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      question,
      options,
      correctAnswer,
      explanation,
    };
    console.log("MCQ Submission Data:", submissionData);
    alert("Question saved! Check console for data.");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, my: 4, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: "bold", color: "#1976d2" }}>
        MCQ Question Builder
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Question Section */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Question"
              variant="outlined"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here..."
              required
            />
          </Grid>

          {/* Options Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "600", color: "#1976d2" }}>
              Options (Select correct one)
            </Typography>
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 2 
              }}
            >
              {["A", "B", "C", "D"].map((opt) => (
                <Box 
                  key={opt} 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    p: 2, 
                    border: "1px solid #e0e0e0", 
                    borderRadius: 2,
                    backgroundColor: correctAnswer === opt ? "#f0f7ff" : "transparent",
                    borderColor: correctAnswer === opt ? "#1976d2" : "#e0e0e0",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "#1976d2",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mr: 2 }}>
                    <Radio
                      checked={correctAnswer === opt}
                      onChange={(e) => setCorrectAnswer(opt)}
                      value={opt}
                      name="correct-answer"
                      sx={{ p: 0.5 }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: "bold", color: "#666" }}>
                      {opt}
                    </Typography>
                  </Box>
                  
                  <TextField
                    fullWidth
                    label={`Option ${opt}`}
                    variant="outlined"
                    value={options[opt]}
                    onChange={(e) => handleOptionChange(opt, e.target.value)}
                    required
                    size="small"
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Explanation Section (Rich Text Editor) */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "600" }}>
              Explanation (Optional)
            </Typography>
            <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 1 }}>
              <EditorCms
                height={250}
                onChange={(content) => setExplanation(content)}
              />
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              Save Question
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default MCQQuestionForm;

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Radio,
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
  const [isPreview, setIsPreview] = useState(false);


  const handleOptionChange = (optionKey, value) => {
    setOptions((prev) => ({
      ...prev,
      [optionKey]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Ensure at least one option is marked as correct
    if (!correctAnswer) {
      alert("Please select a correct answer before saving.");
      return;
    }

    const submissionData = {
      question,
      options: Object.keys(options).map(key => ({
        title: options[key],
        is_correct: key === correctAnswer,
        is_correct_answer: key === correctAnswer
      })),
      explanation,
    };
    console.log("MCQ Submission Data:", submissionData);
    alert("Question saved! Check console for data.");
  };

  return (
    <Paper elevation={0} sx={{ p: 4, my: 4, borderRadius: "16px", border: "1px solid #f1f5f9", backgroundColor: "#fff" }}>
      {/* Header with Toggle */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, pb: 2, borderBottom: "1px solid #f1f5f9" }}>
        <Typography variant="h5" sx={{ fontWeight: "700", color: "#1e293b" }}>
            MCQ Builder
        </Typography>
        <Box 
          onClick={() => setIsPreview(!isPreview)}
          sx={{ 
            px: 2, 
            py: 0.5, 
            borderRadius: 5, 
            fontSize: "11px", 
            fontWeight: "700", 
            backgroundColor: isPreview ? "#3b82f6" : "#f1f5f9", 
            color: isPreview ? "#fff" : "#475569",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: isPreview ? "#2563eb" : "#e2e8f0"
            }
          }}
        >
            {isPreview ? "PREVIEW MODE" : "EDIT MODE"}
        </Box>
      </Box>

      <form onSubmit={handleSubmit}>
        {/* Question Section */}
        <Box sx={{ mb: 4 }}>
            <Typography variant="caption" sx={{ mb: 1, fontWeight: "600", color: "#64748b", display: "block" }}>Question Text</Typography>
            <TextField
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question content here..."
              required
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "16px", fontWeight: "400", backgroundColor: "#fff", border: "1px solid #e2e8f0", "&:hover": { borderColor: "#cbd5e1" }, minHeight: "120px" } }}
            />
        </Box>

        {/* Options Section */}
        <Box sx={{ mb: 4 }}>
            <Typography variant="caption" sx={{ mb: 1.5, fontWeight: "600", color: "#64748b", display: "block" }}>Choice Options</Typography>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", backgroundColor: "#fff" }}>
              {["A", "B", "C", "D"].map((opt, idx) => {
                const isSelected = correctAnswer === opt;
                const isLast = idx === 3;
                
                if (isPreview) {
                    return (
                        <Box 
                            key={opt} 
                            sx={{
                                display: "flex", 
                                flexDirection: "column", 
                                borderLeft: isSelected ? "4px solid #3b82f6" : "4px solid transparent",
                                borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                                backgroundColor: isSelected ? "#eff6ff" : "#fff",
                                p: 1.5, px: 2, minHeight: 48
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mr: 2.5, minWidth: 30 }}>
                                    <Radio checked={isSelected} size="small" sx={{ p: 0, color: isSelected ? "#3b82f6" : "#cbd5e1" }} disabled />
                                    <Typography sx={{ fontWeight: "700", color: isSelected ? "#1e40af" : "#94a3b8", fontSize: "0.95rem", ml: 1.2 }}>{opt}</Typography>
                                </Box>
                                <Typography sx={{ fontSize: "1rem", fontWeight: isSelected ? "600" : "400", color: isSelected ? "#1e3a8a" : "#475569" }}>
                                    {options[opt] || `Empty Option ${opt}`}
                                </Typography>
                            </Box>
                            {isSelected && explanation && (
                                <Box sx={{ ml: 6, mt: 1.5, pt: 1.5, borderTop: "1px dashed #bfdbfe" }}>
                                    <Typography variant="caption" sx={{ fontWeight: "700", color: "#2563eb", display: "block", mb: 0.8, textTransform: "uppercase", fontSize: "0.7rem" }}>Correct Answer Explanation</Typography>
                                    <Box dangerouslySetInnerHTML={{ __html: explanation }} sx={{ fontSize: "0.9rem", color: "#1e40af", lineHeight: 1.6 }} />
                                </Box>
                            )}
                        </Box>
                    );
                }

                return (
                  <Box 
                    key={opt} 
                    sx={{ 
                      display: "flex", 
                      flexDirection: "column",
                      borderLeft: isSelected ? "4px solid #3b82f6" : "4px solid transparent",
                      borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                      backgroundColor: isSelected ? "#eff6ff" : "#fff",
                      p: 1, px: 2,
                      "&:hover": { backgroundColor: isSelected ? "#eff6ff" : "#f8fafc" }
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Radio
                        checked={isSelected}
                        onChange={() => setCorrectAnswer(opt)}
                        size="small"
                        sx={{ color: "#cbd5e1", "&.Mui-checked": { color: "#3b82f6" }, p: 0.5 }}
                      />
                      <Typography sx={{ fontWeight: "700", color: isSelected ? "#1e40af" : "#94a3b8", fontSize: "0.9rem", mr: 2, ml: 1 }}>
                        {opt}
                      </Typography>
                      <TextField
                        fullWidth
                        variant="standard"
                        size="small"
                        value={options[opt]}
                        onChange={(e) => handleOptionChange(opt, e.target.value)}
                        required
                        InputProps={{
                          disableUnderline: true,
                          style: { fontSize: "1rem", color: isSelected ? "#1e3a8a" : "#333", fontWeight: isSelected ? "600" : "400" }
                        }}
                        placeholder={`Enter choice content for option ${opt}...`}
                      />
                    </Box>
                    {isSelected && (
                        <Box sx={{ ml: 6, mt: 1, pt: 1, borderTop: (explanation && explanation !== "<p><br></p>") ? "1px dashed #bfdbfe" : "none", pr: 2, pb: 1 }}>
                            {(explanation && explanation !== "<p><br></p>") ? (
                                <>
                                    <Typography variant="caption" sx={{ mb: 0.5, fontWeight: "500", color: "#666", display: "block", fontSize: "11px" }}>EXPLANATION</Typography>
                                    <Box sx={{ mt: 0.5, p: 0.5, border: "0px solid #e2e8f0", borderRadius: "8px", backgroundColor: "#fff" }}>
                                        <EditorCms height={100} question={explanation} onChange={(val) => setExplanation(val)} />
                                    </Box>
                                </>
                            ) : (
                                <Button 
                                    size="small" 
                                    onClick={() => setExplanation("<p> </p>")}
                                    sx={{ textTransform: "none", fontSize: "11px", color: "#3b82f6", p: 0, minWidth: 0, "&:hover": { background: "none", textDecoration: "underline" } }}
                                >
                                    + Add Explanation
                                </Button>
                            )}
                        </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
        </Box>


        {/* Actions Footer */}
        <Box sx={{ mt: 6, pt: 3, borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" sx={{ borderRadius: "10px", textTransform: "none", px: 4, fontWeight: "600", color: "#64748b", borderColor: "#e2e8f0" }}>Discard Changes</Button>
            <Button type="submit" variant="contained" sx={{ borderRadius: "10px", textTransform: "none", px: 6, fontWeight: "600", backgroundColor: "#334155", boxShadow: "none" }}>Save Question</Button>
        </Box>
      </form>
    </Paper>
  );
};

export default MCQQuestionForm;

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { api_token } from '../../Utils/Network';

function NewAccord({ data, index, setQuestionList, id, access, getQuestion }) {
    const isSubjective = data?.question_type === 2;
    const optionsList = data?.objective_choices || data?.choices || [];
    const hasCorrectAnswer = optionsList.some(content => 
        Boolean(content?.is_correct_answer || content?.is_correct)
    );

    const handleSetAsCorrect = (j) => {
        if (!access?.updateAccess) return;
        
        // Prepare the payload for patching
        const updatedQuestion = { ...data };
        const isLegacyArray = !!data?.choices;
        const choicesKey = isLegacyArray ? 'choices' : 'objective_choices';
        const correctKey = isLegacyArray ? 'is_correct_answer' : 'is_correct';

        updatedQuestion[choicesKey] = updatedQuestion[choicesKey].map((opt, idx) => ({
            ...opt,
            [correctKey]: idx === j
        }));

        // Handle path dynamically for different modules
        const endpoint = id.includes('assign') ? `cms/v1/assignment/${id.replace('assign','')}/` : `cms/v1/test/${id}/`;
        
        // This is a placeholder for the actual API call logic based on existing project patterns
        api_token.patch(endpoint, { question: [updatedQuestion] })
            .then(res => {
                alert(`Option ${String.fromCharCode(65 + j)} has been set as correct for this question.`);
                if (getQuestion) getQuestion();
            })
            .catch(err => {
                console.error("Data patch failed:", err);
                alert("Failed to update correct answer. This feature requires accurate API routing.");
            });
    };

    return (
        <Box 
            sx={{ 
                marginBottom: '32px',
                borderRadius: '16px',
                boxShadow: '0 4px 25px rgba(0,0,0,0.03)',
                backgroundColor: '#fff',
                border: '1px solid #f1f5f9',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: '0 10px 35px rgba(0,0,0,0.05)',
                }
            }}
        >
            {/* Header Section */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '20px 24px 12px 24px'
            }}>
                <Typography sx={{ fontWeight: '700', color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Question {(index + 1).toString().padStart(2, '0')}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Box 
                        sx={{ 
                            px: 1.5, py: 0.5, borderRadius: '50px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase',
                            backgroundColor: data?.complexity == 1 ? '#f0fdf4' : data?.complexity == 2 ? '#fff7ed' : '#fef2f2',
                            color: data?.complexity == 1 ? '#15803d' : data?.complexity == 2 ? '#ea580c' : '#dc2626',
                            border: '1px solid',
                            borderColor: data?.complexity == 1 ? '#dcfce7' : data?.complexity == 2 ? '#ffedd5' : '#fee2e2',
                        }}
                    >
                        {data?.complexity == 1 ? 'Easy' : data?.complexity == 2 ? 'Medium' : 'Hard'}
                    </Box>
                    <Box 
                        sx={{ 
                            px: 1.5, py: 0.5, borderRadius: '50px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase',
                            backgroundColor: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0'
                        }}
                    >
                        {data?.positive_marks || 0} Marks
                    </Box>
                </Box>
            </Box>

            {/* Question Content */}
            <Box sx={{ p: '12px 24px 24px 24px' }}>
                <Box sx={{ mb: 3.5 }}>
                    <Typography 
                        component="div"
                        dangerouslySetInnerHTML={{ __html: data?.title }}
                        sx={{ 
                            fontSize: "1.15rem", 
                            fontWeight: "500", 
                            color: "#1e293b", 
                            lineHeight: 1.6,
                            '& p': { margin: 0, padding: 0 }
                        }}
                    />
                </Box>

                {/* Options Section */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {isSubjective ? (
                        <Box sx={{ p: 2, border: "1px solid #e2e8f0", borderRadius: "8px", backgroundColor: "#f8fafc" }}>
                            <Typography variant="caption" sx={{ fontWeight: "700", color: "#64748b", display: "block", mb: 1, textTransform: "uppercase" }}>Required Solution</Typography>
                            <Typography component="div" dangerouslySetInnerHTML={{ __html: data?.subjective_choices?.[0]?.solution || "No solution provided." }} sx={{ color: "#334155" }} />
                        </Box>
                    ) : (
                        optionsList?.map((content, j) => {
                            const isSelected = Boolean(content?.is_correct_answer || content?.is_correct);
                            return (
                                <Box 
                                    key={j} 
                                    sx={{
                                        display: "flex", 
                                        flexDirection: "column",
                                        border: "1px solid",
                                        borderColor: isSelected ? "#4ade80" : "#f1f5f9",
                                        borderRadius: "8px",
                                        mb: 1.5,
                                        backgroundColor: isSelected ? "#f0fdf4" : "#fff",
                                        p: '14px 20px',
                                        transition: "all 0.2s ease-in-out",
                                        "&:hover": { 
                                            backgroundColor: isSelected ? "#f0fdf4" : "#f8fafc", 
                                            borderColor: isSelected ? "#4ade80" : "#e2e8f0"
                                        }
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                                            <Box sx={{ width: '30px', display: 'flex', alignItems: 'center' }}>
                                                <Typography sx={{ fontWeight: "700", color: isSelected ? "#16a34a" : "#94a3b8", fontSize: "0.95rem" }}>
                                                    {String.fromCharCode(65 + j)}.
                                                </Typography>
                                            </Box>
                                            <Typography 
                                                component="div"
                                                dangerouslySetInnerHTML={{ __html: content.title }}
                                                sx={{ fontSize: "1rem", color: isSelected ? "#15803d" : "#475569", fontWeight: isSelected ? "600" : "400", lineHeight: 1.5, '& p': { margin: 0 } }}
                                            />
                                        </Box>
                                        {isSelected ? (
                                            <Box sx={{ 
                                                display: 'flex', alignItems: 'center', gap: 0.5,
                                                fontSize: '10px', fontWeight: '800', color: '#15803d', backgroundColor: '#dcfce7', 
                                                px: 1, py: 0.3, borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' 
                                            }}>
                                                ✔ Correct
                                            </Box>
                                        ) : (
                                            !hasCorrectAnswer && access?.updateAccess && (
                                                <Button 
                                                    size="small" 
                                                    onClick={() => handleSetAsCorrect(j)}
                                                    sx={{ 
                                                        textTransform: 'none', fontSize: '9px', color: '#94a3b8', 
                                                        px: 1, py: 0, minWidth: 0, '&:hover': { color: '#dc2626', background: 'none' } 
                                                    }}
                                                >
                                                    Set as Correct
                                                </Button>
                                            )
                                        )}
                                    </Box>
                                    {isSelected && content.explanation && (
                                        <Box sx={{ mt: 2, pt: 2, borderTop: "1px dashed #bbf7d0", width: "100%", ml: '38px' }}>
                                            <Typography sx={{ fontWeight: "700", color: "#16a34a", fontSize: "0.7rem", mb: 0.5, textTransform: "uppercase", letterSpacing: '0.5px' }}>Solution & Explanation</Typography>
                                            <Typography component="div" dangerouslySetInnerHTML={{ __html: content.explanation }} sx={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.6 }} />
                                        </Box>
                                    )}
                                </Box>
                            );
                        })
                    )}

                </Box>
            </Box>
        </Box>
    );
}

export default NewAccord;
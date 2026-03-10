import React, { useState, useEffect, useContext } from 'react'
import { Button, Checkbox, Switch, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EditorCms from '../../Components/EditorCms/EditorCms'
import { api_token } from '../../Utils/Network';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from './index.module.css';
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function NewAccord({ access, data, index, setQuestionList = () => { }, id }) {
    const [newbox, setNkewData] = useState({
        tags_id: data?.tags?.id || null,
        provider: 1,
        title: "",
        marks: "",
        complexity: null,
        question_type: "1",
        negative_marks: 0,
        is_active: true,
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
    });
    const [taxonomy, setTaxonomy] = useState([]);
    const [questionType, setQuestionType] = useState(false);
    const [expanded, setExpanded] = useState(true); // state to control the expanded state of the accordion items
    const { sectionList, content_selection, tagList } = useContext(UserCredsContext);


    useEffect(() => {
        // getTaxonomy();
        setNkewData({ ...newbox, ...data })
        if (data.question_type === 2) {
            setQuestionType(true);
        }
    }, []);


    const handleChange = (event) => {
        if (event.target.checked === false) {
            setNkewData({
                ...newbox,
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
            })
        }
        setQuestionType(event.target.checked);
    };

    const getTaxonomy = () => {
        api_token
            .get(`base/v1/tags`)
            .then((res) => {
                setTaxonomy(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleData = (e) => {

        const { name, value } = e.target;
        let data = {
            ...newbox,
            [name]: value
        }
        setNkewData(data);
    }

    const handleDataChange = (content, name) => {
        if(name == "subjective_choices"){
            newbox.subjective_choices[0].solution = content;
        }else{
            newbox[name] = content;
        }
        setNkewData(newbox)
    }

    const handleCheckData = (e, ds, j) => {
        // debugger;
        let data = ds.objective_choices.findIndex((v) => {
            return v.is_correct === true;
        })
        if (data !== -1) {
            newbox.objective_choices[data].is_correct = !e.target.checked;
            setNkewData({ ...newbox })
        }
        ds.objective_choices.map((v, i) => {
            const haskey = "solution" in newbox.objective_choices[i];
            if (haskey) {
                delete newbox.objective_choices[i].solution;
                delete newbox.objective_choices[i].solution_latex;
            }
        })
        newbox.objective_choices[j].is_correct = e.target.checked;
        setNkewData({ ...newbox })
    }

    const handleOptionChange = (content, index) => {
        newbox.objective_choices[index].title = content;
        setNkewData(newbox)
    }


    const handleOptionExplain = (content, ds, index) => {
        newbox.objective_choices[index].solution = content;
        setNkewData(newbox)
    }

    const submitData = () => {
        let data = [{ ...newbox }];
        if (questionType) {
            data[0].question_type = 2;
            delete data[0].objective_choices;
        } else {
            data[0].question_type = 1;
            delete data[0].subjective_choices;
        }

        // console.log(data, "NNNNNN")
        api_token
            .patch(`cms/v1/assignment/${id}/`, { question: data })
            .then((res) => {
                // console.log(res.data.data);
                if (res.data.data) {
                    setQuestionList(res.data.data.question)
                    alert("Question Updated Successfully")
                    setExpanded(false);
                }
            })
            .catch(err => console.log(err));
    }

    console.log("" + newbox?.tags?.id, "dddddddddsss")
    return (
        <div>
            <Accordion sx={{ marginBottom: '10px' }} 
            // expanded={expanded}
            >
                <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className={styles.tableQuestion} style={{ display: 'flex', alignItem: 'flex-start' }}>
                                <div style={{ margin: '3px', fontWeight: 'bold' }}>{`Question ${index + 1} : `}</div>
                                <div dangerouslySetInnerHTML={{ __html: data?.title }} className={styles.modules}></div>
                                {/* <div    className={styles.modules}>{ data?.title }</div> */}
                            </div>
                         
                            <div style={{ display: 'flex', alignItem: 'flex-start', marginLeft: '30px' }}>
                                <div style={{ marginRight: '30px', whiteSpace: 'nowrap' }}>Marks: {data?.marks}</div>
                                <div style={{ marginRight: '30px', whiteSpace: 'nowrap' }}>Negative Marks: {data?.negative_marks}</div>
                                <div style={{ marginRight: '30px', whiteSpace: 'nowrap' }}>Taxonomy: {data?.tags?.title}</div>
                                <div style={{ marginRight: '30px', whiteSpace: 'nowrap' }}>Difficulty Level: {(data.complexity == 1) ? `easy` : (data.complexity == 2) ? "medium" : `hard`}</div>
                            </div>
                        </div>

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>
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

                                <div style={{ marginRight: '20px' }}>
                                    <TextField label="Marks" name="marks"
                                        value={newbox?.marks}
                                        onChange={(e) => handleData(e)}
                                    /></div>
                                <div>
                                    <TextField label="Negative marks"
                                        name="negative_marks"
                                        value={newbox?.negative_marks}
                                        onChange={(e) => handleData(e)}
                                    /></div>

                                <div style={{ margin: '0 30px' }}>

                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Difficulty Level</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="complexity"
                                            value={newbox?.complexity}
                                        onChange={(e) => handleData(e)}
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
                                        value={`${newbox?.tags_id}`}
                                        onChange={(e) => handleData(e)}
                                    >
                                        {tagList && tagList.map((v, i) => (<FormControlLabel value={`${v.id}`} control={<Radio />} label={v.title} key={i}/>))}
                                    </RadioGroup>
                                </FormControl>
                            </div>

                            <p>Question Title</p>
                            <EditorCms
                                height={500}
                                question={newbox?.title}
                                onChange={(content) => handleDataChange(content, "title")}
                            />

                            {questionType ? <>
                                <div>
                                    <p>Answer</p>
                                    <EditorCms
                                        height={250}
                                        question={newbox.subjective_choices[0]?.solution}
                                        onChange={(content) => handleDataChange(content, "subjective_choices")}
                                    // onChange={(content, editor) => {
                                    //   // handleDataChange(content, i, "value")dashboard_img;
                                    //   handleOptionChange(content, v, i, j)
                                    // }}
                                    />
                                </div>
                            </>
                                :
                                <>

                                    {newbox?.objective_choices?.map((content, j) => (
                                        <>
                                            <p>Option {j + 1} <Checkbox checked={content.is_correct}
                                                onChange={(e) => handleCheckData(e, newbox, j)}
                                            /> </p>
                                            <div>
                                                <EditorCms
                                                    height={300}
                                                    question={content.title}
                                                    onChange={(content) => handleOptionChange(content, j)}
                                                />
                                            </div>


                                            {content.is_correct && <div>
                                                <p>Explaination</p>
                                                <div>
                                                    <EditorCms
                                                        height={250}
                                                        question={content.solution}
                                                        onChange={(content) => handleOptionExplain(content, newbox, j)}
                                                    // onChange={(content) => handleOptionExplain(content, v, i, j)}
                                                    // onChange={(content, editor) => {
                                                    //   // handleDataChange(content, i, "value");
                                                    //   handleOptionChange(content, v, i, j)
                                                    // }}
                                                    />
                                                </div>
                                            </div>}
                                        </>

                                    ))}
                                </>}

                            <Button onClick={() => submitData()} variant="contained" style={{margin: '20px'}} disabled={!access.updateAccess}>Save Question</Button>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default NewAccord
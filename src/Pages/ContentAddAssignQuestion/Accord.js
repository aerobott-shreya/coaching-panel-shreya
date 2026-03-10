import React, { useContext, useState, useEffect } from 'react'
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

function Accord({ data, setQuestion = () => { } }) {

    // let newbox = [...data];
    const [newbox, setNkewData] = useState([]);
    const [taxonomy, setTaxonomy] = useState([]);
    const { sectionList, content_selection, tagList } = useContext(UserCredsContext);


    // useEffect(() => {
    //   getTaxonomy();
    // }, []);

    useEffect(() => {
        setNkewData([...data])
    }, [data]);

  
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


    const handleCheckData = (e, ds, value, index) => {

        console.log(e.target, ds, value, index)

        let data = ds.objective_choice.findIndex((v) => {
            return v.is_correct === true;
        })

        console.log(data);
        if (data !== -1) {
            newbox[value].objective_choice[data].is_correct = !e.target.checked;
        }
        newbox[value].objective_choice[index].is_correct = e.target.checked;
        setNkewData([...newbox])
    }

    const handleDataChange = (e, index) => {
        const { name, value } = e.target;
        console.log(name, value, "ddd")
        newbox[index][name] = value;
        setNkewData([...newbox])
    }

    const handleOptionChange = (e, v, idx, indx) => {
        newbox[idx].objective_choice[indx].title = e.target.value;
        setNkewData([...newbox])
    }

    const submitData = () => {
        setQuestion([...newbox]);
    }
    console.log(newbox, "dddddddddsss")
    return (
        <div>
            {newbox.length && [...newbox].reverse().map((v, i) =>
                <Accordion sx={{ marginBottom: '10px' }}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItem: 'flex-start' }}>
                                    <div style={{ margin: '3px', fontWeight: 'bold' }}>{`Question ${i + 1} : `}</div>
                                    <div dangerouslySetInnerHTML={{ __html: v?.title }} className={styles.modules}></div>
                                </div>
                                <div style={{ display: 'flex', alignItem: 'flex-start', marginLeft: '30px' }}>
                                    <div style={{ marginRight: '30px' }}>Marks: {v.marks}</div>
                                    <div style={{ marginRight: '30px' }}>Negative Marks: {v.negative_marks}</div>
                                    <div style={{ marginRight: '30px' }}>Taxonomy: {v?.tags?.title}</div>
                                    <div style={{ marginRight: '30px' }}>Difficulty Level: {(v.complexity == 1) ? `easy` : (v.complexity == 2) ? "medium" : `hard`}</div>

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
                                        // checked={questionType}
                                        // onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <p>Subjective</p>
                                </div>

                                <div style={{ display: 'flex' }}>

                                    <div style={{ marginRight: '20px' }}>
                                        <TextField label="Marks" name="marks" 
                                        value={v?.marks}
                                    // onChange={(e) => handleData(e, i)} 
                                    /></div>
                                    <div>
                                        <TextField label="Negative marks"
                                         name="negative_marks" 
                                         value={v?.negative_marks}
                                        //  onChange={(e) => handleData(e, i)} 
                                         /></div>

                                    <div style={{ margin: '0 30px' }}>
                                    
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Difficulty Level</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="complexity"
                                                value={v?.complexity}
                                                // onChange={(e) => handleData(e, i)}
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
                                            // onChange={(e) => handleData(e, i)}
                                        >
                                            {tagList && tagList.map((v, i) => (<FormControlLabel value={v.id} control={<Radio />} label={v.title} />))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <p>Question Title</p>
                                <EditorCms
                                    height={500}
                                    question={v.title}
                                // onChange={(content) => handleDataChange(content, i, "Question")}
                                />

                                {v?.objective_choices?.map((content, j) => (
                                    <>
                                        <p>Option {j + 1} <Checkbox checked={content.is_correct}
                                        // onChange={(e) => handleCheckData(e, v, i, j)} 
                                        /> </p>
                                        <div>
                                            <EditorCms
                                                height={300}
                                                question={content.title}
                                            // onChange={(content) => handleOptionChange(content, v, i, j)}
                                            // onChange={(content, editor) => {
                                            //   // handleDataChange(content, i, "value");
                                            //   handleOptionChange(content, v, i, j)
                                            // }}
                                            />
                                        </div>
                                    </>

                                ))}

                                <Button onClick={() => submitData()} variant="contained" style={{margin: '20px'}}>Save Question</Button>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>)}
        </div>
    )
}

export default Accord
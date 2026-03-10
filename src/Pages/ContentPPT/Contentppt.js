import React, { useEffect, useState, useContext } from 'react'
import styles from "./index.module.css";
import videoImg from "../../Assets/ContentMangement/mindmap/number.png";
import videoDecimal from "../../Assets/ContentMangement/mindmap/Decimal.png";
import matrics from "../../Assets/ContentMangement/mindmap/matrix.png";
import edfive from "../../Assets/ContentMangement/mindmap/Ed5.png";
import cnm from "../../Assets/ContentMangement/mindmap/cnm.png";
import Carousel from "react-multi-carousel";
import Tens from "../../Assets/ContentMangement/mindmap/Ten.png";
import "react-multi-carousel/lib/styles.css";
import CustomProgress from "../../Components/CustomProgress/CustomProgress";
import Pdf from "../../pdf/Management Process & Organizational Behavior.pdf";
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import { api_token, base_url, formDataApi, _access_token } from '../../Utils/Network';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DrawerComp from '../../Components/DrawerComp/DrawerComp';
import InputField from '../../Components/Input/InputField';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import DialogBox from '../../Components/DialogBox/DialogBox';
import { SUBMIT_FILTER_STROKE_TIME } from '@mui/x-data-grid';
import { Snackbar } from '@material-ui/core';
import { FileUploader } from "react-drag-drop-files";
import Files from "../../File/ppt.xlsx";
import { useNavigate } from 'react-router-dom';

const fileTypes = ["xlsx"];

function Contentppt(props) {
    const { content_selection } = useContext(UserCredsContext);
    const [getEbook, setEbook] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    // const [file, setFile] = useState([]);
    const [chapterFilter, setChpFilter] = useState(null);
    const [chapterList, setChapterList] = useState([]);
    const [submitValue, setSubmitValue] = useState({
        id: "",
        subject_id: content_selection.subject,
        board_id: content_selection.board,
        grade_id: content_selection.grade,
        language_id: 1,
        chapter_id: null,
        topic: "",
        provider: 1,
    })
    const [alertDetails, setAlertDetails] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        message: '',
        errorType: '',
    });
    const { vertical, horizontal } = alertDetails;


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    useEffect(() => {
        getEbookData();
    }, []);


    const getEbookData = () => {
        api_token
        // .get(`content/v1/chapter_wise_ppt/?board=${content_selection.board}&grade=${content_selection.grade}&subject=${content_selection.subject}`)

            .get(`content/v1/chapter_wise_ppt/?grade=${content_selection.grade}&course=${content_selection.course}`)
            .then((res) => {
                setEbook(res.data.data);
            })
            .catch((err) => console.log(err))
    }


    const openPpt = () => {
        setSubmitValue({
            id: "",
            // subject_id: content_selection.subject,
            // board_id: content_selection.board,
            course: content_selection.course,
            grade_id: content_selection.grade,
            language_id: 1,
            chapter_id: null,
            topic: "",
            provider: 1,
        })
        setFile(null);
        setChpFilter(null);
        setOpen(true);
    }

    const openBulk = () => {
        setOpenDialog(true);
    }

    const newDataOpen = (id) => {
        // window.open(file, "_blank")
        console.log(id, "newDataOpen");
        navigate(`/dashboard/content/ppt/view/${id}`)
    }

    const handleChange = e => {
        debugger;
        console.log(e, "DDDDDDDDDd")
        // setFile(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const handleData = (e) => {
        const { name, value } = e.target;
        console.log(name, value, "EEEEEEEEEEEe")
        setSubmitValue({ ...submitValue, [name]: value });
        if (name == "chapter_id") {
            let chp = getEbook.findIndex((x) => { return x.id == value })
            setChpFilter(chp)
        }
    }

    const newData = (data) => {
        console.log(data, "Datassssssss")
        const { id, language: language_id, provider, subject: subject_id, chapter: chapter_id, topic, board: board_id } = data;
        setSubmitValue({ id, language_id, provider, subject_id, chapter_id, topic, board_id });
        let chp = getEbook.findIndex((x) => { return x.id == chapter_id })
        setChpFilter(chp)
        setOpen(true);
    }


    const SubmitFile = async () => {

        let data = {
            file: file,
        }
        const formData = new FormData();
        if (data.file) formData.append('file', data.file)
        try {

            await axios({
                method: "Post",
                url: `${base_url}/external/v1/sync/ppt/`,
                data: formData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } },
                headers: { 'Authorization': `Bearer ${_access_token}` },
            })
                .then(response => {
                    // setLoading(false)
                    console.log(response, "rRRRRRRR")
                    if (response.status === 200 || response.status === 201) {
                        if (response.data.data) {
                            // alert("PPT Bulk Data Uploaded Successfully")
                            setAlertDetails({
                                ...alertDetails,
                                open: true,
                                message: "PPT Bulk Data Uploaded Successfully",
                                errorType: 'success',
                            })
                            setFile(null);
                            setOpenDialog(false);
                            getEbookData();
                        }
                    }
                })
                .catch(error => {
                    console.log(error, 'error');
                })
        } catch (error) {
            console.log(error);
        }



        // let apiEnd = "sync/ppt/";
        // try {
        //     // const res = await formDataApi(apiEnd, fmData)
        //     const res = await formDataApi(apiEnd, formData);
        //     console.log(res, "ResponseData")
        //     // setFile(null);
        //     // setOpen(false);
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const submitData = async (e) => {
        let data = {
            ...submitValue,
            ebook: file
        }
        const formData = new FormData();

        if (data.topic) formData.append("topic", data.topic);
        // if (data.chapter_id) formData.append("chapter_id", 51);

        if (data.chapter_id) formData.append("chapter_id", data.chapter_id);
        if (data.language_id) formData.append("language_id", data.language_id);
        if (data.grade_id) formData.append("grade_id", data.grade_id);
        if (data.subject_id) formData.append("subject_id", data.subject_id);
        if (data.board_id) formData.append("board_id", data.board_id);
        if (data.ebook) formData.append('ppt', data.ebook);
        if (data.provider) formData.append("provider", data.provider);

        console.log(...formData, "FormDatasss")
        if (data.id === "") {
            try {

                let { id, ...rest } = data;
                let datas = [...Object.values(rest)].every(Boolean);
                if (!datas) {
                    setAlertDetails({
                        ...alertDetails,
                        open: true,
                        message: "Please Fill proper details",
                        errorType: 'error',
                    })
                    return
                }

                await axios({
                    method: "Post",
                    url: `${base_url}content/v1/ppt/`,
                    data: formData,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } },
                    headers: { 'Authorization': `Bearer ${_access_token}` },
                })
                    .then(response => {
                        // setLoading(false)
                        if (response.data.data) {
                            // alert("PPT Added Successfully")
                            setAlertDetails({
                                ...alertDetails,
                                open: true,
                                message: "PPT Added Successfully",
                                errorType: 'success',
                            })
                            setSubmitValue({
                                subject_id: content_selection.subject,
                                board_id: content_selection.board,
                                grade_id: content_selection.grade,
                                language_id: 1,
                                chapter_id: null,
                                topic: "",
                            });
                            setFile(null);
                            setOpen(false);
                            getEbookData();
                        }
                    })
                    .catch(error => {
                        console.log(error, 'error');
                        setAlertDetails({
                            ...alertDetails,
                            open: true,
                            message: "Error Filling Data",
                            errorType: 'error',
                        })
                    })
            } catch (error) {
                console.log(error);
            }
        } else {
            try {

                await axios({
                    method: "Patch",
                    url: `${base_url}/content/v1/ppts/${data.id}/`,
                    data: formData,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } },
                    headers: { 'Authorization': `Bearer ${_access_token}` },
                })
                    .then(response => {
                        // setLoading(false)
                        if (response.data.data) {
                            // alert("PPT Updated Successfully")
                            setAlertDetails({
                                ...alertDetails,
                                open: true,
                                message: "PPT Updated Successfully",
                                errorType: 'success',
                            })
                            setSubmitValue({
                                subject_id: content_selection.subject,
                                board_id: content_selection.board,
                                grade_id: content_selection.grade,
                                language_id: 1,
                                chapter_id: null,
                                topic: "",
                            });
                            setFile(null);
                            setOpen(false);
                            getEbookData();
                        }
                    })
                    .catch(error => {
                        console.log(error, 'error');
                        setAlertDetails({
                            ...alertDetails,
                            open: true,
                            message: "Error Filling Data",
                            errorType: 'error',
                        })
                    })
            } catch (error) {
                console.log(error);
            }
        }

    }

    const handleClose = () => {
        setAlertDetails({
            ...alertDetails,
            open: false,
            message: '',
            errorType: '',
        })
    }

    console.log(props, "setFilesdata")

    return (
        <div>
            <div className={styles.Ebooks_main}>
                <div className={styles.head}>PPT</div>
                <div>
                    {/* {props?.access?.writeAccess &&   */}
                    
                    {/* <Button onClick={() => openBulk()}>Bulk Upload</Button> hide from ui on insitude panel */}  
                    
                    {/* } */}
                    {/* {props?.access?.writeAccess &&  */}
                    
                    {/* <Button onClick={() => openPpt()}>Add PPT</Button>     hide from ui on insitude panel */}
                    
                     {/* } */}
                </div>
            </div>

            <div>
                {getEbook && getEbook.map((v, i) => (<div>
                    <p className={styles.subHead}>Chapter {`${i + 1}. ${v.title}`}</p>
                    <div>
                        <Carousel
                            swipeable={false}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            responsive={responsive} >
                            {v?.ppt?.map((info, index) => (
                                <div style={{ position: 'relative', width: '95%', margin: '20px' }}>
                                   {props?.access?.updateAccess &&  <EditIcon style={{ position: 'absolute', top: '20px', left: '20px', zIndex: '999', fontSize: '30px', padding: '3px', background: 'white', borderRadius: '50%' }} onClick={() => newData(info)} />}

                                    <div key={info} className={styles.cardMind} 
                                    // style={{ backgroundImage: `url(${(info.thumbnail) ? info.thumbnail: videoImg})`}}
                                     onClick={() => newDataOpen(info.chapter)}>
                                            {info.thumbnail ? <img src={info.thumbnail} alt="image" className={styles.imgCard} /> : <img src={videoImg} alt="image" className={styles.imgCard} />}
                                        <div>
                                            {info.topic}
                                            {/* <CustomProgress value={30} /> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>))}
            </div>

            <div>
                <DrawerComp open={open} onClose={() => setOpen(false)} anchor="right">
                    <div className={styles.BooksContainer}>
                        <div style={{ fontSize: '19px', marginBottom: '20px', fontWeight: 'bold' }}>Add Ppt</div>
                        <div style={{ marginBottom: '20px' }}>
                            <InputField
                                label="Topic Name"
                                width="300px"
                                value={submitValue?.topic}
                                name="topic" onChange={handleData} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>

                            <FormControl fullWidth style={{ width: '300px' }}>
                                <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={getEbook[chapterFilter]?.id}
                                    label="Chapter"
                                    name='chapter_id'
                                    onChange={handleData}
                                >
                                    {getEbook && getEbook.map((v, i) => (<MenuItem value={v.id}>{v.title}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <div>Select file</div>
                            <input
                                type="file"
                                accept='file/*'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Button className={styles.btns}
                                onClick={() => submitData()}
                            >Add</Button>
                        </div>

                    </div>
                </DrawerComp>
            </div>

            <div>
                <DialogBox open={openDialog} onClose={() => setOpenDialog(false)} dataSend={() => SubmitFile()}>
                    <div>
                        <h3>Upload File</h3>
                        <p>Get Sample File here
                            <a href={Files} download> Click to download</a>
                        </p>
                        <input type="file" accept='file/*' onChange={handleChange} />
                        {/* <FileUploader handleChange={handleChange} name="file" types={fileTypes} dropMessageStyle={{backgroundColor: 'orange'}}/> */}
                    </div>
                </DialogBox>
            </div>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={alertDetails.open}
                style={{ zIndex: 9999 }}
                onClose={handleClose}
                autoHideDuration={6000}>
                <Alert severity={alertDetails.errorType} sx={{ width: '100%' }}>
                    {alertDetails.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Contentppt


const Number = [
    {
        id: 1,
        image: videoImg,
        icons: edfive,
        title: "Decimals System Problem Solving",
    },
    {
        id: 2,
        image: matrics,
        icons: cnm,
        title: "Number System -NCERT",
    },
];


const Decim = [
    {
        id: 1,
        image: videoDecimal,
        icons: edfive,
        title: "Introduction to Number System",
    },
    {
        id: 2,
        image: Tens,
        icons: cnm,
        title: "Intoduction to Decimal System ",
    },
    {
        id: 3,
        image: videoDecimal,
        icons: edfive,
        title: "Introduction to Number System",
    },
    {
        id: 4,
        image: Tens,
        icons: cnm,
        title: "Intoduction to Decimal System ",
    },
]
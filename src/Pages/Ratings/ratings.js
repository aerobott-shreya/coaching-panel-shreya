import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Button, IconButton, MenuItem, TextareaAutosize, TextField } from '@material-ui/core';
import './ratings.css';
import Rating from '@material-ui/lab/Rating';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel } from 'victory';
import { api_calln } from '../../Utils/Network';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
// import { UserCredsContext } from '../../ContextApis/UserCredsContext/UserCredsContext';
import { CalCredsContext } from '../../ContextApi/CalCredsContext/CalCredsContext';
import { UserCredsContext }  from '../../ContextApi/UserCredContext/UserCredsContext';
import { useContext } from 'react';
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = 240;
let sum = 0;
let num = 0;

// const updatedNums = rate.length !== 0 && rate.map((item, idx) => 
//        { 
//            return(
//              sum + {item.rating} 

//         );
//     }
//     )

const useStyles = makeStyles((theme) => ({
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        height: '50px',
        width: '50px'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    root: {
        // flexGrow: 10,
        backgroundColor: theme.palette.background.paper,
        display: 'grid',
        gridTemplateColumns: '15% 85%',
        height: 224,
        marginTop: '52px'

    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    
}));

const data = [
    { x: 1, y: 2, color: 'green' },
    { x: 2, y: 4, color: 'green' },
    { x: 3, y: 2, color: 'green' },
    { x: 4, y: 10, color: 'green' },
    { x: 5, y: 8, color: 'green' }
];

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}

        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs(props) {
    //   const classes = useStyles();
    const [value1, setValue1] = React.useState(0);
    const classes = useStyles();
    const [value, setValue] = useState(2);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [batchD, setBatchD] = useState();


    const [rep, setRep] = useState({
        comment: ''
    })
    const { user_state, user_details } = useContext(CalCredsContext);
    const {user} = useContext(UserCredsContext);
    const [instituteData, setInstituteData] = useState();
    const [rate, setRate] = useState([]);
    const [reply, setReply] = useState([]);
    const [rate2, setRate2] = useState([]);
    const [reply2, setReply2] = useState([]);
    const [idstored, setIdstored] = useState();
    const [comment, setComment] = useState({ comment: "" });
    const [batchListData, setBatchListData] = useState([]);
    const [selectName, setSelectName] = useState({ batch_id: [] });
    const [id2, setId2] = useState();
    const [reviewreplyid2, setReviewreplyid2] = useState();
    const [reviewreplyid, setReviewreplyid] = useState();

    const [buttonText, setButtonText] = useState("View Replies");

    const changeText = (text) => setButtonText(text);
    const [buttonText2, setButtonText2] = useState("View Replies");

    const changeText2 = (text) => setButtonText2(text);

    // const [currentpage2 , setCurrentpage2] = useState(1);
    const [nextpage2, setNextpage2] = useState(1);
    // const [maxpage2 , setMaxpage2] = useState();
    const [showmore2, setShowmore2] = useState();   //where the more data is stored, others append here!!!
    const [extra, setExtra] = useState();

    const [nextpage, setNextpage] = useState(1);

    const [showmore, setShowmore] = useState();   //where the more data is stored, others append here!!!
    const [extra2, setExtra2] = useState();

    const [datareq, setDatareq] = useState({ one: '', two: '', three: '', four: '', five: '' });
    const [datareq2, setDatareq2] = useState({ one: '', two: '', three: '', four: '', five: '' });

    const [coursedetail, setCoursedetail] = useState({});
    const [avgrating2, setAvgrating2] = useState({});
    const [avgrating, setAvgrating] = useState({});
    const [coursedetail2, setCoursedetail2] = useState({});

    console.log(coursedetail2.average_rating, ' user details')
    useEffect(() => {
        getReview();
        getReviewReply();
        getList();
        getReview2();
        getReviewReply2();
        topdata();
        getcoursedetail2();
        // getReviewReply2();
    }, [])

    const getavgrating2 = (id) => {
        api_calln.get(`/content/course/${id}?fields=average_rating`)
            .then(response => {
                setAvgrating2(response.data.data);
                console.log(response.data.data, 'the rating avg');

            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status == 403) {
                        let error_message = error.response.data.error.message;
                    }
                }
            })
    }

    const getcoursedetail2 = (id) => {
        console.log(user_details,'institute_id');
        // api_calln.get(`/profile/educator/${user_details.institute.id}?omit=user`)
        api_calln.get(`/profile/educator/${user.institute.id}?omit=user`)
            .then(response => {
                setCoursedetail2(response.data.data);
                console.log(response.data.data, 'the rating avg1');

            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status == 403) {
                        let error_message = error.response.data.error.message;
                    }
                }
            })
    }

    const getcoursedetail = (id) => {
        api_calln.get(`/content/course/${id}?fields=reviewers`)
            .then(response => {
                setCoursedetail(response.data.data);

                console.log(response.data.data, 'the courses');

            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status == 403) {
                        let error_message = error.response.data.error.message;
                    }
                }
            })
    }

    const topdata = () => {
        // api_calln.get(`/profile/educator/${user_details.institute.id}/aggregate/`)
        api_calln.get(`/profile/educator/${user.institute.id}/aggregate/`)
            .then(response => {
                setDatareq(response.data.data);
                console.log('data req is', response.data);
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status == 403) {
                        let error_message = error.response.data.error.message;
                    }
                }
            })
    }

    console.log(datareq, 'datareq')

    const seconddata = (id) => {
        api_calln.get(`/content/course/${id}/aggregate/`)
            .then(response => {
                setDatareq2(response.data.data);
                console.log('data req 2 is ', response.data);
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status == 403) {
                        let error_message = error.response.data.error.message;
                    }
                }
            })
    }

    const getList = () => {
        api_calln.get('/offline/panel/batch/')
            .then(response => {
                console.log("The response is ", response.data.data);
                setBatchListData(response.data.data);
                setId2(batchListData.id)
                console.log(id2, 'this is the select')
                if (response.data.data.length > 0) {
                    getReview2(response.data.data[0]["id"]);
                    setSelectName({ ...selectName, batch_id: response.data.data[0]["id"] });
                }

            })
            .catch(error => {

                if (error.response) {
                    if (error.response.status == 403) {
                        let error_message = error.response.data.error.message;
                    }
                }
            })
    }


    const getReview = () => {
        // api_calln.get(`/offline/review/?institute=${user_details.institute.id}`)
        api_calln.get(`/offline/review/?institute=${user.institute.id}`)
            .then(response => {
                console.log("The offline rating is ", response.data.data);
                setRate(response.data.data);

            })
            .catch(error => {

                if (error.response) {
                    if (error.response.status == 403) {
                        let error_message = error.response.data.error.message;
                    }
                }
            })
    }

    console.log(rate, 'rateis');

    const getReview2 = (id) => {
        api_calln.get(`/offline/review/?course=${id}`)
            .then(response => {
                console.log("The offline rating2 is ", response.data.data);
                setRate2(response.data.data);
                console.log(id, 'idddddddds');
                seconddata(id);
                getcoursedetail(id);
                getavgrating2(id);
            })
            .catch(error => {

                if (error.response) {
                    if (error.response.status == 403) {
                        let error_message = error.response.data.error.message;
                    }
                }
            })
    }

    // console.log(courseid , 'courseiddd');

    const getRatingLike = (id) => {
        api_calln.get(`/offline/rating/id/like/`)
            .then(response => {
                console.log("The reply like is ", response.data.data);
                setRate(response.data.data);
            })
            .catch(error => {

                if (error.response) {
                    if (error.response.status == 403) {
                        let error_message = error.response.data.error.message;
                    }
                }
            })
    }

    const getReviewReply = (id) => {
        {
            setReply([]);
            api_calln.get(`/offline/review_reply/?review=${id}`)

                .then(response => {
                    console.log("the reply for the review is", response.data.data);
                    setReply(response.data.data);
                    setReviewreplyid(id);
                    setShowmore(response.data);
                    setNextpage(response.data.next_page);
                })
                .catch(error => {
                    console.log(error, ' error')
                    if (error.response) {
                        if (error.response.status == 403) {
                            let error_message = error.response.data.error.message;
                            console.log(error, 'error')
                        }
                    }
                })

        }
    }


    const getReviewReply2 = (id) => {
        {
            setReply2([]);
            api_calln.get(`/offline/review_reply/?review=${id}`)

                .then(response => {
                    console.log("the reply for the review2 is", response.data.data);
                    setReply2(response.data.data);
                    setReviewreplyid2(id);
                    console.log('showmore2', response.data);
                    setShowmore2(response.data);
                    setNextpage2(response.data.next_page);

                })
                .catch(error => {
                    console.log(error, ' error')
                    if (error.response) {
                        if (error.response.status == 403) {
                            let error_message = error.response.data.error.message;
                            console.log(error, 'error')
                        }
                    }
                })

        }
    }


    console.log(rate, ' id stored');

    const sendReply = (id) => {
        const data = {
            review_id: id,
            comment: comment.comment
        }
        api_calln.post(`/offline/review_reply/`, data)
            .then(response => {
                getReviewReply();
                console.log('data sent is', data);
            })
        setComment({
            comment: ''
        })
    }

    const sendReply2 = (id) => {
        const data = {
            review_id: id,
            comment: comment.comment
        }
        api_calln.post(`/offline/review_reply/`, data)
            .then(response => {
                getReviewReply2(id);
                console.log('data sent2 is this', data);
            })
        setComment({
            comment: ''
        })
    }

    const replyfn = () => {
        setShow(!show);
    }

    const replyfn2 = () => {
        setShow2(!show2);
    }

    const replyfn3 = () => {
        setShow3(!show3);
    }

    const handleChange = (event, newValue) => {
        setValue1(newValue);
    };

    const handleChangess = (event, selectValue) => {

        getReview2(event.target.value);
        seconddata(event.target.value);
        getcoursedetail(event.target.value);
        console.log(event.target.value, 'event value');
        setSelectName({ ...selectName, [event.target.name]: [event.target.value] });

    };

    const togglereply = (id) => {
        setShow2(!show2);

        if (show2) {

            setReviewreplyid2(undefined)
            setComment({
                comment: ""
            });
        }
        else {
            setReviewreplyid2(id)
        }
    }

    const togglereply1 = (id) => {
        setShow(!show);

        if (show) {

            setReviewreplyid(undefined)
            setComment({
                comment: ""
            });
        }
        else {
            setReviewreplyid(id)
        }
    }

    const togglereply2 = (id) => {
        setShow3(!show3);

        if (!show3) {
            //     getReviewReply2(undefined)
            // }
            // else {
            getReviewReply2(id)
            changeText2("Hide Replies");
        }
        else {
            changeText2("View Replies");
        }
    }

    const togglereply3 = (id) => {
        setShow1(!show1);

        if (!show1) {
            //     getReviewReply(undefined)
            // }
            // else {
            getReviewReply(id)
            setButtonText("Hide Replies");
        }
        else {
            setButtonText("View Replies");
        }
    }


    const toggleShowmore2 = (id) => {
        if (nextpage2 !== null) {
            viewmore2(reviewreplyid2);
        }
    }

    const viewmore2 = (id) => {

        api_calln.get(`/offline/review_reply/?page=${nextpage2}&review=${id}`)
            .then(response => {
                //  setCurrentpage2(showmore2.page);
                setReply2([
                    ...reply2, ...response.data.data
                ])
                setNextpage2(response.data.next_page);
                setExtra(response.data.data);
                console.log(response.data.data, 'extra is');
            })
    }

    const toggleShowmore = (id) => {

        if (nextpage !== null) {
            viewmore(reviewreplyid);
        }
    }

    const viewmore = (id) => {

        api_calln.get(`/offline/review_reply/?page=${nextpage2}&review=${id}`)
            .then(response => {
                //  setCurrentpage2(showmore2.page);
                setReply([
                    ...reply, ...response.data.data
                ])
                setNextpage(response.data.next_page);
                setExtra2(response.data.data);
                console.log(response.data.data, 'extra one is');
            })
    }

    var x1 = datareq["one"] / (datareq["one"] + datareq["two"] + datareq["three"] + datareq["four"] + datareq["five"]) * 100;
    var x2 = datareq["two"] / (datareq["one"] + datareq["two"] + datareq["three"] + datareq["four"] + datareq["five"]) * 100;
    var x3 = datareq["three"] / (datareq["one"] + datareq["two"] + datareq["three"] + datareq["four"] + datareq["five"]) * 100;
    var x4 = datareq["four"] / (datareq["one"] + datareq["two"] + datareq["three"] + datareq["four"] + datareq["five"]) * 100;
    var x5 = datareq["five"] / (datareq["one"] + datareq["two"] + datareq["three"] + datareq["four"] + datareq["five"]) * 100;

    var y1 = datareq2["one"] / (datareq2["one"] + datareq2["two"] + datareq2["three"] + datareq2["four"] + datareq2["five"]) * 100;
    var y2 = datareq2["two"] / (datareq2["one"] + datareq2["two"] + datareq2["three"] + datareq2["four"] + datareq2["five"]) * 100;
    var y3 = datareq2["three"] / (datareq2["one"] + datareq2["two"] + datareq2["three"] + datareq2["four"] + datareq2["five"]) * 100;
    var y4 = datareq2["four"] / (datareq2["one"] + datareq2["two"] + datareq2["three"] + datareq2["four"] + datareq2["five"]) * 100;
    var y5 = datareq2["five"] / (datareq2["one"] + datareq2["two"] + datareq2["three"] + datareq2["four"] + datareq2["five"]) * 100;

    // console.log(x1, 'x1');
    // console.log(reply2, 'reply2');
    // console.log(datareq2["one"], 'data1');
    // console.log(y4, 'y4');


    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);

        return color;
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value1}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Institute Rating" {...a11yProps(0)} />
                <Tab label="Course Rating" {...a11yProps(1)} />

            </Tabs>
            <TabPanel value={value1} index={0} style={{borderRight: '1px solid #ddd', marginRight:'3%'}}>
                <div >
                    <div>
                    </div>
                    <div>
                        <h2 style={{marginTop:'0px'}}>REVIEWS</h2>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '5px',borderBottom:'2px solid #ddd' }}>
                        <div>

                        </div>
                        <div style={{ padding: '20px' }}>
                            {/* {rate.length !== 0 && rate.map((item, idx) => */}
                            <p className="ratings-rating" style={{ lineHeight: 'normal' }}>{coursedetail2.average_rating}</p>

                            <Box component="fieldset" mb={3} borderColor="transparent" style={{
                                margin: '0px'
                                , borderWidth: '0px',
                                paddingTop: '0px',
                                paddingBottom: '0px'
                            }}>
                                {/* {rate.length !== 0 && rate.map((item, idx) => */}
                                {coursedetail2.average_rating !== undefined && < Rating style={{ fontSize: '18px', color: 'rgb(19,50,104)' }} name="read-only" value={coursedetail2.average_rating} precision={0.5} readOnly />}
                                {/* )} */}
                            </Box>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', marginBottom: '24px' }}><PersonIcon
                                style={{ height: '17px', width: '16px', marginTop: '1px' }} />
                                <p style={{ margin: '0px', fontSize: '14px' }}>
                                    {coursedetail2.reviewers}</p>
                            </div>

                        </div>
                        <div style={{ width: '100%', padding: '20px' }}>

                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p style={{
                                        marginBottom: '0px',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        marginRight: '10px'
                                    }}>5</p>
                                </div>
                                <div className="bar-container">
                                    <div style={{
                                        height: '100%',
                                        backgroundColor: '#57bb8a',
                                        width: `${isNaN(x5) ? '0' : x5}%`
                                    }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p style={{
                                        marginBottom: '0px',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        marginRight: '10px'
                                    }}>4</p>
                                </div>
                                <div className="bar-container">
                                    <div style={{
                                        height: '100%',
                                        backgroundColor: '#9ace6a',
                                        width: `${isNaN(x4) ? '0' : x4}%`
                                    }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p style={{
                                        marginBottom: '0px',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        marginRight: '10px'
                                    }}>3</p>
                                </div>
                                <div className="bar-container">
                                    <div style={{
                                        height: '100%',
                                        backgroundColor: '#ffcf02',
                                        width: `${isNaN(x3) ? '0' : x3}%`
                                    }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p style={{
                                        marginBottom: '0px',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        marginRight: '10px'
                                    }}>2</p>
                                </div>
                                <div className="bar-container">
                                    <div style={{
                                        height: '100%',
                                        backgroundColor: '#ff9f02',
                                        width: `${isNaN(x2) ? '0' : x2}%`
                                    }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p style={{
                                        marginBottom: '0px',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        marginRight: '10px'
                                    }}>1</p>
                                </div>
                                <div className="bar-container">
                                    <div style={{
                                        height: '100%',
                                        backgroundColor: '#ff6f31',
                                        width: `${isNaN(x1) ? '0' : x1}%`
                                    }}></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {rate.length !== 0 && rate.map((item, idx) =>
                        <div className="review-avatar">
                            <div>

                            </div>
                            <div>
                                <Avatar className={classes.purple} style={{ backgroundColor: `${user_state.colors.primary}` }}>{(item.user_info.first_name === '') ? 'H' : item.user_info.first_name.charAt(0)}</Avatar>
                            </div>
                            <div style={{ marginLeft: '8px', width: '85%' }}>
                                <div style={{ display: 'table-cell' }}>
                                    {/* {rate2.length !== 0 && rate2.map((item, idx) => */}
                                    <div>
                                        <p style={{ marginTop: '0px', fontSize: '18px', marginBottom: '0px' }}>
                                            {item.user_info.first_name} {item.user_info.last_name}
                                        </p>

                                    </div>
                                    {/* )} */}
                                    <div>
                                    <p style={{ marginTop: '2px',marginBottom:'2px', fontSize: '12px',color:'gray' }}>{item.date_published}  {item.published_at}</p>
                                        <Box component="fieldset" mb={3} borderColor="transparent" style={{ marginBottom: '0px', paddingLeft: '0px', marginLeft: '-5px',paddingTop:'0px',paddingBottom:'0px' }}>
                                            {/* {rate2.length !== 0 && rate2.map((item, idx) => */}
                                            <Rating name="read-only" style={{ fontSize: '14px', color: 'rgb(19,50,104)', }} value={item.rating} readOnly />
                                            {/* )} */}
                                        </Box>
                                        
                                    </div>

                                </div>
                                {/* {rate.length !== 0 && rate.map((item, idx) => */}
                                <div>
                                    <p style={{marginTop:'0px',marginBottom:'0px'}}>
                                        {item.comment}
                                    </p>
                                </div>
                                {/* )} */}
                                <div style={{ display: 'flex', }}>
                                    <IconButton disabled style={{ paddingLeft:'0px',paddingRight: '4px', color: 'rgba( 0,0,0,0.54)' }}>
                                        <ThumbUpAltIcon color="white" />
                                    </IconButton>
                                    {/* {rate.length !== 0 && rate.map((item, idx) => */}
                                    <p>{item.likes_count}</p>
                                    {/* )} */}
                                    <IconButton disabled style={{ paddingRight: '4px', color: 'rgba( 0,0,0,0.54)' }}>
                                        <ThumbDownAltIcon color="white" />
                                    </IconButton>
                                    {/* {rate.length !== 0 && rate.map((item, idx) => */}
                                    <p>{item.dislikes_count}</p>
                                    {/* )} */}
                                    <Button color="primary"
                                        onClick={() => togglereply1(item.id)}
                                    >Reply</Button>
                                </div>

                                {(show && reviewreplyid === item.id) &&
                                    <div>
                                        <div>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Reply...."
                                                multiline
                                                rows={4}
                                                name="comment"
                                                variant="outlined"
                                                style={{
                                                    width: '80%'
                                                }}
                                                value={comment.comment}
                                                onChange={e => setComment({ ...comment, comment: e.target.value })}
                                            />
                                        </div>

                                        <div style={{ marginTop: '2px' }} className="ratings-reply-button">
                                            <Button style={{ textTransform: 'none' }}
                                                onClick={() => setShow(!show)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button style={{ textTransform: 'none' }}
                                                variant="contained"
                                                color="primary"
                                                onClick={() => sendReply(item.id)}
                                                disabled={!comment.comment}
                                            >
                                                Reply
                                            </Button>
                                        </div>
                                    </div>
                                }

                                <div>
                                    {/* {rate.length !== 0 && rate.map((item, idx) => */}
                                    <Button style={{border:'2px solid #ddd'}}onClick={() => togglereply3(item.id)}>{(reviewreplyid === item.id && show1) ? 'hide replies' : 'show replies'}</Button>
                                    {/* )} */}
                                </div>


                                {/* {(show1 && reviewreplyid === item.id) &&
                                    <div style={{ backgroundColor: '#f5f5f5'}}>
                                    {(reply.length !== 0 && reviewreplyid === item.id) && reply.map((item, idx) =>
                                        <div>
                                        <div style={{ backgroundColor: '#f5f5f5', padding: '20px' }} className="review-avatar">
                                            <div>

                                            </div>
                                            <div>
                                                <Avatar className={classes.purple}>H</Avatar>
                                            </div>
                                            <div>
                                                <div style={{ display: 'table-cell' }}>
                                                    <p style={{ marginLeft: '15px', marginTop: '0px', marginBottom: '0px', fontSize: '14px' }}>Person's Name</p>
                                                    <p style={{ marginLeft: '15px', marginTop: '0px', marginBottom: '0px', fontSize: '14px' }}>{item.published_at}  {item.date_published}</p>
                                                </div>
                                                <div>
                                                    <p style={{ marginLeft: '15px' }}>
                                                        {item.comment}
                                                    </p>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <IconButton style={{ paddingRight: '4px' }}>
                                                        <ThumbUpAltIcon color="white" />
                                                    </IconButton>
                                                    <p>{item.likes_count}</p>
                                                    <IconButton style={{ paddingRight: '4px' }}>
                                                        <ThumbDownAltIcon color="white" />
                                                    </IconButton>
                                                    <p>{item.dislikes_count}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        
                                    )}
                                    <div style={{textAlign:'center'}}>
                                        <Button color="primary" 
                                            onClick ={() => toggleShowmore(item.id)}
                                        >
                                            Show more replies
                                        </Button>
                                        </div>
                                    </div>
                    } */}
                                {(show1 && reviewreplyid === item.id) &&
                                    <div style={{ backgroundColor: '#f5f5f5' }}>
                                        {(reply.length !== 0 && reviewreplyid === item.id) && reply.map((item, idx) =>
                                            <div>
                                                <div style={{ backgroundColor: '#f5f5f5', padding: '20px' }} className="review-avatar2">
                                                    <div>

                                                    </div>
                                                    <div>
                                                        <Avatar className={classes.purple} style={{ backgroundColor: `${user_state.colors.primary}` }}></Avatar>
                                                    </div>
                                                    <div style={{ marginLeft: '8px' }}>
                                                        <div style={{ display: 'table-cell' }}>
                                                            {/* <p style={{ marginLeft: '15px', marginTop: '0px', marginBottom: '0px', fontSize: '14px' }}>{item.user_info.first_name}</p> */}
                                                            <p style={{ marginLeft: '15px', marginTop: '0px', marginBottom: '0px', fontSize: '14px', textTransform: 'capitalize' }}>{user_state.user.first_name}</p>
                                                        </div>
                                                        <div><p style={{ marginLeft: '15px', fontSize: '12px', marginTop: '8px' }}>{item.date_published}  {item.published_at}</p></div>
                                                        <div>
                                                            <p style={{ marginLeft: '15px' }}>
                                                                {item.comment}
                                                            </p>
                                                        </div>
                                                        <div style={{ display: 'flex' }}>
                                                            <IconButton disabled style={{ paddingRight: '4px', color: 'rgba( 0,0,0,0.54)' }}>
                                                                <ThumbUpAltIcon color="white" />
                                                            </IconButton>
                                                            <p>{item.likes_count}</p>
                                                            <IconButton disabled style={{ paddingRight: '4px', color: 'rgba( 0,0,0,0.54)' }}>
                                                                <ThumbDownAltIcon color="white" />
                                                            </IconButton>
                                                            <p>{item.dislikes_count}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                        <div style={{ textAlign: 'center' }}>
                                            <Button color="primary"
                                                onClick={() => toggleShowmore(item.id)}
                                                style={(nextpage === null) ? { display: 'none' } : {}}
                                            >
                                                Show more replies
                                            </Button>
                                        </div>
                                    </div>
                                }


                            </div>
                        </div>
                    )}
                </div>
            </TabPanel>
            <TabPanel value={value1} index={1}>
                <div >
                    <div>
                    </div>
                    <div>
                        <h2 style={{marginTop:'0px'}}>REVIEWS</h2>
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                        <TextField
                            id="batch"
                            select
                            label="Batch"
                            value={selectName.batch_id}
                            onChange={(e) => handleChangess(e)}
                            style={{ width: '25%' }}
                            variant="outlined"
                            name='batch_id'
                        >
                            {batchListData.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.title}
                                </MenuItem>
                                // getReview2(option.id);
                            ))}
                        </TextField>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center',  borderBottom: '2px solid #333' }}>
                        <div>

                        </div>
                        <div style={{ padding: '20px', }}>

                            <div className="ratings-rating" style={{ lineHeight: 'normal' }}>{avgrating2.average_rating}</div>
                            <Box component="fieldset" mb={3} borderColor="transparent" style={{
                                margin: '0px'
                                , borderWidth: '0px',
                                paddingTop: '0px',
                                paddingBottom: '0px'
                            }}>

                                <Rating name="read-only" precision={0.5} value={avgrating2.average_rating} style={{ fontSize: '18px', color: 'rgb(19,50,104)' }} readOnly />

                            </Box>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', marginBottom: '24px' }}>
                                <PersonIcon style={{ height: '17px', width: '16px', marginTop: '1px' }} />
                                <p style={{ fontSize: '14px', margin: '0px' }}>{coursedetail.reviewers}</p></div>

                        </div>
                        <div style={{ width: '100%', padding: '20px' }}>

                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p style={{
                                        marginBottom: '0px',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        marginRight: '10px'
                                    }}>5</p>
                                </div>
                                <div className="bar-container">
                                    <div style={{
                                        height: '100%',
                                        backgroundColor: '#57bb8a',
                                        width: `${isNaN(y5) ? '0' : y5}%`
                                    }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p style={{
                                        marginBottom: '0px',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        marginRight: '10px'
                                    }}>4</p>
                                </div>
                                <div className="bar-container">
                                    <div style={{
                                        height: '100%',
                                        backgroundColor: '#9ace6a',
                                        width: `${isNaN(y4) ? '0' : y4}%`
                                    }}></div>

                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p style={{
                                        marginBottom: '0px',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        marginRight: '10px'
                                    }}>3</p>
                                </div>
                                <div className="bar-container">
                                    <div style={{
                                        height: '100%',
                                        backgroundColor: '#ffcf02',
                                        width: `${isNaN(y3) ? '0' : y3}%`
                                    }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p style={{
                                        marginBottom: '0px',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        marginRight: '10px'
                                    }}>2</p>
                                </div>
                                <div className="bar-container">
                                    <div style={{
                                        height: '100%',
                                        backgroundColor: '#ff9f02',
                                        width: `${isNaN(y2) ? '0' : y2}%`
                                    }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p style={{
                                        marginBottom: '0px',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        marginRight: '10px'
                                    }}>1</p>
                                </div>
                                <div className="bar-container">
                                    <div style={{
                                        height: '100%',
                                        backgroundColor: '#ff6f31',
                                        width: `${isNaN(y1) ? '0' : y1}%`
                                    }}></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {rate2.length !== 0 && rate2.map((item, idx) =>
                        <div className="review-avatar">
                            <div>

                            </div>

                            <div>
                                <Avatar className={classes.purple} style={{ backgroundColor: randomColor() }}>{(item.user_info.first_name === '') ? 'H' : item.user_info.first_name.charAt(0)}</Avatar>
                            </div>
                            <div style={{ marginLeft: '8px', width: '85%' }}>
                                <div style={{ display: 'table-cell' }}>
                                    {/* {rate2.length !== 0 && rate2.map((item, idx) => */}
                                    <div>
                                        <p style={{ marginTop: '0px', fontSize: '14px', marginBottom: '0px' }}>
                                            {item.user_info.first_name} {item.user_info.last_name}
                                        </p>

                                    </div>
                                    {/* )} */}
                                    <div style={{ display: 'flex' }}>
                                        <Box component="fieldset" mb={3} borderColor="transparent" style={{ marginBottom: '0px', paddingLeft: '0px', marginLeft: '-5px' }}>
                                            {/* {rate2.length !== 0 && rate2.map((item, idx) => */}
                                            <Rating name="read-only" style={{ fontSize: '14px', color: 'rgb(19,50,104)' }} value={item.rating} readOnly />
                                            {/* )} */}
                                        </Box>
                                        <p style={{ marginTop: '8px', fontSize: '12px' }}>{item.date_published}  {item.published_at}</p>
                                    </div>

                                </div>
                                {/* {rate2.length !== 0 && rate2.map((item, idx) => */}
                                <div>
                                    <p>
                                        {item.comment}
                                    </p>
                                </div>
                                {/* )} */}
                                <div style={{ display: 'flex' }}>
                                    <IconButton disabled style={{ paddingRight: '4px', color: 'rgba( 0,0,0,0.54)' }}>
                                        <ThumbUpAltIcon color="white" />
                                    </IconButton>
                                    {/* {rate2.length !== 0 && rate2.map((item, idx) => */}
                                    <p>{item.likes_count}</p>
                                    {/* )} */}
                                    <IconButton disabled style={{ paddingRight: '4px', color: 'rgba( 0,0,0,0.54)' }}>
                                        <ThumbDownAltIcon color="white" />
                                    </IconButton>
                                    {/* {rate2.length !== 0 && rate2.map((item, idx) => */}
                                    <p>{item.dislikes_count}</p>
                                    {/* )} */}
                                    <Button color="primary"
                                        onClick={() => togglereply(item.id)}
                                    >Reply</Button>
                                </div>
                                {(show2 && reviewreplyid2 === item.id) &&
                                    <div>
                                        <div>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Reply...."
                                                multiline
                                                rows={4}
                                                name="comment"
                                                variant="outlined"
                                                style={{
                                                    width: '80%'

                                                }}
                                                value={comment.comment}
                                                onChange={e => setComment({ ...comment, comment: e.target.value })}
                                            />

                                        </div>

                                        <div style={{ marginTop: '2px' }} className="ratings-reply-button">
                                            <Button style={{ textTransform: 'none' }}
                                                onClick={() => setShow2(!show2)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button style={{ textTransform: 'none' }}
                                                variant="contained"
                                                color="primary"
                                                onClick={() => sendReply2(item.id)}
                                                disabled={!comment.comment}
                                            >
                                                Reply
                                            </Button>
                                        </div>
                                    </div>
                                }

                                <div>

                                    <Button style={{border:'1px solid'}} onClick={() => togglereply2(item.id)}>{(reviewreplyid2 === item.id && show3) ? 'hide replies' : 'show replies'}</Button>

                                </div>
                                {(show3 && reviewreplyid2 === item.id) &&
                                    <div style={{ backgroundColor: '#f5f5f5' }}>
                                        {(reply2.length !== 0 && reviewreplyid2 === item.id) && reply2.map((item, idx) =>
                                            <div>
                                                <div style={{ backgroundColor: '#f5f5f5', padding: '20px' }} className="review-avatar2">
                                                    <div>

                                                    </div>
                                                    <div>
                                                        <Avatar className={classes.purple} style={{ backgroundColor: randomColor() }}></Avatar>
                                                    </div>
                                                    <div style={{ marginLeft: '8px' }}>
                                                        <div style={{ display: 'table-cell' }}>
                                                            <p key={item.id} style={{ marginLeft: '15px', marginTop: '0px', marginBottom: '0px', fontSize: '14px' }}>{item.first_name}</p>
                                                            <p style={{ marginLeft: '15px', marginTop: '0px', marginBottom: '0px', fontSize: '14px' }}>{item.last_name}</p>
                                                        </div>
                                                        <div><p style={{ fontSize: '12px', marginTop: '8px' }}>{item.date_published}  {item.published_at}</p></div>
                                                        <div>
                                                            <p style={{ marginLeft: '15px' }}>
                                                                {item.comment}
                                                            </p>
                                                        </div>
                                                        <div style={{ display: 'flex' }}>
                                                            <IconButton disabled style={{ paddingRight: '4px', color: 'rgba( 0,0,0,0.54)' }}>
                                                                <ThumbUpAltIcon color="white" />
                                                            </IconButton>
                                                            <p>{item.likes_count}</p>
                                                            <IconButton disabled style={{ paddingRight: '4px', color: 'rgba( 0,0,0,0.54)' }}>
                                                                <ThumbDownAltIcon color="white" />
                                                            </IconButton>
                                                            <p>{item.dislikes_count}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                        <div style={{ textAlign: 'center' }}>
                                            <Button color="primary"
                                                // disabled={nextpage2 === null}
                                                style={(nextpage2 === null) ? { display: 'none' } : {}}
                                                onClick={() => toggleShowmore2(item.id)}
                                            >
                                                Show more replies
                                            </Button>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>

                    )}
                </div>
            </TabPanel>
        </div>
    );
}


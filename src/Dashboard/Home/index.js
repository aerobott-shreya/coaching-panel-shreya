import React, { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import DashboardAnalytics from "../../Pages/DashboardAnalytics/DashboardAnalytics";
import Profile from "../../Pages/Profile/Profile";
import StudentProfileView from "../../Pages/StudentProfileView/StudentProfileView";
import TeacherProfileView from "../../Pages/TeacherProfileView/TeacherProfileView";
import Parents from "../../Pages/Parents/Parents";
import AdminProfile from "../../Pages/AdminProfile/AdminProfile";
import CustomCalendar from "../../Components/CustomCalendar/CustomCalendar";
import Navbar from "../../Components/Navbar/Navbar";
import styles from './home.module.css';
import CustomAccordion from "../../Components/CustomAccordion/CustomAccordion";
import dashboard_img from "../../Assets/Dashboard.png";
import analytics_img from "../../Assets/Analytics.png";
import account_management from '../../Assets/account_management.png'
import content_management from '../../Assets/content management.png'
import academic_calendar from '../../Assets/academic_calendar.png';
import attendance from '../../Assets/attendance1.png';
import fee_management from '../../Assets/fee_management.png';
import top_image from '../../Assets/top_image.png';
import top_leftimage from '../../Assets/top_leftimage.png';
import bottom_right from '../../Assets/bottom_right.png';
import ed5logo from '../../Asset/Logo/logosmall.png';
import CalendarEvents from "../../Pages/CalendarEvents/CalendarEvents";
import ContentManagement from "../../Pages/ContentManagement/ContentManagement";
import Attendance from "../../Pages/Attendance/Attendance";
import school from '../../Assets/school.png';
import Teachers from '../../Assets/Teachers.png';
import student from '../../Assets/student.png';
import Parentsicon from '../../Assets/Parentsicon.png';
import videos from '../../Assets/videos.png';
import PPT from '../../Assets/PPT.png';
import Assignments from '../../Assets/Assignments.png';
import Tests from '../../Assets/Tests.png';
import Ebooks from '../../Assets/Ebooks.png';
import Mindmap from '../../Assets/Mindmap.png';
import Daily_classes from '../../Assets/Daily_classes.png';
import holidays from '../../Assets/holidays.png';
import special_event from '../../Assets/special_event.png';
import exams from '../../Assets/exams.png';
import Birthdays from '../../Assets/Birthdays.png';
import fee_due_dates from '../../Assets/fee_due_dates.png';
import AcademicCalendar from "../../Pages/AcademicCalendar/AcademicCalendar";
import Vector from '../../Assets/Vector.png';
import AccountManagement from "../../Pages/AccountManagement/AccountManagement";
import CustomVideoPlayer from "../../Pages/CustomVideoPlayer/CustomVideoPlayer";
import PendingFeeList from "../../Pages/PendingFeesList/PendingFeeList";
import { checkEmptyObject } from "../../Utils/Utils";
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import StudentProfile from "../../Pages/ProfileView/StudentProfile/StudentProfile";
import Main from "../../Pages/ProfileView/StudentProfile/CreateProfile/Main/Main"
import Mains from "../../Pages/ProfileView/TeacherProfile/CreateProfile/Main/Main";

import TeacherProfile from "../../Pages/ProfileView/TeacherProfile/TeacherProfile";
import ParentProfile from "../../Pages/ProfileView/ParentsProfile/ParentProfile";
import CreateParent from "../../Pages/ProfileView/ParentsProfile/CreateParent";
import DashboardCourse from "../../Pages/DashboardCourse/DashboardCourse";
import StudentsAssign from "../../Pages/DashboardCourse/StudentsAssign";
import ReportPage from "../../Pages/ReportPage/ReportPage";
import AllStudentReports from "../../Pages/AllStudentReports/AllStudentReports";
import ClassSectionsReports from "../../Pages/ClassSectionsReports/ClassSectionsReports";


const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px) !important`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px) !important`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginLeft: 'auto',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { boardList, gradeList, classList, subjectList, userState, setUrl, content_selection, setUserState } = useContext(UserCredsContext);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [openAccordion, setOpenAccordion] = React.useState(null);

  const handleAccordionToggle = (key) => {
    setOpenAccordion((prevKey) => (prevKey === key ? null : key));
  };

  React.useEffect(() => {
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      navigate(`/dashboard/analytics`)
    }
  }, [pathname])

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRoute = (title, url) => {
    console.log(url, "Demo")
    if (url !== '') {
      let value = url.includes('content');
      if (value) {
        const data = checkEmptyObject(content_selection);
        console.log(data, "nrjuwygfsdbwgfjhlehdjhdksd");
        if (data) {
          navigate(`/dashboard/${url}`)
        } else {
          navigate(`/dashboard/content/select`)
          setUrl(`/dashboard/${url}`)
        }
      } else {
        navigate(`/dashboard/${url}`)
      }
    }
  }

  const allRoutes = [
    { key: 2, path: "/account/*", element: AccountManagement },
    { key: 4, path: "/content/*", element: ContentManagement },
    { key: 3, path: "fees/*", element: PendingFeeList },
    { key: 1, path: "/calendar/*", element: AcademicCalendar },
    { key: 5, path: "/attendance/*", element: Attendance },
    { key: 6, path: "analytics", element: DashboardAnalytics },
  ];

  console.log(userState, "userState")

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: '280px',
          '& .MuiDrawer-paper': {
            width: "280px",
          },
        }}
      >
        <div>
          <DrawerHeader>
            <img src={ed5logo} className={styles.logoImage} style={{ width: `${open ? '20%' : '65%'}` }} />
            {open && <p className={styles.logoName}>BrainHap</p>}
            <IconButton >
              {!open ? (
                <ChevronRightIcon
                  onClick={handleDrawerOpen}
                />
              ) : (
                <ChevronLeftIcon onClick={handleDrawerClose} />
              )}
            </IconButton>
          </DrawerHeader>
        </div>
        <Divider />
        <div style={{ width: '240px' }}>
          {drawerList.map((item, index) => {
            const RouteModule = userState?.permissions?.[0]?.module?.find((a) => a.key === item.key);
            console.log(RouteModule, "RouteModule")
            return (
              <div style={{ opacity: open ? 1 : 0 }} >
                <CustomAccordion title={item.title} keys={item} RouteModule={RouteModule} defaultOpen={openAccordion === item.key} data={item.list} handleEvent={handleRoute} icon={item.icon}
                onToggle={() => handleAccordionToggle(item.key)} />
              </div>
            )
          })}
        </div>
        <Divider />
      </Drawer>
      <Box component="main" style={{ width: 'calc(100% - 280px)' }}>
        <Navbar />
        <div className={styles.dashboardRSection}>
          <Routes>
            <Route exact strict path="analytics" element={<DashboardAnalytics />} />
            <Route exact strict path="courses" element={<DashboardCourse />} />
            <Route exact strict path="courses/assign" element={<StudentsAssign />} />
            <Route exact strict path="test-report" element={<ReportPage />} />
            <Route exact strict path="test-report/:id" element={<ReportPage />} />
            <Route exact strict path="all-test-report" element={<ClassSectionsReports />} />
            {/* <Route path="/account/*" element={<AccountManagement />} />
            <Route path="/content/*" element={<ContentManagement />} />
            <Route exact strict path="fees/*" element={<PendingFeeList />} />
            <Route path="/calendar/*" element={<AcademicCalendar />} />
            <Route path="/attendance/*" element={<Attendance />} /> */}

            {/** Dynamic set the routes**/}

            {userState?.permissions[0]?.module?.map((m) => {
            const RouteModule = allRoutes.find((a) => a.key === m.key);
            console.log(RouteModule, "DDDDDDDDDDD")
            return (
              <Route path={RouteModule.path} element={<RouteModule.element readAccess={m.read}
              updateAccess={m.update}
              writeAccess={m.write}
              deleteAccess={m.delete}/>} />
            );
          })}


            {/* <Route path="/content/*" element={<ContentManagement />} /> */}
            {/* <Route exact strict path="/profile/:id" element={<StudentProfileView />} /> */}
            <Route exact strict path="/profile/:id" element={<StudentProfile />} />
            <Route exact strict path="/profile/create" element={<Main />} />
            <Route exact strict path="/profile/CreateParents" element={<CreateParent />} />
            <Route exact strict path="/profile/CreateTeacher" element={<Mains />} />
            {/* <Route exact strict path="/teacherprofile/:id" element={<TeacherProfileView />} /> */}
            {/* <Route exact strict path="/teacherprofile/:id" element={<TeacherProfileView />} /> */}
            {/* <Route exact strict path="/teacherprofile/:id" element={<TeacherProfileView />} /> */}
            <Route exact strict path="/teacherprofile/:id" element={<TeacherProfile />} />
            {/* <Route exact strict path="/parents/:id" element={<Parents />} /> */}
            <Route exact strict path="/parents/:id" element={<ParentProfile />} />
            <Route path="/videoplayer" element={<CustomVideoPlayer />} />
            <Route exact strict path="/profile/" element={<StudentProfile />} />
          </Routes>
        </div>
        {/* <img src={top_image} className={styles.topImage} />
        <img src={top_leftimage} className={styles.topLeft} />
        <img src={bottom_right} className={styles.bottomRight} /> */}
      </Box>
    </Box>
  );
}

const drawerList = [
  {
    title: 'Dashboard',
    key: 6,
    id: 0,
    icon: dashboard_img,
    list: [
      //   {
      //   title: "Analytics",
      //   id: 0,
      //   url: 'analytics',
      //   icon: analytics_img,
      // },
      {
        title: "Courses",
        id: 1,
        url: 'courses',
        icon: analytics_img,
      },

    ],
  },
  {
    title: "Account Management",
    id: 1,
    key: 1,
    icon: account_management,
    list: [
      // {
      //   title: "School Profile",
      //   id: 11,
      //   url: "account/school",
      //   icon: school
      // }, 
      {
        title: "Teacher Profile",
        id: 12,
        url: "account/teacher",
        icon: Teachers
      }, {
        title: "Student Profile",
        id: 13,
        url: "account/student",
        icon: student,
      },
      // {
      //   title: "Parent Profile",
      //   id: 13,
      //   url: "account/parents",
      //   icon: Parentsicon
      // }
    ]
  },
  {
    title: "Teaching Resource",
    id: 2,
    key: 2,
    icon: content_management,
    list: [
      // {
      //   title: "Select",
      //   id: 20,
      //   url: "content/select"
      // },
      {
        title: "Ebooks",
        id: 20,
        url: "content/ebooks",
        icon: Ebooks
      },
      {
        title: "PPT",
        id: 21,
        url: "content/ppt/view",
        icon: PPT
      },
      {
        title: "Lesson Plan",
        id: 22,
        url: "content/lesson-plan",
        icon: Ebooks
      },
      // {
      //   title: "Mindmaps",
      //   id: 23,
      //   url: "content/mindmap",
      //   icon: Mindmap
      // }
      , {
        title: "MCQ",
        id: 24,
        url: "content/test/testList",
        icon: Tests,
      },
      {
        title: "Worksheets",
        id: 25,
        url: "content/qa/qalist",
        icon: Tests,
      },
      {
        title: "Do it Yourself",
        id: 25,
        url: "content/doityourself/doityourselflist",
        icon: Tests,
      },
      // {
      //   title: "Assignments",
      //   id: 26,
      //   url: "content/assignment/assignList",
      //   // icon: Assignments
      //   icon:Tests,
      // },
      // {
      //   title: "Activity Videos",
      //   id: 27,
      //   url: "content/videos/videoslist",
      //   icon: videos
      // },
    ]
  },
  {
    title: "STEAM Reports",
    id: 3,
    key: 3,
    icon: content_management,
    list: [{
      title: "Class VI",
      id: 16,
      icon: student,
      url: "test-report/16"
    },
    {
      title: "Class VII",
      id: 17,
      icon: student,
      url: "test-report/17"
    },
    {
      title: "Class VIII",
      id: 18,
      icon: student,
      url: "test-report/18"
    },
    {
      title: "Class IX",
      id: 15,
      icon: student,
      url: "test-report/15"
    },
    {
      title: "Class X",
      id: 19,
      icon: student,
      url: "test-report/19"
    },
    // {
    //   title: "Brainmapping Reports",
    //   id: 32,
    //   url: "all-test-report",
    //   icon: student,
    // },
  ]
  },
  {
    title: 'Brainmapping Reports',
    key: 4,
    id: 4,
    icon: content_management,
    list: [
      //   {
      //   title: "Analytics",
      //   id: 0,
      //   url: 'analytics',
      //   icon: analytics_img,
      // },
      {
        title: "Brainmapping Report",
        id: 1,
        url: 'all-test-report',
        icon: student,
      },

    ],
  },
  // {
  //   title: "All student Report",
  //   id: 4,
  //   key: 4,
  //   icon: content_management,
  //   list: [{
  //     title: "Report",
  //     id: 31,
  //     icon: student,
  //     url: "all-test-report"
  //   },
  // ]
  // }
  // {
  //   title: "Attendance",
  //   id: 2,
  //   key: 3,
  //   icon: academic_calendar,
  //   list: [{
  //     title: "Attendance",
  //     id: 31,
  //     icon: student,
  //     url: "attendance/students"
  //   }, 
  //   // {
  //   //   title: "Teachers",
  //   //   id: 32,
  //   //   url: "attendance/teachers",
  //   //   icon: Parentsicon
  //   // },
  // ]
  // }, 
  // {
  //   title: "Academic Calendar",
  //   id: 3,
  //   key: 4,
  //   icon: attendance,
  //   list: [{
  //     title: "Daily Classes",
  //     id: 41,
  //     url: "calendar/daily-classes",
  //     icon: Daily_classes
  //   }, {
  //     title: "Holidays",
  //     id: 42,
  //     url: "calendar/holidays",
  //     icon: holidays,
  //   }, {
  //     title: "Special Events",
  //     url: 'events',
  //     id: 43,
  //     url: 'calendar/special-events',
  //     icon: special_event
  //   }, {
  //     title: "Exams",
  //     id: 44,
  //     url: 'calendar/exams',
  //     icon: exams
  //   }, {
  //     title: "Tests",
  //     id: 45,
  //     url: "calendar/tests",
  //     icon: Tests
  //   }, {
  //     title: "Birthdays",
  //     id: 46,
  //     url: "calendar/birthdays",
  //     icon: Birthdays
  //   }, {
  //     title: "Fee due dates",
  //     id: 47,
  //     url: "calendar/fee-due-dates",
  //     icon: fee_due_dates
  //   },]
  // },

  // {
  //   title: "Fee Management",
  //   id: 3,
  //   key: 5,
  //   icon: fee_management,
  //   list: [

  //   {
  //     title: "Students",
  //     id: 52,
  //     url: "fees/feelist",
  //     icon: student
  //   },]
  // }
]



  // const birthdays = [
  //   {
  //     id: 7,
  //     first_name: "",
  //     last_name: "",
  //     dateofBirth: "",
  //     image: "",
  //   },
  //   {
  //     id: 8,
  //     first_name: "",
  //     last_name: "",
  //     dateofBirth: "",
  //     image: "",
  //   },
  //   {
  //     id: 6,
  //     first_name: "",
  //     last_name: "",
  //     dateofBirth: "",
  //     image: "",
  //   },
  // ]
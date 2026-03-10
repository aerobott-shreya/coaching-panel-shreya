export const drawerLists = [
    {
      title: 'Dashboard',
      key: 6,
      id: 0,
      icon: dashboard_img,
      list: [{
        title: "Analytics",
        id: 0,
        url: 'analytics',
        icon: analytics_img,
      }],
    },
    {
      title: "Account Management",
      id: 1,
      key: 1,
      icon: account_management,
      list: [
        {
          title: "School Profile",
          id: 11,
          url: "account/school",
          icon: school
        }, {
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
      title: "Content Management",
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
          title: "PPT",
          id: 21,
          url: "content/ppt",
          icon: PPT
        },
        {
          title: "Notes",
          id: 22,
          url: "content/ebooks",
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
          title: "Q&A",
          id: 25,
          url: "content/qa/qalist",
          icon: Tests,
        },
        // {
        //   title: "Assignments",
        //   id: 26,
        //   url: "content/assignment/assignList",
        //   icon: Assignments
        // },
        {
          title: "Videos",
          id: 27,
          url: "content/videos/videoslist",
          icon: videos
        },
      ]
    }, 
    {
      title: "Attendance",
      id: 2,
      key: 3,
      icon: academic_calendar,
      list: [{
        title: "Attendance",
        id: 31,
        icon: student,
        url: "attendance/students"
      }, 
      // {
      //   title: "Teachers",
      //   id: 32,
      //   url: "attendance/teachers",
      //   icon: Parentsicon
      // },
    ]
    }, 
    {
      title: "Academic Calendar",
      id: 3,
      key: 4,
      icon: attendance,
      list: [{
        title: "Daily Classes",
        id: 41,
        url: "calendar/daily-classes",
        icon: Daily_classes
      }, {
        title: "Holidays",
        id: 42,
        url: "calendar/holidays",
        icon: holidays,
      }, {
        title: "Special Events",
        url: 'events',
        id: 43,
        url: 'calendar/special-events',
        icon: special_event
      }, {
        title: "Exams",
        id: 44,
        url: 'calendar/exams',
        icon: exams
      }, {
        title: "Tests",
        id: 45,
        url: "calendar/tests",
        icon: Tests
      }, {
        title: "Birthdays",
        id: 46,
        url: "calendar/birthdays",
        icon: Birthdays
      }, {
        title: "Fee due dates",
        id: 47,
        url: "calendar/fee-due-dates",
        icon: fee_due_dates
      },]
    }, 
    {
      title: "Fee Management",
      id: 3,
      key: 5,
      icon: fee_management,
      list: [{
        title: "Ledger",
        id: 51,
        url: "",
        icon: content_management
      }, {
        title: "Students",
        id: 52,
        url: "",
        icon: student
      },]
    }]
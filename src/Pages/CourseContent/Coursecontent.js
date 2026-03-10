import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Paper,
  TableCell,
  Table,
  TableBody,
  TableRow,
  Button,
  Grid,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { getBaseItemsLists } from "../../Utils/GeneralApiCalls";
import { api_call, base_url, api_call_token } from "../../Utils/Network";
import { ButtonDivRight, useBtnPropsPrimary } from "../../Utils/CustomHooks";
import { falseChecker, getValues, scrolltoend2 } from "../../Utils/Utils";
import SearchField from "react-search-field";
import Filter from "../../Component/Filter/Filter";
import { UserCredsContext } from "../../ContextApi/UserCredContext/UserCredsContext";
// import './OnlineCourseListing.css'
import { OnlineCourseShimmer } from "../../Component/Shimmers/Shimmers";
import DeleteIcon from "@material-ui/icons/Delete";
import { IsDesktopOrLaptopWrapper } from "../../Utils/Responsive";

const demoList = [
  {
    id: 1,

    title: "course 1",
    videos_count: 3,
    notes_count: 2,
    test_count: 5,
    grade: { title: "12th" },
    subject: [],
    board: {},
    price: "",
  },
  {
    id: 2,
    title: "course 2",
    videos_count: 2,
    notes_count: 1,
    test_count: 3,
    grade: { title: "12th" },
    subject: [],
    board: {},
    price: "",
  },

  {
    id: 3,

    title: "course 3",
    videos_count: 9,
    notes_count: 2,
    test_count: 1,
    grade: { title: "12th" },
    subject: [],
    board: {},
    price: "",
  },

  {
    id: 4,

    title: "course 4",
    videos_count: 0,
    notes_count: 2,
    test_count: 6,
    grade: { title: "12th" },
    subject: [],
    board: {},
    price: "",
  },
];

class Coursecontent extends Component {
  constructor(props) {
    console.log(props, "CourseContent");
    super(props);

    this.state = {
      course_list: [],
      otherData: {
        max_pages: null,
        next_page: 1,
        next_page_link: "/content/panel/course/?page=1",
        page: 1,
        previous_page: null,
        previous_page_link: null,
        total_count: null,
      },
      search_course: "",
      grade: undefined,
      board: undefined,
      subject: undefined,
      filter_lists: {
        grade: { name: "grade", value: [], list: [] },
        subject: { name: "subject", value: [], list: [] },
        board: { name: "board", value: [], list: [] },
      },
      courseLoading: true,
      paginationLoader: false,
      open: false,
      ids: null,
      idxs: null,
    };
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.otherData.next_page_link);
  }

  handleDialogClose() {
    this.setState({
      open: false,
    });
  }

  getData = (url = this.state.otherData.next_page_link) => {
    const { setChapter_list } = this.context;

    this.setState((ps) => ({
      otherData: { ...this.state.otherData, next_page_link: null },
      courseLoading: ps.otherData.next_page === 1,
      paginationLoader: ps.otherData.next_page > 1,
    }));
    // logic to make params for url
    if (this.state.otherData.page === 1) {
      if (falseChecker(this.state.search_course)) {
        url += `&q=${this.state.search_course}`;
      }

      let { grade, board, subject } = this.state.filter_lists;
      if (falseChecker(grade.value.length > 0)) {
        grade.value.forEach((grd) => {
          url += `&grade=${grd.name}`;
        });
      }

      if (falseChecker(board.value.length > 0)) {
        board.value.forEach((brd) => {
          url += `&board=${brd.name}`;
        });
      }

      if (falseChecker(subject.value.length > 0)) {
        subject.value.forEach((sub) => {
          url += `&subject=${sub.name}`;
        });
      }
    }
    console.log("CAlling url", url, this.state.otherData.page);
    api_call_token
      .get(url)
      .then((response) => {
        console.log("the list corses are ", response.data.data);
        let { data, next_page_link, next_page, ...otherData } = response.data;
        setChapter_list(data);
        this.setState({
          course_list:
            this.state.otherData.page === 1
              ? data
              : [...this.state.course_list, ...data],
          otherData: {
            ...otherData,
            next_page,
            next_page_link:
              falseChecker(next_page_link) && typeof next_page_link === "string"
                ? next_page_link.replace(api_call_token, "")
                : next_page_link,
          },
          courseLoading: false,
          paginationLoader: false,
        });
      })
      .catch((error) => {
        console.error("the couser list error", error);
        this.setState({
          courseLoading: false,
          paginationLoader: false,
        });
      });
  };

  // handleClickOpen = () => {
  //   setOpen(true);
  // };

  // handleClose = () => {
  //   setOpen(false);
  // };

  static contextType = UserCredsContext;
  componentDidUpdate() {}

  handleFilter = async (_obj) => {
    console.log("The handleFilter called ", _obj);

    let { value: _value, name } = _obj;
    let filter_lists = this.state.filter_lists;

    if (
      filter_lists.hasOwnProperty(name) &&
      _value !== "" &&
      _value !== undefined &&
      _value !== null &&
      name !== "" &&
      name !== undefined &&
      name !== null
    ) {
      const last_val = _value[_value.length - 1];
      let bb = -1;

      if (last_val !== undefined && last_val.hasOwnProperty("value")) {
        bb = filter_lists[name]["value"]
          .map((item) => item.value)
          .indexOf(last_val.value);
      }

      if (bb === -1 || filter_lists[name]["value"].length > _value.length) {
        filter_lists[name]["value"] = _value;
      } else {
        filter_lists[name]["value"].splice(bb, 1);
      }

      this.setState({
        filter_lists,
      });
    }
  };

  deleteCourse = (idx, id) => {
    const { course_list } = this.state;

    console.log(idx, id, "HEll");

    api_call_token
      .delete(`content/panel/course/${id}`)
      .then((resp) => {
        if (
          resp.data.data ===
          `Can't delete course, student purchased this course`
        ) {
          return alert(resp.data.data);
        }
        course_list.splice(idx, 1);
        this.setState({
          course_list,
        });
      })
      .catch((error) => {
        console.warn(error);
      });
      this.handleDialogClose();
  };
  render() {
    // scrolltoend2 func for pagination
    scrolltoend2(
      "course-table",
      this.state.otherData.next_page_link,
      "",
      this.getData.bind(this),
      () => {}
    );
    let { filter_lists, courseLoading, paginationLoader } = this.state;

    const { base_items } = this.context;
    // console.log(base_items, "BSS");
    filter_lists.grade.list = base_items.grade.map(({ title, id }) => ({
      name: title,
      value: id,
    }));
    filter_lists.board.list = base_items.board.map(({ title, id }) => ({
      name: title,
      value: id,
    }));
    filter_lists.subject.list = base_items.subject.map(({ title, id }) => ({
      name: title,
      value: id,
    }));

    // console.log(this.state.ids, this.state.idxs , "Value");
    return (
      <>
        <div style={{ paddingTop: "70px" }}>
          {/* <div style={{ textAlign: 'right', paddingRight: '15px' }}>
                        <Button {...useBtnPropsPrimary} onClick={() => { this.props.history.push("/content/") }}>Add new Course</Button>
                    </div> */}

          <div style={{ padding: "10px" }}>
            <Grid container justify="center" alignItems="center">
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <div
                  style={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    textAlign: "center",
                    width: "80%",
                    borderRight: "2px solid grey",
                  }}
                >
                  <SearchField
                    placeholder="Search Courses..."
                    onChange={(e) => this.setState({ search_course: e })}
                    classNames="course-search-cp"
                    onSearchClick={() => {
                      this.setState(
                        {
                          otherData: {
                            ...this.state.otherData,
                            page: 1,
                            next_page_link: "/content/panel/course/?page=1",
                          },
                        },
                        () => {
                          this.getData();
                        }
                      );
                    }}
                    onEnter={() => {
                      this.setState(
                        {
                          otherData: {
                            ...this.state.otherData,
                            page: 1,
                            next_page_link: "/content/panel/course/?page=1",
                          },
                        },
                        () => {
                          this.getData();
                        }
                      );
                    }}
                  />
                </div>
              </Grid>

              <Grid item lg={7} md={12} sm={12} xs={12}>
                <Filter
                  grid_config={{ lg: 4, md: 6, sm: 12, xs: 12 }}
                  filterObject={filter_lists}
                  onChange={(e) => this.handleFilter(e)}
                />
              </Grid>
              <Grid item lg={1} md={1} sm={12} xs={12}>
                <div style={{ textAlign: "center" }}>
                  <Button
                    {...useBtnPropsPrimary}
                    onClick={() => {
                      this.setState(
                        {
                          otherData: {
                            ...this.state.otherData,
                            page: 1,
                            next_page_link: "/content/panel/course/?page=1",
                          },
                        },
                        () => {
                          this.getData();
                        }
                      );
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>

          <Paper style={{ width: "90%", margin: "15px auto", padding: "15px" }}>
            <Table id={"course-table"}>
              <TableBody>
                <TableRow style={{ color: "black", fontWeight: "600" }}>
                  <TableCell className="on-crs-tb-head-q12">
                    {" "}
                    Course name{" "}
                  </TableCell>
                  <IsDesktopOrLaptopWrapper>
                    <TableCell className="on-crs-tb-head-q12">Grade </TableCell>
                    <TableCell className="on-crs-tb-head-q12">
                      {" "}
                      Subject{" "}
                    </TableCell>
                    <TableCell className="on-crs-tb-head-q12">
                      {" "}
                      Board{" "}
                    </TableCell>
                    <TableCell className="on-crs-tb-head-q12">
                      Videos{" "}
                    </TableCell>
                    <TableCell className="on-crs-tb-head-q12"> Notes</TableCell>
                    <TableCell className="on-crs-tb-head-q12"> Test </TableCell>
                  </IsDesktopOrLaptopWrapper>
                  <TableCell
                    className="on-crs-tb-head-q12"
                    style={{ width: "40px" }}
                  >
                    {" "}
                    Delete{" "}
                  </TableCell>
                </TableRow>

                {courseLoading ? (
                  <>
                    <OnlineCourseShimmer />

                    <OnlineCourseShimmer />
                    <OnlineCourseShimmer />
                    <OnlineCourseShimmer />
                    <OnlineCourseShimmer />
                    <OnlineCourseShimmer />
                    <OnlineCourseShimmer />
                    <OnlineCourseShimmer />

                    <OnlineCourseShimmer />
                  </>
                ) : (
                  <>
                    {" "}
                    {this.state.course_list.map(
                      (
                        {
                          id,
                          title,
                          subject,
                          video_count,
                          notes_count,
                          test_count,
                          ...course
                        },
                        idx
                      ) => {
                        return (
                          <>
                            <TableRow key={idx} style={{ cursor: "pointer" }}>
                              <TableCell
                                onClick={() =>
                                  this.props.history.push(`/content/${id}`)
                                }
                              >
                                {title}
                              </TableCell>
                              <IsDesktopOrLaptopWrapper>
                                <TableCell
                                  onClick={() =>
                                    this.props.history.push(`/content/${id}`)
                                  }
                                >
                                  {getValues(course, "grade", "title")}{" "}
                                </TableCell>
                                <TableCell
                                  onClick={() =>
                                    this.props.history.push(`/content/${id}`)
                                  }
                                >
                                  {subject.map((subj) => subj.title).join(", ")}
                                </TableCell>
                                <TableCell
                                  onClick={() =>
                                    this.props.history.push(`/content/${id}`)
                                  }
                                >
                                  {getValues(course, "board", "title")}{" "}
                                </TableCell>
                                <TableCell
                                  onClick={() =>
                                    this.props.history.push(`/content/${id}`)
                                  }
                                >
                                  {video_count}{" "}
                                </TableCell>
                                <TableCell
                                  onClick={() =>
                                    this.props.history.push(`/content/${id}`)
                                  }
                                >
                                  {notes_count}
                                </TableCell>
                                <TableCell
                                  onClick={() =>
                                    this.props.history.push(`/content/${id}`)
                                  }
                                >
                                  {test_count}
                                </TableCell>
                              </IsDesktopOrLaptopWrapper>
                              <TableCell style={{ width: "40px" }}>
                                {" "}
                                <IconButton
                                  color="primary"
                                  // onClick={() => this.deleteCourse(idx, id)}
                                  onClick={() =>
                                    this.setState({
                                      open: !this.state.open,
                                      ids: idx,
                                      idxs: id,
                                    })
                                  }
                                >
                                  <DeleteIcon color="primary" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      }
                    )}
                  </>
                )}
              </TableBody>
            </Table>

            {paginationLoader && (
              <div
                style={{
                  padding: "20px 0px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <CircularProgress color="secondary" />
              </div>
            )}
          </Paper>
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to delete this course?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleDialogClose}>
              Cancel
            </Button>
            <Button
              // onClick={handleClose}
              onClick={() => this.deleteCourse(this.state.ids, this.state.idxs)}
              color="primary"
              autoFocus
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withRouter(Coursecontent);

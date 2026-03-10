import React, { Component, createContext } from "react";
import { createTheme } from "@mui/material/styles";
import { api_open, api_token } from "../../Utils/Network";
export const UserCredsContext = createContext();

const localstorage_state = localStorage.getItem("coaching_user_cred_context");

function getLocalData(keyname) {
  // Function to return values from local storage

  let object = null;

  try {
    object = JSON.parse(localstorage_state);
  } catch {
    console.error("There was error while parsing data from localstorage.");
  }

  if (object) {
    if (object[keyname]) {
      return object[keyname];
    }
  }

  if (keyname === "themeMode") return "dark";
  if (keyname === "user_state") return {};
  if (keyname === "token") return { access: "", refresh: "" };
  if (keyname === "nftData") return {};
  return "";
}


class UserCredsContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: createTheme({
        palette: {
          primary: { 500: "#216E91" },
          secondary: { A400: "#9CCFCF" },
          white: { 500: "rgba(255,255,255)" },
          mode: "light",
        },
      }),
      col: {
        primary: "#216E91",
        secondary: "#9CCFCF",
        ternary: "#006080",
      },
      content_selection: {
        // board: null,
        // subject: null,
        grade: null,
        course: null,
      },
      themeMode: getLocalData("themeMode"),
      user_state: getLocalData("user_state"),
      token: getLocalData("token"),
      boards: [],
      grades: [],
      class: [],
      section: [],
      subject: [],
      state: [],
      country: [],
      tags: [],
      institute:[],
      urls: '',
    };
    this.setThemeMode = this.setThemeMode.bind(this);
    this.setUserState = this.setUserState.bind(this);
    this.setUsers = this.setUsers.bind(this);
    this.setContent = this.setContent.bind(this);
    this.boardList = this.boardList.bind(this);
    this.gradeList = this.gradeList.bind(this);

    this.stateList = this.stateList.bind(this);
    this.countryList = this.countryList.bind(this);
    this.getInstituteListing = this.getInstituteListing.bind(this);
    // this.classList = this.classList.bind(this);
    // this.sectionList = this.sectionList.bind(this);
    this.subjectList = this.subjectList.bind(this);
    this.setToken = this.setToken.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.setTags = this.setTags.bind(this);
  }




  componentDidMount() {
    
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("coaching_user_cred_context", JSON.stringify(this.state));
    });
    this.boardList();
    this.gradeList();
    // this.classList();
    // this.sectionList();
    this.subjectList();
    this.setTags();
    this.stateList();
    this.countryList();
    this.getInstituteListing();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user_state !== this.state.user_state) {
      // localStorage.setItem("coaching_user_cred_context", JSON.stringify(this.state));
    }
  }


  componentWillUnmount() { 

  }

  setThemeMode = (_boolean_value) => { };


  boardList = () => {
    api_open.get(`/base/board/`).then((res) => this.setState({ boards: res.data.data }))
  }

  stateList = () => {
    api_open.get(`/profile/state/`).then((res) => this.setState({ stateList: res.data.data }))
  }

  countryList = () => {
    api_open.get(`/profile/country/`).then((res) => this.setState({ countryList: res.data.data }))
  }

  // gradeList = () => {
  //   api_open.get(`/base/v1/grade/`).then((res) => this.setState({ grades: res.data.data }))
  // }

  gradeList = () => {
    api_token.get(`/base/grade/`).then((res) => this.setState({ grades: res.data.data }))
  }
  

  subjectList = () => {
    api_open.get(`/base/subject`).then((res) => this.setState({ subject: res.data.data }))
  }
  // subjectList = () => {
  //   api_open.get(`content/panel/course/`).then((res) => this.setState({ subject: res.data.data }))
  // }

  setTags = () => {
    api_token.get(`/content/taxonomy/`).then((res) => this.setState({ tags: res.data.data }))
  }
  getInstituteListing = () => {
    api_open.get(`base/institute/listing`).then((response) => {
      this.setState({institute: response.data.data})
    })
  }
  // classList = () => {
  //   api_token.get(`/base/v1/class/`).then((res) => this.setState({ class: res.data.data }))
  // }

  // sectionList = () => {
  //   api_open.get(`/base/v1/section/`).then((res) => this.setState({ section: res.data.data }))
  // }

  setUserState = (user_data, token_data) => {
    this.setState({ user_state: user_data, token: token_data });
  };

  setUsers = (user_datas) => {
    this.setState({ user_state: user_datas})
  }

  setContent = (content) => {
    this.setState({ content_selection: content })
  }

  setToken(_token) {
    this.setState({ token: _token.token })
  }

  setUrl(urls){
    this.setState({ urls: urls});
  }


  logout = () => {
    this.setState(
      {
        themeMode: "dark",
        user_state: {},
        token: { access: "", refresh: "" },
        boards: [],
        grades: [],
        class: [],
        section: [],
        subject: [],
        tags: [],
        stateList: [],
        countryList: [],
        urls: "",
      },
      () => {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/"; //or use "/login"
        }, 500);
      }
    );
  };

  render() {
    const {  institute } = this.state;
    return (
      <UserCredsContext.Provider
        value={{
          theme: this.state.theme,
          col: this.state.col,
          themeMode: this.state.themeMode,
          content_selection: this.state.content_selection,
          setUserState: this.setUserState,
          setUsers: this.setUsers,
          setUser: this.setUser,
          logout: this.logout,
          userState: this.state.user_state,
          token_data: this.state.token,
          setToken: this.setToken,
          setContent: this.setContent,
          setUrl: this.setUrl,
          urls: this.state.urls,
          boardList: this.state.boards,
          gradeList: this.state.grades,
          instituteList: institute,
          stateList: this.state.stateList,
          countryList: this.state.countryList,
          // classList: this.state.class,
          // sectionList: this.state.section,
          subjectList: this.state.subject,
          tagList: this.state.tags,
        }}
      >
        {this.props.children}
      </UserCredsContext.Provider>
    );
  }
}

export default UserCredsContextProvider;

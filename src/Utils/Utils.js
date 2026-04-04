export function convertCalendarDate(_data) {
    var custom_data = [..._data];
    for (var i = 0; i < custom_data.length; i++) {
        const { year, month, date } = getDate(custom_data[i].date);
        console.log(year, month, date ,'year, month, date ')
        const { hr: s_hr, min: s_min, sec: s_sec } = getTime(custom_data[i].commence);
        const { hr: e_hr, min: e_min, sec: e_sec } = getTime(custom_data[i].conclude);
        custom_data[i].start = new Date(year, month-1, date, s_hr, s_min, s_sec);
        custom_data[i].end = new Date(year, month-1, date, e_hr, e_min, e_sec)
    }
    return custom_data;
}

export function getDate(_date) {
    var myDate = _date.split("-");
    const year = Number(myDate[0]);
    const month = Number(myDate[1]);
    const date = Number(myDate[2]);
    return { year, month, date }
}

export function getTime(_time) {
    var myTime = _time.split(":");
    const hr = Number(myTime[0]);
    const min = Number(myTime[1]);
    const sec = Number(myTime[2]);
    return { hr: myTime[0], min: myTime[1], sec: myTime[2] }
}

export function getCurrentDateTime() {
    const _date = new Date();
    const year = _date.getFullYear();
    const month = _date.getMonth();
    const date = _date.getDate();
    return { year, month, date }
}

export function checkEmptyObject(params) {
    return [...Object.values(params)].every(Boolean);
}

export function checkObjectValues(obj) {
    // debugger;
    for (let key in obj) {
      if (obj[key]) {
        return false;
      }
    }
    return true;
  }export function stripHtml(html) {
  return html ? html.replace(/<[^>]*>?/gm, "") : "";
}

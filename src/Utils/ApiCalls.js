// export async function login({ username, password }) {
//     return new Promise((resolve, reject) => {
//         api_token.get(`calender/v1/events/?month=12&year=2022`)
//             .then(response => {
//                 console.log(response)
//                 const data = convertCalendarDate(response.data.data);
//                 setCalendarData(data)
//             })
//             .catch(error => {

//             })
//     });
// }
import moment from "moment";

export function getDayOfWeek(date) {
  const day = moment(date).day();
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayOfWeek[day];
}

// export function getDayOfWeek(date) {
//   return moment.date(date).day;
// }

export function getLastWeek() {
  //   console.log(moment().subtract(7, "days"));
  return moment().subtract(7, "days");
}

export function convertDateIntoMillSeconds(date) {
  return moment(date).valueOf();
}

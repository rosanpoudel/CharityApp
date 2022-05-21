export default function convertDate(dateToConvert) {
  var d = new Date(dateToConvert);
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  var yyyy = d.getFullYear();
  var hours = d.getHours();
  var hour = hours % 12;
  if (hour === 0) {
    hour = 12;
  }
  var minute = d.getMinutes();
  if (minute.toString().length === 1) {
    var minutes = '0' + minute;
  } else {
    var minutes = minute;
  }

  var ampm = hours >= 12 ? ' PM' : 'AM';

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const name = monthNames[d.getMonth()];

  return {
    dashedDate: `${yyyy}-${mm}-${dd}`,
    slashedDate: `${mm}/${yyyy}`,
    monthDate: `${dd} ${name} ${yyyy}`,
    timeDate: `${dd} ${name} ${yyyy} at ${hour}:${minutes} ${ampm}`,
    day: `${dd}`,
  };
}

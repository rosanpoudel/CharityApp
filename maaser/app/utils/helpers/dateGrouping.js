import moment from 'moment';

export default function groupDataByDate(dataToGroup) {
  const groupedData = Object.values(
    dataToGroup.reduce((acc, item) => {
      if (!acc[moment(item.createdat).format('DD MMMM YYYY')])
        acc[moment(item.createdat).format('DD MMMM YYYY')] = {
          title: moment(item.createdat).format('DD MMMM YYYY'),
          data: [],
        };

      acc[moment(item.createdat).format('DD MMMM YYYY')].data.push(item);

      return acc;
    }, {}),
  );
  return groupedData;
}

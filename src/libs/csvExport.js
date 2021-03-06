import json2csv from 'json2csv';

export default (data, fields, fieldNames, fileName) => {
  try {
    let result = json2csv({
      data: data,
      fields: fields,
      fieldNames: fieldNames,
      flatten: true,
      preserveNewLinesInValues: true
    });
    let csvContent = "data:text/csv;charset=GBK,\uFEFF" + result;
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${(fileName || 'file')}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "my_data.csv".
    document.body.removeChild(link); // Required for FF

  } catch (err) {
    // Errors are thrown for bad options, or if the data is empty and no fields are provided. 
    // Be sure to provide fields if it is possible that your data array will be empty. 
    console.error(err);
  }
}

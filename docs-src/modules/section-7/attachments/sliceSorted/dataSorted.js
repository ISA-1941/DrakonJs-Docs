function dataSorted(data, value) {
    const size = data.length;
    let i = 0;
    while (true) {
      if (i < size) {
        if (data[i] >= value) {
          console.log("The element value -->", value);
          return;
        }
      } else {
        break;
      }
      i++;
    }
  }
  
    const data = [2, 4, 21, 34, 43, 48, 51, 56, 63];
    console.log("Input data -->", data);
    const value = 34;
    dataSorted(data, value);

 
import http from 'http';

const reqRes = {
  get: (path, callback) => {
    http.get(path, (res) => {
      let resData = '';
      res.on('error', (err) => console.error(err));
      res.on('data', (data) => {
        resData += data.toString();
      });
      res.on('end', () => {
        return callback(JSON.parse(resData));
      })
    })
  },
  request: (path, method, payload, callback) => {
    const options = {
      hostname: 'localhost',
      path,
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    const req = http.request(options, (res) => {
      let resData = '';
      res.on('error', (err) => console.error(err));
      res.on('data', (data) => {
        resData += data.toString();
      })
      res.on('end', () => {
        return callback(JSON.parse(resData));
      });
    });
    req.write(payload);
    req.end();
  }
};

export default reqRes;

const fs = require('fs');

class JsonService {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getData() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, (err, data) => {
        if (err) {
          reject(err);
        }
        const parsedData = JSON.parse(data);

        resolve(parsedData);
      })
    })
  }

  getSingleData(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, (err, data) => {
        if (err) {
          reject(err);
        }
        const parsedData = JSON.parse(data);
        const singleData = parsedData.find(item => item.id === +id);

        resolve(singleData);
      })
    })
  }

  async createData(data) {
    try {
      const currentData = await this.getData();

      return new Promise((resolve, reject) => {
        const highestId = Math.max(...currentData.map((item) => item.id));
        const newRecord = { id: highestId + 1, ...data };
        const newData = [...currentData, newRecord];

        fs.writeFile(this.filePath, JSON.stringify(newData), (err) => {
          if (err) {
            reject(err);
          }
          resolve(newRecord);
        })
      })
    } catch (e) {
      throw e;
    }
  }

  async deleteData(id) {
    try {
      const currentData = await this.getData();

      return new Promise((resolve, reject) => {
        const newData = currentData.filter(user => user.id !== +id);

        fs.writeFile(this.filePath, JSON.stringify(newData), (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        })
      })
    } catch (e) {
      throw e;
    }
  }

  async editData({ id, data }) {
    try {
      const currentData = await this.getData();

      return new Promise((resolve, reject) => {
        let newDataIndex;
        const newData = currentData.map((current, index) => {
          if (current.id === id) {
            newDataIndex = index;
            return {...current, ...data}
          }
          return current;
        });

        fs.writeFile(this.filePath, JSON.stringify(newData), (err) => {
          if (err) {
            reject(err);
          }
          resolve(newData[newDataIndex]);
        })
      })
    } catch (e) {
      throw e;
    }
  }

  searchData(q) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, (err, data) => {
        if (err) {
          reject(err);
        }
        const parsedData = JSON.parse(data);
        const findedData = parsedData.filter((item) => {
          return item.name.toLowerCase().includes(q.toLowerCase());
        })

        resolve(findedData);
      });
    });
  };
};

module.exports = JsonService;
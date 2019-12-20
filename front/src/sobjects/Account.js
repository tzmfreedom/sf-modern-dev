export default {
  query(query, result) {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV === "production") {
        //eslint-disable-next-line no-undef
        Visualforce.remoting.Manager.invokeAction(
          "ApiController.query",
          query,
          (result, event) => {
            if (event.status) {
              resolve(result);
            } else if (event.type === "exception") {
              reject();
            } else {
              reject();
            }
          },
          { escape: true }
        );
      } else {
        resolve(result);
      }
    });
  },
  findAll() {
    return this.query("SELECT Id, Name FROM Account", [
      {
        Id: "123",
        Name: "hogehoge"
      },
      {
        Id: "235",
        Name: "aaaabbbb"
      }
    ]);
  },
  findOne() {
    return this.query("SELECT Id, Name, CreatedDate FROM Account LIMIT 1", [
      {
        Id: "123",
        Name: "hogehoge",
        CreatedDate: 1536666350000,
      },
    ]);
  }
};

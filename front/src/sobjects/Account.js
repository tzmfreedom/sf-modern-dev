export default {
  query(query, result) {
    return call('ApiController.query', [query], result)
  },
  call(action, args, result) {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV === "production") {
        //eslint-disable-next-line no-undef
        Visualforce.remoting.Manager.invokeAction(
          action,
          ...args,
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
  findById(id) {
    return this.query(`SELECT Id, Name, CreatedDate FROM Account WHERE id = '${id}'`, [
      {
        Id: "123",
        Name: "hogehoge",
        CreatedDate: 1536666350000,
      },
    ]);
  },
  create(type, properties) {
    return this.call('ApiController.create', [type, properties], { success: true })
  }
};

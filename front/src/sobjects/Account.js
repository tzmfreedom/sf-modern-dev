export default {
  call(action, args, result) {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV === "production") {
        //eslint-disable-next-line no-console
        console.log(action, args);
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
  query(query, result) {
    return this.call('ApiController.query', [query], result)
  },
  findAll() {
    return this.query("SELECT Id, Name, CreatedDate FROM Account ORDER BY CreatedDate DESC", [
      {
        Id: "123",
        Name: "hogehoge",
        CreatedDate: 1536666350000,
      },
      {
        Id: "235",
        Name: "aaaabbbb",
        CreatedDate: 1536666350000,
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
  create(properties) {
    return this.call('ApiController.create', ['Account', properties], { success: true, id: '123' })
  }
};

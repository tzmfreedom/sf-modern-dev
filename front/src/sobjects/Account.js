export default {
  call(action, args, result) {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV === "production") {
        //eslint-disable-next-line no-undef
        Visualforce.remoting.Manager.invokeAction(
          action,
          ...args,
          (result, event) => {
            if (event.status && result.success) {
              resolve(result);
            } else if (event.type === "exception") {
              reject(result);
            } else {
              reject(result);
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
    return this.call("ApiController.query", [query], result);
  },
  findAll() {
    return this.query(
      "SELECT Id, Name, CreatedDate FROM Account ORDER BY CreatedDate DESC",
      {
        success: true,
        records: [
          {
            Id: "123",
            Name: "hogehoge",
            CreatedDate: 1536666350000
          },
          {
            Id: "235",
            Name: "aaaabbbb",
            CreatedDate: 1536666350000
          }
        ]
      }
    );
  },
  findById(id) {
    return this.query(
      `SELECT Id, Name, CreatedDate, (SELECT Id, LastName, FirstName FROM Contacts) FROM Account WHERE id = '${id}'`,
      {
        success: true,
        records: [
          {
            Id: "123",
            Name: "hogehoge",
            Contacts: [
              {
                Id: "aaa",
                LastName: "hoge",
                FirstName: "fuga",
              }
            ],
            CreatedDate: 1536666350000
          }
        ]
      }
    );
  },
  create(properties) {
    return this.call('ApiController.create', ['Account', properties], {
      success: true,
      id: "123"
    });
  },
  createWithChildren(parent, children) {
    return this.call('ApiController.create', ['Account', 'Contact', parent, children], {
      success: true,
      id: "123"
    });
  },
  update(id, properties) {
    return this.call('ApiController.updateRecord', ['Account', id, properties], {
      success: true,
      id: "123"
    });
  },
  destroy(id) {
    return this.call('ApiController.destroy', [id], {
      success: true,
    });
  }
};

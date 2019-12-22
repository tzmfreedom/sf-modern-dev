export default class SObject {
  static call(action, args, result) {
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
  }
  static query(query, result) {
    return this.call("ApiController.query", [query], result);
  }
  static create(properties) {
    return this.call('ApiController.create', [this.name, properties], {
      success: true,
      id: "123"
    });
  }
  static update(id, properties) {
    return this.call('ApiController.updateRecord', [this.name, id, properties], {
      success: true,
      id: "123"
    });
  }
  static destroy(id) {
    return this.call('ApiController.destroy', [id], {
      success: true,
    });
  }
}

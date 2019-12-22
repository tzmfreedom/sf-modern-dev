import SObject from '@/sobjects/SObject.js'

export default class Account extends SObject {
  static findAll() {
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
  }
  static findById(id) {
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
  }
  static createWithChildren(parent, children) {
    return this.call('ApiController.createWithChildren', ['Account', 'Contact', parent, children], {
      success: true,
      id: "123"
    });
  }
}

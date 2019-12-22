import SObject from '@/sobjects/SObject.js'

const fields = [
  'Id',
  'Name',
  'CreatedDate',
]

export default class Account extends SObject {
  static getSObjectType() { return 'Account' }
  static findAll() {
    //eslint-disable-next-line no-console
    console.log(this)
    return this.query(
      `SELECT ${fields.join(',')} FROM ${this.getSObjectType()} ORDER BY CreatedDate DESC`,
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
      `SELECT ${fields.join(',')}, (SELECT Id, LastName, FirstName FROM Contacts) FROM ${this.getSObjectType()} WHERE id = '${id}'`,
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
  static search(params) {
    return this.query(
      `SELECT ${fields.join(',')} FROM ${this.getSObjectType()} WHERE Name LIKE '%${params.Name}%'`,
      {
        success: true,
        records: [
          {
            Id: "xxx",
            Name: "searched",
            CreatedDate: 1536666350000
          }
        ]
      }
    );
  }
}

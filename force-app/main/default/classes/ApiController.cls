public with sharing class ApiController {
    public ApiController() {

    }

    @RemoteAction
    public static List<SObject> query(String query) {
        return Database.query(query);
    }
}

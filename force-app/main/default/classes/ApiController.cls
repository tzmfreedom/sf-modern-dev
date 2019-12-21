public with sharing class ApiController {
    public ApiController() {

    }

    @RemoteAction
    public static List<SObject> query(String query) {
        return Database.query(query);
    }

    @RemoteAction
    public static Map<String, Object> create(String typeName, Map<String, Object> properties) {
        Schema.SObjectType t = Schema.getGlobalDescribe().get(typeName);
        SObject obj = t.newSObject();
        for (String property : properties.keySet()) {
            obj.put(property, properties.get(property));
        }
        try {
            Database.SaveResult sr = Database.insert(sobject);
            if (sr.isSuccess()) {
                return new Map<String, Object>{
                    'success' => true,
                    'id' => sr.getId()
                };
            }
        } catch (DmlException e) {
            return new Map<String, Object> {
                'error' => e.getMessage()
            };
        }
    }
}

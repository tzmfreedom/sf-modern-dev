public with sharing class ApiController {
    public ApiController() {

    }

    @RemoteAction
    public static Map<String, Object> query(String query) {
        return new Map<String, Object> {
            'success' => true,
            'records' => Database.query(query)
        };
    }

    @RemoteAction
    public static Map<String, Object> create(String typeName, Map<String, Object> properties) {
        Schema.SObjectType t = Schema.getGlobalDescribe().get(typeName);
        SObject obj = t.newSObject();
        for (String property : properties.keySet()) {
            obj.put(property, properties.get(property));
        }
        try {
            Database.SaveResult sr = Database.insert(obj);
            return new Map<String, Object>{
                'success' => true,
                'id' => sr.getId()
            };
        } catch (Exception e) {
            return new Map<String, Object> {
                'success' => false,
                'error' => e.getMessage()
            };
        }
    }

    @RemoteAction
    public static Map<String, Object> update(String typeName, String sfid, Map<String, Object> properties) {
        Schema.SObjectType t = Schema.getGlobalDescribe().get(typeName);
        SObject obj = t.newSObject(sfid);
        for (String property : properties.keySet()) {
            obj.put(property, properties.get(property));
        }
        try {
            Database.SaveResult sr = Database.update(obj);
            return new Map<String, Object>{
                'success' => true,
                'id' => sr.getId()
            };
        } catch (Exception e) {
            return new Map<String, Object> {
                'success' => false,
                'error' => e.getMessage()
            };
        }
    }
}

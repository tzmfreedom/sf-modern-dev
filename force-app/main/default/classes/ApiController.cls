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
    public static Map<String, Object> updateRecord(String typeName, String sfid, Map<String, Object> properties) {
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

    @RemoteAction
    public static Map<String, Object> createWithChildren(
        String parentTypeName,
        String childTypeName,
        Map<String, Object> parentProperties,
        List<Map<String, Object>> childrenProperties
    ) {
        Schema.SObjectType parentType = Schema.getGlobalDescribe().get(parentTypeName);
        Schema.SObjectType childType = Schema.getGlobalDescribe().get(childTypeName);
        SObject obj = parentType.newSObject();
        for (String property : parentProperties.keySet()) {
            obj.put(property, parentProperties.get(property));
        }
        try {
            Database.SaveResult sr = Database.insert(obj);
            ID parentId = sr.getId();
            List<SObject> children = new List<SObject>();
            for (Map<String, Object> childProperties : childrenProperties) {
                SObject child = childType.newSObject();
                for (String property : childProperties.keySet()) {
                    child.put(property, childProperties.get(property));
                }
                child.put('AccountId', parentId);// TODO: impl
                children.add(child);
            }
            List<Database.SaveResult> childrenSaveResult = Database.insert(children);
            return new Map<String, Object>{
                'success' => true,
                'id' => parentId
            };
        } catch (Exception e) {
            return new Map<String, Object> {
                'success' => false,
                'error' => e.getMessage()
            };
        }
    }
    
    @RemoteAction
    public static Map<String, Object> destroy(String sfid) {
        Database.DeleteResult dr = Database.delete(sfid);
        try {
            return new Map<String, Object> {
                'success' => dr.isSuccess()
            };
        } catch (Exception e) {
            return new Map<String, Object> {
                'success' => false,
                'error' => e.getMessage()
            };
        }
    }
}

export default function validateJSON(obj, schema) : boolean {
    const requiredItems = [];
    const allItems = [];
    for(const property in schema) {
        allItems.push(schema[property].key);
        if(schema[property].required) {
            requiredItems.push(schema[property].key);
        }
    }
    for(const property in obj) {
        if(allItems.includes(property) && obj[property]) {
            const itemSchema = schema[property];
            if(itemSchema.maxLength === 0 || itemSchema.maxLength >= obj[property].toString().length) {
                if(itemSchema.required) {
                    let index = requiredItems.indexOf(property);
                    if(index !== -1) requiredItems.splice(index, 1);
                }
                if(typeof obj[property] !== itemSchema.type) {
                    return false;
                }
            } else {
                return false;
            }

        } else {
            return false;
        }
    }
    if(requiredItems.length === 0) {
        return true;
    } else {
        return false;
    }
}

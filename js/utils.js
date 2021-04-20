function deleteProduct(elem){
    productId = elem.id.split("productNr")[1]
    products = JSON.parse(readFromLocalStorage('products'));
    auxProduct = null
    for (product in products.entries) {
        if(products.entries[product].productId == productId){
            products.entries.splice(product, 1)
        }
    }
    writeToLocalStorage('products',JSON.stringify(products));
    clearPage();
    run();
}

function updateLocalStorageProduct(newProduct){
    productId = newProduct.productId
    products = JSON.parse(readFromLocalStorage('products'));
    for (product in products.entries){
        if (products.entries[product].productId == productId){
            products.entries[product] = newProduct;
        }
    }
    writeToLocalStorage('products',JSON.stringify(products))
}

function updateLocalStoragePerson(newPerson){
    personId = newPerson.personId
    persons = JSON.parse(readFromLocalStorage('persons'));
    for (person in persons.entries){
        if (persons.entries[person].personId == personId){
            persons.entries[person] = newPerson;
        }
    }
    writeToLocalStorage('persons',JSON.stringify(persons))

}

function updateLocalStorageEntity(newEntity){
    entityId = newEntity.entityId
    entities = JSON.parse(readFromLocalStorage('entities'));
    for (entity in entities.entries){
        if (entities.entries[entity].entityId == entityId){
            entities.entries[entity] = newEntity;
        }
    }
    console.log(newEntity)
    console.log(entities)
    writeToLocalStorage('entities',JSON.stringify(entities))
}

function deletePerson(elem){
    personId = elem.id.split("personNr")[1]
    persons = JSON.parse(readFromLocalStorage('persons'));
    auxProduct = null
    for (person in persons.entries) {
        if(persons.entries[person].personId == personId){
            persons.entries.splice(person, 1)
        }
    }
    writeToLocalStorage('persons',JSON.stringify(persons));
    clearPage();
    run();
}

function saveEntity(newEntity){
    entities = JSON.parse(readFromLocalStorage('entities'));
    entities.entries.push(newEntity)
    writeToLocalStorage('entities',JSON.stringify(entities))
}

function saveProduct(newProduct){
    products = JSON.parse(readFromLocalStorage('products'));
    products.entries.push(newProduct)
    writeToLocalStorage('products',JSON.stringify(products))
}

function savePerson(newPerson){
    persons = JSON.parse(readFromLocalStorage('persons'));
    persons.entries.push(newPerson)
    console.log(persons)
    writeToLocalStorage('persons',JSON.stringify(persons))
}

function getLastProductId(){
    products = JSON.parse(readFromLocalStorage('products'));
    let lastId = 0; 
    for (product in products.entries){
        if (products.entries[product].productId >= lastId)
            lastId = products.entries[product].productId + 1
    }
    return lastId;
}

function getLastPersonId(){
    persons = JSON.parse(readFromLocalStorage('persons'));
    let lastId = 0; 
    for (person in persons.entries){
        if (persons.entries[person].personId >= lastId)
            lastId = persons.entries[person].personId + 1
    }
    return lastId;
}

function getLastEntityId(){
    entities = JSON.parse(readFromLocalStorage('entities'));
    let lastId = 0; 
    for (entity in entities.entries){
        if (entities.entries[entity].entityId >= lastId)
            lastId = entities.entries[entity].entityId + 1
    }
    return lastId;
}

function newPerson(){
    let person = {
        "personId": getLastPersonId(),
        "name": "",
        "birth": "",
        "death": "",
        "wiki": "",
        "imgUrl":"",
    }
    return person;
}

function newEntity(){
    let entity = {
        "entityId": getLastEntityId(),
        "name": "",
        "creationDate": "",
        "wiki": "",
        "imgUrl":"",
        "collaboratedPersons": []
    }
    return entity;
}

function newProduct(){
    let product = {
        "productId": getLastProductId(),
        "name": "",
        "creationDate": "",
        "utility":"",
        "wiki": "",
        "imgUrl":"",
        "collaboratedPersons": [],
        "collaboratedEntity": []
    }
    return product
}

function deleteEntity(elem){
    entityId = elem.id.split("entityNr")[1]
    entities = JSON.parse(readFromLocalStorage('entities'));
    auxProduct = null
    for (entity in entities.entries) {
        if(entities.entries[entity].entityId == entityId){
            entities.entries.splice(entity, 1)
        }
    }
    writeToLocalStorage('entities',JSON.stringify(entities));
    clearPage();
    run();
}

function loadResource(resourceName, callback) {
    var client = new XMLHttpRequest();
    client.open('GET', resourceName, false);
    client.onreadystatechange = function () {
        callback(client.responseText);
    }
    client.send();
}

function checkCredentials(username, password) {
    let usersList = JSON.parse(readFromLocalStorage('users'));
    for (user in usersList.defaultUsers) {
        if (usersList.defaultUsers[user].username == username && usersList.defaultUsers[user].password == password)
            return usersList.defaultUsers[user]
    }
    return 0
}

function getEntityById(entityId){
    entities = JSON.parse(readFromLocalStorage('entities'));
    for (entity in entities.entries) {
        if(entities.entries[entity].entityId == entityId){
            return entities.entries[entity]
        }
    }
    return null;   
}

function getProductById(productId){
    products = JSON.parse(readFromLocalStorage('products'));
    for (product in products.entries) {
        if(products.entries[product].productId == productId){
            return products.entries[product]
        }
    }
    return null;   
}

function getPersonById(personId){
    persons = JSON.parse(readFromLocalStorage('persons'));
    for (person in persons.entries) {
        if(persons.entries[person].personId == personId){
            return persons.entries[person]
        }
    }
    return null;
    
}

function writeToLocalStorage(key, value) {
    window.localStorage.setItem(key, value);
}

function readFromLocalStorage(key) {
    return window.localStorage.getItem(key);
}

function removeFromLocalStorage(key) {
    window.localStorage.removeItem(key);
}

function isLoggedUser(){
    if(readFromLocalStorage('currentLoggedUser') == null)
        return 0
    return 1    
}

function writePersons(values) {
    writeToLocalStorage('persons', values);
    loadPersonsFromStorage(values);
}

function writeEntities(values) {
    writeToLocalStorage('entities', values);
    loadEntitiesFromStorage(values);
}

function writeProducts(values) {
    writeToLocalStorage('products', values);
    loadProductsFromStorage(values);
}

function writeUsers(values) {
    writeToLocalStorage('users', values);
}

function loadPersons() {
    loadResource('./data/person.json', writePersons);
}

function loadEntity() {
    loadResource('./data/entity.json', writeEntities);
}

function loadProduct() {
    loadResource('./data/product.json', writeProducts);
}

function loadUsers() {
    loadResource('./data/data.json', writeUsers);
}

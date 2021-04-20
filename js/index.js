function loadProductsFromStorage(values) {
    let products = JSON.parse(values);
    let productsDiv = $("#products");
    for (product in products.entries) {
        let txt = '<div class="row d-flex align-items-center mt-3"> <div class="col-sm-5 maxRowHeight"> <img class="w-100 h-100" src="$imgUrl" /> </div> <div class="col-sm-7"> <div class="row"> <div class="col-sm-12 d-flex justify-content-center"> <a class="h5 text-center disabled productsTexts" data-bs-toggle="modal" data-bs-target="#infoProductModal" name=$productId onclick="updateProductModal(this)" name=$productId >$name</a> </div> </div> <div class="row d-none deleteProduct"> <div class="col-sm-12 d-flex justify-content-center d-flex align-items-bottom"> <a id="$productId" onclick=deleteProduct(this) class="btn btn-outline-danger">delete</a> </div> </div> </div> </div>';
        txt = txt.replaceAll("$productId", "productNr" + products.entries[product].productId);
        txt = txt.replace("$imgUrl", products.entries[product].imgUrl);
        txt = txt.replace("$name", products.entries[product].name);
        productsDiv.append(txt);
    }
}

function loadPersonsFromStorage(values) {
    let persons = JSON.parse(values);
    let personsDiv = $("#persons");
    for (person in persons.entries) {
        let txt = '<div class="row d-flex align-items-center mt-3"> <div class="col-sm-5 maxRowHeight"> <img class="w-100 h-100" src="$imgUrl" /> </div> <div class="col-sm-7"> <div class="row"> <div class="col-sm-12 d-flex justify-content-center"> <a class="h5 text-center disabled personTexts" data-bs-toggle="modal" data-bs-target="#infoModal" name=$personId onclick="updatePersonModal(this)" >$name</a> </div> </div> <div class="row d-none deletePerson"> <div class="col-sm-12 d-flex justify-content-center d-flex align-items-bottom"> <a id="$personId" onclick=deletePerson(this) class="btn btn-outline-danger">delete</a> </div> </div> </div> </div>';
        txt = txt.replaceAll("$personId", "personNr" + persons.entries[person].personId);
        txt = txt.replace("$imgUrl", persons.entries[person].imgUrl);
        txt = txt.replace("$name", persons.entries[person].name);
        personsDiv.append(txt);
    }
}

function loadEntitiesFromStorage(values) {
    let entities = JSON.parse(values);
    let entitiesDiv = $("#entities");
    for (entity in entities.entries) {
        let txt = '<div class="row d-flex align-items-center mt-3"> <div class="col-sm-5 maxRowHeight"> <img class="w-100 h-100" src="$imgUrl" /> </div> <div class="col-sm-7"> <div class="row"> <div class="col-sm-12 d-flex justify-content-center"> <a class="h5 text-center disabled entityTexts" data-bs-toggle="modal" data-bs-target="#infoEntityModal" name=$entityId onclick="updateEntityModal(this)" >$name</a></div> </div> <div class="row d-none deleteEntity"> <div class="col-sm-12 d-flex justify-content-center d-flex align-items-bottom"> <a id="$entityId" onclick=deleteEntity(this) class="btn btn-outline-danger">delete</a> </div> </div> </div> </div>';
        txt = txt.replaceAll("$entityId", "entityNr" + entities.entries[entity].entityId);
        txt = txt.replace("$imgUrl", entities.entries[entity].imgUrl);
        txt = txt.replace("$name", entities.entries[entity].name);
        entitiesDiv.append(txt);
    }
}

function generatePersonsCheckBoxesHTML(actualPersons,div){
    let personsDiv = ""
    let cont = 0
    persons = JSON.parse(readFromLocalStorage('persons'))
    for (person in persons.entries) {
        let txt = '<input disabled $checked class="form-check-input" type="checkbox" value="$personId" id="$checkId"><label class="form-check-label" for="$checkId">$name</label><br>'
        txt = txt.replaceAll("$personId", "personNr" + persons.entries[person].personId);
        txt = txt.replaceAll("$checkId", "check" + cont);
        txt = txt.replaceAll("$name", persons.entries[person].name);
        if(actualPersons.includes(persons.entries[person].personId)){
            txt = txt.replaceAll("$checked", "checked");
        }else{
            txt = txt.replaceAll("$checked", "");
        }
        personsDiv += txt
        cont += 1
    }
    $(div).empty()
    $(div).append(personsDiv)
}

function generateEntitiesCheckBoxesHTML(actualEntities,div){
    let entitiesDiv = ""
    let cont = 0
    entities = JSON.parse(readFromLocalStorage('entities'))
    for (entity in entities.entries) {
        let txt = '<input disabled $checked class="form-check-input" type="checkbox" value="$entityId" id="$checkId"><label class="form-check-label" for="$checkId">$name</label><br>'
        txt = txt.replaceAll("$entityId", "entityNr" + entities.entries[entity].entityId);
        txt = txt.replaceAll("$checkId", "check" + cont);
        txt = txt.replaceAll("$name", entities.entries[entity].name);
        if(actualEntities.includes(entities.entries[entity].entityId)){
            txt = txt.replaceAll("$checked", "checked");
        }else{
            txt = txt.replaceAll("$checked", "");
        }
        entitiesDiv += txt
        cont += 1
    }
    $(div).empty()
    $(div).append(entitiesDiv)
}

function generateProductsCheckBoxesHTML(actualProducts,div){
    let productsDiv = ""
    let cont = 0
    products = JSON.parse(readFromLocalStorage('products'))
    for (product in products.entries) {
        let txt = '<input disabled $checked class="form-check-input" type="checkbox" value="$productId" id="$checkId"><label class="form-check-label" for="$checkId">$name</label><br>'
        txt = txt.replaceAll("$productId", "productNr" + products.entries[product].productId);
        txt = txt.replaceAll("$checkId", "check" + cont);
        txt = txt.replaceAll("$name", products.entries[product].name);
        if(actualProducts.includes(products.entries[product].productId)){
            txt = txt.replaceAll("$checked", "checked");
        }else{
            txt = txt.replaceAll("$checked", "");
        }
        productsDiv += txt
        cont += 1
    }
    $(div).empty()
    $(div).append(productsDiv)
}

function setTittleValue(inputId, value){
    $(inputId).empty();
    $(inputId).append(value);
}

function setInputValue(inputId, value){
    $(inputId).val(value);
}

function enableInput(inputId){
    $(inputId).attr("readonly", false); 
}

function disableInput(inputId){
    $(inputId).attr("readonly", true); 
}

function enableCheckBoxes(checkId){
    var $inputs = $(checkId+' :input');
    $inputs.each(function() {
        $(this).attr("disabled", false); 
    });
}

function disableCheckBoxes(checkId){
    var $inputs = $(checkId+' :input');
    $inputs.each(function() {
        $(this).attr("disabled", true); 
    });
}

function enableModalInputs(){
    enableInput("#inputName")
    enableInput("#inputBirth")
    enableInput("#inputDeath")
    enableInput("#inputWiki")
    enableInput("#inputUrl")
    $("#personApplyChanges").removeClass('d-none');
}

function disableModalInputs(){
    disableInput("#inputName")
    disableInput("#inputBirth")
    disableInput("#inputDeath")
    disableInput("#inputWiki")
    disableInput("#inputUrl")
    disableCheckBoxes("#inputEntities");
    disableCheckBoxes("#inputProducts");
    $("#personApplyChanges").addClass('d-none');
}

function enableModalEntityInputs(){
    enableInput("#inputEntityName")
    enableInput("#inputEntityDate")
    enableInput("#inputEntityWiki")
    enableInput("#inputEntityimg")

    enableCheckBoxes("#inputEntityProducts");
    enableCheckBoxes("#inputEntityPersons");
    $("#entityApplyChanges").removeClass('d-none');
}

function disableModalEntityInputs(){
    disableInput("#inputEntityName")
    disableInput("#inputEntityDate")
    disableInput("#inputEntityWiki")
    disableInput("#inputEntityimg")
    disableCheckBoxes("#inputEntityProducts");
    disableCheckBoxes("#inputEntityPersons");
    $("#entityApplyChanges").addClass('d-none');
}

function enableProductModalInputs(){
    enableInput("#inputProductName")
    enableInput("#inputProductDate")
    enableInput("#inputProductUtility")
    enableInput("#inputProductWiki")
    enableInput("#inputProductURL")
    enableCheckBoxes("#inputProductEntities");
    enableCheckBoxes("#inputProductPersons");
    $("#productApplyChanges").removeClass('d-none');
}


function disableProductModalInputs(){
    disableInput("#inputProductName")
    disableInput("#inputProductDate")
    disableInput("#inputProductUtility")
    disableInput("#inputProductWiki")
    disableInput("#inputProductURL")
    disableCheckBoxes("#inputProductEntities");
    disableCheckBoxes("#inputProductPersons");
    $("#productApplyChanges").addClass('d-none');
}

function updateProductModal(elem){
    product = getProductById(elem.getAttribute('name').split("productNr")[1])
    $("#productApplyChanges"). attr("onclick","updateProduct()");
    setTittleValue("#infoProductModalLabel",product.name)
    setInputValue("#inputProductName",product.name)
    setInputValue("#inputProductDate",product.creationDate)
    setInputValue("#inputProductUtility",product.utility)
    setInputValue("#inputProductWiki",product.wiki)
    setInputValue("#inputProductURL",product.imgUrl)
    setInputValue("#productId",product.productId)
    generateEntitiesCheckBoxesHTML(product.collaboratedEntity, "#inputProductEntities")
    generatePersonsCheckBoxesHTML(product.collaboratedPersons, "#inputProductPersons")
    let currentUser = JSON.parse(readFromLocalStorage("currentLoggedUser"))
    if (currentUser != null && currentUser.rols.includes("write")){
        enableProductModalInputs()
    }else{
        disableProductModalInputs()
    }
}

function updatePersonModal(elem){
    person = getPersonById(elem.getAttribute('name').split("personNr")[1])
    $("#personApplyChanges"). attr("onclick","updatePerson()");
    setTittleValue("#infoModalLabel",person.name)
    setInputValue("#inputName",person.name)
    setInputValue("#inputBirth",person.birth)
    setInputValue("#inputDeath",person.death)
    setInputValue("#inputWiki",person.wiki)
    setInputValue("#inputUrl",person.imgUrl)
    setInputValue("#personId",person.personId)
    let currentUser = JSON.parse(readFromLocalStorage("currentLoggedUser"))
    if (currentUser != null && currentUser.rols.includes("write")){
        enableModalInputs()
    }else{
        disableModalInputs()
    }
}

function updateEntityModal(elem){
    entity = getEntityById(elem.getAttribute('name').split("entityNr")[1])
    $("#entityApplyChanges"). attr("onclick","updateEntity()");
    setTittleValue("#infoEntityModalLabel",entity.name)
    setInputValue("#inputEntityName",entity.name)
    setInputValue("#inputEntityDate",entity.creationDate)
    setInputValue("#inputEntityWiki",entity.wiki)
    setInputValue("#inputEntityimg",entity.imgUrl)
    setInputValue("#entityId",entity.entityId)
    generatePersonsCheckBoxesHTML(entity.collaboratedPersons, "#inputEntityPersons")
    let currentUser = JSON.parse(readFromLocalStorage("currentLoggedUser"))
    if (currentUser != null && currentUser.rols.includes("write")){
        enableModalEntityInputs()
    }else{
        disableModalEntityInputs()
    }
}

function updateProduct(){
    if(validateProductForm($("#inputProductName"),$("#inputProductURL"))){
        let actualProduct = getProductById($("#productId").val())
        actualProduct.name = $("#inputProductName").val()
        actualProduct.creationDate = $("#inputProductDate").val()
        actualProduct.utility = $("#inputProductUtility").val()
        actualProduct.wiki = $("#inputProductWiki").val()
        actualProduct.imgUrl = $("#inputProductURL").val()
        actualProduct.collaboratedEntity = []
        actualProduct.collaboratedPersons = []
        let $inputEntities = $("#inputProductEntities"+' :input');
        $inputEntities.each(function() {
            if(this.checked){
                actualProduct.collaboratedEntity.push(parseInt(this.value.split("entityNr")[1]))
            }
        });
        let $inputProductPersons = $("#inputProductPersons"+' :input');
        $inputProductPersons.each(function() {
            if(this.checked){
                actualProduct.collaboratedPersons.push(parseInt(this.value.split("personNr")[1]))
            }
        });
        updateLocalStorageProduct(actualProduct);
        clearPage();
        run();
    }
}

function updatePerson(){
    if(validateProductForm($("#inputName"),$("#inputUrl"))){
        let actualPerson = getPersonById($("#personId").val())
        
        actualPerson.name = $("#inputName").val()
        actualPerson.birth =  $("#inputBirth").val()
        actualPerson.death =  $("#inputDeath").val()
        actualPerson.wiki =  $("#inputWiki").val()
        actualPerson.imgUrl = $("#inputUrl").val()
        updateLocalStoragePerson(actualPerson);
        clearPage();
        run();
    }
}

function updateEntity(){
    if(validateProductForm($("#inputEntityName"),$("#inputEntityimg"))){
        let actualEntity = getEntityById($("#entityId").val())
        actualEntity.name = $("#inputEntityName").val()
        actualEntity.creationDate = $("#inputEntityDate").val()
        actualEntity.wiki = $("#inputEntityWiki").val()
        actualEntity.imgUrl = $("#inputEntityimg").val()
        actualEntity.collaboratedPersons = []
        let $inputProductPersons = $("#inputEntityPersons"+' :input');
        $inputProductPersons.each(function() {
            if(this.checked){
                actualEntity.collaboratedPersons.push(parseInt(this.value.split("personNr")[1]))
            }
        });
        updateLocalStorageEntity(actualEntity);
        clearPage();
        run();
    }
}

function generateAddEntitiesCheckBoxesHTML(div){
    let entitiesDiv = ""
    let cont = 0
    entities = JSON.parse(readFromLocalStorage('entities'))
    for (entity in entities.entries) {
        let txt = '<input class="form-check-input" type="checkbox" value="$entityId" id="$checkId"><label class="form-check-label" for="$checkId">$name</label><br>'
        txt = txt.replaceAll("$entityId", "entityNr" + entities.entries[entity].entityId);
        txt = txt.replaceAll("$checkId", "check" + cont);
        txt = txt.replaceAll("$name", entities.entries[entity].name);
        entitiesDiv += txt
        cont += 1
    }
    $(div).empty()
    $(div).append(entitiesDiv)
}

function generateAddPersonsCheckBoxesHTML(div){
    let personsDiv = ""
    let cont = 0
    persons = JSON.parse(readFromLocalStorage('persons'))
    for (person in persons.entries) {
        let txt = '<input class="form-check-input" type="checkbox" value="$personId" id="$checkId"><label class="form-check-label" for="$checkId">$name</label><br>'
        txt = txt.replaceAll("$personId", "personNr" + persons.entries[person].personId);
        txt = txt.replaceAll("$checkId", "check" + cont);
        txt = txt.replaceAll("$name", persons.entries[person].name);
        personsDiv += txt
        cont += 1
    }
    $(div).empty()
    $(div).append(personsDiv)
}

function addNewEntityModal(){
    setTittleValue("#infoEntityModalLabel","Añadir entidad")
    setInputValue("#inputEntityName","")
    setInputValue("#inputEntityDate","")
    setInputValue("#inputEntityWiki","")
    setInputValue("#inputEntityimg","")
    generateAddPersonsCheckBoxesHTML("#inputEntityPersons")
    enableModalEntityInputs()
    $("#entityApplyChangesentityApplyChanges").removeClass('d-none');
    $("#entityApplyChanges").attr("onclick","createEntityForm()");
}

function addNewPersonModal(){
    setTittleValue("#infoModalLabel","Añadir persona")
    setInputValue("#inputName","")
    setInputValue("#inputBirth","")
    setInputValue("#inputDeath","")
    setInputValue("#inputWiki","")
    setInputValue("#inputUrl","")
    enableModalInputs()
    $("#personApplyChanges").removeClass('d-none');
    $("#personApplyChanges").attr("onclick","createPersonForm()");
}

function addNewProductModal(){
    setTittleValue("#infoProductModalLabel","Añadir producto")
    setInputValue("#inputProductName","")
    setInputValue("#inputProductDate","")
    setInputValue("#inputProductUtility","")
    setInputValue("#inputProductWiki","")
    setInputValue("#inputProductURL","")
    generateAddEntitiesCheckBoxesHTML("#inputProductEntities")
    generateAddPersonsCheckBoxesHTML("#inputProductPersons")
    enableProductModalInputs()
    $("#productApplyChanges").removeClass('d-none');
    $("#productApplyChanges").attr("onclick","createProductForm()");
}

function createPersonForm(){
    if(validateProductForm($("#inputName"),$("#inputUrl"))){
        var actualPerson = newPerson();
        actualPerson.name = $("#inputName").val()
        actualPerson.birth =  $("#inputBirth").val()
        actualPerson.death =  $("#inputDeath").val()
        actualPerson.wiki =  $("#inputWiki").val()
        actualPerson.imgUrl = $("#inputUrl").val()

        savePerson(actualPerson)
        clearPage();
        run();
    }
}

function createEntityForm(){
    if(validateProductForm($("#inputEntityName"),$("#inputEntityimg"))){
        var actualEntity = newEntity();
        actualEntity.name = $("#inputEntityName").val()
        actualEntity.creationDate = $("#inputEntityDate").val()
        actualEntity.wiki = $("#inputEntityWiki").val()
        actualEntity.imgUrl = $("#inputEntityimg").val()
        actualEntity.collaboratedPersons = []

        let $inputEntityPersons = $("#inputEntityPersons"+' :input');
        $inputEntityPersons.each(function() {
            if(this.checked){
                actualEntity.collaboratedPersons.push(parseInt(this.value.split("personNr")[1]))
            }
        });

        saveEntity(actualEntity)
        clearPage();
        run();
    }
}

function validateProductForm(inputName,imgUrl){
    if (inputName.val() === "" || imgUrl.val() === ""){
        inputName.addClass('is-invalid');
        imgUrl.addClass('is-invalid');
        return false
    }else{
        inputName.removeClass('is-invalid');
        imgUrl.removeClass('is-invalid');
        return true
    }

}

function createProductForm(){
    if(validateProductForm($("#inputProductName"),$("#inputProductURL"))){
        var actualProduct = newProduct();
        actualProduct.name = $("#inputProductName").val()
        actualProduct.creationDate = $("#inputProductDate").val()
        actualProduct.utility = $("#inputProductUtility").val()
        actualProduct.wiki = $("#inputProductWiki").val()
        actualProduct.imgUrl = $("#inputProductURL").val()
        let $inputEntities = $("#inputProductEntities"+' :input');
        $inputEntities.each(function() {
            if(this.checked){
                actualProduct.collaboratedEntity.push(parseInt(this.value.split("entityNr")[1]))
            }
        });
        let $inputProductPersons = $("#inputProductPersons"+' :input');
        $inputProductPersons.each(function() {
            if(this.checked){
                actualProduct.collaboratedPersons.push(parseInt(this.value.split("personNr")[1]))
            }
        });
    
        saveProduct(actualProduct)
        clearPage();
        run();
    }

}

function clearPage(){
    $("#products").empty();
    $("#entities").empty();
    $("#persons").empty();
}

function loadData() {
    loadPersons();
    loadEntity();
    loadProduct();
    loadUsers();
}

function isFirstRun() {
    return readFromLocalStorage('isFirstRun') == null
}

function loadDataFromStorage() {
    loadEntitiesFromStorage(readFromLocalStorage('entities'))
    loadProductsFromStorage(readFromLocalStorage('products'))
    loadPersonsFromStorage(readFromLocalStorage('persons'))
}

function createAddButtons(){
    newProductButton = '<div id="addNewProduct" class="d-none row d-flex align-items-center mt-3"> <div class="col-sm-5 maxRowHeight"> <img class="w-100 h-100" src="./img/add.png" /> </div> <div class="col-sm-7"> <div class="row"> <div class="col-sm-12 d-flex justify-content-center"> <a class="h5 text-center" data-bs-toggle="modal" data-bs-target="#infoProductModal" onclick="addNewProductModal()"> Añadir Producto</a> </div> </div> <div class="row d-none "> <div class="col-sm-12 d-flex justify-content-center d-flex align-items-bottom"> <a class="btn btn-outline-danger">Añadir producto</a> </div> </div> </div> </div>'
    $("#products").append(newProductButton)
    newPersonButton = '<div id="addNewPerson" class="d-none row d-flex align-items-center mt-3"> <div class="col-sm-5 maxRowHeight"> <img class="w-100 h-100" src="./img/add.png" /> </div> <div class="col-sm-7"> <div class="row"> <div class="col-sm-12 d-flex justify-content-center"> <a class="h5 text-center" data-bs-toggle="modal" data-bs-target="#infoModal" onclick="addNewPersonModal()"> Añadir Persona</a> </div> </div> <div class="row d-none "> <div class="col-sm-12 d-flex justify-content-center d-flex align-items-bottom"> <a class="btn btn-outline-danger">Añadir Persona</a> </div> </div> </div> </div>'
    $("#persons").append(newPersonButton)
    newEntityButton = '<div id="addNewEntity" class="d-none row d-flex align-items-center mt-3"> <div class="col-sm-5 maxRowHeight"> <img class="w-100 h-100" src="./img/add.png" /> </div> <div class="col-sm-7"> <div class="row"> <div class="col-sm-12 d-flex justify-content-center"> <a class="h5 text-center" data-bs-toggle="modal" data-bs-target="#infoEntityModal" onclick="addNewEntityModal()"> Añadir Entidad</a> </div> </div> <div class="row d-none "> <div class="col-sm-12 d-flex justify-content-center d-flex align-items-bottom"> <a class="btn btn-outline-danger">Añadir Entidad</a> </div> </div> </div> </div>'
    $("#entities").append(newEntityButton)
}

function run() {
    createAddButtons()
    if (isFirstRun()) {
        writeToLocalStorage('isFirstRun', 0);
        loadData();
    } else {
        loadDataFromStorage();
        if (isLoggedUser()){
            $("#addNewProduct").removeClass('d-none');
            $("#addNewPerson").removeClass('d-none');
            $("#addNewEntity").removeClass('d-none');
            $("#loginButton").addClass('d-none');
            $("#logoutButton").removeClass('d-none');
            let currentUser = JSON.parse(readFromLocalStorage('currentLoggedUser'));
            loadResourcesWithPermissions(currentUser.rols);
        }
    }
}

function showDeleteButtons(){
    $(".deleteProduct").removeClass('d-none');
    $(".deletePerson").removeClass('d-none');
    $(".deleteEntity").removeClass('d-none');
    $("#addNewProduct").removeClass('d-none');
    $("#addNewPerson").removeClass('d-none');
    $("#addNewEntity").removeClass('d-none');
}

function hideDeleteButtons(){
    $(".deleteProduct").addClass('d-none');
    $(".deletePerson").addClass('d-none');
    $(".deleteEntity").addClass('d-none');
    $("#addNewProduct").addClass('d-none');
    $("#addNewPerson").addClass('d-none');
    $("#addNewEntity").addClass('d-none');
}

function hideOpenTexts(){
    //productsTextsconsole.log
    var $products = $(".productsTexts");
    $products.each(function() {
        $(this).addClass('disabled');
    });

    var $entities = $(".entityTexts");
    $entities.each(function() {
        $(this).addClass('disabled');
    });

    var $persons = $(".personTexts");
    $persons.each(function() {
        $(this).addClass('disabled');
    });

}

function showOpenTexts(){
    //productsTextsconsole.log
    var $products = $(".productsTexts");
    $products.each(function() {
        $(this).removeClass('disabled');
    });

    var $entities = $(".entityTexts");
    $entities.each(function() {
        $(this).removeClass('disabled');
    });

    var $persons = $(".personTexts");
    $persons.each(function() {
        $(this).removeClass('disabled');
    });

}

function loadResourcesWithPermissions(rols) {
    showOpenTexts();
    if (rols.includes("write")) {
        showDeleteButtons();
    }
}

function successLogin(username, password) {
    $("#loginButton").addClass('d-none');
    $("#logoutButton").removeClass('d-none');
    let currentUser = checkCredentials(username, password);
    writeToLocalStorage("currentLoggedUser", JSON.stringify(currentUser));
    loadResourcesWithPermissions(currentUser.rols);
}

function logout() {
    $("#logoutButton").addClass('d-none');
    $("#loginButton").removeClass('d-none');
    removeFromLocalStorage('currentLoggedUser')
    hideDeleteButtons()
    hideOpenTexts()
}

function doLogin() {
    let username = $("#inputUsername")
    let password = $("#inputPassword")
    if (checkCredentials(username.val(), password.val())) {
        $('body').removeClass('modal-open');
        $('#closeLogin').click();
        successLogin(username.val(), password.val());
        username.removeClass("is-invalid");
        username.val("")
        password.removeClass('is-invalid');
        password.val("")
    } else {
        username.addClass("is-invalid");
        password.addClass('is-invalid');
    }
}

run();
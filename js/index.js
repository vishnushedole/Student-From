let ID = ["Roll","fullname","cls","BirthDate","Address","EnrolmentDate"]; // Id of input tags in form
var token ="90938230|-31949273324305146|90954964";
var dbName = "SCHOOL-DB";
var rel = "STUDENT-Table";

// This function will invoke on load of the page.
function disable()
{
    $(`#${ID[1]}`).prop("disabled",true);
    $(`#${ID[2]}`).prop("disabled",true);
    $(`#${ID[3]}`).prop("disabled",true);
    $(`#${ID[4]}`).prop("disabled",true);
    $(`#${ID[5]}`).prop("disabled",true);
    $('#save').prop("disabled",true);
    $('#update').prop("disabled",true);
    $('#reset').prop("disabled",true);
    $(`#${ID[0]}`).focus();
}

// To check if student present in database and fill details if present.
function getStd()
{
    
    let roll = $('#Roll').val();
    var jsonStr ='{"RollNo":'+roll+"}";
    if(roll!="")
    {
    var getReqStr = createGETRequest(token,
        jsonStr, dbName, rel);
    alert(getReqStr);
    console.log(getReqStr);
    jQuery.ajaxSetup({ async: false });

       var resultObj = executeCommandAtGivenBaseUrl(getReqStr,"http://api.login2explore.com:5577", "/api/irl");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    if(resultObj.status === 400)
    {
        $('#save').prop("disabled",false);
        $('#reset').prop("disabled",false);
        $(`#${ID[1]}`).prop("disabled",false);
    $(`#${ID[2]}`).prop("disabled",false);
    $(`#${ID[3]}`).prop("disabled",false);
    $(`#${ID[4]}`).prop("disabled",false);
    $(`#${ID[5]}`).prop("disabled",false);
        $(`#${ID[1]}`).focus();
    }
    else{
        $(`#${ID[0]}`).prop("disabled",false);
        fillForm(resultObj);
        $('#update').prop("disabled",false);
        $('#reset').prop("disabled",false);
        $(`#${ID[1]}`).focus();
    }
}
    
}

// To fill Form with student data .
function fillForm(resultObj)
{
    saveRec2LS(resultObj);
    
    var recored = JSON.parse(resultObj.data).record;
    
    $(`#${ID[1]}`).val(recored.FullName);
    $(`#${ID[2]}`).val(recored.Class);
    $(`#${ID[3]}`).val(recored.BirthDate);
    $(`#${ID[4]}`).val(recored.Address);
    $(`#${ID[5]}`).val(recored.EnrollmentDate);
    $(`#${ID[1]}`).prop("disabled",false);
    $(`#${ID[2]}`).prop("disabled",false);
    $(`#${ID[3]}`).prop("disabled",false);
    $(`#${ID[4]}`).prop("disabled",false);
    $(`#${ID[5]}`).prop("disabled",false);
}

// save record no in local storage to use it later.
function saveRec2LS(resultObj)
{
    var data = JSON.parse(resultObj.data);
    localStorage.setItem('recno',data.rec_no);
}

$("#Roll").focus();

// validate form .
function validateAndGetFormData() {
    var Rollno = $(`#${ID[0]}`).val();
    if (Rollno === "") {
        alert("Roll No Required Value");
        $(`#${ID[0]}`).focus();
        return "";
    }
    var fullname = $(`#${ID[1]}`).val();
    if (fullname === "") {
        alert("fullname Required Value");
        $(`#${ID[1]}`).focus();
        return "";
    }
    var Class = $(`#${ID[2]}`).val();
    if (Class === "") {
        alert("Class Required Value");
        $(`#${ID[2]}`).focus();
        return "";
    }
    var BirthDate = $(`#${ID[3]}`).val();
    if (BirthDate === "") {
        alert("BirthDate Required Value");
        $(`#${ID[3]}`).focus();
        return "";
    }
    var Address = $(`#${ID[4]}`).val();
    if (Address === "") {
        alert("Address Required Value");
        $(`#${ID[4]}`).focus();
        return "";
    }
    var EnrolmentDate = $(`#${ID[5]}`).val();
    if (EnrolmentDate === "") {
        alert("EnrolmentDate Required Value");
        $(`#${ID[5]}`).focus();
        return "";
    }
    var jsonStrObj = {
        RollNo:Rollno,
      FullName:fullname,
      Class:Class,
      BirthDate:BirthDate,
      Address:Address,
      EnrollmentDate:EnrolmentDate
    };
    return JSON.stringify(jsonStrObj);
}

// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
        + "\"token\" : \""
        + connToken
        + "\","
        + "\"dbName\": \""
        + dbName
        + "\",\n" + "\"cmd\" : \"PUT\",\n"
        + "\"rel\" : \""
        + relName + "\","
        + "\"jsonStr\": \n"
        + jsonObj
        + "\n"
        + "}";
    return putRequest;
}

// This method is used to create GET Json request.
function createGETRequest(connToken, jsonObj, dbName, relName) {
    var getRequest = "{\n"
        + "\"token\" : \""
        + connToken
        + "\","
        + "\"dbName\": \""
        + dbName
        + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
        + "\"rel\" : \""
        + relName + "\","
        + "\"jsonStr\": \n"
        + jsonObj
        + "\n"
        + "}";
    return getRequest;
}
// To execute POST request.
function executepostCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}

// To reset form.
function resetForm() {
    alert("reset btn clicked");
    
    $(`#${ID[0]}`).val("")
    $(`#${ID[1]}`).val("");
    $(`#${ID[2]}`).val("");
    $(`#${ID[3]}`).val("");
    $(`#${ID[4]}`).val("");
    $(`#${ID[5]}`).val("");
    $(`#${ID[1]}`).prop("disabled",true);
    $(`#${ID[2]}`).prop("disabled",true);
    $(`#${ID[3]}`).prop("disabled",true);
    $(`#${ID[4]}`).prop("disabled",true);
    $(`#${ID[5]}`).prop("disabled",true);
    $('#save').prop("disabled",true);
    $('#update').prop("disabled",true);
    $('#reset').prop("disabled",true);
    $(`#${ID[0]}`).focus();
}

// Save new student record to database.
function saveStd() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(token,
        jsonStr, dbName, rel);
    alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executepostCommand(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
}

// Update existing student record in database.
function updateStd()
{
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var rec_no = localStorage.getItem('recno');
    var updateReqStr = createUPDATERecordRequest(token,
        jsonStr, dbName, rel,rec_no);
    alert(updateReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executepostCommand(updateReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
}
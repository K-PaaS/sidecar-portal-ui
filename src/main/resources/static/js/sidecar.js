const funcsc = {

    sidecarUrl: URI_REQUEST_SC_API,

    loadDataSidecar(method, url, header, callbackFunction, list) {
        if (sessionStorage.getItem('token') == null) {
            func.loginCheck();
        }

        if (url == null) {
            callbackFunction();
            return false;
        }

        var request = new XMLHttpRequest();

        setTimeout(function () {
            request.open(method, url, false);
            request.setRequestHeader('Content-type', header);
            request.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            request.setRequestHeader('uLang', CURRENT_LOCALE_LANGUAGE);

            request.onreadystatechange = () => {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200 && request.responseText != '') {
                        var resultMessage = JSON.parse(request.responseText).resultMessage;
                        var resultCode = JSON.parse(request.responseText).resultCode;
                        var detailMessage = JSON.parse(request.responseText).detailMessage;
                        var httpStatusCode = JSON.parse(request.responseText).httpStatusCode;

                        //토큰 만료 검사
                        if( resultMessage == 'TOKEN_EXPIRED') {
                            func.refreshToken();
                            return func.loadData(method, url, header, callbackFunction, list);
                        } else if(resultMessage == 'TOKEN_FAILED') {
                            func.loginCheck();
                            return func.loadData(method, url, header, callbackFunction, list);
                        } else if(httpStatusCode === 404) {
                            if(document.getElementById('loading')){
                                console.log("loadDataSidecar success!");
                                document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            }

                            func.alertPopup('ERROR', ALERT_POPUP_DELETE, true, MSG_CONFIRM, funcsc.movePageToOrgList);
                   //         func.alertPopup('ERROR', ALERT_POPUP_DELETE, true, MSG_CONFIRM, funcsc.movePageToOrg);


                        } else if(resultCode == RESULT_STATUS_FAIL) {
                            if(document.getElementById('loading')){
                                console.log("loadDataSidecar success!");
                                document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            };
                            func.alertPopup('ERROR', detailMessage, true, MSG_CONFIRM, 'closed');
                        }
                        else {
                            callbackFunction(JSON.parse(request.responseText), list);
                        }

                    } else if (JSON.parse(request.responseText).httpStatusCode === 500) {
                        console.log("500!!!");
                        sessionStorage.clear();
                        func.loginCheck();
                    }
                    ;
                }
            };
            request.send();
        }, 0);
    },
    loadDataSidecarSpace(method, url, header, callbackFunction, list) {
        if (sessionStorage.getItem('token') == null) {
            func.loginCheck();
        }

        if (url == null) {
            callbackFunction();
            return false;
        }

        var request = new XMLHttpRequest();

        setTimeout(function () {
            request.open(method, url, false);
            request.setRequestHeader('Content-type', header);
            request.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            request.setRequestHeader('uLang', CURRENT_LOCALE_LANGUAGE);

            request.onreadystatechange = () => {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200 && request.responseText != '') {
                        var resultMessage = JSON.parse(request.responseText).resultMessage;
                        var resultCode = JSON.parse(request.responseText).resultCode;
                        var detailMessage = JSON.parse(request.responseText).detailMessage;
                        var httpStatusCode = JSON.parse(request.responseText).httpStatusCode;

                        //토큰 만료 검사
                        if( resultMessage == 'TOKEN_EXPIRED') {
                            func.refreshToken();
                            return func.loadData(method, url, header, callbackFunction, list);
                        } else if(resultMessage == 'TOKEN_FAILED') {
                            func.loginCheck();
                            return func.loadData(method, url, header, callbackFunction, list);
                        } else if(httpStatusCode === 404) {
                            if(document.getElementById('loading')){
                                console.log("loadDataSidecar success!");
                                document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            }

                      //      func.alertPopup('ERROR', ALERT_POPUP_DELETE, true, MSG_CONFIRM, funcsc.movePageToOrgList);
                            func.alertPopup('ERROR', ALERT_POPUP_DELETE, true, MSG_CONFIRM, funcsc.movePageToOrg);


                        } else if(resultCode == RESULT_STATUS_FAIL) {
                            if(document.getElementById('loading')){
                                console.log("loadDataSidecar success!");
                                document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            };
                            func.alertPopup('ERROR', detailMessage, true, MSG_CONFIRM, 'closed');
                        }
                        else {
                            callbackFunction(JSON.parse(request.responseText), list);
                        }

                    } else if (JSON.parse(request.responseText).httpStatusCode === 500) {
                        console.log("500!!!");
                        sessionStorage.clear();
                        func.loginCheck();
                    }
                    ;
                }
            };
            request.send();
        }, 0);
    },
    loadDataSidecarJob(method, url, header, callbackFunction, list) {
        if (sessionStorage.getItem('token') == null) {func.loginCheck();}

        if (url == null) {callbackFunction(); return false;}

        var request = new XMLHttpRequest();

        setTimeout(function () {
            request.open(method, url, false);
            request.setRequestHeader('Content-type', header);
            request.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            request.setRequestHeader('uLang', CURRENT_LOCALE_LANGUAGE);

            request.onreadystatechange = () => {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200 && request.responseText != '') {
                        var resultMessage = JSON.parse(request.responseText).resultMessage;
                        var resultCode = JSON.parse(request.responseText).resultCode;
                        var detailMessage = JSON.parse(request.responseText).detailMessage;
                        var httpStatusCode = JSON.parse(request.responseText).httpStatusCode;

                        console.log("resultMessage : " + resultMessage);
                        console.log("resultCode : " + resultCode);
                        console.log("detailMessage : " + detailMessage);
                        console.log("httpStatusCode : " + httpStatusCode);

                        //토큰 만료 검사
                        if( resultMessage == 'TOKEN_EXPIRED') {
                            func.refreshToken();
                            return func.loadData(method, url, header, callbackFunction, list);
                        }
                        else if(resultMessage == 'TOKEN_FAILED') {
                            func.loginCheck();
                            return func.loadData(method, url, header, callbackFunction, list);
                        }
                        else if(resultCode != RESULT_STATUS_FAIL) {
                            if(document.getElementById('loading')){
                                document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            }

                            const data = JSON.parse(request.responseText);

                            if (data.state == "PROCESSING") {
                                funcsc.alertPopup('SUCCESS', ALERT_POPUP_DELETE_REQUEST, true, MSG_CONFIRM, callbackFunction);
                            } else if (data.state == "COMPLETE") {
                                funcsc.alertPopup('SUCCESS', ALERT_POPUP_DELETE, true, MSG_CONFIRM, callbackFunction);
                            } else if (data.state == "FAILED") {
                                var errorMessage = data.errors[0].detail.split(', ');
                                funcsc.alertPopup('FAIL', ALERT_POPUP_DELETE_FAIL + errorMessage[1], true, MSG_CONFIRM, callbackFunction);
                            }
                        }
                        else {
                            callbackFunction(JSON.parse(request.responseText), list);
                        }

                    } else if (JSON.parse(request.responseText).httpStatusCode === 500) {
                        console.log("500!!!");
                        sessionStorage.clear();
                        func.loginCheck();
                    }
                }
            };
            request.send();
        }, 0);
    },
    postData(method, url, data, bull, header, callFunc){
        func.loading();
        if(sessionStorage.getItem('token') == null){func.loginCheck(); }

        var request = new XMLHttpRequest();

        setTimeout(function() {
            request.open(method, url, false);
            request.setRequestHeader('Content-type', header);
            request.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            request.setRequestHeader('uLang', CURRENT_LOCALE_LANGUAGE);
            request.onreadystatechange = () => {
                if (request.readyState === XMLHttpRequest.DONE){
                    if(request.status === 200 && request.responseText != ''){
                        //토큰 만료 검사
                        if(JSON.parse(request.responseText).resultMessage == 'TOKEN_EXPIRED') {
                            func.refreshToken();
                            return func.saveData(method, url, data, bull, header, callFunc);
                        }
                        else if(JSON.parse(request.responseText).resultMessage == 'TOKEN_FAILED') {
                            func.loginCheck();
                            return func.loadData(method, url, header, callbackFunction, list);
                        }
                        else {
                            document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            var response = JSON.parse(request.responseText);
                            console.log("============");
                            console.log("response.resultCode : " + response.resultCode);
                            console.log("httpstatuscode : " + response.httpStatusCode);
                            console.log("request.status : " + request.status);
                         //   if (response.status == 200) {
                                if(response.resultCode != RESULT_STATUS_FAIL) {
                                    console.log("SUCCESS!");
                                    if(method == 'POST') {
                                        console.log("SUCCESS! POST");
                                        func.alertPopup('SUCCESS', ALERT_POPUP_CREATE, true, MSG_CONFIRM, callFunc);
                                    }else if (method == 'DELETE') {
                                        console.log("SUCCESS! DELETE");
                                        if(data == 'space') {
                                            funcsc.loadDataSidecarJob('GET', `${funcsc.sidecarUrl}sidecar/jobs/space.delete~${sessionStorage.getItem("space_guid")}`, "application/json", callFunc);
                                        }else if (data = 'org') {
                                            console.log("org delete!!")
                                            funcsc.loadDataSidecarJob('GET', `${funcsc.sidecarUrl}sidecar/jobs/org.delete~${sessionStorage.getItem("org_guid")}`, "application/json", callFunc);
                                        }
                                    }
                                } else if (response.resultCode == RESULT_STATUS_FAIL && method == 'DELETE') {
                                    if(data == 'space') {
                                        console.log("space 지우기");
                                        funcsc.loadDataSidecarJob('GET', `${funcsc.sidecarUrl}sidecar/jobs/space.delete~${sessionStorage.getItem("space_guid")}`, "application/json", callFunc);
                                    }else if (data = 'org') {
                                        console.log("org 지우기");
                                        funcsc.loadDataSidecarJob('GET', `${funcsc.sidecarUrl}sidecar/jobs/org.delete~${sessionStorage.getItem("org_guid")}`, "application/json", callFunc);
                                    }
                                } else {
                                    console.log("ERROR!");
                                    func.alertPopup('ERROR', ALERT_POPUP_ERROR, true, MSG_CONFIRM, 'closed');
                                }
                          /*  }
                            else {
                                console.log("ERROR2");
                                func.alertPopup('ERROR', response.detailMessage, true, MSG_CONFIRM, 'closed');
                            }*/
                        }
                    }
                }
            };
            console.log("3");
            request.send(data); }, 0);
    },
    addSpace(title, url, name) {
        var html = `<div class="modal-wrap" id="modal">
			<div class="modal midium">
				<h5>${title}</h5>
				<dl>
				    <dt>Space 이름</dt>
					<dd>
						<input style="width: 100%; height: 100%;" type="text" id="spaceName" placeholder="생성할 space의 이름을 입력하세요." required>
					</dd>
				</dl>
				<a class="confirm" href="javascript:;">확인</a>
				<a class="close" href="javascript:;">` + MSG_CLOSE + `</a>
			</div>
		</div>`;

        func.appendHtml(document.getElementById('wrap'), html, 'div');
        document.getElementById('modal').querySelector('.close').addEventListener('click', (e) => {
            document.getElementById('wrap').removeChild(document.getElementById('modal'));
        }, false);
        document.getElementById('modal').querySelector('.confirm').addEventListener('click', (e) => {
            const spaceName = document.getElementById('spaceName').value;
            const orgGuid = sessionStorage.getItem("org_guid");

            if(!spaceName) {
                alert(ALERT_SPACE + ALERT_ENTER);
                return;
            }else {
                console.log('spaceName : ' + spaceName);
                console.log('orgGuid : ' + orgGuid);
                var sendData = JSON.stringify({
                    "orgGuid": orgGuid,
                    "name": spaceName
                });

                funcsc.postData('POST', `${funcsc.sidecarUrl}sidecar/spaces`, sendData, true, 'application/json', func.refresh);
            }
        }, false);
    },
    addUser(title, url, name) {
        var html = `<div class="modal-wrap" id="modal">
			<div class="modal midium">
				<h5>${title}</h5>
				<dl>
				    <dt>User</dt>
					<dd>
						<fieldset>
							<select id="createName">
							</select>
						</fieldset>
					</dd>
				</dl>
				<dl style="margin-bottom: 10px;">
					<dt style="line-height: 50px;">Type</dt>
					<dd style="display: flex; gap: 50px; justify-content: center; align-items: center;" >
					        <input type="radio" id="organization_user" name="organization" value="organization_user">
                            <label for="organization_user">User</label>
                            <input type="radio" id="organization_manager" name="organization" value="organization_manager">
                            <label for="organization_manager">Manager</label>        
                    </dd>
				</dl>
				<a class="confirm" href="javascript:;">확인</a>
				<a class="close" href="javascript:;">` + MSG_CLOSE + `</a>
			</div>
		</div>`;

        func.appendHtml(document.getElementById('wrap'), html, 'div');
        func.loadData("GET", `${func.url}clusters/${sessionStorage.getItem("cluster")}/namespaces/all/usersList?userType=user&searchName`, "application/json", (data) => {
            cluster_user(data);
        })
        function cluster_user(data) {
            for (var i = 0; i <= data.itemMetaData.allItemCount - 1; i++) {
                for(var j = 0; j < data.items[i].items.length; j++) {
                    if (data.items[i].items[j].roleSetCode === SIDECAR_ROLE_USER) {
                        var users = data.items[i].items[j].userId;
                        var html = `<option value="${users}">${users}</option>`;
                        func.appendHtml(document.getElementById('createName'), html, 'select');
                    }
                }
            }

            if (sessionStorage.getItem('users') == NAMESPACE_ALL_VALUE) {
                document.getElementById('createName').selectedIndex = 0;
            } else {
                document.getElementById('createName').value = sessionStorage.getItem('users');
            }

            document.getElementById('modal').querySelector('.close').addEventListener('click', (e) => {
                document.getElementById('wrap').removeChild(document.getElementById('modal'));
            }, false);
            document.getElementById('modal').querySelector('.confirm').addEventListener('click', (e) => {
                var check = false;
                var organization = document.getElementsByName('organization');
                for(var i = 0; i < organization.length; i++){
                    if(organization[i].checked == true) {
                        check = true;
                    }
                }

                if(!document.getElementById('createName').value){
                    alert(ALERT_USER + ALERT_SELECT);
                    return;
                }else if(check == false){
                    alert(ALERT_TYPE + ALERT_SELECT);
                    return;
                }else {
                    var orgGuid = sessionStorage.getItem("org_guid");
                    var type = document.querySelector('input[type=radio][name=organization]:checked').value;
                    var user = "system:serviceaccount:" + SIDECAR_ROLE_USER + ":" + document.getElementById('createName').value;
                    var sendData = JSON.stringify({
                        "orgGuid": orgGuid,
                        "type": type,
                        "user": user
                    });

                    funcsc.postData('POST', `${funcsc.sidecarUrl}sidecar/roles`, sendData, true, 'application/json', func.refresh);
                }
            }, false);
        }
    },
    addDomain(title, url, name) {
        var html = `<div class="modal-wrap" id="modal">
			<div class="modal midium">
				<h5>${title}</h5>
				<dl>
				    <dt>Domain 이름</dt>
					<dd>
						<input style="width: 100%; height: 100%;" type="text" id="domainName" placeholder="생성할 domain 이름을 입력하세요." required>
					</dd>
				</dl>
				<a class="confirm" href="javascript:;">확인</a>
				<a class="close" href="javascript:;">` + MSG_CLOSE + `</a>
			</div>
		</div>`;

        func.appendHtml(document.getElementById('wrap'), html, 'div');
        document.getElementById('modal').querySelector('.close').addEventListener('click', (e) => {
            document.getElementById('wrap').removeChild(document.getElementById('modal'));
        }, false);
        document.getElementById('modal').querySelector('.confirm').addEventListener('click', (e) => {
            const domainName = document.getElementById('domainName').value;
            const orgGuid = sessionStorage.getItem("org_guid");

            if(!domainName) {
                alert(ALERT_Domain + ALERT_ENTER);
                return;
            }else {
                console.log('domainName : ' + domainName);
                var sendData = JSON.stringify({
                    "name": domainName
                });

                funcsc.postData('POST', `${funcsc.sidecarUrl}sidecar/domains`, sendData, true, 'application/json', func.refresh);
            }
        }, false);
    },
    /////////////////////////////////////////////////////////////////////////////////////
    // 공통 경고 팝업 - alertPopup(title, text, bull, name, fn)
    // (제목, 문구, 버튼유무, 버튼이름, 콜백함수)
    /////////////////////////////////////////////////////////////////////////////////////
    alertPopup(title, text, bull, name, callback){
        var html = `<div class='modal-wrap' id='alertModal'><div class='modal'><h5>${title}</h5><p>${text}</p>`;
        if(bull){
            html += `<a class='confirm' href='javascript:;'>${name}</a>`;
        };
        html += `<a class='close' href='javascript:;'>` + MSG_CLOSE + `</a></div></div>`;

        if(document.getElementById('alertModal') !== null) {
            document.getElementById('wrap').removeChild(document.getElementById('alertModal'));
        }

        func.appendHtml(document.getElementById('wrap'), html, 'div');

        document.getElementById('alertModal').querySelector('.close').addEventListener('click', (e) => {
            document.getElementById('wrap').removeChild(document.getElementById('alertModal'));
        }, false);

        if(callback){
            document.getElementById('alertModal').querySelector('.confirm').addEventListener('click', (e) => {
                if(callback != 'closed'){
                    callback();
                }
                if(!IS_VCHK) {
                    document.getElementById('wrap').removeChild(document.getElementById('alertModal'));}
            }, false);
        }
    },
    movePageToOrg() {
        location.href = URI_SC_MANAGEMENTS_ORGANIZATIONS + URI_SC_DETAILS;
    },
    movePageToOrgList() {
        location.href = URI_SC_MANAGEMENTS_ORGANIZATIONS;
    }
}

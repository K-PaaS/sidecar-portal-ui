const funcsc = {
    sidecarUrl: URI_REQUEST_SC_API,

    loadDataSidecar(method, url, header, callbackFunction, list, data) {
        if (sessionStorage.getItem('token') == null) {
            func.loginCheck();
        }
        if (url == null) {
            callbackFunction();
            return false;
        }

        var request = new XMLHttpRequest();
        console.log("data : ", data)

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

                        if( resultMessage === 'TOKEN_EXPIRED') {
                            func.refreshToken();
                            return func.loadData(method, url, header, callbackFunction, list);
                        } else if(resultMessage === 'TOKEN_FAILED') {
                            func.loginCheck();
                            return func.loadData(method, url, header, callbackFunction, list);
                        } else if(httpStatusCode === 404) {
                            if(document.getElementById('loading')){
                                document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            }
                            console.log("data 404 : ", data)
                            if(data === 'org') {
                                func.alertPopup('ERROR', ALERT_POPUP_DELETE, true, MSG_CONFIRM, funcsc.movePageToOrgList);
                            }else if(data === 'space') {
                                func.alertPopup('ERROR', ALERT_POPUP_DELETE, true, MSG_CONFIRM, funcsc.movePageToOrg);
                            }

                        } else if(resultCode === RESULT_STATUS_FAIL) {
                            if(document.getElementById('loading')){
                                document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            };
                            func.alertPopup('ERROR', detailMessage, true, MSG_CONFIRM, 'closed');
                        }
                        else {
                            callbackFunction(JSON.parse(request.responseText), list);
                        }

                    } else if (JSON.parse(request.responseText).httpStatusCode === 500) {
                        sessionStorage.clear();
                        func.loginCheck();
                    }
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

                        if( resultMessage === 'TOKEN_EXPIRED') {
                            func.refreshToken();
                            return func.loadData(method, url, header, callbackFunction, list);
                        }
                        else if(resultMessage === 'TOKEN_FAILED') {
                            func.loginCheck();
                            return func.loadData(method, url, header, callbackFunction, list);
                        }
                        else if(resultCode != RESULT_STATUS_FAIL) {
                            if(document.getElementById('loading')){
                                document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            }
                            const data = JSON.parse(request.responseText);
                            // data.state에서 현재 버전에는 없으나 "polling"이 추후 발생 할 수 있음
                            if (data.state === "PROCESSING") {
                                funcsc.alertPopup('SUCCESS', ALERT_POPUP_DELETE_REQUEST, true, MSG_CONFIRM, callbackFunction);
                            } else if (data.state === "COMPLETE") {
                                funcsc.alertPopup('SUCCESS', ALERT_POPUP_DELETE, true, MSG_CONFIRM, callbackFunction);
                            } else if (data.state === "FAILED") {
                                var errorMessage = data.errors[0].detail.split(', ');
                                funcsc.alertPopup('FAIL', ALERT_POPUP_DELETE_FAIL + errorMessage[1], true, MSG_CONFIRM, callbackFunction);
                            }
                        }
                        else {
                            callbackFunction(JSON.parse(request.responseText), list);
                        }

                    } else if (JSON.parse(request.responseText).httpStatusCode === 500) {
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

                            if(response.resultCode !== RESULT_STATUS_FAIL) {
                                if(method === 'POST') {
                                    func.alertPopup('SUCCESS', ALERT_POPUP_CREATE, true, MSG_CONFIRM, callFunc);
                                }else if (method === 'DELETE') {
                                    if(data === 'space') {
                                        funcsc.loadDataSidecarJob('GET', `${funcsc.sidecarUrl}sidecar/jobs/space.delete~${sessionStorage.getItem("space_guid")}`, "application/json", callFunc);
                                    }else if (data === 'org') {
                                        funcsc.loadDataSidecarJob('GET', `${funcsc.sidecarUrl}sidecar/jobs/org.delete~${sessionStorage.getItem("org_guid")}`, "application/json", callFunc);
                                    }else {
                                        funcsc.loadDataSidecarJob('GET', `${funcsc.sidecarUrl}sidecar/jobs/domain.delete~${data}`, "application/json", callFunc);
                                    }
                                }
                            } else if (response.resultCode == RESULT_STATUS_FAIL && method === 'DELETE') {
                                if(data === 'space') {
                                    funcsc.loadDataSidecarJob('GET', `${funcsc.sidecarUrl}sidecar/jobs/space.delete~${sessionStorage.getItem("space_guid")}`, "application/json", callFunc);
                                }else if (data === 'org') {
                                    funcsc.loadDataSidecarJob('GET', `${funcsc.sidecarUrl}sidecar/jobs/org.delete~${sessionStorage.getItem("org_guid")}`, "application/json", callFunc);
                                }else {
                                    funcsc.loadDataSidecarJob('GET', `${funcsc.sidecarUrl}sidecar/jobs/domain.delete~${data}`, "application/json", callFunc);
                                }
                            } else {
                                func.alertPopup('ERROR', ALERT_POPUP_FAIL + response.detailMessage, true, MSG_CONFIRM, 'closed');
                            }
                        }
                    }
                }
            };
            request.send(data); }, 0);
    },
    addOrg(title, url, name) {
        var html = `<div class="modal-wrap" id="modal">
			<div class="modal midium">
				<h5>${title}</h5>
				<dl>
				    <dt>Org Name</dt>
					<dd>
						<input class="popup_add_input" type="text" id="orgName" placeholder="${PLACEHOLDER_CREATE_ORG}" required>
					</dd>
				</dl>
				<a class="confirm" href="javascript:;">` + BUTTON_ADD+ `</a>
				<a class="close" href="javascript:;">` + MSG_CLOSE + `</a>
			</div>
		</div>`;
        func.appendHtml(document.getElementById('wrap'), html, 'div');
        document.getElementById('modal').querySelector('.close').addEventListener('click', (e) => {
            document.getElementById('wrap').removeChild(document.getElementById('modal'));
        }, false);
        document.getElementById('modal').querySelector('.confirm').addEventListener('click', (e) => {
            const orgName = document.getElementById('orgName').value;
            if(!orgName) {
                alert(ALERT_ORG_ENTER);
                return;
            }else {
                var sendData = JSON.stringify({
                    "name": orgName
                });
                funcsc.postData('POST', `${funcsc.sidecarUrl}sidecar/organizations`, sendData, true, 'application/json', func.refresh);
            }
        }, false);
    },
    addSpace(title, url, name) {
        var html = `<div class="modal-wrap" id="modal">
			<div class="modal midium">
				<h5>${title}</h5>
				<dl>
				    <dt>Space Name</dt>
					<dd>
						<input class="popup_add_input" type="text" id="spaceName" placeholder="${PLACEHOLDER_CREATE_SPACE}" required>
					</dd>
				</dl>
				<a class="confirm" href="javascript:;">` + BUTTON_ADD + `</a>
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
                alert(ALERT_SPACE_ENTER);
                return;
            }else {
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
				<dl class="popup_add_user_dl">
					<dt id="popup_add_user_dt">Type</dt>
					<dd class="popup_add_user_dd" >
					        <input type="radio" id="organization_user" name="organization" value="organization_user">
                            <label for="organization_user">User</label>
                            <input type="radio" id="organization_manager" name="organization" value="organization_manager">
                            <label for="organization_manager">Manager</label>        
                    </dd>
				</dl>
				<a class="confirm" href="javascript:;">` + BUTTON_ADD + `</a>
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
                    alert(ALERT_USER_SELECT);
                    return;
                }else if(check == false){
                    alert(ALERT_TYPE_SELECT);
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
				    <dt>Domain Name</dt>
					<dd>
						<input class="popup_add_input" type="text" id="domainName" placeholder="${PLACEHOLDER_CREATE_DOMAIN}" required>
					</dd>
				</dl>
				<a class="confirm" href="javascript:;">` + BUTTON_ADD+ `</a>
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
                alert(ALERT_DOMAIN_ENTER);
                return;
            }else {
                var sendData = JSON.stringify({
                    "name": domainName
                });
                funcsc.postData('POST', `${funcsc.sidecarUrl}sidecar/domains`, sendData, true, 'application/json', func.refresh);
            }
        }, false);
    },
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
    },
}

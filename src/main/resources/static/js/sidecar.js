const funcsc = {

    sidecarUrl: URI_REQUEST_SC_API,

    loadDataAsyncSidecar(method, url, header, list) {
        return new Promise(function (resolve) {
            if (sessionStorage.getItem('token') == null) {
                func.loginCheck();
            }

            if (url == null) {
                resolve(false);
                return;
            }

            var request = new XMLHttpRequest();

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

                        //토큰 만료 검사
                        if (resultMessage == 'TOKEN_EXPIRED') {
                            func.refreshToken();
                            return funcsc.loadDataSidecar(method, url, header, callbackFunction, list);
                        } else if (resultMessage == 'TOKEN_FAILED') {
                            func.loginCheck();
                            return funcsc.loadDataSidecar(method, url, header, callbackFunction, list);
                        } else if (resultCode == RESULT_STATUS_FAIL) {
                            if (document.getElementById('loading')) {
                                document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            }
                            ;
                            func.alertPopup('ERROR', detailMessage, true, MSG_CONFIRM, 'closed');
                        } else {
                            resolve(JSON.parse(request.responseText), list);
                            return;
                        }

                    } else if (JSON.parse(request.responseText).httpStatusCode === 500) {
                        sessionStorage.clear();
                        func.loginCheck();
                    }
                }
            };
            request.send();
        });
    },

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

                        //토큰 만료 검사
                        if( resultMessage == 'TOKEN_EXPIRED') {
                            func.refreshToken();
                            return func.loadData(method, url, header, callbackFunction, list);
                        }
                        else if(resultMessage == 'TOKEN_FAILED') {
                            func.loginCheck();
                            return func.loadData(method, url, header, callbackFunction, list);
                        }
                        else if(resultCode == RESULT_STATUS_FAIL) {
                            if(document.getElementById('loading')){
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
    postData(method, url, data, bull, header, callFunc){
        func.loading();
        console.log("1");
        if(sessionStorage.getItem('token') == null){
            func.loginCheck();
        };

        var request = new XMLHttpRequest();
        console.log("2");
        setTimeout(function() {
            request.open(method, url, false);
            request.setRequestHeader('Content-type', header);
            request.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            request.setRequestHeader('uLang', CURRENT_LOCALE_LANGUAGE);
            request.onreadystatechange = () => {
                console.log("4");
                if (request.readyState === XMLHttpRequest.DONE){
                    console.log("5");
                    if(request.status === 200 && request.responseText != ''){
                        console.log("6");
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
                            console.log("7");
                            document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            var response = JSON.parse(request.responseText);
                            let url_tmp = URI_REQUEST_SC_API+"sidecar/";
                            let urlPath = request.responseURL.split(url_tmp);
                            let urlPath2 = urlPath[1].split('/');
                            let urlPath3 = 0;
                            let urlCategory = 0;
                            urlCategory = urlPath2[0];
                            if (urlPath2.length%2== 0){
                                urlPath3 = urlPath2[urlPath2.length -2];

                            }else{
                                urlPath3 = urlPath2[urlPath2.length -1];
                            }
                            console.log(urlPath3);
                                if(response.resultCode != RESULT_STATUS_FAIL) {
                                    console.log("SUCCESS!");
                                    if(method == 'POST') {
                                        if((urlCategory == "processes" && urlPath3 == "scale") || (urlCategory == "apps" && urlPath3 == "start" ) || (urlCategory == "apps" && urlPath3 == "stop" )){
                                            console.log("SUCCESS! SCALE");
                                            func.alertPopup('SUCCESS', ALERT_POPUP_PATCH, true, MSG_CONFIRM, callFunc);
                                        }else if ((urlCategory == "serviceBindings" && urlPath3 == "serviceBindings" ) || (urlCategory == "routes" && urlPath3 == "insertDestinations" )){
                                            console.log("SUCCESS! CONNECT");
                                            func.alertPopup('SUCCESS', ALERT_POPUP_CONNECT, true, MSG_CONFIRM, callFunc);
                                        }else if ((urlCategory == "apps" && urlPath3 == "start" ) || (urlCategory == "routes" && urlPath3 == "insertDestinations" )){
                                            console.log("SUCCESS! START");
                                            func.alertPopup('SUCCESS', ALERT_POPUP_CONNECT, true, MSG_CONFIRM, callFunc);
                                        }
                                        else{
                                            console.log("SUCCESS! POST");
                                            func.alertPopup('SUCCESS', ALERT_POPUP_CREATE, true, MSG_CONFIRM, callFunc);
                                        }
                                    }else if (method == 'DELETE') {
                                        if ((urlCategory == "serviceBindings" && urlPath3 == "serviceBindings" ) || (urlCategory == "routes" && urlPath3 == "removeDestinations" )){
                                            console.log("SUCCESS! DISCONNECT");
                                            func.alertPopup('SUCCESS', ALERT_POPUP_DISCONNECT, true, MSG_CONFIRM, callFunc);
                                        }else {
                                            console.log("SUCCESS! DELETE");
                                            func.alertPopup('SUCCESS', ALERT_POPUP_DELETE, true, MSG_CONFIRM, callFunc);
                                        }
                                    }else if (method == 'PATCH') {
                                        if(urlCategory == "apps" && urlPath3 == "updateEnvironmentVariables"){
                                            console.log("SUCCESS! UPDATE ENVIRONMENT");
                                            func.alertPopup('SUCCESS', ALERT_POPUP_PATCH, true, MSG_CONFIRM, callFunc);
                                        }else{
                                            console.log("SUCCESS! PATCH");
                                            func.alertPopup('SUCCESS', ALERT_POPUP_PATCH, true, MSG_CONFIRM, callFunc);
                                        }
                                    }
                                }
                                else {
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
    }

}

const appsModal = {
    checkNameAndRoute(appName, route){
                    let isDuplicateRoute = false;
                    let isDuplicateAppName = false;
                    for (var i=0; i < routes.resources.length; i++){
                        if (routes.resources[i].url == route){
                            isDuplicateRoute = true;
                            break;
                        }
                    }
                    for (var i=0; i < orgApps.length; i++){
                        if (orgApps[i].name == appName){
                            isDuplicateAppName = true;
                            break;
                        }
                    }
                    if(isDuplicateAppName && isDuplicateRoute){
                        isDuplicate=true;
                        document.getElementById('duplicateText').innerHTML = DUPLICATE_NAME_AND_ROUTE;
                    }else if(isDuplicateAppName){
                        isDuplicate=true;
                        document.getElementById('duplicateText').innerHTML = DUPLICATE_NAME;
                    }else if(isDuplicateRoute){
                        isDuplicate=true;
                        document.getElementById('duplicateText').innerHTML = DUPLICATE_ROUTE;
                    }else {
                        isDuplicate=false;
                        document.getElementById('duplicateText').innerHTML = "";
                    }
                },
    push(domains, routes, orgApps) {
            isDuplicate=false;
            var domainsOption = ``;
            if(domains.resources.length == 0){
                domainsOption = `<option value="notFound">${NOT_FOUND_AVAILABLE_DOMAIN}</option>`
            }else {
                for (var i=0; i< domains.resources.length; i++){
                    domainsOption = domainsOption + `<option value="${domains.resources[i].guid}">${domains.resources[i].name}</option>`
                }
            }
            var html = `<div class="modal-wrap" id="modal">
                            <div class="modal midium push">
                                <h5>${MODAL_APPS_PUSH_TITLE}</h5>
        				            <dl>
        				                <dt>Name</dt>
        				                <dd>
        				                    <input style="width: 100%; height: 100%;" type="text" id="nameInput" placeholder="Name" required="">
        				                </dd>
        				            </dl>
        				            <dl>
        				                <dt>Route</dt>
        				                <dd>
        				                    <div class="creat-type2">
        				                        <div class="g-select-wrap">
        				                            <div class="g-select">
        				                                <input style="width: 250px;height: 100%; margin-right: 5px; margin-left: 0px;" type="text" id="routeInput" placeholder="Route" required="">
        				                                <select name="target" id="selectDomain" class="rules target">` +
        				                                domainsOption+`
            				                            </select>
            				                        </div>
            				                    </div>
            				                </div>
            				            </dd>
        				            </dl>
        				            <dl>
        				                <dt>Memory</dt>
        				                <dd>
        				                    <div class="creat-type2">
        				                        <div class="g-select-wrap">
        				                            <div class="g-select">
        				                                <select style="min-width:250px; width: 250px;" name="target" id="selectMemory" class="rules target">
        				                                    <option value="256">256MB</option>
        				                                    <option value="512">512MB</option>
        				                                    <option value="1024">1024MB</option>
        				                                </select>
        				                            </div>
        				                        </div>
        				                    </div>
        				                </dd>
        				                <dt>Disk</dt>
        				                <dd>
        				                    <div class="creat-type2">
        				                        <div class="g-select-wrap">
        				                            <div class="g-select">
        				                                <select style="min-width:250px; width: 250px;" name="target" id="selectDisk" class="rules target">
                                                            <option value="256">256MB</option>
                                                            <option value="512">512MB</option>
                                                            <option value="1024">1024MB</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>File</dt>
                                        <dd>
                                            <div class="filebox">
                                                <input class="fileName" disabled value="File" placeholder="File">
                                                <label for="file">Upload</label>
                                                <input type="file"  id="file">
                                            </div>
                                        </dd>
                                    </dl>
                                    <div id="duplicateText" style="color: red; height: 20px;"></div>
        				            <a class="confirm" href="javascript:;">${MSG_CONFIRM}</a>
        				            <a class="close" href="javascript:;">` + MSG_CLOSE + `</a>
        			            </div>
        		            </div>`;
        	func.appendHtml(document.getElementById('wrap'), html, 'div');

            document.getElementById('nameInput').addEventListener('input', (e) => {
        	    document.getElementById('routeInput').value = document.getElementById('nameInput').value;
        	    let selectDomain = document.getElementById('selectDomain');
        	    appsModal.checkNameAndRoute(document.getElementById('nameInput').value, document.getElementById('routeInput').value + "." + selectDomain.options[selectDomain.selectedIndex].text);
        	});
            document.getElementById('routeInput').addEventListener('input', (e) => {
                let selectDomain = document.getElementById('selectDomain');
                appsModal.checkNameAndRoute(document.getElementById('nameInput').value, document.getElementById('routeInput').value + "." + selectDomain.options[selectDomain.selectedIndex].text);
            });
            document.getElementById('selectDomain').addEventListener('change', (e) => {
                let selectDomain = document.getElementById('selectDomain');
                appsModal.checkNameAndRoute(document.getElementById('nameInput').value, document.getElementById('routeInput').value + "." + selectDomain.options[selectDomain.selectedIndex].text);
            });

        	$("#file").on('change',function(){
        	  var fileName = $("#file").val().split('/').pop().split('\\').pop();
              $(".fileName").val(fileName);
            });
        	document.getElementById('modal').querySelector('.close').addEventListener('click', (e) => {
        	    document.getElementById('wrap').removeChild(document.getElementById('modal'));
        	}, false);
        	document.getElementById('modal').querySelector('.confirm').addEventListener('click', (e) => {
        	    if(isDuplicate==true){
        	        func.alertPopup('ERROR', DUPLICATE_CHECK, true, MSG_CONFIRM, 'closed');
        	        return false;
        	    }
        	    let name = document.getElementById('nameInput').value;
        	    let host = document.getElementById('routeInput').value;
        	    if(name === null || name === undefined || name === '' || host === null || host === undefined || host === ''){
        	        func.alertPopup('ERROR', BLANK_CHECK, true, MSG_CONFIRM, 'closed');
        	        return false;
        	    }
        	    let domainGuid = document.getElementById('selectDomain').value;
        	    if(domainGuid == 'notFound'){
        	        func.alertPopup('ERROR', NOT_FOUND_AVAILABLE_DOMAIN, true, MSG_CONFIRM, 'closed');
        	        return false;
                }
                if( typeof document.getElementById('file').files[0] == "undefined" || document.getElementById('file').files[0] == null || document.getElementById('file').files[0] == ""  ){
                    func.alertPopup('ERROR', FILE_CHECK, true, MSG_CONFIRM, 'closed');
                    return false;
                }

        	    let memory = document.getElementById('selectMemory').value;
        	    let disk = document.getElementById('selectDisk').value;
        	    let spaceGuid = sessionStorage.getItem('space_guid');

        	    var sendData = JSON.stringify({
        	        name: name,
        	        host: host,
        	        spaceGuid: spaceGuid,
        	        domainGuid: domainGuid,
        	        memory: memory,
        	        disk: disk,});

                const blob = new Blob([sendData], {type: 'application/json'});
        	    let formData = new FormData();
        	    formData.append('requestData', blob);
                formData.append('multipartFile', document.getElementById('file').files[0]);

                funcsc.postDataWithFile('POST', `${funcsc.sidecarUrl}sidecar/app/push`, formData, true, 'multipart/form-data', func.refresh);
        	}, false);
        },
    //Environment
    addEnvironment(environment) {
        var options = ``;
        var html = `<div class="modal-wrap" id="modal">
                        <div class="modal midium addEnvironment">
                            <h5>${MODAL_APPS_CREATE_ENVIRONMENT_TITLE}</h5>
    				            <dl>
    					            <dt>Key</dt>
    					                <dd>
    						                <input style="width: 100%; height: 100%;" type="text" id="keyInput" placeholder="Key" required>
    					                </dd>
    					        </dl>
    					        <dl>
    					            <dt>Value</dt>
    					                <dd>
    						                <input style="width: 100%; height: 100%;" type="text" id="valueInput" placeholder="Value" required>
    					                </dd>
    				            </dl>
    				            <a class="confirm" href="javascript:;">${MSG_CONFIRM}</a>
    				            <a class="close" href="javascript:;">` + MSG_CLOSE + `</a>
    			            </div>
    		            </div>`;
    	func.appendHtml(document.getElementById('wrap'), html, 'div');
    	document.getElementById('modal').querySelector('.close').addEventListener('click', (e) => {
    	    document.getElementById('wrap').removeChild(document.getElementById('modal'));
    	}, false);
    	document.getElementById('modal').querySelector('.confirm').addEventListener('click', (e) => {
    	    let key = document.getElementById('keyInput').value;
    	    let value = document.getElementById('valueInput').value;
    	    var sendData = JSON.stringify({
    	        "environmentVariables" : {
    	            [key]: value
    	        }
    	    });
    	    if ( key === null || key === undefined || key === '' || value === null || value === undefined || value === ''){
    	        func.alertPopup('ERROR', BLANK_CHECK, true, MSG_CONFIRM, 'closed');
    	        return false;
    	    }else if (Object.keys(environment.environment_variables).some(other => other === key)){
    	        func.alertPopup('ERROR', DUPLICATE_CHECK, true, MSG_CONFIRM, 'closed');
    	    }else {
    	        funcsc.postDataWithPopup('PATCH', `${funcsc.sidecarUrl}sidecar/apps/${sessionStorage.getItem("appGuid")}/updateEnvironmentVariables`, sendData, true, 'application/json', func.refresh);
    	    }
    	}, false);
    },
    //Service
    getCredentials(data, serviceInstanceName) {
        let json = JSON.stringify(data, null, 2);
        var html = `<div class="modal-wrap" id="modal">
                        <div class="modal midium getCredentials">
    				        <h5>${MODAL_APPS_GET_CREDENTIAL_TITLE}</h5>
    				        <dl>
    				            <dt>${serviceInstanceName}</dt>
        				        <dd>
        				            <textarea rows="4" cols="50" disabled>${json}</textarea>\
        				        </dd>
            		        </dl>
    		                <a class="close" href="javascript:;">` + MSG_CLOSE + `</a>
    			        </div>
    		        </div>`;
        func.appendHtml(document.getElementById('wrap'), html, 'div');
        document.getElementById('modal').querySelector('.close').addEventListener('click', (e) => {
        document.getElementById('wrap').removeChild(document.getElementById('modal'));
        }, false);
    },
    //Service
    connectService(data) {
        var options = ``;
        if(data.length == 0){
            options = `<option value="notFound">${NOT_FOUND_AVAILABLE_CONNECT_SERVICE}</option>`
        }else {
            for (var i=0; i< data.length; i++){
                options = options + `<option value="${data[i].guid}">${data[i].name}</option>`
            }
        }
        var html = `<div class="modal-wrap" id="modal">
    			        <div class="modal midium connectService">
    				        <h5>${MODAL_APPS_CONNECT_SERVICE_TITLE}</h5>
    				        <dl>
    				            <dt>${MODAL_APPS_CONNECT_SERVICE_SERVICES}</dt>
    					        <dd>
    					            <div class="g-select">
    						        <select name="selectService" id="selectService">` +
                                        options
                                    +`</select>
                                    </div>
    					        </dd>
    				        </dl>
    				        <a class="confirm" href="javascript:;">${MSG_CONFIRM}</a>
    				        <a class="close" href="javascript:;">` + MSG_CLOSE + `</a>
    			        </div>
    		        </div>`;
    	func.appendHtml(document.getElementById('wrap'), html, 'div');
        document.getElementById('modal').querySelector('.close').addEventListener('click', (e) => {
            document.getElementById('wrap').removeChild(document.getElementById('modal'));
        }, false);

        document.getElementById('modal').querySelector('.confirm').addEventListener('click', (e) => {
            let serviceGuid = document.querySelector('#selectService').options[document.querySelector('#selectService').selectedIndex].value;
            let appGuid = sessionStorage.getItem("appGuid");
            if(document.querySelector('#selectService').value == 'notFound'){
                func.alertPopup('ERROR', NOT_FOUND_AVAILABLE_CONNECT_SERVICE, true, MSG_CONFIRM, 'closed');
                return false;
            }
            var sendData = JSON.stringify({
                "appGuid": appGuid,
                "serviceGuid": serviceGuid
            });
            funcsc.postDataWithPopup('POST', `${funcsc.sidecarUrl}sidecar/serviceBindings`, sendData, true, 'application/json', func.refresh);
        }, false);
    },
    //Route
    connectRoute(data) {
        var options = ``;
        if(data.length == 0){
            options = `<option value="notFound">${NOT_FOUND_AVAILABLE_CONNECT_ROUTE}</option>`
        }else {
            for (var i=0; i< data.length; i++){
                options = options + `<option value="${data[i].guid}">${data[i].url}</option>`
            }
        }
        var html = `<div class="modal-wrap" id="modal">
    			        <div class="modal midium connectRoute">
    				        <h5>${MODAL_APPS_CONNECT_ROUTE_TITLE}</h5>
    				        <dl>
    				            <dt>${MODAL_APPS_CONNECT_ROUTE_ROUTES}</dt>
    					        <dd>
    					            <div class="g-select">
    						        <select name="selectRoute" id="selectRoute">` +
                                        options
                                    +`</select>
                                    </div>
    					        </dd>
    				        </dl>
    				        <a class="confirm" href="javascript:;">${MSG_CONFIRM}</a>
    				        <a class="close" href="javascript:;">` + MSG_CLOSE + `</a>
    			        </div>
    		        </div>`;
        func.appendHtml(document.getElementById('wrap'), html, 'div');
        document.getElementById('modal').querySelector('.close').addEventListener('click', (e) => {
            document.getElementById('wrap').removeChild(document.getElementById('modal'));
        }, false);
        document.getElementById('modal').querySelector('.confirm').addEventListener('click', (e) => {
            let routeGuid = document.querySelector('#selectRoute').options[document.querySelector('#selectRoute').selectedIndex].value;
            let appGuid = sessionStorage.getItem("appGuid");
            if(document.querySelector('#selectRoute').value == 'notFound'){
                func.alertPopup('ERROR', NOT_FOUND_AVAILABLE_CONNECT_ROUTE, true, MSG_CONFIRM, 'closed');
                return false;
            }
            var sendData = JSON.stringify({
                "appGuid": appGuid,
                "routeGuid": routeGuid
            });
            funcsc.postDataWithPopup('POST', `${funcsc.sidecarUrl}sidecar/routes/${routeGuid}/insertDestinations/${sessionStorage.getItem("appGuid")}`, '', true, 'application/json', func.refresh);
        }, false);
    },
}
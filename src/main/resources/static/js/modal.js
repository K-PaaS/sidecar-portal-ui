const appsModal = {
    //Environment
    addEnvironment(environment) {
        var options = ``;
        var html = `<div class="modal-wrap" id="modal">
                        <div class="modal midium addEnvironment">
                            <h5>${MODAL_APPS_CREATE_ENVIRONMENT_TITLE}</h5>
    				            <dl>
    					            <dt>KEY</dt>
    					                <dd>
    						                <input style="width: 100%; height: 100%;" type="text" id="keyInput" placeholder="key 입력" required>
    					                </dd>
    					        </dl>
    					        <dl>
    					            <dt>Value</dt>
    					                <dd>
    						                <input style="width: 100%; height: 100%;" type="text" id="valueInput" placeholder="value 입력" required>
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
    	    let key = document.getElementById('keyInput').value;
    	    let value = document.getElementById('valueInput').value;
    	    var sendData = JSON.stringify({
    	        "environmentVariables" : {
    	            [key]: value
    	        }
    	    });
    	    if (Object.keys(environment.environment_variables).some(other => other === key)){
    	        console.log("중복된 값");
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
        				            <textarea id="w3review" name="w3review" rows="4" cols="50" disabled>${json}</textarea>\
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
            options = `<option value="not_found">Not found available connect service</option>`
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
    						        <select name="cars" id="avservice">` +
                                        options
                                    +`</select>
                                    </div>
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
            let serviceGuid = document.querySelector('#avservice').options[document.querySelector('#avservice').selectedIndex].value;
            let appGuid = sessionStorage.getItem("appGuid");
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
            options = `<option value="not_found">Not found available connect service</option>`
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
    						        <select name="cars" id="avservice">` +
                                        options
                                    +`</select>
                                    </div>
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
            let routeGuid = document.querySelector('#avservice').options[document.querySelector('#avservice').selectedIndex].value;
            let appGuid = sessionStorage.getItem("appGuid");
            var sendData = JSON.stringify({
                "appGuid": appGuid,
                "routeGuid": routeGuid
            });
            funcsc.postDataWithPopup('POST', `${funcsc.sidecarUrl}sidecar/routes/${routeGuid}/insertDestinations/${sessionStorage.getItem("appGuid")}`, '', true, 'application/json', func.refresh);
        }, false);
    },
}
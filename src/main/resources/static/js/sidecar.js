const funcsc = {

    sidecarUrl: URI_REQUEST_SC_API,

    loadDataSidecar(method, url, header, callbackFunction, list) {
        if (sessionStorage.getItem('token') == null) {
            func.loginCheck();
        }
        ;

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
                        sessionStorage.clear();
                        func.loginCheck();
                    }
                    ;
                }
                ;
            };

            request.send();
        }, 0);
    },
/*    postData(method, url, data, bull, header, callFunc){
        func.loading();

        if(sessionStorage.getItem('token') == null){
            func.loginCheck();
        };

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
                            if (response.httpStatusCode == 200) {
                                if(response.resultCode == RESULT_STATUS_SUCCESS) {
                                    func.alertPopup('SUCCESS', response.detailMessage, true, MSG_CONFIRM, callFunc);
                                }
                                else {
                                    func.alertPopup('ERROR', response.detailMessage, true, MSG_CONFIRM, 'closed');
                                }
                            }
                            else {
                                func.alertPopup('ERROR', response.detailMessage, true, MSG_CONFIRM, 'closed');
                            }
                        }
                    }
                };
            };
            request.send(data); }, 0);
    },*/
}

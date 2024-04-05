
const funcsidecar = {

    url: URI_REQUEST_SC_API,
    ui: 'http://localhost:8091/',
    nameLoad: new function () {
    },
    clusterData: new Object(),
    nameData: new Object(),
    createIm: '',

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

                        /*
                                                //토큰 만료 검사
                                                if( resultMessage == 'TOKEN_EXPIRED') {
                                                    func.refreshToken();
                                                    return func.loadData(method, url, header, callbackFunction, list);
                                                }
                                                else if(resultMessage == 'TOKEN_FAILED') {
                                                    func.loginCheck();
                                                    return func.loadData(method, url, header, callbackFunction, list);
                                                }
                                                else if(resultCode != RESULT_STATUS_SUCCESS) {
                                                    if(document.getElementById('loading')){
                                                        document.getElementById('wrap').removeChild(document.getElementById('loading'));
                                                    };
                                                    func.alertPopup('ERROR', detailMessage, true, MSG_CONFIRM, 'closed');
                                                }
                                                else {
                                                    callbackFunction(JSON.parse(request.responseText), list);
                                                }
                        */
                        callbackFunction(JSON.parse(request.responseText), list);
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
    postData(method, url, data, bull, header, callFunc){
        func.loading();
        console.log("postData 1");
        if(sessionStorage.getItem('token') == null){
            func.loginCheck();
        };
        console.log("postData 2");

        var request = new XMLHttpRequest();
        console.log("postData 4");
        setTimeout(function() {
            request.open(method, url, false);
            request.setRequestHeader('Content-type', header);
            request.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            request.setRequestHeader('uLang', CURRENT_LOCALE_LANGUAGE);
            console.log("postData 5");
            request.onreadystatechange = () => {
                if (request.readyState === XMLHttpRequest.DONE){
                    if(request.status === 200 && request.responseText != ''){
                        console.log("postData 3");
                        //토큰 만료 검사
                        if(JSON.parse(request.responseText).resultMessage == 'TOKEN_EXPIRED') {
                            console.log("postData 7 에러");
                            func.refreshToken();
                            return func.saveData(method, url, data, bull, header, callFunc);

                        }
                        else if(JSON.parse(request.responseText).resultMessage == 'TOKEN_FAILED') {
                            console.log("postData 8 에러");
                            func.loginCheck();
                            return func.loadData(method, url, header, callbackFunction, list);
                        }
                        else {
                            console.log("postData 6");
                            document.getElementById('wrap').removeChild(document.getElementById('loading'));
                            var response = JSON.parse(request.responseText);
                            console.log("response : " + response);
                            if (response.httpStatusCode == 200) {
                                console.log("postData 9");
                                if(response.resultCode == RESULT_STATUS_SUCCESS) {
                                    console.log("postData 10");
                                    func.alertPopup('SUCCESS', response.detailMessage, true, MSG_CONFIRM, callFunc);
                                }
                                else {
                                    console.log("postData 11 에러");
                                    func.alertPopup('ERROR', response.detailMessage, true, MSG_CONFIRM, 'closed');
                                }
                            }
                            else {
                                console.log("postData 12 에러");
                                func.alertPopup('ERROR', response.detailMessage, true, MSG_CONFIRM, 'closed');
                            }

                        }
                    }
                };
            };
            console.log("postData 5");
            request.send(data); }, 0);
    },
}
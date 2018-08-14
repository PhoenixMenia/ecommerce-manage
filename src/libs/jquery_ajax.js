import utils from '@/libs/utils'
import AJAX_URL from '@/config/index'
export default {
    //与服务器进行post交互
    post: function(api, sendData, flag, serverType) {
        var d = $.Deferred(),
            realSendData = '';
        realSendData = '_time=' + utils.getUNIXTimestamp();
        if(flag === 'ARRAY') {
            if(sendData) {
                for(key in sendData) {
                    realSendData += '&' + key + '=' + JSON.stringify(sendData[key]);
                }
            }
        } else {
            if(sendData) {
                realSendData += '&' + utils.serialize(sendData);
            }
        }
        $.ajax({
            url: AJAX_URL[api],
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: realSendData,
            headers: {
                'Referer-Source': window.location.href
            },
            xhrFields: {
                withCredentials: true
            }
        }).done(function(res){
            if (res.code == 0) {
                d.resolve(res.data);
            } else if(res.code == 7) {
                alert(res.message);
            } else if(res.code == '-1001') {
                window.location.href = AJAX_URL['authFailPage'];     
            } else {
                if(res.message === undefined) {
                  res.message = "请求异常";
                }
                d.reject(res.code, res.message);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert('服务器忙，请稍后重试');
        });
        return d.promise();
    },
    //与服务器进行get交互
    get: function(api, sendData, serverType) {
        var d = $.Deferred(), data = '';
        if(sendData && utils.serialize(sendData)) {
            data += utils.serialize(sendData);
        }
        $.ajax({
            url: AJAX_URL[api],
            type: 'GET',
            dataType: 'json',
            data: data,
            headers: {
                'Referer-Source': window.location.href
            },
            xhrFields: {
                withCredentials: true
            },
            cache: false,
        }).done(function(res) {
            if (res.code == 0) {
                d.resolve(res.data);
            } else if(res.code == 7) {
                alert(res.message);
            } else if(res.code == '-1001') {
                window.location.href = AJAX_URL['authFailPage'];     
            } else {
              if(res.message === undefined) {
                res.message = "请求异常";
              }
                d.reject(res.code, res.message);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert('服务器繁忙，请稍后重试');
        });
        return d.promise();
    }
}

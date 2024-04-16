export function getAllSlots(slots) {
    var TokenGOST2 = [];

    for (let i = 0; i < slots.length; i++) {
        let slot = slots[i];
        let tokenInfo = {};

        window.JCWebClient2.getTokenInfo({
            args: {
                tokenID: slot.id
            },
            onSuccess: function (result) {
                tokenInfo = result;

                if(tokenInfo.type === window.JCWebClient2.Vars.TokenType.gost2) {
                    TokenGOST2.push({slot: slot, tokenInfo: tokenInfo});
                }
            },
            onError: function () {
                alert("Произошла ошибка при устройств");
                location.reload();
            }
        });
    }

    return TokenGOST2;
}

export function toUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                0x80 | ((charcode>>6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18),
                0x80 | ((charcode>>12) & 0x3f),
                0x80 | ((charcode>>6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}

// Преобразование шестнадцатеричного id ключевой пары в формат для ЕГАИС
export function asciitohex(str){
    var result = [];
    for (var n = 0, l = str.length; n < l; n++) {
        var code = str.charCodeAt(n);
        if(code > 128 || code == 32)
            continue;

        var hex = code.toString(16);
        result.push(hex);
    }
    return result.join(':');
}
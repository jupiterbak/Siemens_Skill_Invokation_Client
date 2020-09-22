/**
 * Copyright 2020 Siemens AG.
 * 
 * Project: SP 347
 * Author:
 *  - Jupiter Bakakeu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * --------------------------------------------------------------------
 * ###################### Changes #####################################
 * -- 22.09.2020
 *      Initial implementation
 * --------------------------------------------------------------------
 **/

/*#####################################################################################*/
/* ValueParserValidator
 /*#####################################################################################*/

class ValueParserValidator {
    constructor() {
        this.reg = /ns=([0-9]+);(.*)/;
    }

    stringToUInt32Array(_str) {
        var str = ("" + _str).toLowerCase();
        var array = str ? JSON.parse( str).map(function (value) {
            return parseInt(value);
        }) : null;
        return array;
    }

    ListOf(isArray, parseFunc, _txt) {
        var txt = ("" + _txt).toLowerCase();
        if( isArray){
            return txt?JSON.parse(txt).map(function (value) {
                return parseFunc(value);
            }) : null;
        }else{
            return txt?parseFunc(txt):null;
        }
    }

    localizedText_parser(text){
        var _localizedText = {};
        _localizedText.locale= text.trim();
        _localizedText.text =text.trim();
        return _localizedText;
    }

    text_parser(text){
        return text?"" + text:null;
    }

    parse(dataType, value_input, isArray){
        var self = this;
        var _dtype = dataType?dataType:'String';
        var _isArray= isArray?isArray:false;
        var value = ("" + value_input).toLowerCase();
        var _value = null;

        if (_dtype === 'Null' || _dtype === undefined) {
            _value = self.ListOf(_isArray, function(text){return null;}, value);
        }else if(_dtype === 'String') {
            _value = self.ListOf(_isArray, function(text){return text?"" + text:null;}, value);
        }else if(_dtype === 'Boolean') {
            _value = self.ListOf(_isArray, function(text){return text?(("" + text).toLowerCase() === "true" ? true : false):false;}, value);
        }else if(_dtype === 'ByteString') {
            _value = self.ListOf(_isArray, function(text){return text?Buffer.from(("" + text), "base64"):null;}, value);
        }else if(_dtype === 'localizedText') {
            _value = self.ListOf(_isArray, self.localizedText_parser, value);
        }else if(_dtype === 'Double') {
            _value = self.ListOf(_isArray, parseFloat, value);
        }else if(_dtype === 'SByte') {
            _value = self.ListOf(_isArray, parseInt, value);
        }else if(_dtype === 'Int16') {
            _value = self.ListOf(_isArray, parseInt, value);
        }else if(_dtype === 'Int32') {
            _value = self.ListOf(_isArray, parseInt, value);
        }else if(_dtype === 'Byte') {
            _value = self.ListOf(_isArray, parseInt, value);
        }else if(_dtype === 'UInt16') {
            _value = self.ListOf(_isArray, parseInt, value);
        }else if(_dtype === 'UInt32') {
            _value = self.ListOf(_isArray, parseInt, value);
        }else{
            _value = null;
        }

        return {
            dataType: _dtype, //el.dataType.value, // only basic datatypes are supported
            isArray: _isArray,
            value: _value
        };
    }
}

module.exports = ValueParserValidator;

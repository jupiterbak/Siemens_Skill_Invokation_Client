/**
 * Copyright 2018 Siemens AG.
 * 
 * File: LEMS.js
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
 * -- 10.02.2018
 *      Initial implementation
 * --------------------------------------------------------------------
 **/

var async = require("async");
var fs = require("fs");
var opcua = require("node-opcua");

var resolveNodeId = opcua.resolveNodeId;
var coerceLocalizedText = opcua.coerceLocalizedText;
var AddressSpace = opcua.AddressSpace;
var ec = require("node-opcua-basic-types");
 
var DataType = opcua.DataType;
var VariantArrayType = opcua.VariantArrayType;
var Argument = opcua.Argument;

/*#####################################################################################*/
/* VariantValueParser
 /*#####################################################################################*/
class VariantValueParser {
    constructor() {
        this.reg = /ns=([0-9]+);(.*)/;
    }

    stringToUInt32Array(str) {
        var array = str ? JSON.parse(str).map(function (value) {
            return parseInt(value);
        }) : null;
        return array;
    }

    BasicType_parser(dataType, parseFunc) {
        var parser = {};
        parser[dataType] = {
            init: function () {
                this.value = 0;
            },
            finish: function () {
                this.value = parseFunc(this.text);
            }
        };
        return parser;
    }

    ListOf(_arrayType, parseFunc, txt) {
        if( _arrayType===opcua.VariantArrayType.Array){
            return txt?JSON.parse(txt).map(function (value) {
                return parseFunc(value);
            }) : null;
        }else{
            return txt?parseFunc(txt):null;
        }
        
        /* 
        return {
            init: function () {
                this.listData = [];
            },
 
            parser: this.BasicType_parser(dataType, parseFunc),
 
            finish: function () {
                this.parent.parent.obj.value = {
                    dataType: DataType[dataType],
                    arrayType: VariantArrayType.Array,
                    value: this.listData
                };
            },
            endElement: function (element) {
                this.listData.push(this.parser[dataType].value);
            }
        }; */
    }

    localizedText_parser(text){
        var _localizedText = {};
        _localizedText.locale= text.trim();
        _localizedText.text =text.trim();
        return _localizedText;
    }

    text_parser(text){
        return text?text:null;
    }

    convertQualifiedName(qualifiedName) {
        var stringToQualifiedName = require("node-opcua-data-model").stringToQualifiedName;
        var qn = stringToQualifiedName(qualifiedName);
        return qn;
    }

    parse(dataType, valueRank, value){
        var self = this;
        var _dtype = opcua.resolveNodeId(dataType).value; // alternative: opcua.coerceNodeId(el.dataType).value;
        var _valueRank = ec.coerceInt32(valueRank) || -1;
        // var _arrayDimensions = _valueRank === -1 ? null : self.stringToUInt32Array(arrayDimensions);

        var _arrayType = _valueRank === -1 ? opcua.VariantArrayType.Scalar : opcua.VariantArrayType.Array;
        var _value = null;

        switch (_dtype) {
            case opcua.DataType.Null:
                _value = self.ListOf(_arrayType, function(text){return null;}, value);
                break;
            case opcua.DataType.String:
                _value = self.ListOf(_arrayType, function(text){return text?text:null;}, value);
                break;
            case opcua.DataType.Boolean:
                _value = self.ListOf(_arrayType, function(text){return text?(text.toLowerCase() === "true" ? true : false):false;}, value);
                break;
            case opcua.DataType.ByteString:
                _value = self.ListOf(_arrayType, function(text){return text?Buffer.from(text, "base64"):null;}, value);
                break;
            case opcua.DataType.LocalizedText:
                _value = self.ListOf(_arrayType, self.localizedText_parser, value);
                break;
            case opcua.DataType.Double:
                _value = self.ListOf(_arrayType, parseFloat, value);
                break;
            case opcua.DataType.Float:
                _value = self.ListOf(_arrayType, parseFloat, value);
                break;
            case opcua.DataType.SByte:
                _value = self.ListOf(_arrayType, parseInt, value);
                break;
            case opcua.DataType.Int16:
                _value = self.ListOf(_arrayType, parseInt, value);
                break;
            case opcua.DataType.Int32:
                _value = self.ListOf(_arrayType, parseInt, value);
                break;
            case opcua.DataType.Byte:
                _value = self.ListOf(_arrayType, parseInt, value);
                break;
            case opcua.DataType.UInt16:
                _value = self.ListOf(_arrayType, parseInt, value);
                break;
            case opcua.DataType.UInt32:
                _value = self.ListOf(_arrayType, parseInt, value);
                break;
            case opcua.DataType.QualifiedName:
                _value = self.ListOf(_arrayType, self.convertQualifiedName, value);
                break;
            default:
                break;
        }

        return {
            dataType: _dtype, //el.dataType.value, // only basic datatypes are supported
            arrayType: _arrayType,
            value: _value
        };
    }
}


module.exports = VariantValueParser;
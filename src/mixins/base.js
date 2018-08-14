/**
 * Created by seostar on 2018/4/25.
 */
'use strict';
export default {
  methods: {
    /**
     * 金额补零
     * @param cellValue
     * @returns {string|*}
     */
    retainedDecimal(cellValue) {
      // 处理0或者非数字
      if(!cellValue) {
        return '0.00'
      };
      let len = 2;
      cellValue = cellValue ? cellValue : 0;
      cellValue += '';
      //清除字符串中的非数字非.字符
      cellValue = cellValue.replace(/[^0-9|\-\.]/g, '');
      //清除字符串开头的0
      if (/^0+/ && cellValue > 1) {
        cellValue = cellValue.replace(/^0+/, '');
      }
      let tempArr = ['0', '00', '000', '0000', '00000', '000000'];
      if (cellValue.indexOf('.') > -1) {
        //有小数点
        if (len - cellValue.split('.')[1].length > 0) {
          cellValue = cellValue + tempArr[len - cellValue.split('.')[1].length - 1];
        }
      } else {
        //没小数点
        cellValue = cellValue + '.' + tempArr[len - 1];
      }
      return cellValue;
    },
  
    /**
     * 金额补零 (elment)
     * @param row
     * @param column
     * @param cellValue
     * @returns {*|string}
     */
    retainedDecimalEl(row, column, cellValue) {
      return this.retainedDecimal(cellValue);
    }
  }
};

const Handlebars = require('handlebars');
const express_handlebars_sections = require('express-handlebars-sections');
module.exports = {
  option: (value, label, selectedValue) => {
    var selectedProperty = value == selectedValue ? 'selected="selected"' : '';
    return new Handlebars.SafeString(
      '<option value="' +
        value +
        '"' +
        selectedProperty +
        '>' +
        label +
        ' </option>',
    );
  },
  section: express_handlebars_sections(),
  gender: (value1, value2) => {
    var value;
    if (value1 === 'NAM') {
      value = 'Nam';
    } else {
      value = 'Nữ';
    }

    if (value1 === value2) {
      return new Handlebars.SafeString(
        '<label class="radio-container m-r-55">' +
          value +
          '<input type="radio" checked="checked" name="PHAI" style = "margin: 5px;"><span class="checkmark"></span></label>',
      );
    } else {
      return new Handlebars.SafeString(
        '<label class="radio-container m-r-55">' +
          value +
          '<input type="radio" name="PHAI" style = "margin: 5px;"><span class="checkmark"></span></label>',
      );
    }
  },
};

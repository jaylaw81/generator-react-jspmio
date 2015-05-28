// __tests__/<%= componentKey %>-test.js
// Jest Unit Test for <%= componentName %>
//

jest.dontMock('../lib/main');

import React from 'react/addons';
import NewComponent from '../lib/main';
var TestUtils = React.addons.TestUtils;

describe('<%= componentName %>', () => {

  it('should do something goes here', () => {

    // Render a checkbox with label in the document
    var checkbox = TestUtils.renderIntoDocument(
      <<%= componentName %>/>
    );

  });

});


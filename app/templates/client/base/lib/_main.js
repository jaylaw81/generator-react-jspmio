import React from 'react';
import './css/style.css!';

var <%= componentName %> = function(){
    React.render('<<%= componentName %> />', document.getElementById('<%= componentName %>'));
}

export { <%= componentName %> }

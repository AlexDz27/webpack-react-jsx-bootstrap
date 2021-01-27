import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
    <App />,
    document.getElementById('someContainer')
);

ReactDOM.render(
    <App />,
    document.getElementById('someContainer2')
);

console.log(123)

console.log(321)

function some(a) {
    if (a === undefined) {
        throw new Error('asdasd');
    }

    return a;
}

console.log(some());
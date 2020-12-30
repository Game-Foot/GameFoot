const sock = io();

const writeEvent = (text) => {
    // events <ul> does not exist yet
    const parent = document.querySelector('#events')

    // <li> does not exist yet
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};

writeEvent('Welcome');
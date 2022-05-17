import React from 'react';
import jpg from '~img/github.jpg';
import png from '~img/github.png';
import svg from '~img/github.svg';
import './app.scss';

function App() {
    let [state, setState] = React.useState(0);
    return (
        <div className="app">
            <button
                type="button"
                className="app__button"
                onClick={() => setState(state === 2 ? 0 : state + 1)}
            >
                {state === 0 ? 'Переключить на png' : state === 1 ? 'Переключить на svg' : state === 2 ? 'Переключить на jpg' : ''}
            </button>
            <div className="app__inner">
                <h1 className="app__text">
                    {state === 0 ? 'изображение .jpg' : state === 1 ? 'изображение .png' : state === 2 ? 'изображение .svg' : ''}
                </h1>
                <div className="app__wrap">
                    <img
                        src={state === 0 ? jpg : state === 1 ? png : state === 2 ? svg : ''}
                        height="600"
                        className="app__img"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default App;

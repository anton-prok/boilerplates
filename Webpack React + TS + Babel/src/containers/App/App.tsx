import "./App.scss";
import * as React from "react";
import { Hello } from "../../components/Hello/Hello";

export default class App extends React.Component<any> {    

    onHandleClick = () => {
        console.log('clicked!')
    }

    render() {
        const { onHandleClick } = this;
        return (
            <div className="app" onClick={onHandleClick}>
                <Hello compiler="TS" framework="React"/>           
                <img src={require('../../assets/img/1.jpg')} alt=""/>     
                <div className="app__harold"></div>
            </div>
        );
    }
}
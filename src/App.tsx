import React from "react";
import Calculator from "./components/Calculator";
import KeyPressListener from "./components/KeyPressListener";

const App: React.FC = (props) => {
    KeyPressListener();
    
    return (
        <Calculator />
    );
};

export default App;
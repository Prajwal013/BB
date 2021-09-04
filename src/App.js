import React from "react"
import "./App.scss"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import page2 from "./pages/page2.js"
import {useSelector} from "react-redux"

import "antd/dist/antd.css"

export default function App() {
    const theme = useSelector((state) => state.theme)

    return (
        <div className="App" theme-mode={theme}>
            <Router>
                <Switch>
                    <Route path="/" exact component={page2} />
                </Switch>
            </Router>
        </div>
    )
}

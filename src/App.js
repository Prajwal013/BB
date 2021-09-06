import React from "react"
import "./App.css"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import page2 from "./pages/page2.js"
import {useSelector} from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css"

process.env.CI = false

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

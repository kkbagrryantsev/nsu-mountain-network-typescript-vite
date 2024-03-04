import ReactDOM from 'react-dom/client'
import './index.css'
import {initAxios} from "~/api/BackendSettings.ts";
import {App} from "~/App.tsx";

const root = ReactDOM.createRoot(document.getElementById('root')!)

function renderApp() {
    initAxios()
    root.render(<App/>)
}

renderApp()

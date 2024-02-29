import ReactDOM from 'react-dom/client'
import './index.css'
import {initAxios} from "~/api/BackendSettings.ts";
import {Routes} from "~/Routes.tsx";

const root = ReactDOM.createRoot(document.getElementById('root')!)

function renderApp() {
    initAxios()
    root.render(<Routes/>)
}

renderApp()

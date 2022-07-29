import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { GamerRater } from "./GamerRater"


const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <GamerRater />
    </BrowserRouter>
)

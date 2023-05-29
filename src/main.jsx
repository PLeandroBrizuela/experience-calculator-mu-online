import  ReactDOM  from "react-dom/client";
import { Calculator } from "./components/calculator";
import "/src/main.css"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<>
    <Calculator />
</>)
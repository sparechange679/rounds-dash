import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Announcer} from "@/components/ui/Announcer.tsx";
import App from "@/App.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Announcer>
            <App/>
        </Announcer>
    </BrowserRouter>,
)
import './App.css'
import {Toaster} from 'react-hot-toast'
import GlobalRouter from './routes'


function App() {
    return (
        <div>
            <GlobalRouter></GlobalRouter>
            <Toaster></Toaster>

        </div>
    )
}

export default App

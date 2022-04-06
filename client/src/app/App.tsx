import * as React from 'react';
import './tailwind.generated.css';
import ProjectsList from './views/ProjectsList';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ProjectDetails from './views/ProjectDetails';


export default function App() {
        return (
            <>
                <header className="bg-gray-900 text-white flex items-center h-12 w-full">
                    <div className="container mx-auto">
                    <a className="navbar-brand" href="/">Timelogger</a>
                    </div>
                </header>
                
                <main>
                    <div className="container mx-auto">    
                    <BrowserRouter> 
                        <div>               
                            <Switch>
                                <Route exact path="/" component={ProjectsList} />
                                <Route exact path="/projects/:id" component={ProjectDetails} />
                            </Switch>
                        </div>  
                    </BrowserRouter>
                    </div>
                </main>
            </>
        );
}
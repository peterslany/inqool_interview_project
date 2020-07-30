import React, { createContext, useState, Dispatch } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./components/SearchPage";
import UserPage from "./components/UserPage";
import RepositoryPage from "./components/RepositoriesPage";
import { Layout } from "antd";

interface ContextType {
    username?: string;
    setUsername?: Dispatch<React.SetStateAction<string>>;
}

export const UsernameContext = createContext<ContextType>({});

function App() {
    const [username, setUsername] = useState("");
    return (
        <UsernameContext.Provider value={{ username: username, setUsername: setUsername }}>
            <Router>
                <Layout className="main-layout">
                    <Layout.Sider theme={"light"} breakpoint="md" collapsedWidth="0">
                        <Navbar />
                    </Layout.Sider>
                    <Layout.Content className="content-components">
                        <Route path="/search" component={SearchPage} />
                        <Route exact path="/user" component={UserPage} />
                        <Route path="/user/:username" component={UserPage} />
                        <Route exact path="/repositories" component={UserPage} />
                        <Route path="/repositories/:username" component={RepositoryPage} />
                        <Route exact path="/">
                            <Redirect to="/search" />
                        </Route>
                    </Layout.Content>
                </Layout>
            </Router>
        </UsernameContext.Provider>
    );
}

export default App;

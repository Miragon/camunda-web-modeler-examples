import './App.css';
import "react-tabs/style/react-tabs.css";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

import MyBpmnModeler from "./components/MyBpmnModeler";
import MyDmnModeler from "./components/MyDmnModeler";

const App = () => {
    return (
        <Tabs defaultIndex={0}>
            <TabList>
                <Tab>BPMN</Tab>
                <Tab>DMN</Tab>
            </TabList>

            <TabPanel>
                <MyBpmnModeler />
            </TabPanel>
            <TabPanel>
                <MyDmnModeler />
            </TabPanel>
        </Tabs>
    );
}

export default App;
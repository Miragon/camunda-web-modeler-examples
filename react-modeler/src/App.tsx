import './App.css';
import React, {useCallback, useRef} from 'react';
import "react-tabs/style/react-tabs.css";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import CustomBpmnJsModeler from "@miragon/camunda-web-modeler/dist/bpmnio/bpmn/CustomBpmnJsModeler";
import CustomDmnJsModeler from "@miragon/camunda-web-modeler/dist/bpmnio/dmn/CustomDmnJsModeler";

import MyBpmnModeler from "./components/MyBpmnModeler";
import MyDmnModeler from "./components/MyDmnModeler";

const App = () => {
    const modelerRef = useRef<CustomBpmnJsModeler | CustomDmnJsModeler>();

    const onSaveClicked = useCallback(async () => {
        if (!modelerRef.current) {
            // Should actually never happen, but required for type safety
            console.debug("Modeler not initialized yet.")
            return;
        }

        const { xml } = await modelerRef.current.save({ format: true });
        console.debug("Model saved...", xml);
    }, [modelerRef]);

    return (
        <div className={"root"}>
            <Tabs defaultIndex={0}>
                <TabList>
                    <Tab>BPMN</Tab>
                    <Tab>DMN</Tab>
                </TabList>

                <TabPanel>
                    <MyBpmnModeler modelerRef={modelerRef} />
                </TabPanel>
                <TabPanel>
                    <MyDmnModeler modelerRef={modelerRef}/>
                </TabPanel>
            </Tabs>

            <button
                onClick={onSaveClicked}
                style={{
                    position: "absolute",
                    zIndex: 1000,
                    bottom: 25,
                    right: 25,
                    textTransform: "none",
                    fontWeight: "bold",
                    minWidth: "200px",
                    minHeight: "40px",
                    backgroundColor: "yellow",
                    borderWidth: "1px",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}>
                Save Diagram
            </button>
        </div>
    );
}

export default App;
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {DmnModeler} from "@miragon/camunda-web-modeler";
import CustomDmnJsModeler from "@miragon/camunda-web-modeler/dist/bpmnio/dmn/CustomDmnJsModeler";
import {Event} from "@miragon/camunda-web-modeler/dist/events/Events";
import {
    ContentSavedReason,
    isContentSavedEvent
} from "@miragon/camunda-web-modeler/dist/events/modeler/ContentSavedEvent";
import {isBpmnIoEvent} from "@miragon/camunda-web-modeler/dist/events/bpmnio/BpmnIoEvents";
import {isNotificationEvent} from "@miragon/camunda-web-modeler/dist/events/modeler/NotificationEvent";
import {isPropertiesPanelResizedEvent} from "@miragon/camunda-web-modeler/dist/events/modeler/PropertiesPanelResizedEvent";
import {isUIUpdateRequiredEvent} from "@miragon/camunda-web-modeler/dist/events/modeler/UIUpdateRequiredEvent";
import {DmnPropertiesPanelOptions} from "../../../../camunda-web-modeler/dist/editor/DmnEditor";

const MyDmnModeler = () => {
    const modelerRef = useRef<CustomDmnJsModeler>();

    const [xml, setXml] = useState<string>("");

    useEffect(() => {
        // Use demo XML
        setXml(DMN);
    }, []);

    const onXmlChanged = useCallback((
        newXml: string,
        newSvg: string | undefined,
        reason: ContentSavedReason
    ) => {
        console.debug(`Model has been changed because of ${reason}`);
        // Do whatever you want here, save the XML and SVG in the backend, etc.
        setXml(newXml);
    }, []);

    const onSaveClicked = useCallback(async () => {
        if (!modelerRef.current) {
            // Should actually never happen, but required for type safety
            console.debug("Modeler not initialized yet.")
            return;
        }

        const { xml } = await modelerRef.current.save({ format: true });
        console.debug("Model saved...", xml);
    }, []);

    const onEvent = useCallback(async (event: Event<any>) => {
        if (isContentSavedEvent(event)) {
            // Content has been saved, e.g. because user edited the model or because he switched
            // from BPMN to XML.
            onXmlChanged(event.data.xml, event.data.svg, event.data.reason);
            return;
        }

        if (isNotificationEvent(event)) {
            // There's a notification the user is supposed to see, e.g. the model could not be
            // imported because it was invalid.
            return;
        }

        if (isUIUpdateRequiredEvent(event)) {
            // Something in the modeler has changed, and the UI (e.g., menu) should be updated.
            // This happens when the user selects an element, for example.
            return;
        }

        if (isPropertiesPanelResizedEvent(event)) {
            // The user has resized the properties panel. You can save this value, e.g., in local
            // storage to restore it on next load and pass it as an initializing option.
            console.debug(`Properties panel has been resized to ${event.data.width}`);
            return;
        }

        if (isBpmnIoEvent(event)) {
            // Just a regular bpmn-js event - actually lots of them
            return;
        }

        // eslint-disable-next-line no-console
        console.debug("Unhandled event received", event);
    }, [onXmlChanged]);

    /**
     * ====
     * CAUTION: Using useMemo() is important to prevent additional render cycles!
     * ====
     */

    const xmlTabOptions = useMemo(() => ({
        className: undefined,
        disabled: undefined,
        monacoOptions: undefined
    }), []);

    const propertiesPanelOptions: DmnPropertiesPanelOptions = useMemo(() => ({
        className: undefined,
        containerId: undefined,
        container: undefined,
        hidden: undefined,
        size: {
            max: undefined,
            min: undefined,
            initial: undefined
        }
    }), []);

    const modelerOptions = useMemo(() => ({
        className: undefined,
        refs: [modelerRef],
        container: undefined,
        containerId: undefined,
        size: {
            max: undefined,
            min: undefined,
            initial: undefined
        }
    }), []);

    const bpmnJsOptions = useMemo(() => undefined, []);

    return (
        <div style={{
            height: "100vh"
        }}>

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

            <DmnModeler
                xml={xml}
                onEvent={onEvent}
                xmlTabOptions={xmlTabOptions}
                modelerTabOptions={{
                    className: undefined,
                    disabled: undefined,
                    dmnJsOptions: bpmnJsOptions,
                    modelerOptions: modelerOptions,
                    propertiesPanelOptions: propertiesPanelOptions
                }}/>
        </div>
    );
}

const DMN = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="Definitions_0qka8tk" name="DRD" namespace="http://camunda.org/schema/1.0/dmn" xmlns:modeler="http://camunda.org/schema/modeler/1.0" exporter="Camunda Modeler" exporterVersion="5.25.0" modeler:executionPlatform="Camunda Platform" modeler:executionPlatformVersion="7.21.0">
  <decision id="Decision_0todr46" name="Decision 1">
    <decisionTable id="DecisionTable_1c7gald">
      <input id="Input_1">
        <inputExpression id="InputExpression_1" typeRef="string">
          <text></text>
        </inputExpression>
      </input>
      <output id="Output_1" typeRef="string" />
    </decisionTable>
  </decision>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram>
      <dmndi:DMNShape dmnElementRef="Decision_0todr46">
        <dc:Bounds height="80" width="180" x="160" y="100" />
      </dmndi:DMNShape>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</definitions>`;

export default MyDmnModeler;
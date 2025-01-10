import { Allotment } from "allotment";
import 'allotment/dist/style.css';
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import { PlaygroundContextProvider } from "./PlaygroundContext";
function ReactPlayground() {
    return (
        <PlaygroundContextProvider>
            <div style={{ width: '100vw', height: '100vh' }}>
                <Header></Header>
                <Allotment defaultSizes={[100, 100]}>
                    <Allotment.Pane minSize={0}>
                        <CodeEditor></CodeEditor>
                    </Allotment.Pane>
                    <Allotment.Pane minSize={0}>
                        <Preview></Preview>
                    </Allotment.Pane>
                </Allotment>
            </div>
        </PlaygroundContextProvider>
    );
}

export default ReactPlayground;
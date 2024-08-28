import { Allotment } from "allotment";
import 'allotment/dist/style.css';
import './index.scss'
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";

function ReactPlayground() {
    return (<div style={{ width: '100vw', height: '100vh' }}>
        <Header></Header>
        <Allotment defaultSizes={[100, 100]}>
            <Allotment.Pane minSize={0}>
                <CodeEditor></CodeEditor>
            </Allotment.Pane>
            <Allotment.Pane minSize={0}>
                <Preview></Preview>
            </Allotment.Pane>
        </Allotment>
    </div>);
}

export default ReactPlayground;
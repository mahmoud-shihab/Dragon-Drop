import DragArea from "../../components/DragArea/DragArea";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Playground.scss";

function Playground() {
    return <section className="playground">
      <section className="playground__drag-area">
        <DragArea />
      </section>
      <aside className="playground__sidebar">
        <Sidebar />
      </aside>
      </section>;
}

export default Playground;

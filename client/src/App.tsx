import "./App.css";
import { GrpcClientProvider } from "@context/GrpcClientContext/GrpcClientProvider";
import TimeSync from "@components/TimeSync";
import PingStream from "@components/PingStream";

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

const App = () => {
  return (
    <GrpcClientProvider>
      <h1>gRPC React Client</h1>
      <TimeSync />
      <PingStream />
    </GrpcClientProvider>
  );
};

export default App;

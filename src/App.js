import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Graph } from 'react-d3-graph';

import Data from './logic';

const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: 'lightgreen',
    size: 120,
    highlightStrokeColor: 'blue'
  },
  link: {
    highlightColor: 'lightblue',
    renderLabel: true,
  }
};

Data.dumpWeights();
Data.generateRandomRealConnections();


class App extends React.Component {
  state = {
    nodes: Data.dumpsters,
    links: Data.links,
    distance: null,
  }
  generateOptimizedPath() {
    const result = Data.generateOptimizedPath();
    this.setState({ links: result.paths, distance: result.distance });
  }
  reset() {
    Data.links.forEach(link => link.color = undefined);
    this.setState({ links: Data.links, distance: null });
  }
  generateRandomWeights() {
    Data.dumpWeights();
    this.setState({ nodes: Data.dumpsters });
  }
  render() {
    console.log(Data.dumpsters);
    console.log(Data.links);
    return (
      <div>
        <div>
          <Graph
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={{ nodes: this.state.nodes, links: this.state.links }}
            config={myConfig}
          />
        </div>

        <button onClick={() => this.generateRandomWeights()}>Generate Random Weights</button>
        <br />
        <button onClick={() => this.reset()}>Reset</button>
        <ul>
          {Data.dumpsters.map(dumpster => (
            <li style={{ color: (dumpster.weight >= 20) ? 'red' : 'black' }}>Dumpster {dumpster.id} - {dumpster.weight}KG</li>
          ))}
        </ul>
        <button onClick={() => this.generateOptimizedPath()}>Generate Optimized path</button>
        {this.state.distance && <bold>Distance: {this.state.distance}KM</bold>}
        <br />
      </div >
    )
  }
}

// class App extends React.Component {
//   state = {
//     nodes: Data.dumpsters,
//     links: Data.links,
//     nodeId: '',
//     source: '',
//     target: '',
//     distance: 10
//   }

//   handleNodeIdChange(nodeId) {
//     this.setState({ nodeId });
//   }

//   handleNodeCreate(e) {
//     e.preventDefault();
//     this.setState({ nodes: [...this.state.nodes, { id: this.state.nodeId }], nodeId: '' });
//   }

//   handleSourceChange(source) {
//     this.setState({ source });
//   }

//   handleTargetChange(target) {
//     this.setState({ target });
//   }

//   handleDistanceChange(distance) {
//     this.setState({ distance });
//   }

//   handleLinkCreate(e) {
//     e.preventDefault();
//     this.setState({
//       links: [...this.state.links,
//       { source: this.state.source, target: this.state.target, label: `${this.state.distance}` }
//       ],
//       // links: [{ source: 'dump1', target: 'dump2', label: 'c' }
//       // ],
//       source: '', target: '', distance: 10
//     }, () => console.log(this.state));
//   }


//   render() {
//     return (
//       <div style={{ width: '100vw', height: '100vh' }}>
//         <div
//           style={{ height: '100vh', width: '70vw', display: 'inline-block' }}>
//           <Graph
//             id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
//             data={{ nodes: this.state.nodes, links: this.state.links }}
//             config={myConfig}
//           />
//         </div>
//         <div style={{ height: '100vh', width: '30vw', float: 'right' }}>

//           <div style={{ width: '100vw' }}>
//             <h1>Nodes</h1>
//             {this.state.nodes.map(node => {
//               return <h5>{node.id}</h5>
//             })}
//           </div>
//           <div style={{ width: '100vw' }}>
//             <h1>Links</h1>
//             {this.state.links.map(link => {
//               return <h5>{link.source} to {link.target} by {link.label}</h5>
//             })}
//           </div>
//           <div style={{ width: '100vw' }}>
//             <h1>Add a node</h1>
//             <form onSubmit={(e) => this.handleNodeCreate(e)}>
//               <label>
//                 Node id:
//                 <input type='text' value={this.state.nodeId} onChange={(e) => this.handleNodeIdChange(e.target.value)} />
//               </label>
//               <br />
//               <input type='submit' value='Create node' />
//             </form>
//           </div>
//           <div style={{ width: '100vw' }}>
//             <h1>Add a link</h1>
//             <form onSubmit={(e) => this.handleLinkCreate(e)}>
//               <label>
//                 Source id:
//                 <input type='text' value={this.state.source} onChange={(e) => this.handleSourceChange(e.target.value)} />
//               </label>
//               <br />
//               <label>
//                 Target id:
//                 <input type='text' value={this.state.target} onChange={(e) => this.handleTargetChange(e.target.value)} />
//               </label>
//               <br />
//               <label>
//                 Distance b/w source and distance:
//                 <br />
//                 <input type='number' value={this.state.distance} onChange={(e) => this.handleDistanceChange(e.target.value)} />
//               </label>
//               <br />
//               <input type='submit' value='Create link' />
//             </form>
//           </div>

//         </div>

//       </div>
//     );
//   }
// }

export default App;

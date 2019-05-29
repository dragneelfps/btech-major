const _ = require('lodash');

const dumpsters = [{ id: 'dump1', color: '#0000ff' }, { id: 'dump2' }, { id: 'dump3' }, { id: 'dump4' }, { id: 'dump5' }, { id: 'dump6' }, { id: 'dump7' }];

const links = [];

function randomIntFromInterval(min, max) // min and max included
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDumpsterById(id) {
  return _.find(dumpsters, dumpster => dumpster.id === `dump${id + 1}`)
}

function dumpWeights() {

  const low = 5;
  const high = 30;
  let count = 0;
  do {
    for (let i = 0; i < 7; i++) {
      const dumpster = getDumpsterById(i);
      // dumpster.weight = randomIntFromInterval(low, high);
      if (count < 2) {
        dumpster.weight = randomIntFromInterval(low, high);
      } else {
        dumpster.weight = randomIntFromInterval(0, 13) + 5;
      }
      if (dumpster.weight >= 20) {
        dumpster.color = '#ff0000'
        count++;
      } else {
        if (dumpster.id !== 'dump1') {
          dumpster.color = undefined;
        } else {
          dumpster.color = '#0000ff';
        }
      }
    }
  } while (false);
  if (count == 0) {
    getDumpsterById(2).weight = 21;
    getDumpsterById(4).weight = 23;
  }
  if (count == 1) {
    getDumpsterById(2).weight = 21;
  }
  for (let i = 0; i < 7; i++) {
    const dumpster = getDumpsterById(i);

    console.log(`Dumpster ${i + 1}: ${dumpster.weight}KG`);
  }

}

function generateRandomRealConnections() {
  let adjMat = Array.from(Array(7), () => Array.from(Array(7), () => -2));
  for (let i = 0; i < 7; i++) {
    let count = 0;
    do {
      const randJ = randomIntFromInterval(0, 6);
      console.log(randJ);
      if (adjMat[i][randJ] === -2) {
        const distance = randomIntFromInterval(0, 15);
        adjMat[i][randJ] = distance;
        adjMat[randJ][i] = distance;
        count++;
      }
    } while (count < 2);

    // for (let j = 0; j < 7; j++) {
    //   if (adjMat[i][j] === -2) {
    //     const distance = randomIntFromInterval(0, 15);
    //     adjMat[i][j] = distance;
    //     adjMat[j][i] = distance;
    //   }
    // }
  }
  console.log(adjMat);
  adjMat = [[0, 4, 7, 0, 0, 0, 0],
  [4, 0, 0, 2, 5, 0, 0],
  [7, 0, 0, 5, 0, 0, 6],
  [0, 2, 5, 0, 0, 0, 0],
  [0, 5, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 3, 0, 11],
  [0, 0, 6, 0, 0, 11, 0]];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      if (adjMat[i][j] > 0) {
        links.push({ source: `dump${i + 1}`, target: `dump${j + 1}`, label: `${adjMat[i][j]}`, distance: adjMat[i][j] });

        //so that it doesnt choose the same pair of dumpsters again
        adjMat[j][i] = 0;
      }
    }
  }
}

function contains(targetDumpsters, id) {
  const res = _.find(targetDumpsters, dumpster => dumpster.id === `dump${id}`) !== undefined;
  console.log(res + ' : ' + id);
  return res;
}

function isPath(targetDumpsters, count, one, two) {
  console.log(`called with ${one} and ${two}`);
  console.log(`Dumpsters Crossing threshold: ${targetDumpsters.map(d => d.id)}`);
  return targetDumpsters.length === count && contains(targetDumpsters, one) && contains(targetDumpsters, two);
}

function getPath(dumps, distance) {
  const paths = [];
  for (let i = 0; i < dumps.length - 1; i++) {
    paths.push(_.find(links, link => link.source === `dump${dumps[i]}` && link.target === `dump${dumps[i + 1]}`));
  }
  paths.forEach(path => path.color = '#00FF00')
  return { paths, distance };
}

function generateOptimizedPath() {
  const targetDumpsters = _.filter(dumpsters, dumpster => dumpster.weight >= 20);
  console.log(`Dumpsters Crossing threshold: ${targetDumpsters.map(d => d.id)}`);
  const count = targetDumpsters.length;
  if (isPath(targetDumpsters, 2, 1, 2)) {
    console.log("Route : Dump1 -> Dump2");
    console.log("Distance : 4");
    return getPath([1, 2], 4);
  } else if (isPath(targetDumpsters, 2, 1, 3)) {
    console.log("Route : Dump1 -> Dump3");
    console.log("Distance : 7");
    return getPath([1, 3], 7);
  } else if (isPath(targetDumpsters, 2, 1, 4)) {
    console.log("Route : Dump1 -> Dump2 -> Dump4");
    console.log("Distance : 6");
    return getPath([1, 2, 4], 6);
  } else if (isPath(targetDumpsters, 2, 1, 5)) {
    console.log("Route : Dump1 -> Dump2 -> Dump5");
    console.log("Distance : 9");
    return getPath([1, 2, 5], 9);
  } else if (isPath(targetDumpsters, 2, 1, 6)) {
    console.log("Route : Dump1 -> Dump2 -> Dump5 -> Dump6");
    console.log("Distance : 12");
    return getPath([1, 2, 5, 6], 12);
  } else if (isPath(targetDumpsters, 2, 1, 7)) {
    console.log("Route : Dump1 -> Dump3 -> Dump7");
    console.log("Distance : 13");
    return getPath([1, 3, 7], 13);
  } else if (isPath(targetDumpsters, 2, 2, 3)) {
    console.log("Route : Dump1 -> Dump2 -> Dump4 -> Dump3");
    console.log("Distance : 11");
    return getPath([1, 2, 4, 3], 11);
  } else if (isPath(targetDumpsters, 2, 2, 4)) {
    console.log("Route : Dump1 -> Dump2 -> Dump4 ");
    console.log("Distance : 6");
    return getPath([1, 2, 4], 6);
  } else if (isPath(targetDumpsters, 2, 2, 6)) {
    console.log("Route : Dump1 -> Dump2 -> Dump5 -> Dump6");
    console.log("Distance : 12");
    return getPath([1, 2, 5, 6], 12);
  } else if (isPath(targetDumpsters, 2, 3, 4)) {
    console.log("Route : Dump1 -> Dump2 -> Dump4 -> Dump3");
    console.log("Distance : 11");
    return getPath([1, 2, 4, 3], 11);
  } else if (isPath(targetDumpsters, 2, 5, 3)) {
    console.log("Route : Dump1 -> Dump3 -> Dump4 -> Dump2 -> Dump5");
    console.log("Distance : 18");
    return getPath([1, 3, 4, 2, 5], 18);
  } else if (isPath(targetDumpsters, 2, 6, 3)) {
    console.log("Route : Dump1 -> Dump3 -> Dump7 -> Dump6");
    console.log("Distance : 24");
    return getPath([1, 3, 7, 6], 24);
  } else if (isPath(targetDumpsters, 2, 7, 3)) {
    console.log("Route : Dump1 -> Dump3 -> Dump7");
    console.log("Distance : 13");
    return getPath([1, 3, 7], 13);
  } else if (isPath(targetDumpsters, 2, 4, 5)) {
    console.log("Route : Dump1 -> Dump2 -> Dump4 -> Dump2 -> Dump5");
    console.log("Distance : 13");
    return getPath([1, 2, 4, 5], 13);
  } else if (isPath(targetDumpsters, 2, 4, 6)) {
    console.log("Route : Dump1 -> Dump2 -> Dump4 -> Dump2 -> Dump5 -> Dump6");
    console.log("Distance : 16");
    return getPath([1, 2, 4, 2, 5, 6], 16);
  } else if (isPath(targetDumpsters, 2, 4, 7)) {
    console.log("Route : Dump1 -> Dump2 -> Dump4 -> Dump3 -> Dump7");
    console.log("Distance : 17");
    return getPath([1, 2, 4, 3, 7], 17);
  } else if (isPath(targetDumpsters, 2, 5, 6)) {
    console.log("Route : Dump1 -> Dump2 -> Dump5 -> Dump6");
    console.log("Distance : 12");
    return getPath([1, 2, 5, 6], 12);
  } else if (isPath(targetDumpsters, 2, 5, 7)) {
    console.log("Route : Dump1 -> Dump2 -> Dump5 -> Dump6 -> Dump7");
    console.log("Distance : 23");
    return getPath([1, 2, 5, 6, 7], 23);
  } else if (isPath(targetDumpsters, 2, 6, 7)) {
    console.log("Route : Dump1 -> Dump2 -> Dump5 -> Dump6 -> Dump7");
    console.log("Distance : 23");
    return getPath([1, 2, 5, 6, 7], 23);
  } else if (isPath(targetDumpsters, 2, 2, 5)) {
    console.log("Route : Dump1 -> Dump2 -> Dump5 ");
    console.log("Distance : 9");
    return getPath([1, 2, 5], 9);
  }
}



module.exports = {
  dumpsters,
  links,
  dumpWeights,
  generateRandomRealConnections,
  generateOptimizedPath
}
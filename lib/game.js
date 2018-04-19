  function removeTransition (e) {
    if (e.propertyName !== 'transform'){
      e.target.classList.remove('bold');
    }
  }

  let selectedImage = null;
  let towers = [[],[],[]];
  let towerNodes = [
    document.getElementById('tower_0'),
    document.getElementById('tower_1'),
    document.getElementById('tower_2')
  ];

  const images = [
    'assets/foot1.png',
    'assets/foot2.png',
    'assets/foot3.png'
  ];

  function initGame() {
    const startNode = document.getElementById('tower_0');
    images.forEach(imgUrl => {
      let myImage = new Image();
      myImage.src = imgUrl;
      startNode.appendChild(myImage);
    });
    towers[0] = images;
  }

  function handleClick(e) {
    let selectedDiv = e.target;

    if (e.target.tagName === 'IMG') {
      selectedDiv = e.target.parentNode;
    }

    const targetIdx = parseInt(selectedDiv.id.substr(selectedDiv.id.length -1));

    if (selectedImage) {
      tryInsert(targetIdx);
    } else {
      selectImage(targetIdx);
    }
  };

  function selectImage(idx) {
    selectedImage = towers[idx].shift();
    syncTowersToHtml();
  }

  function syncTowersToHtml(){
    let towerNodes = clearNodes();

    let i = 0
    towers.forEach(tower => {
      tower.forEach(img => {
        let myImage = new Image();
        myImage.src = img;
        towerNodes[i].appendChild(myImage);
      });
      i += 1;
    });
  }

  function clearNodes() {
    let node0 = document.getElementById('tower_0');
    let node1 = document.getElementById('tower_1');
    let node2 = document.getElementById('tower_2');
    let towerNodes = [node0, node1, node2];

    towerNodes.forEach(towerNode => {
      while(towerNode.firstChild) {
        towerNode.removeChild(towerNode.firstChild);
      }
    });

    return towerNodes;
  }

  function tryInsert(tower_idx) {
    let futureState = JSON.parse(JSON.stringify(towers));
    futureState[tower_idx].unshift(selectedImage);
    if (checkValidState(futureState)) {
      towers = futureState;
      selectedImage = null;
      syncTowersToHtml();
    } else {
      alert(`can't do that shit`);
    }
  }

  function checkValidState(testTowers) {
    return testTowers.every(tower => {
      let towerCopy = tower.slice(0);
      towerCopy = towerCopy.sort();
      return JSON.stringify(towerCopy) === JSON.stringify(tower);
    });
  }

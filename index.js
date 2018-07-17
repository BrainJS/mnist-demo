var net = new brain.FeedForward({
  inputLayer: () => input({height: 28, width: 28}),
  hiddenLayers: [
    input => convolution({filters: 8, stride: 1, padding: 2, filterHeight: 5, filterWidth: 5, filterCount: 8}, input),
    input => relu(input),
    input => pool({filters: 8, filterWidth: 2, filterHeight: 2, filterCount: 8, stride: 2}, input),
    input => convolution({filters: 16, stride: 1, padding: 2, filterHeight: 5, filterWidth: 5, filterCount: 16}, input),
    input => relu(input),
    input => pool({filterWidth: 3, filterHeight: 3, filterCount: 16, stride: 3}, input),
    input => fullyConnected({ depth: 10 }, input),
    input => softMax({width: 10}, input)
  ],
  outputLayer: input => target({width: 1, height: 10}, input)
});

loadJSON('data/training.json')
  .then(function(trainingData) {
    net.train(trainingData);
  });

// loadJSON('data/test.json')
//   .then(function(testData) {
//     document.body.appendChild(toImage(randomImageData(testData)));
//   });
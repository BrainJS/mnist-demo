var net = new brain.FeedForward({
  inputLayer: () => input({height: 28, width: 28}),
  hiddenLayers: [
    input => convolution({width: 5, height: 28, filters: 8, stride: 1, padding: 2, filterHeight: 24, filterWidth: 24, filterCount: 8}, input),
    input => relu(input),
    input => pool({width: 2, stride: 2}, input),
    input => convolution({width: 5, filters: 16, stride: 1, padding: 2, filterHeight: 12, filterWidth: 12, filterCount: 16}, input),
    input => relu(input),
    input => pool({width: 3, stride: 3}, input),
    input => softMax({width: 10}, input)
  ],
  outputLayer: input => output({width: 10}, input)
});

loadJSON('data/training.json')
  .then(function(trainingData) {
    net.train(trainingData);
  });

loadJSON('data/test.json')
  .then(function(testData) {
    document.body.appendChild(toImage(randomImageData(testData)));
  });